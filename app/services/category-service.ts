'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addCategory, editCategory, removeCategory } from '../repositories/category-repository';

export type CategoryState = {
  errors?: {
    category_description?: string[];
    category_color?: string[];
    category_background_color?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  category_description: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  category_color: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  category_background_color: z.string({
    invalid_type_error: 'Please select a customer.',
  })
});

const UpdateCategory = FormSchema.omit({ id: true });
const CreateCategory = FormSchema.omit({ id: true });

export async function createCategory(prevState: CategoryState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCategory.safeParse({
    category_description: formData.get('category_description'),
    category_color: formData.get('category_color'),
    category_background_color: formData.get('category_background_color'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  // Prepare data for insertion into the database
  const newCategory = { ...validatedFields.data };

  // Insert data into the database
  try {
    await addCategory(newCategory);
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }

  // Revalidate the cache for the categories page and redirect the user.
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function updateCategory(
  id: string,
  prevState: CategoryState,
  formData: FormData,
) {
  const validatedFields = CreateCategory.safeParse({
    category_description: formData.get('category_description'),
    category_color: formData.get('category_color'),
    category_background_color: formData.get('category_background_color'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }

  const currentCategory = { ...validatedFields.data };
  try {
    await editCategory(id, currentCategory);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Category.' };
  }

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteCategory(id: string) {
  try {
    await removeCategory(id);
    revalidatePath('/dashboard/categories');
    return { message: 'Deleted Category.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Category.' };
  }
}
