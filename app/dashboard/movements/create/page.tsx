import { CreateMovementForm } from '@/app/ui/movements/create-form/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs/breadcrumbs';
import { Metadata } from 'next';
import { findAllCategories } from '@/app/repositories/category-repository';
import { findAllWallets } from '@/app/repositories/wallet-repository';

export const metadata: Metadata = {
  title: 'Create Wallet',
};

export default async function Page() {
  const categories = await findAllCategories();
  const wallets = await findAllWallets();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'movimentações', href: '/dashboard/movements' },
          {
            label: 'Inserir movimentação',
            href: '/dashboard/movements/create',
            active: true,
          },
        ]}
      />
      <CreateMovementForm
        categories={categories}
        wallets={wallets}
      />
    </main>
  );
}