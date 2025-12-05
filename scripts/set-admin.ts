import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon(process.env.DATABASE_URL!);

  // Update user to admin
  const result = await sql`
    UPDATE users
    SET role = 'admin', updated_at = NOW()
    WHERE email = 'info@staycoolairco.nl'
    RETURNING id, email, role
  `;

  console.log('Updated user to admin:');
  console.log(result[0]);
}

main().catch(console.error);
