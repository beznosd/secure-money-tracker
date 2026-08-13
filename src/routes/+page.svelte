<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks.svelte';
</script>

<svelte:head>
	<title>Secure Money Tracker</title>
	<meta name="description" content="A privacy-first money tracking app." />
</svelte:head>

<main class="page-shell">
	<section class="hero" aria-labelledby="page-title">
		<div class="intro">
			<h1 id="page-title">Secure Money Tracker</h1>
			<p>Privacy first money tracking app.</p>
		</div>

		<div class="privacy-card">
			<article class="privacy-item">
				<span class="icon-badge green"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5c3.6 3.4 7.7 4.1 11.2 4.4v7.8c0 6.3-4.5 10.7-11.2 13-6.7-2.3-11.2-6.7-11.2-13V7.9C8.3 7.6 12.4 6.9 16 3.5Z"/><path d="m10.8 15.9 3.4 3.4 6.8-7.2"/></svg></span>
				<div><h2>No server requests</h2><p>Everything works locally on your device.</p></div>
			</article>
			<article class="privacy-item">
				<span class="icon-badge violet"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3.5 16s4.5-7.5 12.5-7.5S28.5 16 28.5 16 24 23.5 16 23.5 3.5 16 3.5 16Z"/><circle cx="16" cy="16" r="3.4"/><path d="M4.5 4.5 27.5 27.5"/></svg></span>
				<div><h2>No tracking, usage analytics or adds</h2><p>No data is collected for any purposes.</p></div>
			</article>
			<article class="privacy-item">
				<span class="icon-badge blue"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m10.2 7.4 3.5 3.5-2.8 2.8M21.8 24.6l-3.5-3.5 2.8-2.8M14.5 11.5h8.3l-2.6-2.6M17.5 20.5H9.2l2.6 2.6"/><path d="M6 21.5 12.5 15M26 10.5 19.5 17"/></svg></span>
				<div><h2>No background synchronization</h2><p>You are in full control of your data.</p></div>
			</article>
			<article class="privacy-item last-item">
				<span class="icon-badge green"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6.2" y="13.2" width="19.6" height="14.2" rx="2"/><path d="M10 13.2V9.7a6 6 0 0 1 12 0v3.5M16 19v3.3"/><circle cx="16" cy="19" r="1"/></svg></span>
				<div><h2>Your data stays yours</h2><p>Data under your responsibility on your device and browser.</p></div>
			</article>
		</div>

		<div class="actions" aria-label="Get started">
			<a class="action-card primary-action" href="/wallet">
				<span class="action-icon plus"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 6v20M6 16h20"/></svg></span>
				<span><strong>Start</strong><small>Create a new empty wallet</small></span>
				<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg>
			</a>
			<a class="action-card secondary-action" href="#import">
				<span class="action-icon folder"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3.5 9.2a3 3 0 0 1 3-3H14l3 3h8.5a3 3 0 0 1 3 3v12.3a3 3 0 0 1-3 3h-19a3 3 0 0 1-3-3V9.2Z"/></svg></span>
				<span><strong>Import</strong><small>Import wallet from encrypted file</small></span>
				<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8"/></svg>
			</a>
		</div>
	</section>

	<footer class="footer">
		<div class="footer-content">
			<div class="progress-label"><span>MVP Progress</span><span>1%</span></div>
			<div class="progress-track"><span></span></div>
			<a class="progress-caption progress-link" href="#features">See feature list and upcoming updates</a>
			<SocialLinks />
		</div>
	</footer>
</main>
