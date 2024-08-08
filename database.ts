import { Kysely, PostgresDialect } from 'kysely'
import { env } from 'process'
import { CategoryTable } from './app/interfaces/category';
import { InstallmentTable } from './app/interfaces/installment';
import { MovementTable } from './app/interfaces/movement';
import { PaymentStatusTable } from './app/interfaces/payment-status';
import { WalletTable } from './app/interfaces/wallet';
import { Pool } from 'pg'

export interface Database {
  category: CategoryTable;
  wallet: WalletTable;
  payment_status: PaymentStatusTable;
  installment: InstallmentTable;
  movement: MovementTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.POSTGRES_DATABASE,
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    port: 5432,
    max: 10,
    ssl: true
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})