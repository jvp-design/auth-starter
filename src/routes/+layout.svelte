<script>
	import '../app.css';

	const { children } = $props();
</script>

<main class="h-screen bg-gray-500">
	{@render children()}
</main>
