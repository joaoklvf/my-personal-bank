import { Model } from './model';

export class Category extends Model {
  public category_description: string;

  constructor(id: string, description: string) {
    super(id);
    this.category_description = description;
  }
}
