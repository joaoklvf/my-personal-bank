import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface MovementTable {
  id: Generated<string>;
  movement_description: string;
  movement_date: Date;
  category_id: string;
  wallet_id: string;
  amount: number;
  payment_status_id: string;
}

export type SelectWallet = Selectable<MovementTable>
export type NewMovement = Insertable<MovementTable>
export type MovementUpdate = Updateable<MovementTable>