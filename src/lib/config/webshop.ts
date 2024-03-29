// src/lib/config/webshop.ts
import type { WoocommerceSettings } from '@/types/woocommerce';

const woocommerceSettings: WoocommerceSettings = {
	images: {
		productpage: {
			width: 600,
			height: 600
		},
		taxonomy_pages: {
			width: 300,
			height: 300
		}
	},
	itemsPerPage: {
		default: 12,
		shop: 12
	}
};

export { woocommerceSettings as default };
