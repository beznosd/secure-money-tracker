<svelte:head>
	<title>Total Balance | Secure Money Tracker</title>
	<meta name="description" content="Your private money overview." />
</svelte:head>

<main class="balance-page">
	<div class="balance-app">
		<header class="balance-header">
			<a class="brand" href="/" aria-label="Back to Secure Money Tracker">
				<span class="brand-mark" aria-hidden="true">
					<svg viewBox="0 0 40 46"
						><path
							d="M20 2.5 35.5 8v12.2c0 10.1-6.3 18.3-15.5 23.3C10.8 38.5 4.5 30.3 4.5 20.2V8L20 2.5Z"
						/><rect x="12.8" y="19.1" width="14.4" height="11" rx="2" /><path
							d="M15.7 19.1v-3.4a4.3 4.3 0 0 1 8.6 0v3.4M20 23.2v3.1"
						/></svg
					>
				</span>
				<span><strong>Secure Money Tracker</strong></span>
			</a>
			<span class="settings-button" aria-hidden="true">
				<svg viewBox="0 0 24 24" aria-hidden="true"
					><circle cx="12" cy="12" r="3.1" /><path
						d="M19.1 13.6a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.9v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5.2v-2.9h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.9v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.9h-.2a1.7 1.7 0 0 0-1.5 1Z"
					/></svg
				>
			</span>
		</header>

		<section class="total-balance-card" aria-labelledby="total-balance-title">
			<div class="balance-card-content">
				<div class="wallet-icon" aria-hidden="true">
					<svg viewBox="0 0 72 72"
						><defs
							><linearGradient
								id="wallet-fill"
								x1="10"
								y1="12"
								x2="59"
								y2="62"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#34a447" /><stop
									offset="1"
									stop-color="#6bc761"
								/></linearGradient
							></defs
						><path class="wallet-note" d="m19 25 24-12 4 9-24 12Z" /><path
							class="wallet-body"
							d="M14 24h40a7 7 0 0 1 7 7v25a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7V31a7 7 0 0 1 7-7Z"
						/><path class="wallet-pocket" d="M45 40h18v13H45a6.5 6.5 0 0 1 0-13Z" /><circle
							cx="49"
							cy="46.5"
							r="2"
						/></svg
					>
				</div>
				<div class="balance-details">
					<div class="balance-label">
						<h1 id="total-balance-title">Total Balance</h1>
						<svg viewBox="0 0 24 24" aria-label="Balance visible"
							><path
								d="M2.5 12s3.4-5.7 9.5-5.7S21.5 12 21.5 12s-3.4 5.7-9.5 5.7S2.5 12 2.5 12Z"
							/><circle cx="12" cy="12" r="2.5" /></svg
						>
					</div>
					<p class="balance-amount">$12,540.75</p>
					<p class="balance-change"><span>↗</span> $1,250.40 (11.1%) <em>vs last month</em></p>
				</div>
			</div>
			<svg
				class="balance-landscape"
				viewBox="0 0 360 196"
				preserveAspectRatio="xMidYMid slice"
				aria-hidden="true"
			>
				<defs>
					<linearGradient
						id="mountain-back"
						x1="59"
						y1="65"
						x2="297"
						y2="205"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#b7e6cb" /><stop offset="1" stop-color="#89cfa8" /></linearGradient
					>
					<linearGradient
						id="mountain-front"
						x1="142"
						y1="97"
						x2="310"
						y2="210"
						gradientUnits="userSpaceOnUse"
						><stop stop-color="#d4f1df" /><stop offset="1" stop-color="#83cea5" /></linearGradient
					>
					<linearGradient id="tree-fill" x1="0" y1="0" x2="0" y2="1"
						><stop stop-color="#82cea0" /><stop offset="1" stop-color="#47ab73" /></linearGradient
					>
				</defs>
				<g class="sun-rays" stroke="#ffd978" stroke-width="3" stroke-linecap="round"
					><path
						d="M283 16v-9M283 83v9M249 49h-9M317 49h9M259 25l-7-7M307 73l7 7M307 25l7-7M259 73l-7 7"
					/></g
				>
				<circle cx="283" cy="49" r="27" fill="#fffaf0" /><circle
					cx="283"
					cy="49"
					r="20"
					fill="#ffd675"
				/>
				<g fill="rgba(255,255,255,.82)"
					><path d="M152 52c3-13 22-15 29-4 10-6 24 1 24 13h-63c0-5 4-9 10-9Z" /><path
						d="M326 72c3-9 16-10 21-3 8-4 16 1 17 10h-44c0-4 2-6 6-7Z"
					/></g
				>
				<path
					d="M20 196c39-38 68-84 108-105 28-15 50 15 77 30 24-17 42-38 67-33 36 8 63 63 88 108H20Z"
					fill="url(#mountain-back)"
				/>
				<path
					d="M80 196c38-33 72-68 107-75 25-5 48 16 67 27 29-23 57-26 106-2v50H80Z"
					fill="url(#mountain-front)"
				/>
				<g class="landscape-tree">
					<rect x="99" y="158" width="9" height="38" rx="4.5" />
					<path
						d="M103.5 89c-4.5 14-12.5 27-22.5 40-3 4 0 8 6 8 4 0 6 0 9-1-5 9-12 18-19 26-3 4 0 8 6 8 8 0 14-3 20.5-7 6.5 4 12.5 7 20.5 7 6 0 9-4 6-8-7-8-14-17-19-26 3 1 5 1 9 1 6 0 9-4 6-8-10-13-18-26-22.5-40Z"
					/>
				</g>
				<g class="landscape-tree small-tree">
					<rect x="158" y="166" width="7" height="30" rx="3.5" />
					<path
						d="M161.5 117c-3.5 10-9.5 20-17 29-2.5 3 0 6 4.5 6 3 0 4.5 0 7-1-4 7-9 14-14.5 20-2.5 3 0 6 4.5 6 6 0 10.5-2 15.5-5 5 3 9.5 5 15.5 5 4.5 0 7-3 4.5-6-5.5-6-10.5-13-14.5-20 2.5 1 4 1 7 1 4.5 0 7-3 4.5-6-7.5-9-13.5-19-17-29Z"
					/>
				</g>
			</svg>
		</section>

		<section class="expenses-card" aria-labelledby="total-expenses-title">
			<div class="expenses-top-row">
				<div class="expenses-total">
					<span class="expenses-icon" aria-hidden="true">
						<svg viewBox="0 0 32 32">
							<path d="m6 23 7-7 5 5 8-10" />
							<path d="M20 11h6v6" />
						</svg>
					</span>
					<div class="expenses-copy">
						<h2 id="total-expenses-title">Total Expenses</h2>
						<p>$120.50</p>
					</div>
				</div>

				<div class="expense-periods" aria-label="Expense period">
					<span class="expense-period active-period">Today</span>
					<span class="expense-period">Week</span>
					<span class="expense-period">Month</span>
					<span class="expense-period custom-period">
						Custom
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<rect x="3" y="5" width="18" height="16" rx="2" />
							<path d="M7 3v4M17 3v4M3 10h18" />
						</svg>
					</span>
				</div>
			</div>

			<div class="expenses-progress-row">
				<div class="expenses-progress" aria-label="$120.50 of $500 budget used">
					<span></span>
				</div>
				<p>Budget: $500.00</p>
			</div>
		</section>
	</div>
</main>
