// import from the generated client instead of the npm package. this keeps the
// runtime code within our app, avoiding issues with missing compiled modules in
// node_modules (the default @prisma/client output sometimes relies on a
// prebuilt `default` entry that may not exist in dev).
import { PrismaClient } from '../generated/prisma'
// we now need a driver adapter since the default engine type is "client".
// for SQLite we can use the official better-sqlite3 adapter.
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const prismaClientSingleton = () => {
  try {
    // remove explicit datasources configuration; the client will read
    // DATABASE_URL from the environment. passing the `datasources` option
    // is no longer supported by the generated client and caused a
    // PrismaClientConstructorValidationError in development.
    return new PrismaClient({
      adapter: new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
      }),
      log: ['query'],
    })
  } catch (e: any) {
    console.error('[Prisma] initialization failed:', e.message || e)
    throw e
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma