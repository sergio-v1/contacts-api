import 'dotenv/config';
import { db } from './client';
import { contactsTable } from './schema';

const seedContacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Developer',
    status: 'active' as const,
    dateOfBirth: '1990-05-15',
    notes: 'Senior full-stack developer',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    role: 'Designer',
    status: 'active' as const,
    dateOfBirth: '1992-08-22',
    notes: 'UX/UI specialist',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@company.com',
    phone: '+1 (555) 456-7890',
    role: 'Manager',
    status: 'inactive' as const,
    dateOfBirth: '1985-03-10',
    notes: 'Product manager',
  },
  {
    firstName: 'Alice',
    lastName: 'Wilson',
    email: 'alice.wilson@company.com',
    phone: '+1 (555) 321-0987',
    role: 'Developer',
    status: 'active' as const,
    dateOfBirth: '1988-11-30',
    notes: 'Frontend specialist',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@company.com',
    phone: '+1 (555) 654-3210',
    role: 'Analyst',
    status: 'active' as const,
    dateOfBirth: '1993-07-20',
    notes: 'Data analyst',
  },
  {
    firstName: 'Diana',
    lastName: 'Martinez',
    email: 'diana.martinez@company.com',
    phone: '+1 (555) 789-0123',
    role: 'Designer',
    status: 'active' as const,
    dateOfBirth: '1991-12-05',
    notes: 'Graphic designer',
  },
  {
    firstName: 'Eva',
    lastName: 'Davis',
    email: 'eva.davis@company.com',
    phone: '+1 (555) 234-5678',
    role: 'Manager',
    status: 'active' as const,
    dateOfBirth: '1987-09-18',
    notes: 'Engineering manager',
  },
  {
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank.miller@company.com',
    phone: '+1 (555) 345-6789',
    role: 'Developer',
    status: 'inactive' as const,
    dateOfBirth: '1989-04-14',
    notes: 'Backend developer',
  },
  {
    firstName: 'Grace',
    lastName: 'Lee',
    email: 'grace.lee@company.com',
    phone: '+1 (555) 567-8901',
    role: 'Analyst',
    status: 'active' as const,
    dateOfBirth: '1994-01-28',
    notes: 'Business analyst',
  },
  {
    firstName: 'Henry',
    lastName: 'Taylor',
    email: 'henry.taylor@company.com',
    phone: '+1 (555) 678-9012',
    role: 'Coordinator',
    status: 'active' as const,
    dateOfBirth: '1986-06-11',
    notes: 'Project coordinator',
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding database...');
    
    // Insert seed data
    const insertedContacts = await db
      .insert(contactsTable)
      .values(seedContacts)
      .returning();
    
    console.log(`✅ Successfully inserted ${insertedContacts.length} contacts`);
    
    // Show first few contacts
    console.log('\n📋 Sample contacts:');
    insertedContacts.slice(0, 3).forEach(contact => {
      console.log(`- ${contact.firstName} ${contact.lastName} (${contact.role})`);
    });
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seed();