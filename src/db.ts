// This is a dummy file to satisfy imports from '../db'
import { prisma } from './utils/prisma';

// Export the Prisma client as the default export
export default prisma;

// Also export it as a named export in case it's imported that way
export const db = prisma;

// Export some common database functions that might be expected
export const query = async (sql: string, params: any[] = []) => {
  console.warn('Legacy db.query() called - this is a compatibility shim. Please update to use Prisma directly.');
  return { rows: [] };
};

export const pool = {
  query: async (sql: string, params: any[] = []) => {
    console.warn('Legacy pool.query() called - this is a compatibility shim. Please update to use Prisma directly.');
    return [[], {}];
  }
};

export const getConnection = () => {
  console.warn('Legacy getConnection() called - this is a compatibility shim. Please update to use Prisma directly.');
  return {
    query: async (sql: string, params: any[] = []) => {
      return { rows: [] };
    },
    release: () => { }
  };
};