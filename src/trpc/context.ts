import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from '../db/client';

export function createContext({ req }: FetchCreateContextFnOptions) {
  return { db, req };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
