<script lang="ts">
	import { resolve } from '$app/paths';
	import { APP_NAME } from '$lib/config.js';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	type Props = {
		isIncomeDataReady: boolean;
		saveWallet: () => void;
	};

	let { isIncomeDataReady, saveWallet }: Props = $props();
</script>

<header class="balance-header">
	<a class="brand" href={resolve('/')} aria-label="Back to Secure Money Tracker">
		<span class="brand-mark" aria-hidden="true">
			<img src="/favicon.png" alt="" />
		</span>
		<span><strong>{APP_NAME}</strong></span>
	</a>
	<div class="header-actions">
		<button class="save-button" type="button" disabled={!isIncomeDataReady} onclick={saveWallet}>
			<span>💾</span>
			<span>Export to file</span>
		</button>
		<span class="settings-button" aria-hidden="true">⚙</span>
		<ThemeSwitcher />
	</div>
</header>
