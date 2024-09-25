import { DATABASE_URL } from '$env/static/private';
import pkg from 'pg';

const { Pool } = pkg;

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

function get_config() {
	// @type import("pg").PoolConfig
	const object = {
		connectionString: DATABASE_URL
	};
	return object;
}

export const pool = new Pool(get_config());
export const db = drizzle(pool);
await migrate(db, { migrationsFolder: 'drizzle' });
