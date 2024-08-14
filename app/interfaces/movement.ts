import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { SelectCategory } from "./category";
import { SelectWallet } from "./wallet";

export interface MovementTable {
  movement_id: Generated<string>;
  movement_description: string;
  movement_date: Date;
  category_id: string;
  wallet_id: string;
  amount: number;
}

export type SelectMovement = Selectable<MovementTable>
export type NewMovement = Insertable<MovementTable>
export type MovementUpdate = Updateable<MovementTable>
export type SelectMovementJoined = SelectMovement & SelectCategory & SelectWallet;
export type MovementWithInstallmentsQuantity = SelectMovement & {
  installments_quantity: number;
}