import { UpdateWallet, DeleteWallet } from '@/app/ui/wallets/buttons';
import { findAllWallets } from '@/app/repositories/wallet-repository';

export default async function WalletsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const wallets = await findAllWallets();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {wallets?.map((wallet) => (
              <div
                key={wallet.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4 gap-3 items-stretch">
                  <div className="w-full text-center rounded content-center" style={{ backgroundColor: wallet.wallet_background_color, color: wallet.wallet_color }}>
                    <b>{wallet.wallet_description}</b>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateWallet id={wallet.id} />
                    <DeleteWallet id={wallet.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 sm:pl-6">
                  Carteira
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {wallets?.map((wallet) => (
                <tr
                  key={wallet.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 w-full">
                    <div className="flex items-center rounded-lg justify-center h-9 lh-0.5" style={{ backgroundColor: wallet.wallet_background_color, color: wallet.wallet_color }}>
                      <b>{wallet.wallet_description}</b>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWallet id={wallet.id} />
                      <DeleteWallet id={wallet.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
