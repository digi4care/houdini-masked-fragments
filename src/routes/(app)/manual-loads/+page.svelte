<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// Destructure
	let { GetProductsMaskingTest } = data;
	$: ({ GetProductsMaskingTest } = data);

	const products = $GetProductsMaskingTest.data?.products?.nodes;

	const hasPreviousPage = $GetProductsMaskingTest.data?.products?.pageInfo.hasPreviousPage; // bool
	const hasNextPage = $GetProductsMaskingTest.data?.products?.pageInfo.hasNextPage; // bool
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
	import ProductCard from '@/lib/components/shop/ProductCard.svelte';
</script>

<!-- NOTICE: This if condition is Not really needed-->
{#if $GetProductsMaskingTest.fetching}
	<strong>Still Fetching data</strong>
{:else}
	<div class="container">
		<div class="flex justify-center py-16">
			<h1><stong class="product__list text-2xl">Products</stong></h1>
		</div>

		<div class="mb-4 mt-auto flex justify-start gap-x-2 text-sm">
			<Button
				disabled={!$GetProductsMaskingTest.pageInfo.hasPreviousPage}
				on:click={async () =>
					GetProductsMaskingTest.loadPreviousPage({ last: 10 })}
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
				on:click={async () =>
					GetProductsMaskingTest.loadNextPage({ first: 10 })}
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
				on:click={async () => GetProductsMaskingTest.loadPreviousPage({ last: 10 })}
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
				on:click={async () => GetProductsMaskingTest.loadNextPage({ first: 10 })}
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
	</div>
{/if}
