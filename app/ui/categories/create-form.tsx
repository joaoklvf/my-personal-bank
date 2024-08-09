'use client';

import {
  PencilIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { createCategory, updateCategory, CategoryState } from '@/app/services/category-service';
import { Category } from '@/app/models/category';

export default function CreateCategoryForm() {
  const initialState: CategoryState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCategory, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category description */}
        <div className="mb-4">
          <label htmlFor="category_description" className="mb-2 block text-sm font-medium">
            Descrição da  categoria
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_description"
                name="category_description"
                placeholder="Descrição da categoria"
                className="peer h-10 block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Category color */}
        <div className="mb-4">
          <label htmlFor="category_background_color" className="mb-2 block text-sm font-medium">
            Cor de fundo da descrição categoria
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_background_color"
                name="category_background_color"
                type="color"
                defaultValue="#ffffff"
                placeholder="Cor do fundo"
                className="peer h-10 block w-full rounded-md border border-gray-200 pl-10 py-2text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Category color */}
        <div className="mb-4">
          <label htmlFor="category_color" className="mb-2 block text-sm font-medium">
            Cor da descrição categoria
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="category_color"
                name="category_color"
                defaultValue="#ffffff"
                type="color"
                placeholder="Cor do texto"
                className="peer h-10 block w-full rounded-md border border-gray-200 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 " />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/categories"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Criar categoria</Button>
      </div>
    </form>
  );
}
