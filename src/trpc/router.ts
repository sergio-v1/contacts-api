import { router } from './init';
import { contactsRouter } from './routers/contacts';

export const appRouter = router({
  contacts: contactsRouter,
});

export type AppRouter = typeof appRouter;