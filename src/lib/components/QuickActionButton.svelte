<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		children: Snippet;
		class?: string;
		disabled?: boolean;
		onclick?: HTMLButtonAttributes['onclick'];
	};

	let { label, children, class: className = '', disabled = false, onclick }: Props = $props();
</script>

<button class={`quick-action ${className}`} type="button" {disabled} {onclick}>
	<span class="quick-action-icon" aria-hidden="true">
		{@render children()}
	</span>
	<span>{label}</span>
</button>
