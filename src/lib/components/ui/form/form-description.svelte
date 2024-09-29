<script>
	import { cn } from '$lib/utils/index.js';
	import * as FormPrimitive from 'formsnap';
	let className = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn('text-sm text-muted-foreground', className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
