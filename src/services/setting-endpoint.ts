export const getBaseUri = (uri: string): string => {
	return `${ import.meta.env.VITE_BASE_URL }/${ uri }`;
};

export const getApiUri = (uri: string): string => {
	return `${ import.meta.env.VITE_API_V1_URL }/${ uri }`;
};

/**
 * Object with all the endpoints
 */
export const settingsUri = {
	products: {
		base: getApiUri('products'),
		getAll: getBaseUri('products/all')
	},
	user: {
		auth: getBaseUri('auth/user')
	}
};