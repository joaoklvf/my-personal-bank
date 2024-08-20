import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findWalletById } from '@/app/repositories/wallet-repository';
import EditWalletForm from '@/app/ui/wallets/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs/breadcrumbs';

export const metadata: Metadata = {
  title: 'Edit Wallet',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const wallet = await findWalletById(id);

  if (!wallet) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carteiras', href: '/dashboard/wallets' },
          {
            label: 'Editar carteiras',
            href: `/dashboard/wallets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditWalletForm wallet={wallet} />
    </main>
  );
}