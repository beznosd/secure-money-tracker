<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	import { scrypt } from '@noble/hashes/scrypt.js';
	import { bytesToHex as toHex, randomBytes } from '@noble/hashes/utils.js';
	import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
	import { managedNonce } from '@noble/ciphers/utils.js';

	import { getIncomeRecords, saveIncomeRecord, type IncomeRecord } from '$lib/income-storage.js';
	import CreatableCombobox from '$lib/components/CreatableCombobox.svelte';
	import CreatePasswordForm from '$lib/components/CreatePasswordForm.svelte';
	import QuickActionButton from '$lib/components/QuickActionButton.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	const defaultIncomeCategories = ['Salary', 'Freelance', 'Gift', 'Interest', 'Other'];

	let activityDateFilter = $state('today');
	let isIncomeDialogOpen = $state(false);
	let isDataLossNoticeVisible = $state(true);
	let isPasswordCardVisible = $state(true);
	let customActivityDate = $state('');
	let incomeAmount = $state('');
	let incomeCategory = $state('');
	let incomeCategories = $state([...defaultIncomeCategories]);

	let incomeRecords = $state<IncomeRecord[]>([]);
	let isIncomeDataLoading = $state(true);
	let isIncomeDataReady = $state(false);
	let isIncomeSaving = $state(false);
	let incomeStorageError = $state('');

	let appPassword = $state('');
	let confirmAppPassword = $state('');
	let appPasswordMessage = $state('');
	let appPasswordMessageType = $state<'success' | 'error' | ''>('');
	let currentAppPassword = '';
	let incomeDataLoadPromise = Promise.resolve();

	let kdfKeyHex = $state('');
	let kdfKeyBytes = $state<Uint8Array | null>(null);

	const cashBalance = $derived(
		incomeRecords.reduce((total, income) => total + Math.round(income.amount * 100), 0) / 100
	);

	const visibleIncomeRecords = $derived.by(() => {
		if (activityDateFilter === 'custom') {
			return customActivityDate
				? incomeRecords.filter(
						(income) => getLocalDateKey(new Date(income.createdAt)) === customActivityDate
					)
				: [];
		}

		const today = new Date();
		const daysAgo =
			activityDateFilter === 'yesterday' ? 1 : activityDateFilter === '2-days-ago' ? 2 : 0;
		const selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo);
		const selectedDateKey = getLocalDateKey(selectedDate);

		return incomeRecords.filter(
			(income) => getLocalDateKey(new Date(income.createdAt)) === selectedDateKey
		);
	});

	onMount(() => {
		incomeDataLoadPromise = loadIncomeRecords();
	});

	async function loadIncomeRecords() {
		incomeStorageError = '';
		isIncomeDataReady = false;

		try {
			incomeRecords = await getIncomeRecords();
			const savedCategories = incomeRecords.map((income) => income.category);
			incomeCategories = [...new Set([...defaultIncomeCategories, ...savedCategories])];
			isIncomeDataReady = true;
		} catch (error) {
			console.error('Could not load income records from IndexedDB.', error);
			incomeStorageError = 'Saved income could not be loaded from this browser.';
		} finally {
			isIncomeDataLoading = false;
		}
	}

	function getKdfKey(password: string): { bytes: Uint8Array; hex: string } {
		const salt = randomBytes(32);

		const key = scrypt(password, salt, {
			N: 2 ** 17, // iterations count, CPU/memory cost parameter (134,217,728 bytes of memory or 128 MiB)
			r: 8, // block size
			p: 1, // parallelization factor, JS doesn't support parallelization
			dkLen: 32, // byte length of the derived key (256 bits)
			maxmem: 128 * 8 * (2 ** 17 + 1 + 1)
		});

		return {
			bytes: key,
			hex: toHex(key)
		};
	}

	function clearAppPasswordMessage() {
		appPasswordMessage = '';
		appPasswordMessageType = '';
	}

	function saveAppPassword(event: SubmitEvent) {
		event.preventDefault();

		if (appPassword.length < 8) {
			appPasswordMessage = 'Use at least 8 characters for your app password.';
			appPasswordMessageType = 'error';
			return;
		}

		if (appPassword !== confirmAppPassword) {
			appPasswordMessage = 'The passwords do not match. Please try again.';
			appPasswordMessageType = 'error';
			return;
		}

		currentAppPassword = appPassword;
		appPassword = '';
		confirmAppPassword = '';
		appPasswordMessage = currentAppPassword.length ? 'Your app password has been saved.' : '';
		appPasswordMessageType = 'success';

		const key = getKdfKey(currentAppPassword);
		kdfKeyBytes = key.bytes;
		kdfKeyHex = key.hex;
	}

	async function addIncome(event: SubmitEvent) {
		event.preventDefault();
		if (isIncomeSaving) return;

		const parsedAmount = Number(incomeAmount);
		const category = incomeCategory.trim();

		if (!Number.isFinite(parsedAmount) || parsedAmount <= 0 || !category) return;

		isIncomeSaving = true;
		incomeStorageError = '';

		try {
			await incomeDataLoadPromise;
			if (!isIncomeDataReady) return;

			const existingCategory = incomeCategories.find(
				(item) => item.toLocaleLowerCase() === category.toLocaleLowerCase()
			);
			const savedCategory = existingCategory ?? category;
			const incomeRecord: IncomeRecord = {
				id: crypto.randomUUID(),
				amount: Math.round(parsedAmount * 100) / 100,
				category: savedCategory,
				createdAt: new Date().toISOString()
			};

			await saveIncomeRecord(incomeRecord);
			incomeRecords = [incomeRecord, ...incomeRecords];

			if (!existingCategory) incomeCategories.push(savedCategory);

			incomeAmount = '';
			incomeCategory = '';
			isIncomeDialogOpen = false;
		} catch (error) {
			console.error('Could not save income record to IndexedDB.', error);
			incomeStorageError = 'Income could not be saved. Please try again.';
		} finally {
			isIncomeSaving = false;
		}
	}

	function formatIncomeTime(createdAt: string) {
		const createdDate = new Date(createdAt);
		const today = new Date();
		const isToday =
			createdDate.getFullYear() === today.getFullYear() &&
			createdDate.getMonth() === today.getMonth() &&
			createdDate.getDate() === today.getDate();

		return isToday
			? createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			: createdDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
	}

	function getLocalDateKey(date: Date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	function saveWallet() {
		if (!isIncomeDataReady) return;

		const wallet = {
			savedAt: new Date().toISOString(),
			balances: { cash: cashBalance },
			incomeRecords,
			incomeCategories
		};
		const data = new TextEncoder().encode(JSON.stringify(wallet, null, 2));

		let blob: Blob;
		let extension: string;
		if (kdfKeyBytes) {
			const chacha = managedNonce(xchacha20poly1305)(kdfKeyBytes);
			const ciphertext = chacha.encrypt(data);

			blob = new Blob([ciphertext], { type: 'application/octet-stream' });
			extension = '.enc';
		} else {
			blob = new Blob([data], { type: 'application/json' });
			extension = '.json';
		}

		const downloadUrl = URL.createObjectURL(blob);
		const downloadLink = document.createElement('a');
		downloadLink.href = downloadUrl;
		downloadLink.download = `secure-money-tracker-wallet${extension}`;
		downloadLink.hidden = true;
		document.body.append(downloadLink);

		downloadLink.click();
		downloadLink.remove();

		window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1);
	}
</script>

<svelte:head>
	<title>Total Balance | Secure Money Tracker</title>
	<meta name="description" content="Your private money overview." />
</svelte:head>

<main class="balance-page">
	<div class="balance-app">
		<header class="balance-header">
			<a class="brand" href={resolve('/')} aria-label="Back to Secure Money Tracker">
				<span class="brand-mark" aria-hidden="true">
					<img src="/favicon.png" alt="" />
				</span>
				<span><strong>Secure Money Tracker</strong></span>
			</a>
			<div class="header-actions">
				<button
					class="save-button"
					type="button"
					disabled={!isIncomeDataReady}
					onclick={saveWallet}>
					<span>💾</span>
					<span>Export to file</span>
				</button>
				<span class="settings-button" aria-hidden="true">⚙</span>
				<ThemeSwitcher />
			</div>
		</header>

		{#if isDataLossNoticeVisible}
			<aside class="data-loss-notice" role="note">
				<span class="data-loss-notice-icon" aria-hidden="true">⚠</span>
				<p>
					<strong>
						Without the password unencrypted data will be saved to the browser storage.
					</strong>
				</p>
				<button
					class="data-loss-notice-close"
					type="button"
					aria-label="Dismiss warning"
					onclick={() => (isDataLossNoticeVisible = false)}>
					<span class="close-button-icon" aria-hidden="true"></span>
				</button>
			</aside>
		{/if}

		{#if isPasswordCardVisible}
			<CreatePasswordForm
				bind:appPassword
				bind:confirmAppPassword
				{appPasswordMessage}
				{appPasswordMessageType}
				{kdfKeyHex}
				onsubmit={saveAppPassword}
				oninput={clearAppPasswordMessage}
				ondismiss={() => (isPasswordCardVisible = false)} />
		{/if}

		<section class="total-balance-card" aria-labelledby="total-balance-title">
			<div class="balance-card-content">
				<div class="wallet-icon" aria-hidden="true">
					<svg viewBox="0 0 72 72">
						<defs>
							<linearGradient
								id="wallet-fill"
								x1="10"
								y1="12"
								x2="59"
								y2="62"
								gradientUnits="userSpaceOnUse">
								<stop stop-color="#34a447" />
								<stop offset="1" stop-color="#6bc761" />
							</linearGradient>
						</defs>
						<path class="wallet-note" d="m19 25 24-12 4 9-24 12Z" />
						<path
							class="wallet-body"
							d="M14 24h40a7 7 0 0 1 7 7v25a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7V31a7 7 0 0 1 7-7Z" />
						<path class="wallet-pocket" d="M45 40h18v13H45a6.5 6.5 0 0 1 0-13Z" />
						<circle cx="49" cy="46.5" r="2" />
					</svg>
				</div>
				<div class="balance-details">
					<div class="balance-label">
						<h1 id="total-balance-title">Total Balance</h1>
						<svg viewBox="0 0 24 24" aria-label="Balance visible">
							<path d="M2.5 12s3.4-5.7 9.5-5.7S21.5 12 21.5 12s-3.4 5.7-9.5 5.7S2.5 12 2.5 12Z" />
							<circle cx="12" cy="12" r="2.5" />
						</svg>
					</div>
					<p class="balance-amount">${cashBalance.toFixed(2)}</p>
					<p class="balance-change">
						<span>↗</span>
						$0.00 (0.0%)
						<em>vs last month</em>
					</p>
				</div>
			</div>
			<svg
				class="balance-landscape"
				viewBox="0 0 360 196"
				preserveAspectRatio="xMidYMid slice"
				aria-hidden="true">
				<defs>
					<linearGradient
						id="mountain-back"
						x1="59"
						y1="65"
						x2="297"
						y2="205"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#b7e6cb" />
						<stop offset="1" stop-color="#89cfa8" />
					</linearGradient>
					<linearGradient
						id="mountain-front"
						x1="142"
						y1="97"
						x2="310"
						y2="210"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#d4f1df" />
						<stop offset="1" stop-color="#83cea5" />
					</linearGradient>
					<linearGradient id="tree-fill" x1="0" y1="0" x2="0" y2="1">
						<stop stop-color="#82cea0" />
						<stop offset="1" stop-color="#47ab73" />
					</linearGradient>
				</defs>
				<g class="sun-rays" stroke="#ffd978" stroke-width="3" stroke-linecap="round">
					<path
						d="M283 16v-9M283 83v9M249 49h-9M317 49h9M259 25l-7-7M307 73l7 7M307 25l7-7M259 73l-7 7" />
				</g>
				<circle cx="283" cy="49" r="27" fill="#fffaf0" />
				<circle cx="283" cy="49" r="20" fill="#ffd675" />
				<g fill="rgba(255,255,255,.82)">
					<path d="M152 52c3-13 22-15 29-4 10-6 24 1 24 13h-63c0-5 4-9 10-9Z" />
					<path d="M326 72c3-9 16-10 21-3 8-4 16 1 17 10h-44c0-4 2-6 6-7Z" />
				</g>
				<path
					d="M20 196c39-38 68-84 108-105 28-15 50 15 77 30 24-17 42-38 67-33 36 8 63 63 88 108H20Z"
					fill="url(#mountain-back)" />
				<path
					d="M80 196c38-33 72-68 107-75 25-5 48 16 67 27 29-23 57-26 106-2v50H80Z"
					fill="url(#mountain-front)" />
				<g class="landscape-tree">
					<rect x="99" y="158" width="9" height="38" rx="4.5" />
					<path
						d="M103.5 89c-4.5 14-12.5 27-22.5 40-3 4 0 8 6 8 4 0 6 0 9-1-5 9-12 18-19 26-3 4 0 8 6 8 8 0 14-3 20.5-7 6.5 4 12.5 7 20.5 7 6 0 9-4 6-8-7-8-14-17-19-26 3 1 5 1 9 1 6 0 9-4 6-8-10-13-18-26-22.5-40Z" />
				</g>
				<g class="landscape-tree small-tree">
					<rect x="158" y="166" width="7" height="30" rx="3.5" />
					<path
						d="M161.5 117c-3.5 10-9.5 20-17 29-2.5 3 0 6 4.5 6 3 0 4.5 0 7-1-4 7-9 14-14.5 20-2.5 3 0 6 4.5 6 6 0 10.5-2 15.5-5 5 3 9.5 5 15.5 5 4.5 0 7-3 4.5-6-5.5-6-10.5-13-14.5-20 2.5 1 4 1 7 1 4.5 0 7-3 4.5-6-7.5-9-13.5-19-17-29Z" />
				</g>
			</svg>
		</section>

		<section class="expenses-card" aria-labelledby="total-expenses-title">
			<div class="expenses-top-row">
				<div class="expenses-total">
					<span class="expenses-icon" aria-hidden="true">💸</span>
					<div class="expenses-copy">
						<h2 id="total-expenses-title">Total Expenses</h2>
						<p>$0.00</p>
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
				<div class="expenses-progress" aria-label="$0.00 of $0.00 budget used">
					<span></span>
				</div>
				<p>Budget: $0.00</p>
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
				<p class="debts-amount">$0.00</p>
				<p class="debts-change">
					<span>↘</span>
					$0.00 (0.0%)
					<em>vs last month</em>
				</p>
			</div>

			<svg class="debts-arrow" viewBox="0 0 24 24" aria-hidden="true">
				<path d="m9 4 8 8-8 8" />
			</svg>
		</section>

		<section class="quick-actions" aria-label="Quick actions">
			<QuickActionButton
				class="income-action"
				label="Add Income"
				disabled={!isIncomeDataReady}
				onclick={() => (isIncomeDialogOpen = true)}>
				<svg viewBox="0 0 32 32">
					<circle cx="16" cy="16" r="12" />
					<path d="M16 10v12M10 16h12" />
				</svg>
			</QuickActionButton>

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

		{#if isIncomeDialogOpen}
			<div class="income-dialog-backdrop">
				<dialog class="income-dialog" open aria-modal="true" aria-labelledby="income-dialog-title">
					<div class="income-dialog-heading">
						<div>
							<p class="income-dialog-eyebrow">New transaction</p>
							<h2 id="income-dialog-title">Add income</h2>
						</div>
						<button
							class="income-dialog-close"
							type="button"
							aria-label="Close add income form"
							onclick={() => (isIncomeDialogOpen = false)}>
							<span class="close-button-icon" aria-hidden="true"></span>
						</button>
					</div>
					<form onsubmit={addIncome}>
						<div class="income-form-fields">
							<div class="income-form-field">
								<label for="income-amount">Amount</label>
								<div class="income-amount-field">
									<span aria-hidden="true">$</span>
									<input
										id="income-amount"
										type="number"
										min="0.01"
										step="0.01"
										placeholder="0.00"
										bind:value={incomeAmount}
										required />
								</div>
							</div>

							<CreatableCombobox
								id="income-category"
								label="Income category"
								options={incomeCategories}
								placeholder="Choose or add category"
								helperText="Choose an existing category or type a new one."
								maxlength={40}
								required
								bind:value={incomeCategory} />
						</div>
						<div class="income-dialog-actions">
							<button
								class="income-cancel-button"
								type="button"
								onclick={() => (isIncomeDialogOpen = false)}>
								Cancel
							</button>
							<button class="income-submit-button" type="submit" disabled={isIncomeSaving}>
								{isIncomeSaving ? 'Saving…' : 'Add income'}
							</button>
						</div>
						{#if incomeStorageError}
							<p class="income-storage-error" role="alert">{incomeStorageError}</p>
						{/if}
					</form>
				</dialog>
			</div>
		{/if}

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
									gradientUnits="userSpaceOnUse">
									<stop stop-color="#34a447" />
									<stop offset="1" stop-color="#6bc761" />
								</linearGradient>
							</defs>
							<path class="wallet-note" d="m19 25 24-12 4 9-24 12Z" />
							<path
								class="wallet-body"
								d="M14 24h40a7 7 0 0 1 7 7v25a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7V31a7 7 0 0 1 7-7Z" />
							<path class="wallet-pocket" d="M45 40h18v13H45a6.5 6.5 0 0 1 0-13Z" />
							<circle cx="49" cy="46.5" r="2" />
						</svg>
					</span>
					<h2 id="my-money-title">My Money</h2>
					<span class="overview-title-total">
						(Total: <strong>${cashBalance.toFixed(2)}</strong>
						)
					</span>
				</div>
				<span class="overview-view-all">View all</span>
			</header>

			<div class="overview-grid money-grid">
				<article class="overview-item cash-item">
					<span class="overview-item-icon" aria-hidden="true">💵</span>
					<div>
						<h3>Cash</h3>
						<p>${cashBalance.toFixed(2)}</p>
					</div>
				</article>
				<article class="overview-item bank-item">
					<span class="overview-item-icon" aria-hidden="true">🏦</span>
					<div>
						<h3>Bank Account</h3>
						<p>$0.00</p>
					</div>
				</article>
				<article class="overview-item savings-item">
					<span class="overview-item-icon savings-icon" aria-hidden="true">
						<img src="/savings-piggy-bank.svg" alt="" />
					</span>
					<div>
						<h3>Savings</h3>
						<p>$0.00</p>
					</div>
				</article>
				<article class="overview-item card-item">
					<span class="overview-item-icon" aria-hidden="true">💳</span>
					<div>
						<h3>Card</h3>
						<p>$0.00</p>
					</div>
				</article>
			</div>
		</section>

		<section class="overview-section categories-overview" aria-labelledby="expenses-title">
			<header class="overview-header">
				<div class="overview-title">
					<span class="overview-title-icon categories-title-icon" aria-hidden="true">💸</span>
					<h2 id="expenses-title">Expenses</h2>
					<span class="overview-title-total">
						(Total: <strong>$0.00</strong>
						)
					</span>
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
						<p>$0.00</p>
					</div>
				</article>
				<article class="overview-item transport-item">
					<span class="overview-item-icon" aria-hidden="true">🚌</span>
					<div>
						<h3>Transport</h3>
						<p>$0.00</p>
					</div>
				</article>
				<article class="overview-item bills-item">
					<span class="overview-item-icon" aria-hidden="true">🧾</span>
					<div>
						<h3>Bills</h3>
						<p>$0.00</p>
					</div>
				</article>
				<article class="overview-item shopping-item">
					<span class="overview-item-icon" aria-hidden="true">🛍️</span>
					<div>
						<h3>Shopping</h3>
						<p>$0.00</p>
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
						<p>$0.00</p>
						<small>0 debts</small>
					</div>
				</article>
				<article class="debt-overview-item owed-to-me">
					<span class="debt-overview-icon" aria-hidden="true">↙</span>
					<div>
						<h3>Others owe me</h3>
						<p>$0.00</p>
						<small>0 debts</small>
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
							onclick={() => (activityDateFilter = 'today')}>
							Today
						</button>
						<button
							class="expense-period"
							class:active-period={activityDateFilter === 'yesterday'}
							type="button"
							onclick={() => (activityDateFilter = 'yesterday')}>
							Yesterday
						</button>
						<button
							class="expense-period"
							class:active-period={activityDateFilter === '2-days-ago'}
							type="button"
							onclick={() => (activityDateFilter = '2-days-ago')}>
							2 days ago
						</button>
						<button
							class="expense-period custom-period"
							class:active-period={activityDateFilter === 'custom'}
							type="button"
							onclick={() => (activityDateFilter = 'custom')}>
							Custom
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<rect x="3" y="5" width="18" height="16" rx="2" />
								<path d="M7 3v4M17 3v4M3 10h18" />
							</svg>
						</button>
					</div>
					{#if activityDateFilter === 'custom'}
						<input
							class="activity-custom-date"
							type="date"
							aria-label="Choose activity date"
							bind:value={customActivityDate} />
					{/if}
				</div>
			</header>

			{#if isIncomeDataLoading}
				<div class="activity-empty-state" aria-live="polite">
					<span aria-hidden="true">◌</span>
					<p>Loading activity…</p>
				</div>
			{:else if visibleIncomeRecords.length > 0}
				<div class="activity-list">
					{#each visibleIncomeRecords as income (income.id)}
						<article class="activity-item income-activity">
							<span class="activity-icon" aria-hidden="true">↓</span>
							<div class="activity-copy">
								<h3>Income</h3>
								<p>{income.category} · Cash</p>
							</div>
							<div class="activity-value">
								<strong>+${income.amount.toFixed(2)}</strong>
								<time datetime={income.createdAt}>{formatIncomeTime(income.createdAt)}</time>
							</div>
						</article>
					{/each}
				</div>
			{:else}
				<div class="activity-empty-state">
					<span aria-hidden="true">◌</span>
					<p>
						{incomeStorageError ||
							(incomeRecords.length ? 'No activity for this date' : 'No activity yet')}
					</p>
				</div>
			{/if}
		</section>
	</div>
</main>
