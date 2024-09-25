import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema/postgres.js',
	out: './drizzle'
});
