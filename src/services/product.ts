import { deleteFetch, getFetch, postFetch, putFetch } from './base.services';
import type { IProduct } from '../interfaces/product';
import { settingsUri } from './setting-endpoint';

/**
 * Create a new product
 * @param data
 */
export const createProduct = (data: IProduct) => {
	return postFetch(settingsUri.products.base, data);
};

/**
 * Get all products
 * @param limit
 * @param page
 */
export const getAllProducts = (limit?: number, page?: number) => {
	let url: string = settingsUri.products.getAll;
	if (limit && (page || page === 0)) {
		url = `${ url }/${ limit }/${ page }`;
	}
	return getFetch<IProduct[]>(url);
};

/**
 * Get product by id
 * @param id
 */
export const getProductById = (id: string) => {
	return getFetch<IProduct>(`${ settingsUri.products.base }/${ id }`);
};

/**
 * Update product by id
 * @param id
 * @param data
 */
export const updateProduct = (id: string, data: IProduct) => {
	return putFetch(`${ settingsUri.products.base }/${ id }`, data);
};

/**
 * Delete product by id
 * @param id
 */
export const deleteProduct = (id: string) => {
	return deleteFetch(`${ settingsUri.products.base }/${ id }`);
};
