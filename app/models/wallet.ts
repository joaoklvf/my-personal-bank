import { Model } from "./model";

export class Wallet extends Model {
  public wallet_description: string;
  public wallet_color: string;
  public wallet_background_color: string;

  constructor(id: string, description: string, color: string, backgroundColor: string) {
    super(id);
    this.wallet_description = description;
    this.wallet_color = color;
    this.wallet_background_color = backgroundColor;
  }
}
