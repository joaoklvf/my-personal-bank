import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface PaymentStatusTable  {
  payment_status_id: Generated<string>;
  payment_status_description: string;
}

export type SelectPaymentStatus = Selectable<PaymentStatusTable>
export type NewPaymentStatus = Insertable<PaymentStatusTable>
export type PaymentStatusUpdate = Updateable<PaymentStatusTable>