import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

import { schema } from './utils/index.js';

import { db } from '$lib/server/db/index.js';
import { lower, user_table } from '$lib/server/db/schema/index.js';
import { Argon2id } from '$lib/utils/id/password/index.js';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	return { form: await superValidate(valibot(schema)) };
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, valibot(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const existing_user = (
			await db
				.select()
				.from(user_table)
				.where(eq(lower(user_table.email), form.data.email.toLowerCase()))
				.limit(1)
		)[0];
		if (existing_user) {
			return fail(400, { form, message: 'User with that email already exists' });
		}
		const hashed_password = await new Argon2id().hash(form.data.password);
		await db.insert(user_table).values({
			email: form.data.email.toLowerCase(),
			hashed_password
		});
		return { form, message: 'User successfully created' };
	}
};
