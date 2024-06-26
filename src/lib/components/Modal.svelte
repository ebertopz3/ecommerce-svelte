<script lang="ts">
	export let isOpen: boolean;
	export let closeModal: () => void;
	export let viewButton: boolean = false;
</script>

<!-- MODAL -->
<div class="fixed z-10 inset-0 flex items-center justify-center " style="display: {isOpen ? 'block' : 'none'}" >
	<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
	<div class="w-full flex items-center justify-center">
		<!-- Modal panel -->
		<div class="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4">
			{#if !viewButton}
			<div class="w-full flex px-4 py-2 justify-end">
				<button class="text-lg leading-6 font-medium text-gray-900" on:click={closeModal}>
					cerrar
				</button>
			</div>
			{/if}
			<!-- Content Elements Modal -->
			<div class="prose max-w-screen-md p-6 overflow-y-auto"
					 style="max-height: 70vh; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 0.375rem; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);">
				<slot />
			</div>
			<!--/ Content Elements Modal -->

			{#if viewButton}
				<div class="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
					<button
						on:click={closeModal}
						type="button"
						class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm">
						Accept
					</button>
				</div>
			{/if}
		</div>
		<!--/ Modal panel -->
	</div>

</div>
<!--/ MODAL -->


