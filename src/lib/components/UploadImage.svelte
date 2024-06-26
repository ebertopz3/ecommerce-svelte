<script lang="ts">
	import { createEventDispatcher } from 'svelte';


	const dispatch = createEventDispatcher();

	let fileInput;

	function triggerFileInput() {
		fileInput.click();
	}

	/**
	 * @description validate img charge
	 * @param event
	 */
	async function handleFileChange(event) {
		const file = event.target.files[0];
		if (file) {
			const acceptedImageTypes = ['jpg', 'jpeg', 'png'];
			const extension = file.name.split('.').pop().toLowerCase();
			const valid = acceptedImageTypes.includes(extension);
			if (valid) {
				const base64 = await convertToBase64(file);
				dispatch('imageLoaded', { base64 });
			}
		}
	}

	/**
	 * @description convert file to base64
	 * @param file
	 */
	function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}
</script>

<button
	on:click={triggerFileInput}
	class=" block w-full select-none rounded-lg bg-gray-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
	type="button"
	data-ripple-light="true"
>
	Cargar
</button>
<input type="file" accept="image/*" bind:this={fileInput} on:change={handleFileChange} style="display: none;" />