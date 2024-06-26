export interface IProduct {
	id: number;
	title: string;
	description: string;
	barcode: string;
	grams: number;
	stock: number;
	sku: string;
	price: number;
	image?: string;
}

export class Product implements IProduct {
	barcode: string;
	description: string;
	grams: number;
	id: number;
	image: string;
	price: number;
	sku: string;
	stock: number;
	title: string;

	constructor(public data: IProduct | null) {
		if (data) {
			this.barcode = data.barcode;
			this.description = data.description;
			this.grams = data.grams;
			this.id = data.id;
			this.image = data.image || '';
			this.price = data.price;
			this.sku = data.sku;
			this.stock = data.stock;
			this.title = data.title;
		}
	}

}