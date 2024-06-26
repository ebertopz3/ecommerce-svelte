<script lang="ts">
	import { type IProduct, Product } from '../../interfaces/product';
	import { get } from 'svelte/store';
	import { product, resetProduct } from '$lib/stores/product';
	import UploadImage from '$lib/components/UploadImage.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { createProduct, updateProduct } from '../../services/product';
	import { setMessage } from '$lib/stores/message';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let isEdit = false;
	export let closeModal: () => void;
	let newProduct = new Product();


	let imgBase64 = '';

	function handleImageLoaded(event) {
		newProduct.image = event.detail.base64;
		imgBase64 = event.detail.base64;
	}

	async function onSaveProduct() {
		const title = isEdit ? 'Se actualizo el Producto' : 'Se guardo el Producto';
		try {
			const result = isEdit ? await updateProduct(newProduct.id, newProduct) : await createProduct(newProduct);
			if (result.success) {
				dispatch('reloadProducts', { reload: true });
				closeModal();
			}

			setMessage({
				title: result.success ? title : 'Se genero un error',
				message: result.message,
				type: result.success ? 'success' : 'error',
				isOpen: true
			});
		} catch (e) {
			setMessage({
				title: 'Se genero un error',
				message: e.message ? e.message : 'Error en la acción',
				type: 'error',
				isOpen: true
			});
		}

	}


	onMount(() => {
		const editProduct = get(product);
		if (isEdit) {
			newProduct = new Product(editProduct);
			imgBase64 = editProduct.image;
		}
	});
	onDestroy(() => {
		newProduct = new Product();
		if (isEdit) {
			resetProduct();
		}
	});
</script>

<div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
	<div class="-mx-3 md:flex mb-6">
		<div class="md:w-1/2 px-3 mb-6 md:mb-0">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
				Nombre
			</label>
			<input bind:value={newProduct.title}
						 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
						 type="text">
		</div>
		<div class="md:w-1/2 px-3">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-stock">
				Stock
			</label>
			<input bind:value={newProduct.stock}
						 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
						 id="grid-stock" type="number">
		</div>
	</div>
	<div class="-mx-3 md:flex mb-6">
		<div class="md:w-full px-3">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-description">
				Descripción
			</label>
			<input
				bind:value={newProduct.description}
				class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gre rounded py-3 px-4 mb-3"
				id="grid-description" />

		</div>
	</div>
	<div class="-mx-3 md:flex mb-2">
		<div class="md:w-1/2 px-3 mb-6 md:mb-0">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-price">
				Precio
			</label>
			<input bind:value={newProduct.price}
						 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
						 id="grid-price" type="number" placeholder="Albuquerque">
		</div>
		<div class="md:w-1/2 px-3">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-sku">
				Referencia
			</label>
			<div class="relative">
				<input bind:value={newProduct.sku}
							 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							 id="grid-sku" type="text">
			</div>
		</div>
		<div class="md:w-1/2 px-3">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-barcode">
				Código de Barra
			</label>
			<input bind:value={newProduct.barcode}
						 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
						 id="grid-barcode" type="text">
		</div>
	</div>

	<div class="-mx-3 md:flex mb-2">
		<div class="md:w-1/2 px-3 mb-6 md:mb-0">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-grams">
				Peso
			</label>
			<input bind:value={newProduct.grams}
						 class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
						 id="grid-grams" type="number" placeholder="Albuquerque">
		</div>
		<div class="md:w-1/2 px-3 ">
			<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="file_input">
				Imagen
			</label>
			<UploadImage on:imageLoaded={handleImageLoaded} />
		</div>
		<div class="md:w-1/2 px-3 flex justify-center border border-gray-400 rounded-2xl">
			{#if imgBase64}
				<img class="h-[90px]" alt="Imagen Producto" src="{imgBase64}">
			{/if}
		</div>
	</div>
	<div class="-mx-3 md:flex mb-4 pt-6">
		<button
			on:click={onSaveProduct}
			class=" block w-full select-none rounded-lg bg-gray-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
			Guardar
		</button>
	</div>

</div>