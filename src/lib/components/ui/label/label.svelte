<script>
	import { cn } from '$lib/utils/index.js';
	import { Label as LabelPrimitive } from 'bits-ui';
	let className = undefined;
	export { className as class };
</script>

<LabelPrimitive.Root
	class={cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
	{...$$restProps}
	on:mousedown
>
	<slot />
</LabelPrimitive.Root>
