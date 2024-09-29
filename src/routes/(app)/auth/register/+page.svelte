<script>
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	import { schema } from './utils/index.js';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	export let data;

	const form = superForm(data.form, {
		validators: valibotClient(schema),
		onResult: (res) => {
			console.log('res', res);
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Register</Card.Title>
		<Card.Description>Sign up for my super cool app</Card.Description>
	</Card.Header>
	<form method="POST" use:enhance>
		<Card.Content>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Label>Email</Label>
					<Input {...attrs} type="email" bind:value={$formData.email} />
				</Form.Control>
				<Form.Description>Pls enter email</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Content>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Label>Password</Label>
					<Input {...attrs} type="password" bind:value={$formData.password} />
				</Form.Control>
				<Form.Description>Pls enter password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Content>
			<Form.Field {form} name="confirm_password">
				<Form.Control let:attrs>
					<Label>Confirm Password</Label>
					<Input {...attrs} type="password" bind:value={$formData.confirm_password} />
				</Form.Control>
				<Form.Description>Pls confirm password</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">Register</Button>
		</Card.Footer>
	</form>
</Card.Root>
