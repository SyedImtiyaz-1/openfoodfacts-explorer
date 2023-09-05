import { getProduct, getTaxo } from '$lib/api';
import type { Category } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load = (async ({ fetch, params }) => {
	const product = await getProduct(params.barcode, fetch);

	const categories = await getTaxo<Category>('categories', fetch);
	const labels = await getTaxo<Category>('labels', fetch);
	const brands = await getTaxo<Category>('brands', fetch);

	if (product.status === 'failure') {
		throw error(404, {
			message: 'Failure to load product',
			errors: product.errors
		});
	}

	return {
		state: product,
		categories,
		labels,
		brands
	};
}) satisfies PageLoad;
