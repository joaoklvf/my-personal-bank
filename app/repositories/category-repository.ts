'use server';

import { db } from "@/database"
import { CategoryUpdate, NewCategory, SelectCategory } from "../interfaces/category"

export async function findAllCategories() {
  try {
    return await db.selectFrom('category')
      .selectAll()
      .execute()
      .catch((ex) => console.log("erro execute", ex))
  } catch (error) {
    console.log("erro catch", error)
  }
  return null;
}

export async function findCategoryById(id: string) {
  return await db.selectFrom('category')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findCategory(criteria: Partial<SelectCategory>) {
  let query = db.selectFrom('category')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.category_description) {
    query = query.where('category_description', '=', criteria.category_description)
  }

  return await query.selectAll().execute()
}

export async function editCategory(id: string, updateWith: CategoryUpdate) {
  await db.updateTable('category').set(updateWith).where('id', '=', id).execute()
}

export async function addCategory(category: NewCategory) {
  return await db.insertInto('category')
    .values(category)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function removeCategory(id: string) {
  return await db.deleteFrom('category').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}