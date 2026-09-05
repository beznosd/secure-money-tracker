<script lang="ts">
	import CreatableCombobox from '$lib/components/CreatableCombobox.svelte';
	import QuickActionButton from '$lib/components/QuickActionButton.svelte';

	type Props = {
		isIncomeDataReady: boolean;
		isIncomeDialogOpen?: boolean;
		incomeAmount?: string;
		incomeCategory?: string;
		incomeCategories: readonly string[];
		isIncomeSaving: boolean;
		incomeStorageError: string;
		onsubmit: (event: SubmitEvent) => void | Promise<void>;
	};

	let {
		isIncomeDataReady,
		isIncomeDialogOpen = $bindable(false),
		incomeAmount = $bindable(''),
		incomeCategory = $bindable(''),
		incomeCategories,
		isIncomeSaving,
		incomeStorageError,
		onsubmit
	}: Props = $props();
</script>

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

	<button class="quick-action transfer-action" type="button">
		<span class="quick-action-icon" aria-hidden="true">
			<svg viewBox="0 0 32 32">
				<path d="M7 11h17M20 7l4 4-4 4M25 21H8M12 17l-4 4 4 4" />
			</svg>
		</span>
		<span>Transfer</span>
	</button>

	<button class="quick-action debt-action" type="button">
		<span class="quick-action-icon" aria-hidden="true">
			<svg viewBox="0 0 32 32">
				<path d="M8 4h11l5 5v19H8V4Z" />
				<path d="M19 4v6h5M16 15v8M12 19h8" />
			</svg>
		</span>
		<span>Debts</span>
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
			<form {onsubmit}>
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
