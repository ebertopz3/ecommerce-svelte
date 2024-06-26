<script lang="ts">
	import type { IProduct } from '../../interfaces/product';

	export let products: IProduct[] = [];
</script>

<div class="w-full flex flex-row justify-center pt-3">
	{#if products.length}
		<h1 class="font-bold text-2xl text-gray-800">Productos</h1>
	{/if}
	{#if !products.length}
		<h1 class="font-bold text-2xl text-gray-800">En este momento no hay productos</h1>
	{/if}
</div>