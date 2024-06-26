<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Modal from '$lib/components/Modal.svelte';

	import { message, resetMessage } from '$lib/stores/message';

	let title = '';
	let isOpen = false;
	let messageModal = '';
	let errorMessage = false;
	message.subscribe((msg) => {
		title = msg.title;
		isOpen = msg.isOpen;
		messageModal = msg.message;
		errorMessage = msg.type === 'error';
	});

	function closeModal() {
		isOpen = false;
		resetMessage();
	}
</script>
<Nav />

<slot />

<Modal {isOpen} viewButton="{true}" {closeModal}>
	<div class=" flex flex-col justify-center justify-items-center items-center w-full">
		{#if errorMessage}
			<p class="text-2xl font-bold my-3 text-red-600">{title}</p>
		{/if}
		{#if !errorMessage}
			<p class="text-2xl font-bold my-3 text-green-600">{title}</p>
		{/if}
		<p class="font-bold my-3">{messageModal}</p>
	</div>
</Modal>