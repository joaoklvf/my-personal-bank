import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CategoryTable {
  category_id: Generated<string>;
  category_description: string;
  category_color: string;
  category_background_color: string;
}

export type SelectCategory = Selectable<CategoryTable>
export type NewCategory = Insertable<CategoryTable>
export type CategoryUpdate = Updateable<CategoryTable>
