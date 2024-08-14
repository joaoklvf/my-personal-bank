import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface InstallmentTable {
  id: Generated<string>;
  installment_number: number;
  installment_date: Date;
  payment_status_id: string;
  movement_id: string;
}

export type SelectInstallment = Selectable<InstallmentTable>
export type NewInstallment = Insertable<InstallmentTable>
export type InstallmentUpdate = Updateable<InstallmentTable>