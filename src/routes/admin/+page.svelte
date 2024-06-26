<script lang="ts">
	import { get } from 'svelte/store';
	import { auth } from '$lib/stores/auth';
	import { getAllProducts } from '../../services/product';
	import type { IProduct } from '../../interfaces/product';
	import type { IApiResponse } from '../../interfaces/api-response';
	import TitleProducts from '$lib/components/TitleProducts.svelte';
	import ListProducts from '$lib/components/ListProducts.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormProduct from '$lib/components/FormProduct.svelte';

	const { isAuthenticated } = get(auth);
	let products: IProduct[] = [];
	let isOpen = false;
	const setProducts = (res: IApiResponse<IProduct[]>): string => {
		if (res.success) {
			products = res?.data;
		}
		return '';
	};


	function openModal() {
		isOpen = true;
	}

	/**
	 * @description close modal
	 */
	function closeModal() {
		isOpen = false;
	}

	function reload(data: { reload: boolean }) {
		console.log('reload', data);
		if (data.detail.reload) {
			getAllProducts().then((result) => {
				if (result.success) {
					setProducts(result);
				}
			});
		}
	}
</script>
{#await getAllProducts() then data}
	{
		setProducts(data)
	}
{/await}


{#if isAuthenticated}
	<TitleProducts {products} />
	<div class="w-full flex flex-row justify-end px-4">
		<button on:click={openModal}
						class="border-amber-200 cursor-pointer px-5 py-2 bg-gray-400 rounded-2xl shadow-md hover:shadow-amber-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
			Crear Producto
		</button>
	</div>
	<ListProducts on:reloadProducts={reload} {products} />
	<Modal {isOpen} {closeModal}>
		<FormProduct on:reloadProducts={reload} isEdit="{false}" {closeModal} />
	</Modal>
{/if}
