import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CategoryTable {
  id: Generated<string>;
  category_description: string;
}

export type Category = Selectable<CategoryTable>
export type NewCategory = Insertable<CategoryTable>
export type CategoryUpdate = Updateable<CategoryTable>
