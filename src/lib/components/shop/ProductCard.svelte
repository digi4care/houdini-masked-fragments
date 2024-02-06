<script lang="ts">
	import ImageWrapper from './ImageWrapper.svelte';

	import type { ProductContentSmall } from '$houdini';
	import { fragment, graphql } from '$houdini';

	export let product: ProductContentSmall;
	export let priority: boolean;
	export let className: string;

	import * as C from '@/lib/shadcn/ui/card';
	import { cn } from '@/lib/shadcn/utils/ui';

	$: productTax = fragment(
		product,
		graphql(`
			fragment MyProductTaxonomies on Product {
				productCategories(first: 20) {
					nodes {
						id
						slug
						name
					}
				}
				productTags(first: 20) {
					nodes {
						id
						slug
						name
					}
				}
			}
		`)
	);
	$: productContentSmall = fragment(
		product,
		graphql(`
			fragment MyProductContentSmall on ProductUnion {
				id
				databaseId
				slug
				name
				type
				... on ProductUnion {
					shortDescription(format: RAW)
				}
				image {
					...MyThumbnailImageFields
				}
				... on ProductWithPricing {
					price
					regularPrice
					salePrice
				}
				... on InventoriedProduct {
					stockStatus
					stockQuantity
					soldIndividually
				}
			}
		`)
	);
</script>

<C.Root class={cn(className, 'flex flex-col')}>
	<C.Header class="p-4">
		<C.Title class="w-full truncate whitespace-nowrap font-serif text-base"
			>{$productContentSmall.name}</C.Title
		>
		<ImageWrapper source={productContentSmall} {priority} />
	</C.Header>
	<C.Content class="flex flex-col space-y-2 p-4">
		<p class="font-serif text-sm font-semibold">{$productContentSmall.price}</p>
	</C.Content>
	<C.Footer class="mt-auto p-4">
		<button class="add_to_cart">Toevoegen</button>
	</C.Footer>
</C.Root>
