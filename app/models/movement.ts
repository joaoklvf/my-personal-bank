import { Category } from './category';
import { Wallet } from './wallet';
import { Installment } from './installment';
import { PaymentStatus } from './payment-status';
import { Model } from './model';

export class Movement extends Model {
  public movement_description: string;
  public movement_date: Date;
  public category: Category;
  public wallet: Wallet;
  public amount: number;
  public installments: Installment[] | null;
  public payment_status: PaymentStatus;

  constructor(
    id: string,
    description: string,
    movementDate: Date,
    category: Category,
    wallet: Wallet,
    amount: number,
    installments: Installment[] | null,
    payment_status: PaymentStatus
  ) {
    super(id);
    this.movement_description = description;
    this.movement_date = movementDate;
    this.category = category;
    this.wallet = wallet;
    this.amount = amount;
    this.installments = installments;
    this.payment_status = payment_status;
  }
}