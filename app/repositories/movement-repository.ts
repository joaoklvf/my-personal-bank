'use server';

import { db } from "@/database"
import { MovementUpdate, NewMovement, SelectMovement } from "../interfaces/movement"
import { sql } from "kysely";

export async function findAllMovements() {
  try {
    return await db.selectFrom('movement')
      .selectAll()
      .execute()
      .catch((ex) => console.log("erro execute", ex))
  } catch (error) {
    console.log("erro catch", error)
  }
  return null;
}

export async function findAllMovementsJoined() {
  try {
    return await db.selectFrom('movement')
      .innerJoin("category", "category.category_id", "movement.category_id")
      .innerJoin("wallet", "wallet.wallet_id", "movement.wallet_id")
      .selectAll()
      .orderBy('movement.movement_date desc')
      .execute()
      .catch((ex) => console.log("erro execute", ex))
  } catch (error) {
    console.log("erro catch", error)
  }
  return null;
}

export async function findMovementById(id: string) {
  return await db.selectFrom('movement')
    .leftJoin('installment', 'installment.movement_id', 'movement.movement_id')
    .select(({ fn }) => [
      'movement.movement_id',
      'movement.amount',
      'movement.category_id',
      'movement.movement_date',
      'movement.movement_description',
      'movement.wallet_id',
      fn.coalesce(fn.max<number>('installment.installment_number'), sql<number>`'1'`).as('installments_quantity')
    ])
    .where('movement.movement_id', '=', id)
    .groupBy('movement.movement_id')
    .executeTakeFirst()
}

export async function findMovement(criteria: Partial<SelectMovement>) {
  let query = db.selectFrom('movement')

  if (criteria.movement_id) {
    query = query.where('movement_id', '=', criteria.movement_id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.movement_description) {
    query = query.where('movement_description', '=', criteria.movement_description)
  }

  return await query.selectAll().execute()
}

export async function editMovement(id: string, updateWith: MovementUpdate) {
  await db.updateTable('movement').set(updateWith).where('movement_id', '=', id).execute()
}

export async function addMovement(movement: NewMovement) {
  return await db.insertInto('movement')
    .values(movement)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function removeMovement(id: string) {
  return await db.deleteFrom('movement').where('movement_id', '=', id)
    .returningAll()
    .executeTakeFirst()
}