import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { findMovementById } from '@/app/repositories/movement-repository';
import EditMovementForm from '@/app/ui/movements/edit-form';
import { findAllCategories } from '@/app/repositories/category-repository';
import { findAllWallets } from '@/app/repositories/wallet-repository';

export const metadata: Metadata = {
  title: 'Edit Movement',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movement = await findMovementById(id);
  const categories = await findAllCategories();
  const wallets = await findAllWallets();

  if (!movement) {
    notFound();
  }

  return (
    <main>
      <EditMovementForm movement={movement} categories={categories} wallets={wallets} />
    </main>
  );
}