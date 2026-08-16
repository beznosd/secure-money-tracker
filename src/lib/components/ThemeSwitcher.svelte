<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(false);

	function applyTheme(theme: 'light' | 'dark') {
		isDark = theme === 'dark';
		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
	}

	function toggleTheme() {
		const nextTheme = isDark ? 'light' : 'dark';

		applyTheme(nextTheme);
		try {
			localStorage.setItem('secure-money-tracker-theme', nextTheme);
		} catch {
			// The selected theme still applies when browser storage is unavailable.
		}
	}

	onMount(() => {
		isDark = document.documentElement.dataset.theme === 'dark';
	});
</script>

<button
	class="theme-switcher"
	type="button"
	aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
	aria-pressed={isDark}
	title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
	onclick={toggleTheme}
>
	{#if isDark}
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="3.5" />
			<path
				d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.72 5.28l-1.42 1.42M6.7 17.3l-1.42 1.42M18.72 18.72l-1.42-1.42M6.7 6.7 5.28 5.28"
			/>
		</svg>
	{:else}
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20.4 15.4A8.5 8.5 0 0 1 8.6 3.6 8.5 8.5 0 1 0 20.4 15.4Z" />
		</svg>
	{/if}
</button>

<style>
	.theme-switcher {
		width: 48px;
		height: 48px;
		padding: 0;
		display: grid;
		place-items: center;
		flex: 0 0 48px;
		border: 1px solid #e1e6ea;
		border-radius: 50%;
		color: #172033;
		background: #fff;
		box-shadow: 0 5px 14px rgba(24, 41, 62, 0.08);
		cursor: pointer;
		transition:
			color 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.theme-switcher:hover {
		transform: translateY(-2px);
		border-color: #bed4c8;
		color: #11874d;
	}

	.theme-switcher:focus-visible {
		outline: 3px solid rgba(19, 168, 109, 0.3);
		outline-offset: 2px;
	}

	.theme-switcher svg {
		width: 23px;
		height: 23px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.9;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	:global(html[data-theme='dark']) .theme-switcher {
		color: #ffd66e;
		border-color: #34435a;
		background: #172236;
		box-shadow: 0 5px 16px rgba(0, 0, 0, 0.24);
	}

	:global(html[data-theme='dark']) .theme-switcher:hover {
		color: #ffe59c;
		border-color: #52647e;
	}

	@media (max-width: 620px) {
		.theme-switcher {
			width: 34px;
			height: 34px;
			flex-basis: 34px;
		}

		.theme-switcher svg {
			width: 18px;
			height: 18px;
		}
	}
</style>
