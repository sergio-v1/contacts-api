import { z } from 'zod';
import { eq, like, asc, desc, count, or, and, ilike } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '../init';
import { contactsTable } from '../../db/schema';
import type { Context } from '../context';

const contactFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional(),
  role: z.string().optional(),
  sortBy: z.enum(['firstName', 'lastName', 'email', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
}).optional().default({});

const createContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive']).default('active'),
  dateOfBirth: z.string().optional(),
  notes: z.string().optional(),
});

type ContactFilters = z.infer<typeof contactFiltersSchema>;
type CreateContact = z.infer<typeof createContactSchema>;

export const contactsRouter = router({
  // List contacts
  list: publicProcedure
    .input(contactFiltersSchema.optional())
    .query(async ({ ctx, input }: { ctx: Context; input?: ContactFilters }) => {
      try {
        const { search, status, role, sortBy = 'firstName', sortOrder = 'asc', page = 1, limit = 10 } = input || {};
        
        const conditions = [];
        
        if (search) {
          conditions.push(
            or(
              ilike(contactsTable.firstName, `%${search}%`),
              ilike(contactsTable.lastName, `%${search}%`),
              ilike(contactsTable.email, `%${search}%`),
              ilike(contactsTable.role, `%${search}%`)
            )
          );
        }
        
        if (status && status !== 'all') {
          conditions.push(eq(contactsTable.status, status));
        }
        
        if (role) {
          conditions.push(eq(contactsTable.role, role));
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [{ totalCount }] = await ctx.db
          .select({ totalCount: count() })
          .from(contactsTable)
          .where(whereClause);

        const results = await ctx.db
          .select()
          .from(contactsTable)
          .where(whereClause)
          .orderBy(
            sortOrder === 'asc' 
              ? asc(contactsTable[sortBy]) 
              : desc(contactsTable[sortBy])
          )
          .limit(limit)
          .offset((page - 1) * limit);

        return {
          contacts: results,
          pagination: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: page * limit < totalCount,
            hasPreviousPage: page > 1,
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch contacts',
          cause: error,
        });
      }
    }),

  // Get single contact  
  get: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }: { ctx: Context; input: { id: string } }) => {
      try {
        const [contact] = await ctx.db
          .select()
          .from(contactsTable)
          .where(eq(contactsTable.id, input.id))
          .limit(1);
        
        if (!contact) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Contact not found',
          });
        }
        
        return contact;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch contact',
          cause: error,
        });
      }
    }),

  // Create contact
  create: publicProcedure
    .input(createContactSchema)
    .mutation(async ({ ctx, input }: { ctx: Context; input: CreateContact }) => {
      // ... implementaremos esto  
    }),

  // Update contact
  update: publicProcedure
    .input(z.object({
      id: z.string().uuid(),
      data: createContactSchema.partial(),
    }))
    .mutation(async ({ ctx, input }: { ctx: Context; input: { id: string; data: Partial<CreateContact> } }) => {
      // ... implementaremos esto
    }),

  // Delete contact
  delete: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }: { ctx: Context; input: { id: string } }) => {
      // ... implementaremos esto
    }),
});