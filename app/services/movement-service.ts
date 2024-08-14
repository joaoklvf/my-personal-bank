'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMovement, editMovement, findAllMovementsJoined, removeMovement } from '../repositories/movement-repository';
import { removePointsFromDecimalString } from '../lib/utils';

export type MovementState = {
  errors?: {
    movement_description?: string[];
    movement_date?: string[];
    category_id?: string[];
    wallet_id?: string[];
    amount?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  movement_description: z.string({
    invalid_type_error: 'Selecione uma descrição.',
  }),
  movement_date: z.string({
    invalid_type_error: 'Selecione uma data.',
  }),
  category_id: z.string({
    invalid_type_error: 'Selecione uma categoria.',
  }),
  wallet_id: z.string({
    invalid_type_error: 'Selecione uma carteira.',
  }),
  amount: z.coerce.number().gt(0, { message: 'O valor deve ser maior que $0.' }),

});

const UpdateMovement = FormSchema.omit({ id: true });
const CreateMovement = FormSchema.omit({ id: true });

export async function createMovement(prevState: MovementState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateMovement.safeParse({
    movement_description: formData.get('movement_description'),
    movement_date: formData.get('movement_date'),
    category_id: formData.get('category_id'),
    wallet_id: formData.get('wallet_id'),
    amount: removePointsFromDecimalString(formData.get('amount') as string)
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movement.',
    };
  }

  // Prepare data for insertion into the database  
  const dateSplitted = validatedFields.data.movement_date.split('/').map(x => Number(x));
  const newMovement = { ...validatedFields.data, movement_date: new Date(dateSplitted[2], dateSplitted[1], dateSplitted[0]) };

  // Insert data into the database
  try {
    await addMovement(newMovement);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Movement.',
    };
  }

  // Revalidate the cache for the movements page and redirect the user.
  revalidatePath('/dashboard/movements');
  redirect('/dashboard/movements');
}

export async function updateMovement(
  id: string,
  prevState: MovementState,
  formData: FormData,
) {
  const validatedFields = UpdateMovement.safeParse({
    movement_description: formData.get('movement_description'),
    movement_date: formData.get('movement_date'),
    category_id: formData.get('category_id'),
    wallet_id: formData.get('wallet_id'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movement.',
    };
  }

  const dateSplitted = validatedFields.data.movement_date.split('/').map(x => Number(x));
  const currentMovement = { ...validatedFields.data, movement_date: new Date(dateSplitted[2], dateSplitted[1], dateSplitted[0]) };

  try {
    await editMovement(id, currentMovement);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Movement.' };
  }

  revalidatePath('/dashboard/movements');
  redirect('/dashboard/movements');
}

export async function deleteMovement(id: string) {
  try {
    await removeMovement(id);
    revalidatePath('/dashboard/movements');
    return { message: 'Deleted Movement.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Movement.' };
  }
}

export async function getAllMovements() {
  try {
    const movementsResponse = await findAllMovementsJoined();
    return movementsResponse;
  } catch (error) {
    console.log('error getAllMovements', error);
    throw error;
  }
}
