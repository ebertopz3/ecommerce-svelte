import { writable } from 'svelte/store';
import type { IProduct } from '../../interfaces/product';

const defaultProduct: IProduct = {
	id: 0,
	price: 0,
	description: '',
	image: '',
	barcode: '',
	stock: 0,
	grams: 0,
	title: '',
	sku: ''
};
export const product = writable<IProduct>(defaultProduct);

export function setProduct(data: IProduct) {
	product.set(data);
}

export function resetProduct() {
	product.set(defaultProduct);
}