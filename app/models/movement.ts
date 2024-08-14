import { Category } from './category';
import { Wallet } from './wallet';
import { Installment } from './installment';

export class Movement {
  public movement_id: string;
  public movement_description: string;
  public movement_date: Date;
  public category: Category;
  public wallet: Wallet;
  public amount: number;
  public installments: Installment[] | null;

  constructor(
    id: string,
    description: string,
    movementDate: Date,
    category: Category,
    wallet: Wallet,
    amount: number,
    installments: Installment[] | null
  ) {
    this.movement_id = id;
    this.movement_description = description;
    this.movement_date = movementDate;
    this.category = category;
    this.wallet = wallet;
    this.amount = amount;
    this.installments = installments;
  }
}