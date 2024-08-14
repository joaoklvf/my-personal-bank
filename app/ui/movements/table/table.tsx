'use client'
import { UpdateMovement, DeleteMovement } from '@/app/ui/movements/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { TableContainer } from './styles';
import { SelectMovementJoined } from '@/app/interfaces/movement';

export default function MovementsTable({ movements }: { movements: SelectMovementJoined[] | null | void; }) { 
  return (
    <TableContainer className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 pb-6 md:pt-0">
          <div className="md:hidden">
            {movements?.map((movement) => (
              <div
                key={movement.movement_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{movement.movement_description}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{movement.email}</p> */}
                  </div>
                  <div className="rounded-md border w-full text-center rounded content-center" style={{ backgroundColor: movement.wallet_background_color, color: movement.wallet_color }}>
                    <b>{movement.wallet_description}</b>
                  </div>
                  <div className="rounded-md border w-full text-center rounded content-center" style={{ backgroundColor: movement.category_background_color, color: movement.category_color }}>
                    <b>{movement.category_description}</b>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(movement.amount)}
                    </p>
                    <p>{formatDateToLocal(movement.movement_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMovement id={movement.movement_id} />
                    <DeleteMovement id={movement.movement_id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className='w-3/12 lg:w-4/12'>
                  Movimentação
                </th>
                <th scope="col" className='w-2/12 lg:w-3/12'>
                  Carteira
                </th>
                <th scope="col" className='w-2/12 lg:w-3/12'>
                  Categoria
                </th>
                <th scope="col" className='w-2/12'>
                  Valor
                </th>
                <th scope="col" className='w-2/12'>
                  Data
                </th>
                <th scope="col" className='w-1/12 text-center'>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {movements?.map((movement) => (
                <tr
                  key={movement.movement_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <p>{movement.movement_description}</p>
                    </div>
                  </td>
                  <td>
                    <div className="rounded-md border flex items-center rounded-lg justify-center h-9 lh-0.5" style={{ backgroundColor: movement.wallet_background_color, color: movement.wallet_color }}>
                      <b>{movement.wallet_description}</b>
                    </div>
                  </td>
                  <td>
                    <div className="rounded-md border flex items-center rounded-lg justify-center h-9 lh-0.5" style={{ backgroundColor: movement.category_background_color, color: movement.category_color }}>
                      <b>{movement.category_description}</b>
                    </div>
                  </td>
                  <td className='text-right'>
                    {formatCurrency(movement.amount)}
                  </td>
                  <td>
                    {formatDateToLocal(movement.movement_date)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-3">
                      <UpdateMovement id={movement.movement_id} />
                      <DeleteMovement id={movement.movement_id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TableContainer>
  );
}
