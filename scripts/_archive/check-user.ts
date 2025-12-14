import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Check users table
  const users = await sql`SELECT id, email, name, role, stackauth_id FROM users ORDER BY id DESC LIMIT 10`;
  console.log('\nRecent users in database:');
  users.forEach((u: any) => console.log(`  - ID: ${u.id}, Email: ${u.email}, Role: ${u.role}, StackAuth: ${u.stackauth_id?.substring(0, 20)}...`));

  // Check specific user by email
  const specificUser = await sql`SELECT * FROM users WHERE email = 'info@staycoolairco.nl'`;
  console.log('\n\nUser info@staycoolairco.nl:');
  if (specificUser.length > 0) {
    console.log(JSON.stringify(specificUser[0], null, 2));
  } else {
    console.log('  NOT FOUND');
  }
}

main().catch(console.error);
