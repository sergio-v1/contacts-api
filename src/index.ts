// src/index.ts
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { trpcServer } from '@hono/trpc-server';
import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';
import { db } from './db/client';
import { contactsTable } from './db/schema';

const app = new Hono();

// CORS
app.use('/*', cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

// tRPC endpoint
app.use('/trpc/*', trpcServer({
  router: appRouter,
  createContext,
}));


// Health check
app.get('/', (c) => {
  return c.json({ 
    message: 'Contacts API is running! 🚀',
    endpoints: {
      health: '/',
      trpc: '/trpc/contacts.list?input={}',
    }
  });
});

const port = Number(process.env.PORT) || 3001;
console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};