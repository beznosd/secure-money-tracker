<script>
	let activityDateFilter = $state('today');
</script>

<svelte:head>
	<title>Total Balance | Secure Money Tracker</title>
	<meta name="description" content="Your private money overview." />
</svelte:head>

<main class="balance-page">
	<div class="balance-app">
		<header class="balance-header">
			<a class="brand" href="/" aria-label="Back to Secure Money Tracker">
				<span class="brand-mark" aria-hidden="true">
					<img src="/favicon.png" alt="" />
				</span>
				<span><strong>Secure Money Tracker</strong></span>
			</a>
			<span class="settings-button" aria-hidden="true">⚙</span>
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
					<span class="expenses-icon" aria-hidden="true">💸</span>
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

		<section class="debts-card" aria-labelledby="total-debts-title">
			<span class="debts-icon" aria-hidden="true">
				<svg viewBox="0 0 48 48">
					<path d="M11 5h19l7 7v27a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V5Z" />
					<path d="M29 5v9h8" />
					<path d="M25.5 19c-1-2.5-8-2.5-8 1.5 0 4.5 8 2.5 8 7 0 4-6.5 4.5-9 1.5M21 16v17" />
				</svg>
			</span>

			<div class="debts-copy">
				<h2 id="total-debts-title">Total Debts</h2>
				<p class="debts-amount">$2,450.00</p>
				<p class="debts-change"><span>↘</span> $350.00 (12.5%) <em>vs last month</em></p>
			</div>

			<svg class="debts-arrow" viewBox="0 0 24 24" aria-hidden="true">
				<path d="m9 4 8 8-8 8" />
			</svg>
		</section>

		<section class="quick-actions" aria-label="Quick actions">
			<button class="quick-action income-action" type="button">
				<span class="quick-action-icon" aria-hidden="true">
					<svg viewBox="0 0 32 32">
						<circle cx="16" cy="16" r="12" />
						<path d="M16 10v12M10 16h12" />
					</svg>
				</span>
				<span>Add Income</span>
			</button>

			<button class="quick-action expense-action" type="button">
				<span class="quick-action-icon" aria-hidden="true">
					<svg viewBox="0 0 32 32">
						<circle cx="16" cy="16" r="12" />
						<path d="M10 16h12" />
					</svg>
				</span>
				<span>Add Expense</span>
			</button>

			<button class="quick-action debt-action" type="button">
				<span class="quick-action-icon" aria-hidden="true">
					<svg viewBox="0 0 32 32">
						<path d="M8 4h11l5 5v19H8V4Z" />
						<path d="M19 4v6h5M16 15v8M12 19h8" />
					</svg>
				</span>
				<span>Add Debt</span>
			</button>

			<button class="quick-action transfer-action" type="button">
				<span class="quick-action-icon" aria-hidden="true">
					<svg viewBox="0 0 32 32">
						<path d="M7 11h17M20 7l4 4-4 4M25 21H8M12 17l-4 4 4 4" />
					</svg>
				</span>
				<span>Transfer</span>
			</button>
		</section>

		<section class="overview-section money-overview" aria-labelledby="my-money-title">
			<header class="overview-header">
				<div class="overview-title">
					<span class="overview-title-icon money-title-icon" aria-hidden="true">
						<svg viewBox="0 0 72 72">
							<defs>
								<linearGradient
									id="money-wallet-fill"
									x1="10"
									y1="12"
									x2="59"
									y2="62"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#34a447" />
									<stop offset="1" stop-color="#6bc761" />
								</linearGradient>
							</defs>
							<path class="wallet-note" d="m19 25 24-12 4 9-24 12Z" />
							<path
								class="wallet-body"
								d="M14 24h40a7 7 0 0 1 7 7v25a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7V31a7 7 0 0 1 7-7Z"
							/>
							<path class="wallet-pocket" d="M45 40h18v13H45a6.5 6.5 0 0 1 0-13Z" />
							<circle cx="49" cy="46.5" r="2" />
						</svg>
					</span>
					<h2 id="my-money-title">My Money</h2>
					<span class="overview-title-total">(Total: <strong>$12,540.75</strong>)</span>
				</div>
				<span class="overview-view-all">View all</span>
			</header>

			<div class="overview-grid money-grid">
				<article class="overview-item cash-item">
					<span class="overview-item-icon" aria-hidden="true">💵</span>
					<div>
						<h3>Cash</h3>
						<p>$1,250.00</p>
					</div>
				</article>
				<article class="overview-item bank-item">
					<span class="overview-item-icon" aria-hidden="true">🏦</span>
					<div>
						<h3>Bank Account</h3>
						<p>$6,240.75</p>
					</div>
				</article>
				<article class="overview-item savings-item">
					<span class="overview-item-icon savings-icon" aria-hidden="true">
						<img src="/savings-piggy-bank.svg" alt="" />
					</span>
					<div>
						<h3>Savings</h3>
						<p>$3,550.00</p>
					</div>
				</article>
				<article class="overview-item card-item">
					<span class="overview-item-icon" aria-hidden="true">💳</span>
					<div>
						<h3>Card</h3>
						<p class="negative-amount">-$500.00</p>
					</div>
				</article>
			</div>
		</section>

		<section
			class="overview-section categories-overview"
			aria-labelledby="expenses-title"
		>
			<header class="overview-header">
				<div class="overview-title">
					<span class="overview-title-icon categories-title-icon" aria-hidden="true">💸</span>
					<h2 id="expenses-title">Expenses</h2>
					<span class="overview-title-total">(Total: <strong>$120.50</strong>)</span>
				</div>
				<div class="expense-periods category-periods" aria-label="Expense category period">
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
				<span class="overview-view-all">View all</span>
			</header>

			<div class="overview-grid categories-grid">
				<article class="overview-item food-item">
					<span class="overview-item-icon" aria-hidden="true">🍴</span>
					<div>
						<h3>Food</h3>
						<p>$45.20</p>
					</div>
				</article>
				<article class="overview-item transport-item">
					<span class="overview-item-icon" aria-hidden="true">🚌</span>
					<div>
						<h3>Transport</h3>
						<p>$28.30</p>
					</div>
				</article>
				<article class="overview-item bills-item">
					<span class="overview-item-icon" aria-hidden="true">🧾</span>
					<div>
						<h3>Bills</h3>
						<p>$15.00</p>
					</div>
				</article>
				<article class="overview-item shopping-item">
					<span class="overview-item-icon" aria-hidden="true">🛍️</span>
					<div>
						<h3>Shopping</h3>
						<p>$32.00</p>
					</div>
				</article>
			</div>
		</section>

		<section class="overview-section debt-overview" aria-labelledby="debts-title">
			<header class="overview-header">
				<div class="overview-title">
					<span class="overview-title-icon debt-title-icon" aria-hidden="true">📄</span>
					<h2 id="debts-title">Debts</h2>
				</div>
				<span class="overview-view-all">View all</span>
			</header>

			<div class="debt-overview-grid">
				<article class="debt-overview-item owed-by-me">
					<span class="debt-overview-icon" aria-hidden="true">↗</span>
					<div>
						<h3>I owe others</h3>
						<p>$1,850.00</p>
						<small>2 debts</small>
					</div>
				</article>
				<article class="debt-overview-item owed-to-me">
					<span class="debt-overview-icon" aria-hidden="true">↙</span>
					<div>
						<h3>Others owe me</h3>
						<p>$600.00</p>
						<small>1 debt</small>
					</div>
				</article>
			</div>
		</section>

		<section class="overview-section activity-overview" aria-labelledby="recent-activity-title">
			<header class="overview-header">
				<div class="overview-title">
					<span class="overview-title-icon activity-title-icon" aria-hidden="true">🕘</span>
					<h2 id="recent-activity-title">Recent Activity</h2>
				</div>
				<div class="activity-date-filter">
					<div class="expense-periods activity-periods" aria-label="Recent activity date">
						<button
							class="expense-period"
							class:active-period={activityDateFilter === 'today'}
							type="button"
							onclick={() => (activityDateFilter = 'today')}>Today</button
						>
						<button
							class="expense-period"
							class:active-period={activityDateFilter === 'yesterday'}
							type="button"
							onclick={() => (activityDateFilter = 'yesterday')}>Yesterday</button
						>
						<button
							class="expense-period"
							class:active-period={activityDateFilter === '2-days-ago'}
							type="button"
							onclick={() => (activityDateFilter = '2-days-ago')}
							>2 days ago</button
						>
						<button
							class="expense-period custom-period"
							class:active-period={activityDateFilter === 'custom'}
							type="button"
							onclick={() => (activityDateFilter = 'custom')}
						>
							Custom
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="3" y="5" width="18" height="16" rx="2" />
								<path d="M7 3v4M17 3v4M3 10h18" />
							</svg>
						</button>
					</div>
					{#if activityDateFilter === 'custom'}
						<input class="activity-custom-date" type="date" aria-label="Choose activity date" />
					{/if}
				</div>
			</header>

			<div class="activity-list">
				<article class="activity-item income-activity">
					<span class="activity-icon" aria-hidden="true">↓</span>
					<div class="activity-copy">
						<h3>Salary</h3>
						<p>Bank Account</p>
					</div>
					<div class="activity-value">
						<strong>+$2,500.00</strong>
						<time>Today, 9:30 AM</time>
					</div>
				</article>

				<article class="activity-item expense-activity">
					<span class="activity-icon" aria-hidden="true">🍴</span>
					<div class="activity-copy">
						<h3>Grocery Store</h3>
						<p>Food</p>
					</div>
					<div class="activity-value">
						<strong>-$45.20</strong>
						<time>Today, 12:42 PM</time>
					</div>
				</article>

				<article class="activity-item transfer-activity">
					<span class="activity-icon" aria-hidden="true">⇄</span>
					<div class="activity-copy">
						<h3>Transfer to Savings</h3>
						<p>Bank Account → Savings</p>
					</div>
					<div class="activity-value">
						<strong>-$300.00</strong>
						<time>Today, 3:10 PM</time>
					</div>
				</article>

				<article class="activity-item repayment-activity">
					<span class="activity-icon" aria-hidden="true">↙</span>
					<div class="activity-copy">
						<h3>Debt repayment from Alex</h3>
						<p>Debt payment</p>
					</div>
					<div class="activity-value">
						<strong>+$150.00</strong>
						<time>Yesterday, 5:20 PM</time>
					</div>
				</article>
			</div>

			<button class="activity-see-more" type="button">See more...</button>
		</section>
	</div>
</main>
