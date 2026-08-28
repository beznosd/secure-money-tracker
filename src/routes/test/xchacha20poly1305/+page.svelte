<script lang="ts">
	import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
	import { randomBytes } from '@noble/ciphers/utils.js';
	import { scrypt } from '@noble/hashes/scrypt.js';
	import { tick } from 'svelte';

	let password = $state('');
	let selectedFile = $state<File | null>(null);
	let isEncrypting = $state(false);
	let message = $state('');
	let isError = $state(false);

	function chooseFile(event: Event) {
		selectedFile = (event.currentTarget as HTMLInputElement).files?.[0] ?? null;
		message = '';
		isError = false;
	}

	async function encryptFile(event: SubmitEvent) {
		event.preventDefault();
		if (!selectedFile || !password || isEncrypting) return;

		isEncrypting = true;
		isError = false;
		message = 'Deriving key and encrypting…';
		await tick();

		let key: Uint8Array | undefined;

		try {
			const salt = randomBytes(32);
			const nonce = randomBytes(24);

			key = scrypt(password, salt, {
				N: 2 ** 17, // iterations count, CPU/memory cost parameter
				r: 8, // block size
				p: 1, // parallelization factor, JS doesn't support parallelization
				dkLen: 32, // byte length of the derived key (256 bits)
				maxmem: 128 * 8 * (2 ** 17 + 1 + 1)
			});

			const plaintext = new Uint8Array(await selectedFile.arrayBuffer());
			const startedAt = performance.now();
			xchacha20poly1305(key, nonce).encrypt(plaintext);
			const encryptionTime = performance.now() - startedAt;

			message = `Encryption time: ${encryptionTime.toFixed(2)} ms`;
		} catch (error) {
			isError = true;
			message = error instanceof Error ? error.message : 'Encryption failed.';
		} finally {
			key?.fill(0);
			isEncrypting = false;
		}
	}
</script>

<svelte:head>
	<title>XChaCha20-Poly1305 encryption test</title>
</svelte:head>

<main>
	<h1>XChaCha20-Poly1305 file encryption</h1>
	<p>Test page. Encryption runs locally in your browser.</p>

	<form onsubmit={encryptFile}>
		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			autocomplete="new-password"
			bind:value={password}
			required
		/>

		<label for="file">File</label>
		<input id="file" type="file" onchange={chooseFile} required />

		<button type="submit" disabled={isEncrypting}>
			{isEncrypting ? 'Encrypting…' : 'Encrypt'}
		</button>
	</form>

	{#if message}
		<p class:error={isError} role={isError ? 'alert' : 'status'}>{message}</p>
	{/if}
</main>

<style>
	main {
		width: min(100% - 32px, 560px);
		margin: 48px auto;
		font-family: system-ui, sans-serif;
	}

	form {
		display: grid;
		gap: 10px;
		margin-top: 24px;
	}

	input,
	button {
		padding: 10px;
		font: inherit;
	}

	button {
		margin-top: 8px;
		cursor: pointer;
	}

	.error {
		color: #b42318;
	}
</style>
