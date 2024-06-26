<script lang="ts">
	import { page } from '$app/stores';
	import { logout, auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	$: currentRoute = $page.url.pathname;

	function handleLogout() {
		logout();
		goto('/login');
	}
</script>

<nav class="border-gray-400 bg-gray-200">
	<div class="flex flex-wrap items-center justify-center mx-auto p-4">
		{#if !$auth.isAuthenticated}
			<ul class="flex flex-row gap-4">
				<li class:active={currentRoute === '/'}>
					<a
						class="font-bold text-neutral-600 border border-gray-300 px-3 py-1 rounded-md hover:border-gray-600 hover:bg-amber-100"
						href="/">Home</a>
				</li>
				<li class:active={currentRoute === '/login'}>
					<a
						class="font-bold text-neutral-600 border border-gray-300 px-3 py-1 rounded-md hover:border-gray-600 hover:bg-amber-100"
						href="/login">Login</a>
				</li>
			</ul>
		{/if}
		{#if $auth.isAuthenticated}
			<button
				class="font-bold text-neutral-600 border border-gray-300 px-3 py-1 rounded-md hover:border-gray-600 hover:bg-amber-100"
				on:click={handleLogout}>
				Salir
			</button>
		{/if}
	</div>
</nav>