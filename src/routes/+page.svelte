<script>
	/**
	 * @type {{attempt: number; status: number; text: string}[]}
	 */
	let results = $state([]);
	let is_running = $state(false);

	async function test_rate_limit() {
		is_running = true;
		results = [];

		for (let i = 0; i < 15; i++) {
			const res = await fetch('/api/test-rate-limit');
			results.push({
				attempt: i + 1,
				status: res.status,
				text: await res.text()
			});
		}
		is_running = false;
	}
</script>

<button onclick={test_rate_limit} disabled={is_running}>Test Rate Limit</button>

{#if results.length > 0}
	<h2>Results</h2>
	<ul>
		{#each results as { attempt, status, text }}
			<li>Attempt {attempt}: Status {status} - {text}</li>
		{/each}
	</ul>
{/if}

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.600);
	}
</style>
