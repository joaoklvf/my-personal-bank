import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { CreateMovement } from '@/app/ui/movements/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import MovementsTable from '@/app/ui/movements/table/table';
import { getAllMovements } from '@/app/services/movement-service';

export const metadata: Metadata = {
  title: 'Movimentações',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1;//await fetchInvoicesPages(query);
  const movements = await getAllMovements();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Movimentações</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar movimentações..." />
        <CreateMovement />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <MovementsTable movements={movements} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}