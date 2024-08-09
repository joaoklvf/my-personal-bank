import { Model } from './model';

export class Category extends Model {
  public category_description: string;
  public category_color: string;
  public category_background_color: string;

  constructor(id: string, description: string, color: string, backgroundColor: string) {
    super(id);
    this.category_description = description;
    this.category_color = color;
    this.category_background_color = backgroundColor;
  }
}
