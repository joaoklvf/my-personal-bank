import { Model } from "./model";

export class Wallet extends Model {
  public wallet_description: string;

  constructor(id: string, description: string) {
    super(id);
    this.wallet_description = description;
  }
}
