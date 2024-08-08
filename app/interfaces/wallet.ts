import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface WalletTable {
  id: Generated<string>;
  wallet_description: string;
}

export type SelectWallet = Selectable<WalletTable>
export type NewWallet = Insertable<WalletTable>
export type WalletUpdate = Updateable<WalletTable>