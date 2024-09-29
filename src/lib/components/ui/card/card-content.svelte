<script>
	import { cn } from '$lib/utils/index.js';
	let className = undefined;
	export { className as class };
</script>

<div class={cn('p-6', className)} {...$$restProps}>
	<slot />
</div>
