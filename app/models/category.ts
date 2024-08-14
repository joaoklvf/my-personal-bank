export class Category {
  public category_id: string;
  public category_description: string;
  public category_color: string;
  public category_background_color: string;

  constructor(id: string, description: string, color: string, backgroundColor: string) {
    this.category_id = id;
    this.category_description = description;
    this.category_color = color;
    this.category_background_color = backgroundColor;
  }
}
