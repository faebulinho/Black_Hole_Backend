/**
 * Prisma Client Singleton für die Schwarze-Loch-Simulationsanwendung
 * 
 * Diese Datei konfiguriert eine einzelne Instanz des Prisma Clients für Datenbankzugriffe
 * und verhindert die Erstellung mehrerer Instanzen während der Entwicklung. 
 */

import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}