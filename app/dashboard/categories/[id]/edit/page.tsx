import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findCategoryById } from '@/app/repositories/category-repository';
import EditCategoryForm from '@/app/ui/categories/edit-form';

export const metadata: Metadata = {
  title: 'Edit Category',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const category = await findCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <EditCategoryForm category={category} />
    </main>
  );
}