<script lang="ts">
	import ContainerCards from '$lib/components/ContainerCards.svelte';
	import CardProduct from '$lib/components/CardProduct.svelte';
	import type { IProduct } from '../interfaces/product';
	import type { IApiResponse } from '../interfaces/api-response';
	import { getAllProducts } from '../services/product';
	import TitleProducts from '$lib/components/TitleProducts.svelte';
	import { onMount } from 'svelte';

	const limit = 10;
	let page = 0;
	let products: IProduct[] = [];
	let disableButton = false;
	const setProducts = (res: IApiResponse<IProduct[]>): string => {
		if (!res.success || !res?.data?.length) {
			disableButton = true;
			return '';
		}
		products = [...products, ...res.data];
		page += 1;
		return '';
	};

	async function getProductsPage() {
		try {
			const rest = await getAllProducts(limit, page);
			setProducts(rest);
		} catch (e) {
			return;
		}
	}

	onMount(async () => {
		await getProductsPage();
	});
</script>

<TitleProducts {products} />

<ContainerCards>
	{#each products as product (product.id)}
		<CardProduct { product } />
	{/each}
</ContainerCards>

<div class="w-full flex flex-row justify-center pb-5">
	<button
		class="border-amber-200 cursor-pointer px-5 py-2 bg-gray-400 rounded-2xl shadow-md hover:shadow-amber-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
		on:click={getProductsPage}
		disabled="{disableButton}">
		<span>Ver mas.</span>
		<svg class="ml-2 w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				 xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M13 5l7 7-7 7M5 5l7 7-7 7">
			</path>
		</svg>
	</button>
</div>