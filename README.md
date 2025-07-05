# Contacts API

Modern type-safe API built with Bun, Hono, and tRPC for managing contacts.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your database URL

# Run database migrations
bun run db:migrate

# Seed the database
bun run db:seed

# Start development server
bun run dev
```

## 🛠 Tech Stack

- **Runtime**: Bun
- **Framework**: Hono
- **API**: tRPC (type-safe)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod
- **CORS**: Configured for local development

## 📡 API Endpoints

Base URL: `http://localhost:3001/trpc`

### Contacts Routes
- `GET /contacts.list` - List contacts with filters
- `GET /contacts.get` - Get single contact
- `POST /contacts.create` - Create new contact
- `POST /contacts.update` - Update existing contact
- `POST /contacts.delete` - Delete contact

### Debug Endpoints
- `GET /debug/contacts` - Raw database query test
- `GET /` - Health check + endpoints info

## 🗄 Database Schema

```sql
contacts (
  id UUID PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive')),
  dateOfBirth DATE,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
)
```

## 🔧 Development

```bash
# Development with hot reload
bun run dev

# Build for production
bun run build

# Run production server
bun start

# Database operations
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
bun run db:seed      # Seed data
bun run db:studio    # Open Drizzle Studio
```

## 📝 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/contacts
PORT=3001
```

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:3001/debug/contacts

# Test tRPC endpoint
curl "http://localhost:3001/trpc/contacts.list?input={}"
```

## 📦 Key Features

- ✅ **Type Safety** - Full TypeScript + tRPC integration
- ✅ **CRUD Operations** - Complete contact management
- ✅ **Filtering & Pagination** - Advanced query capabilities
- ✅ **Validation** - Zod schemas for all inputs
- ✅ **Error Handling** - Proper tRPC error responses
- ✅ **CORS** - Configured for frontend integration
- ✅ **Database** - PostgreSQL with Drizzle ORM
- ✅ **Seeded Data** - Sample contacts for development