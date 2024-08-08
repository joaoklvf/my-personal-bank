import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findWalletById } from '@/app/repositories/wallet-repository';
import EditWalletForm from '@/app/ui/wallets/edit-form';

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
      <EditWalletForm wallet={wallet} />
    </main>
  );
}