// ESM-friendly loader for the CJS knexfile
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import knex from 'knex';

// Load the CJS knexfile (so the CLI/ESM mismatch can’t bite us)
const config = require('../knexfile.cjs');

async function main() {
  const db = knex(config);
  try {
    console.log('Connecting to DB...');
    await db.raw('select 1');
    console.log('✅ DB connection OK');

    console.log('Running migrations...');
    const [batchNo, log] = await db.migrate.latest();
    console.log(`✅ Migrations complete. Batch ${batchNo}`);
    if (log && log.length) {
      console.log('Files run:');
      for (const f of log) console.log(' -', f);
    } else {
      console.log('No migrations to run.');
    }

    console.log('Checking for users table...');
    const check = await db.raw(`select to_regclass('public.users') as exists`);
    console.log('users table:', check.rows[0].exists ? 'FOUND' : 'MISSING');
  } catch (e) {
    console.error('❌ Migration error:', e.message);
    console.error(e);
  } finally {
    await db.destroy();
  }
}

main();
