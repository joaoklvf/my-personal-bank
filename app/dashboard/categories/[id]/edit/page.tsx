import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findCategoryById } from '@/app/repositories/category-repository';
import EditCategoryForm from '@/app/ui/categories/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs/breadcrumbs';

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
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorias', href: '/dashboard/categories' },
          {
            label: 'Editar categoria',
            href: `/dashboard/categories/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCategoryForm category={category} />
    </main>
  );
}