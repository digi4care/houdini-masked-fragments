import { error } from '@sveltejs/kit'; // Zorg ervoor dat je de error functie importeert
import type { PageLoad } from './$types';

import { load_GetProductsMaskingTest } from '$houdini';

export const load: PageLoad = async (event) => {
	try {
		return {
			...(await load_GetProductsMaskingTest({
				event
			}))
		};
	} catch (e) {
		// Log de error voor debugging doeleinden
		console.error('Error tijdens het laden van de pagina data:', e);

		// Werpt een error 500
		throw error(500, 'Serverfout: Kon de pagina niet laden');
	}
};
