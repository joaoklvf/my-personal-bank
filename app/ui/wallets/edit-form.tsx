'use client';

import {
  PencilIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { updateWallet, WalletState } from '@/app/services/wallet-service';
import { Wallet } from '@/app/models/wallet';

export default function EditWalletForm({
  wallet
}: {
  wallet: Wallet;
}) {
  const initialState: WalletState = { message: null, errors: {} };
  const updateWalletWithId = updateWallet.bind(null, wallet.id);
  const [state, formAction] = useActionState(updateWalletWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Wallet description */}
        <div className="mb-4">
          <label htmlFor="wallet_description" className="mb-2 block text-sm font-medium">
            Descrição da  carteira
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="wallet_description"
                name="wallet_description"
                defaultValue={wallet.wallet_description}
                placeholder="Descrição da carteira"
                className="peer h-10 block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Wallet background color */}
        <div className="mb-4">
          <label htmlFor="wallet_background_color" className="mb-2 block text-sm font-medium">
            Cor de fundo da descrição carteira
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="wallet_background_color"
                name="wallet_background_color"
                type="color"
                defaultValue={wallet.wallet_background_color}
                placeholder="Cor do fundo"
                className="peer h-10 block w-full rounded-md border border-gray-200 pl-10 py-2text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Wallet color */}
        <div className="mb-4">
          <label htmlFor="wallet_color" className="mb-2 block text-sm font-medium">
            Cor da descrição carteira
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="wallet_color"
                name="wallet_color"
                defaultValue={wallet.wallet_color}
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
          href="/dashboard/wallets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar carteira</Button>
      </div>
    </form>
  );
}
