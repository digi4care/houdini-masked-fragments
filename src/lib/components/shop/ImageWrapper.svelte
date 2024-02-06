<script lang="ts">
	import { fragment, graphql } from '$houdini';

	export let source;
	export let priority: boolean;

	import { Image } from '@unpic/svelte';
	import fallbackImage from '@/lib/assets/placeholders/woocommerce-placeholder-400x300.png.webp';

	$: thumbnailImageFields = fragment(
		source,
		graphql(`
			fragment MyThumbnailImageFields on MediaItem {
				id
				sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
				altText
			}
		`)
	);

	const sourceUrl: string = $thumbnailImageFields?.sourceUrl || fallbackImage;
	const altText: string = $thumbnailImageFields?.altText;
	// console.log($thumbnailImageFields);
</script>

<picture>
	<Image src={sourceUrl} width={300} height={400} alt={altText} {priority} />
</picture>
