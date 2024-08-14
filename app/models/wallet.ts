export class Wallet {
  public wallet_id: string;
  public wallet_description: string;
  public wallet_color: string;
  public wallet_background_color: string;

  constructor(id: string, description: string, color: string, backgroundColor: string) {
    this.wallet_id = id;
    this.wallet_description = description;
    this.wallet_color = color;
    this.wallet_background_color = backgroundColor;
  }
}
