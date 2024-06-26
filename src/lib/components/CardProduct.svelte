<script lang="ts">
	import type { IProduct } from '../../interfaces/product';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let product: IProduct;
	let urlImg = 'https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

	function formatPrice(value) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(value);
	}

	onMount(() => {
		if (product.image) {
			urlImg = product.image;
		}
	});

	function redirectToLogin() {
		goto('/login');
	}
</script>


<article
	class="bg-white  p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-xl rounded-2xl cursor-pointer border max-w-xl">

	<div class="relative mb-4 rounded-2xl">
		<img
			class="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
			src="{urlImg}"
			alt="Imagen Producto">

		<button
			on:click={redirectToLogin}
			class="flex justify-center items-center bg-amber-100 text-amber-900 font-bold bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
		>
			Comprar Producto
			<svg class="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					 xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
			</svg>
		</button>
	</div>
	<div class="flex justify-between items-center w-full pb-4 mb-auto">
		<div class="flex items-center">
			<div class="flex flex-1">
				<div class="">
					<p class="text-md font-semibold ">Valor: {formatPrice(product.price)}</p>
					<p class="text-sm text-gray-500">{product.description}</p>
				</div>
			</div>
		</div>
		<div class="flex justify-end">
			<div class="text-sm flex items-center text-gray-500 ">
				{product.stock} en Stok
			</div>
		</div>
	</div>
	<h3 class="font-medium text-xl leading-8">
		{product.title}
	</h3>
	<div>
	</div>
</article>
