import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface PaymentStatusTable  {
  id: Generated<string>;
  payment_status_description: string;
}

export type SelectWallet = Selectable<PaymentStatusTable>
export type NewPaymentStatus = Insertable<PaymentStatusTable>
export type PaymentStatusUpdate = Updateable<PaymentStatusTable>