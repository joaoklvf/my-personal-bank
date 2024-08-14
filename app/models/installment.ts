import { Model } from './model';
import { PaymentStatus } from './payment-status';

export class Installment extends Model {
  public installment_number: number;
  public installment_date: Date;
  public installment_payment_status: PaymentStatus;
  public movement_id: string;

  constructor(id: string, installmentNumber: number, installmentDate: Date, status: PaymentStatus, movementId: string) {
    super(id);
    this.installment_number = installmentNumber;
    this.installment_date = installmentDate;
    this.installment_payment_status = status;
    this.movement_id = movementId;
  }
}