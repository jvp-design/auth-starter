import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
	IP: [10, 'h']
});

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const is_limited = await limiter.isLimited(event);

	if (is_limited) {
		return new Response('Rate limit exceeded', { status: 429 });
	}

	return new Response('Request allowed', { status: 200 });
}
