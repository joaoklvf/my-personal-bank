'use server';

import { db } from "@/database"
import { WalletUpdate, NewWallet, SelectWallet } from "../interfaces/wallet"
import { Wallet } from "../models/wallet";

export async function findAllWallets(): Promise<Wallet[] | null> {
  try {
    return await db.selectFrom('wallet')
      .selectAll()
      .execute();
      
  } catch (error) {
    console.log("erro catch", error)
  }
  return null;
}

export async function findWalletById(id: string) {
  return await db.selectFrom('wallet')
    .where('wallet_id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findWallet(criteria: Partial<SelectWallet>) {
  let query = db.selectFrom('wallet')

  if (criteria.wallet_id) {
    query = query.where('wallet_id', '=', criteria.wallet_id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.wallet_description) {
    query = query.where('wallet_description', '=', criteria.wallet_description)
  }

  return await query.selectAll().execute()
}

export async function editWallet(id: string, updateWith: WalletUpdate) {
  await db.updateTable('wallet').set(updateWith).where('wallet_id', '=', id).execute()
}

export async function addWallet(wallet: NewWallet) {
  return await db.insertInto('wallet')
    .values(wallet)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function removeWallet(id: string) {
  return await db.deleteFrom('wallet').where('wallet_id', '=', id)
    .returningAll()
    .executeTakeFirst()
}