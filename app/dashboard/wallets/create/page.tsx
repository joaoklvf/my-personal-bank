import Breadcrumbs from '@/app/ui/breadcrumbs/breadcrumbs';
import CreateWalletForm from '@/app/ui/wallets/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Wallet',
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carteiras', href: '/dashboard/wallets' },
          {
            label: 'Criar carteira',
            href: '/dashboard/wallets/create',
            active: true,
          },
        ]}
      />
      <CreateWalletForm  />
    </main>
  );
}