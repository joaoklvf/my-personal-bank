import { Model } from './model';
import { Status } from './payment-status';

export class Installment extends Model {
  public installment_number: number;
  public installment_date: Date;
  public status: Status;

  constructor(id: string, installmentNumber: number, installmentDate: Date, status: Status) {
    super(id);
    this.installment_number = installmentNumber;
    this.installment_date = installmentDate;
    this.status = status;
  }
}