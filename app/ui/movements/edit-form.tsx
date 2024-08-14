'use client';

import {
  CurrencyDollarIcon,
  PencilIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState, useState } from 'react';
import { updateMovement, MovementState } from '@/app/services/movement-service';
import { DatePicker } from '../datepicker/date-picker';
import { Category } from '@/app/models/category';
import { Wallet } from '@/app/models/wallet';
import { InputMask } from '../input-mask/input-mask';
import { formatCurrency, formatDecimal, removePointsFromDecimalString } from '@/app/lib/utils';
import { MovementWithInstallmentsQuantity } from '@/app/interfaces/movement';
import { ReactSelectComponent } from '../select/react-select';

interface EditMovementFormProps {
  categories: Category[] | null;
  wallets: Wallet[] | null;
  movement: MovementWithInstallmentsQuantity;
}

export default function EditMovementForm({ categories, wallets, movement }: EditMovementFormProps) {
  const initialState: MovementState = { message: null, errors: {} };
  const updateMovementWithId = updateMovement.bind(null, movement.movement_id);
  const [state, formAction] = useActionState(updateMovementWithId, initialState);
  const [installmentsQuantity, setInstallmentsQuantity] = useState(movement.installments_quantity);
  const [amount, setAmount] = useState(formatDecimal(movement.amount.toString()));
  const installmentAmount = Number(removePointsFromDecimalString(amount)) / installmentsQuantity;
  const defaultWallet = wallets?.find(x => x.wallet_id === movement.wallet_id);
  const defaultCategory = categories?.find(x => x.category_id === movement.category_id);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Movement date */}
        <div className="mb-4">
          <label htmlFor="movement_date" className="mb-2 block text-sm font-medium">
            Data
          </label>
          <div className="rounded-md">
            <DatePicker
              id='movement_date'
              name='movement_date'
              className='rounded-lg border-gray-200'
              defaultValue={movement.movement_date}
            />
          </div>
        </div>
        {/* Movement description */}
        <div className="mb-4">
          <label htmlFor="movement_description" className="mb-2 block text-sm font-medium">
            Descrição
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                defaultValue={movement.movement_description}
                id="movement_description"
                name="movement_description"
                placeholder="Descrição da movimentação"
                className="peer h-10 block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className='flex justify-between gap-4'>
          {/* Movement wallet */}
          <div className="mb-4 w-full">
            <label htmlFor="wallet_id" className="mb-2 block text-sm font-medium">
              Carteira
            </label>
            <ReactSelectComponent
              options={wallets}
              dataLabel="wallet_description"
              dataValue={"wallet_id"}
              dataBackGroundColor={"wallet_background_color"}
              dataColor={"wallet_color"}
              id='wallet'
              name='wallet_id'
              defaultValue={defaultWallet}
            />
          </div>
          {/* Movement category */}
          <div className="mb-4 w-full">
            <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
              Categoria
            </label>
            <ReactSelectComponent
              options={categories}
              dataLabel="category_description"
              dataValue={"category_id"}
              dataBackGroundColor={"category_background_color"}
              dataColor={"category_color"}
              id='category'
              name='category_id'
              defaultValue={defaultCategory}
            />
          </div>
          {/* Installment quantity */}
          <div className="mb-4 w-full">
            <label htmlFor="installments_quantity" className="mb-2 block text-sm font-medium">
              Quantidade de parcelas
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  name='installments_quantity'
                  id='installments_quantity'
                  className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  type='number'
                  min={1}
                  maxLength={2}
                  value={installmentsQuantity}
                  onChange={(e) => setInstallmentsQuantity(Number(e.target.value) || 1)}
                />
                <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          {/* Movement Amount */}
          <div className="mb-4 w-full">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Insira o valor
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <InputMask
                  mask='decimal'
                  name='amount'
                  id='amount'
                  className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {installmentsQuantity > 1 && <p>Valor de cada parcela: {formatCurrency(installmentAmount)}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/movements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar movimentação</Button>
      </div>
    </form>
  );
}
