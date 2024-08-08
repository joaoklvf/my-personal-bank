'use server';

import { db } from "@/database"
import { WalletUpdate, NewWallet, SelectWallet } from "../interfaces/wallet"

export async function findAllWallets() {
  try {
    return await db.selectFrom('wallet')
      .selectAll()
      .execute()
      .catch((ex) => console.log("erro execute", ex))
  } catch (error) {
    console.log("erro catch", error)
  }
  return null;
}

export async function findWalletById(id: string) {
  return await db.selectFrom('wallet')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findWallet(criteria: Partial<SelectWallet>) {
  let query = db.selectFrom('wallet')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.wallet_description) {
    query = query.where('wallet_description', '=', criteria.wallet_description)
  }

  return await query.selectAll().execute()
}

export async function editWallet(id: string, updateWith: WalletUpdate) {
  await db.updateTable('wallet').set(updateWith).where('id', '=', id).execute()
}

export async function addWallet(wallet: NewWallet) {
  return await db.insertInto('wallet')
    .values(wallet)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function removeWallet(id: string) {
  return await db.deleteFrom('wallet').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}