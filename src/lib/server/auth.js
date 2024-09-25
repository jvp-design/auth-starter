import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

import { dev } from '$app/environment';
import { db } from '$lib/server/db/index.js';
import { session_table, user_table } from '$lib/server/db/schema/index.js';
import { Lucia } from 'lucia';

const adapter = new DrizzlePostgreSQLAdapter(db, session_table, user_table);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	}
});
