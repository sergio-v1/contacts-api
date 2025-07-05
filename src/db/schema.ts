import { pgTable, uuid, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const contactStatusEnum = pgEnum('contact_status', ['active', 'inactive']);

export const contactsTable = pgTable("contacts", {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }).notNull(),
  role: varchar('role', { length: 100 }).notNull(),
  status: contactStatusEnum('status').notNull().default('active'),
  dateOfBirth: text('date_of_birth'), // ISO string
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});