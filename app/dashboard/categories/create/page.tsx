import CreateCategoryForm from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Wallet',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categorias', href: '/dashboard/categories' },
          {
            label: 'Criar categoria',
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <CreateCategoryForm  />
    </main>
  );
}