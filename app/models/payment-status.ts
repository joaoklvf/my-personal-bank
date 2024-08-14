export class PaymentStatus {
  public payment_status_id: string;
  public status_description: string;

  constructor(id: string, description: string) {
    this.payment_status_id = id;
    this.status_description = description;
  }
}