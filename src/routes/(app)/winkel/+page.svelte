<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// Destructure
	let { GetProductsMaskingTest, GetProductsCount, GetShopCategories, GetShopColors } = data;
	$: ({ GetProductsMaskingTest, GetProductsCount, GetShopCategories, GetShopColors } = data);

	// $: console.log($GetShopCategories.data?.productCategories?.edges);
	// $: console.log($GetShopColors.data?.allPaColor?.edges);
	// $: console.log($GetProductsMaskingTest.data?.products?.nodes);

	const categories = $GetShopCategories.data?.productCategories?.edges;
	const productCount = $GetProductsCount.data?.products?.found || 0;
	const products = $GetProductsMaskingTest.data?.products?.nodes;

	const hasPreviousPage = $GetProductsMaskingTest.data?.products?.pageInfo.hasPreviousPage;
	const hasNextPage = $GetProductsMaskingTest.data?.products?.pageInfo.hasNextPage;
	const startCursor = $GetProductsMaskingTest.data?.products?.pageInfo.startCursor;
	const endCursor = $GetProductsMaskingTest.data?.products?.pageInfo.endCursor;

	/**
	 * ShadCN
	 */
	// Utils
	import { cn } from '@/lib/shadcn/utils/ui';

	// Components
	import { Button } from '@/lib/shadcn/ui/button';

	/**
	 * My Components
	 */
	import ProductCategoriesList from '@/lib/components/shop/ProductCategoriesList.svelte';
	import ProductCard from '@/lib/components/shop/ProductCard.svelte';

	/**
	 * Debug
	 */
	// $: console.log(products);
</script>

<ProductCategoriesList {categories} />

<!-- NOTICE: This if condition is Not really needed-->
{#if $GetProductsMaskingTest.fetching}
	<strong>Still Fetching data</strong>
{:else}
	<h1><stong class="product__list">Products</stong></h1>

	<div class="mb-4 mt-auto flex justify-start gap-x-2 text-sm">
		<Button
			disabled={!$GetProductsMaskingTest.pageInfo.hasPreviousPage}
			on:click={async () => GetProductsMaskingTest.loadPreviousPage({last: 12})}
			class={cn(
				hasPreviousPage
					? 'text-primary-foreground'
					: 'pointer-events-none text-gray-400 opacity-50',
				'rounded-md text-sm font-medium transition-colors',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'h-9 bg-primary px-4 py-2 shadow hover:bg-primary/90'
			)}
			aria-label="Previous page"
		>
			Previous
		</Button>

		<Button
			disabled={!$GetProductsMaskingTest.pageInfo.hasNextPage}
			on:click={async () => GetProductsMaskingTest.loadNextPage({first: 12})}
			class={cn(
				hasNextPage
					? 'text-primary-foreground'
					: 'pointer-events-none text-gray-400 opacity-50',
				'ml-auto rounded-md text-sm font-medium transition-colors',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'h-9 bg-primary px-4 py-2 shadow hover:bg-primary/90'
			)}
			aria-label="Next page"
		>
			Next
		</Button>
	</div>
	<p class="mb-4 font-semibold">
		Showing {products?.length} of {productCount || products?.length} items
	</p>
	<div class="mb-8 flex flex-wrap justify-center gap-8 md:justify-start">
		{#if products}
			{#each products as product, index (product.id)}
				<ProductCard
					className="w-80 grow md:w-40 md:basis-1/4"
					{product}
					priority={index < 8}
				/>
			{/each}
		{/if}
	</div>
	<div class="mb-4 mt-auto flex justify-start gap-x-2 text-sm">
		<Button
			disabled={!$GetProductsMaskingTest.pageInfo.hasPreviousPage}
			on:click={async () => GetProductsMaskingTest.loadPreviousPage({last: 20})}
			class={cn(
				hasPreviousPage
					? 'text-primary-foreground'
					: 'pointer-events-none text-gray-400 opacity-50',
				'rounded-md text-sm font-medium transition-colors',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'h-9 bg-primary px-4 py-2 shadow hover:bg-primary/90'
			)}
			aria-label="Previous page"
		>
			Previous
		</Button>

		<Button
			disabled={!$GetProductsMaskingTest.pageInfo.hasNextPage}
			on:click={async () => GetProductsMaskingTest.loadNextPage({first: 10})}
			class={cn(
				hasNextPage
					? 'text-primary-foreground'
					: 'pointer-events-none text-gray-400 opacity-50',
				'ml-auto rounded-md text-sm font-medium transition-colors',
				'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				'h-9 bg-primary px-4 py-2 shadow hover:bg-primary/90'
			)}
			aria-label="Next page"
		>
			Next
		</Button>
	</div>
{/if}
