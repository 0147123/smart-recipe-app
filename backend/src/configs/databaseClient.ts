import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// build a new PrismaClient only if it doesn't exist yet
// prevents multiple instances of PrismaClient
if (!global.__db) {
  console.log('Creating a new PrismaClient');
  global.__db = new PrismaClient();

  // Listen for the beforeExit event to disconnect the PrismaClient
  const disconnectPrismaClient = async () => {
    try {
      if (global.__db) {
        await global.__db.$disconnect();
        console.log('PrismaClient disconnected');
      }
    } catch (error) {
      console.error('Error disconnecting PrismaClient:', error);
    } finally {
      process.exit(0);
    }
  };

  process.on('beforeExit', disconnectPrismaClient);
  process.on('SIGINT', disconnectPrismaClient);
  process.on('SIGTERM', disconnectPrismaClient);
  // process.on('uncaughtException', disconnectPrismaClient);
}

db = global.__db;

export { db };