import { new_id } from '../../../utils/id/index.js';

import { sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user_table = pgTable('user', {
	id: text('id')
		.$default(function () {
			return new_id('user');
		})
		.primaryKey(),
	email: text('email').notNull().unique(),
	hashed_password: text('hashed_password'),
	active: boolean('active').default(false),
	created_at: timestamp('created_at').default(sql`now()`)
});

export const session_table = pgTable('session', {
	id: text('id')
		.$defaultFn(function () {
			return new_id('session');
		})
		.primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export function lower(email) {
	return sql`lower(${email})`;
}
