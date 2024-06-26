<script lang="ts">
	import type { IProduct } from '../../interfaces/product';
	import Modal from '$lib/components/Modal.svelte';
	import { deleteProduct, getProductById } from '../../services/product';
	import { setProduct } from '$lib/stores/product';
	import FormProduct from '$lib/components/FormProduct.svelte';
	import { createEventDispatcher } from 'svelte';
	import { setMessage } from '$lib/stores/message';

	const dispatch = createEventDispatcher();
	export let products: IProduct[] = [];

	let isOpen = false;

	function openModal(id: number) {
		getProductById(id).then((result) => {
			if (result.success) {
				setProduct(result.data);
				isOpen = true;
			}
		}).catch(() => {

		});
	}

	function onDelete(id: number) {
		deleteProduct(id).then((result) => {
			if (result.success) {
				emitReload();
			}
			setMessage({
				title: result.success ? 'Se elimino el Producto' : 'Se presento un Error',
				message: result.message,
				type: result.success ? 'success' : 'error',
				isOpen: true
			});
		}).catch((e) => {
			setMessage({
				title: 'Se presento un Error',
				message: e.message ? e.message : 'Error en la acción',
				type: 'error',
				isOpen: true
			});
		});
	}

	function emitReload() {
		dispatch('reloadProducts', { reload: true });
	}

	function closeModal() {
		isOpen = false;
	}
</script>
<div class="flex min-h-52 items-center justify-center">
	<div class="overflow-x-auto overflow-y-auto max-h-[80vh]">
		<table class="min-w-full bg-white shadow-md rounded-xl">
			<thead>
			<tr class="bg-blue-gray-100 text-gray-700">
				<th class="py-3 px-4 text-left">Nombre</th>
				<th class="py-3 px-4 text-left">Precio</th>
				<th class="py-3 px-4 text-left">Stock</th>
				<th class="py-3 px-4 text-left">Código</th>
				<th class="py-3 px-4 text-left">Edición</th>
				<th class="py-3 px-4 text-left">Eliminar</th>
			</tr>
			</thead>
			<tbody class="text-blue-gray-900">
			{#each products as product (product.id)}
				<tr class="border-b border-blue-gray-200 hover:bg-amber-100">
					<td class="py-3 px-4">{product.title}</td>
					<td class="py-3 px-4">{product.price}</td>
					<td class="py-3 px-4">{product.stock}</td>
					<td class="py-3 px-4">{product.barcode}</td>
					<td class="py-3 px-4 ">
						<div class="flex justify-center">
							<button class="font-medium text-blue-600 hover:text-blue-800" on:click={openModal(product.id)}>Edit
							</button>
						</div>
					</td>
					<td class="py-3 px-4">
						<div class="flex justify-center hover:bg-red-200 rounded-3xl">
							<button class="text-red-600 hover:text-red-700 font-bold" on:click={onDelete(product.id)}>X
							</button>
						</div>
					</td>
				</tr>
			{/each}
			{#if !products.length}
				<p class="font-bold text-2xl text-gray-600">No hay productos para mostrar</p>
			{/if}
			</tbody>
		</table>
	</div>
</div>

<Modal {isOpen} {closeModal}>
	{#if isOpen}
		<FormProduct on:reloadProducts={emitReload} isEdit="{true}" {closeModal} />
	{/if}
</Modal>