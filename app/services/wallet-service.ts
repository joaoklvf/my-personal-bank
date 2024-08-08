'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addWallet, editWallet, removeWallet } from '../repositories/wallet-repository';

export type WalletState = {
  errors?: {
    wallet_description?: string[];
    wallet_color?: string[];
    wallet_background_color?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  wallet_description: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  wallet_color: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  wallet_background_color: z.string({
    invalid_type_error: 'Please select a customer.',
  })
});

const UpdateWallet = FormSchema.omit({ id: true });
const CreateWallet = FormSchema.omit({ id: true });

export async function createWallet(prevState: WalletState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateWallet.safeParse({
    wallet_description: formData.get('wallet_description'),
    wallet_color: formData.get('wallet_color'),
    wallet_background_color: formData.get('wallet_background_color'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Wallet.',
    };
  }

  // Prepare data for insertion into the database
  const newWallet = { ...validatedFields.data };

  // Insert data into the database
  try {
    await addWallet(newWallet);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Wallet.',
    };
  }

  // Revalidate the cache for the wallets page and redirect the user.
  revalidatePath('/dashboard/wallets');
  redirect('/dashboard/wallets');
}

export async function updateWallet(
  id: string,
  prevState: WalletState,
  formData: FormData,
) {
  const validatedFields = CreateWallet.safeParse({
    wallet_description: formData.get('wallet_description'),
    wallet_color: formData.get('wallet_color'),
    wallet_background_color: formData.get('wallet_background_color'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Wallet.',
    };
  }

  const currentWallet = { ...validatedFields.data };
  try {
    await editWallet(id, currentWallet);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Wallet.' };
  }

  revalidatePath('/dashboard/wallets');
  redirect('/dashboard/wallets');
}

export async function deleteWallet(id: string) {
  try {
    await removeWallet(id);
    revalidatePath('/dashboard/wallets');
    return { message: 'Deleted Wallet.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Wallet.' };
  }
}
