<script lang="ts">
	import type { IAuthResponse } from '../../interfaces/auth';
	import { authUser } from '../../services/auth';
	import type { IApiResponse } from '../../interfaces/api-response';
	import { login } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let isLoadingSignIn = false;
	let message: string = '';

	const handleClick = () => {
		if (!email || !password) {
			return;
		}
		isLoadingSignIn = true;
		authUser({
			email: email,
			password: password
		}).then(((resul: IApiResponse<IAuthResponse>) => {
			if (!resul.success) {
				message = resul.message;
				isLoadingSignIn = false;
			}
			login(resul?.data?.token);
			goto('/admin');
		}));
	};

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleClick();
		}
	}
</script>

<div class="bg-slate-300 flex justify-center items-center flex-col max-w-sm mx-auto mt-20 py-6 rounded-lg">
	<div class="form-control w-full max-w-xs">
		<label class="label" for="email">
			<span class="label-text text-gray-700">Correo de usuario</span>
		</label>
		<input
			on:keydown={handleKeydown}
			bind:value={email}
			id="email"
			type="email"
			placeholder="Email"
			class="input input-bordered rounded rounded-b-md h-8 fon w-full max-w-xs"
			name="email"
		/>
	</div>

	<div class="form-control w-full max-w-xs">
		<label class="label" for="password">
			<span class="label-text text-gray-700">Contraseña</span>
		</label>
		<input
			on:keydown={handleKeydown}
			bind:value={password}
			id="password"
			type="password"
			placeholder="Password"
			class="input input-bordered rounded rounded-b-md h-8 w-full max-w-xs"
			name="password"
		/>
	</div>


	{#if isLoadingSignIn}
		<span class="loading loading-spinner loading-sm" />
	{:else}
		<button type="button" class="btn mt-4 max-w-xs btn-primary text-gray-700 font-bold"
						on:click={handleClick}
						disabled={isLoadingSignIn}>
			<svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
				<!-- ... -->
			</svg>
			Iniciar Sesion
		</button>
	{/if}

	<p class="text-pink-900 font-bold">{message}</p>
</div>