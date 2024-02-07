import { error } from '@sveltejs/kit'; // Zorg ervoor dat je de error functie importeert
import type { PageLoad } from './$types';

import { load_GetProductsMaskingTest } from '$houdini';
import { getProductsWhereArgs } from '@/lib/config/connectionWhereArgs';
import woocommerceSettings from '@/lib/config/webshop';

export const load: PageLoad = async (event) => {
	try {
		const nextPage =
			woocommerceSettings.itemsPerPage.shop || woocommerceSettings.itemsPerPage.default;
		return {
			...(await load_GetProductsMaskingTest({
				event,
				variables: {
					first: nextPage,
					where: getProductsWhereArgs
				}
			}))
		};
	} catch (e) {
		// Log de error voor debugging doeleinden
		console.error('Error tijdens het laden van de pagina data:', e);

		// Werpt een error 500
		throw error(500, 'Serverfout: Kon de pagina niet laden');
	}
};
