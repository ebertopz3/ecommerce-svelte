import { writable } from 'svelte/store';

export const auth = writable({
	token: null,
	isAuthenticated: false
});

export function login(token) {
	auth.set({
		token,
		isAuthenticated: true
	});
}

export function logout() {
	auth.set({
		token: null,
		isAuthenticated: false
	});
}
