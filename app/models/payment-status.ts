import { Model } from "./model";

export class PaymentStatus extends Model {
  public status_description: string;

  constructor(id: string, description: string) {
    super(id);
    this.status_description = description;
  }
}