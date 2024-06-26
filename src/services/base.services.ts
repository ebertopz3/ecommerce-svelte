import type { IApiResponse } from '../interfaces/api-response';
import { auth } from '$lib/stores/auth';
import { get } from 'svelte/store';

/**
 * Options for fetch request
 * @param method
 * @param data
 */
const optionsRequest = <M>(method: string, data?: M): RequestInit => {
	const authenticated = get(auth);
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${ authenticated.token }`
		}
	};
	if (data) {
		options.body = JSON.stringify(data);
	}
	return options;
};
/**
 * GET request to api with fetch no auth header
 * @param url
 */
export const getFetch = async <M>(url: string): Promise<IApiResponse<M>> => {
	return await fetch(
		url,
		optionsRequest('GET')
	).then((result) => result.json());
};

/**
 * POST request to api with fetch
 * @param url
 * @param data
 */
export const postFetch = async <M, D>(url: string, data: D): Promise<IApiResponse<M>> => {
	return await fetch(
		url,
		optionsRequest<D>('POST', data)
	).then((result) => result.json());
};

export const putFetch = async <M, D>(url: string, data: D): Promise<IApiResponse<M>> => {
	return await fetch(
		url,
		optionsRequest<D>('PUT', data)
	).then((result) => result.json());
};

export const deleteFetch = async <M>(url: string): Promise<IApiResponse<M>> => {
	return await fetch(
		url,
		optionsRequest('DELETE')
	).then((result) => result.json());
};