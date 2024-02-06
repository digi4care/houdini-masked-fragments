<script lang="ts">
	import type { _MyProductContentSmall } from '$houdini';
	import type { PageData } from './$types';
	export let data: PageData;

	// Destructure
	let { GetProductsMaskingTest } = data;
	$: ({ GetProductsMaskingTest } = data);

	const products = $GetProductsMaskingTest.data?.products?.nodes;

	/**
	 * My Components
	 */
	import ProductCard from '@/lib/components/shop/ProductCardTest.svelte';

	/**
	 * Debug
	 */
	// $: console.log(products);
</script>

<h1><stong class="product__list">Products</stong></h1>

<div class="mb-8 flex flex-wrap justify-center gap-8 md:justify-start">
	{#if products}
		{#each products as product, index (product.id)}
			<ProductCard
				{product}
				priority={index < 8}
			/>
		{/each}
	{/if}
</div>
