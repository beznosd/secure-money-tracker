<script lang="ts">
	type Props = {
		message: string;
		ondismiss: () => void;
		dismissLabel?: string;
	};

	let { message, ondismiss, dismissLabel = 'Dismiss warning' }: Props = $props();
</script>

<aside class="data-loss-notice" role="note">
	<span class="data-loss-notice-icon" aria-hidden="true">⚠</span>
	<p>
		<strong>{message}</strong>
	</p>
	<button
		class="data-loss-notice-close"
		type="button"
		aria-label={dismissLabel}
		onclick={ondismiss}>
		<span class="close-button-icon" aria-hidden="true"></span>
	</button>
</aside>
