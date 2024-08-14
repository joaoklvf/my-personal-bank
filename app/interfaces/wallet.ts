import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface WalletTable {
  wallet_id: Generated<string>;
  wallet_description: string;
  wallet_color: string;
  wallet_background_color: string;
}

export type SelectWallet = Selectable<WalletTable>
export type NewWallet = Insertable<WalletTable>
export type WalletUpdate = Updateable<WalletTable>