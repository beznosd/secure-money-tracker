<script lang="ts">
	import './layout.css';

	const { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="A privacy-first money tracking app." />
</svelte:head>

{@render children()}
