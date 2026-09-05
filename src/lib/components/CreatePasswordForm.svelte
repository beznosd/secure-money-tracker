<script lang="ts">
	type Props = {
		appPassword?: string;
		confirmAppPassword?: string;
		appPasswordMessage: string;
		appPasswordMessageType: 'success' | 'error' | '';
		kdfKeyHex: string;
		onsubmit: (event: SubmitEvent) => void;
		oninput: () => void;
		ondismiss: () => void;
	};

	let {
		appPassword = $bindable(''),
		confirmAppPassword = $bindable(''),
		appPasswordMessage,
		appPasswordMessageType,
		kdfKeyHex,
		onsubmit,
		oninput,
		ondismiss
	}: Props = $props();
</script>

<section class="app-password-card" aria-labelledby="app-password-title">
	<header class="app-password-heading">
		<h2 id="app-password-title">Create password</h2>
		<button
			class="data-loss-notice-close app-password-close"
			type="button"
			aria-label="Dismiss password form"
			onclick={ondismiss}>
			<span class="close-button-icon" aria-hidden="true"></span>
		</button>
	</header>

	<aside class="app-password-notice" id="app-password-notice" role="note">
		<p>
			<strong>
				Needed to encrypt data stored in web browser and for encryption of exported files.
			</strong>
		</p>
	</aside>

	<form class="app-password-form" {onsubmit}>
		<div class="app-password-field">
			<input
				id="app-password"
				name="app-password"
				type="password"
				aria-label="Password"
				autocomplete="new-password"
				placeholder="Enter password"
				minlength="8"
				aria-describedby="app-password-notice app-password-feedback"
				aria-invalid={appPasswordMessageType === 'error'}
				bind:value={appPassword}
				{oninput}
				required />
		</div>

		<div class="app-password-field">
			<input
				id="confirm-app-password"
				name="confirm-app-password"
				type="password"
				aria-label="Confirm password"
				autocomplete="new-password"
				placeholder="Repeat password"
				minlength="8"
				aria-describedby="app-password-notice app-password-feedback"
				aria-invalid={appPasswordMessageType === 'error'}
				bind:value={confirmAppPassword}
				{oninput}
				required />
		</div>

		<button class="app-password-save" type="submit">Save</button>
	</form>

	<p
		class="app-password-feedback"
		class:success={appPasswordMessageType === 'success'}
		class:error={appPasswordMessageType === 'error'}
		id="app-password-feedback"
		aria-live="polite">
		{appPasswordMessage}
	</p>

	<p>KDF KEY: {kdfKeyHex}</p>
</section>
