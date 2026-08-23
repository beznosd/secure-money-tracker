<script lang="ts">
	type Props = {
		id: string;
		label: string;
		options: readonly string[];
		value?: string;
		name?: string;
		placeholder?: string;
		helperText?: string;
		required?: boolean;
		maxlength?: number;
	};

	let {
		id,
		label,
		options,
		value = $bindable(''),
		name,
		placeholder = 'Choose or add an option',
		helperText = 'Choose an existing option or type a new one.',
		required = false,
		maxlength = 80
	}: Props = $props();

	let inputElement: HTMLInputElement;
	let isOpen = $state(false);
	let showAllOptions = $state(true);
	let activeIndex = $state(-1);

	const listboxId = $derived(`${id}-listbox`);
	const helperId = $derived(`${id}-help`);
	const normalizedValue = $derived(value.trim().toLocaleLowerCase());
	const uniqueOptions = $derived.by(() => {
		const seenOptions: string[] = [];

		return options.filter((option) => {
			const normalizedOption = option.trim().toLocaleLowerCase();

			if (!normalizedOption || seenOptions.includes(normalizedOption)) return false;
			seenOptions.push(normalizedOption);
			return true;
		});
	});
	const visibleOptions = $derived(
		showAllOptions || !normalizedValue
			? uniqueOptions
			: uniqueOptions.filter((option) => option.toLocaleLowerCase().includes(normalizedValue))
	);
	const isMenuVisible = $derived(isOpen && visibleOptions.length > 0);
	const activeOptionId = $derived(
		isMenuVisible && activeIndex >= 0 && activeIndex < visibleOptions.length
			? `${listboxId}-option-${activeIndex}`
			: undefined
	);

	function positionActiveOption() {
		requestAnimationFrame(() => {
			if (!activeOptionId) return;
			document.getElementById(activeOptionId)?.scrollIntoView({ block: 'nearest' });
		});
	}

	function openOptions(showAll = true) {
		showAllOptions = showAll;
		isOpen = true;

		const selectedIndex = uniqueOptions.findIndex(
			(option) => option.toLocaleLowerCase() === normalizedValue
		);
		activeIndex = showAll && selectedIndex >= 0 ? selectedIndex : visibleOptions.length ? 0 : -1;
		positionActiveOption();
	}

	function closeOptions() {
		isOpen = false;
		activeIndex = -1;
	}

	function handleInput(event: Event) {
		value = (event.currentTarget as HTMLInputElement).value;
		showAllOptions = false;
		isOpen = true;
		activeIndex = visibleOptions.length ? 0 : -1;
	}

	function toggleOptions() {
		if (isMenuVisible) {
			closeOptions();
		} else {
			openOptions(true);
		}

		inputElement.focus();
	}

	function moveActiveOption(direction: 1 | -1) {
		if (!isMenuVisible) {
			openOptions(true);
			return;
		}

		activeIndex =
			activeIndex < 0
				? direction === 1
					? 0
					: visibleOptions.length - 1
				: (activeIndex + direction + visibleOptions.length) % visibleOptions.length;
		positionActiveOption();
	}

	function selectOption(option: string) {
		value = option;
		closeOptions();
		inputElement.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				moveActiveOption(1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				moveActiveOption(-1);
				break;
			case 'Enter':
				if (isOpen && activeIndex >= 0 && visibleOptions[activeIndex]) {
					event.preventDefault();
					selectOption(visibleOptions[activeIndex]);
				}
				break;
			case 'Escape':
				if (isOpen) {
					event.preventDefault();
					closeOptions();
				}
				break;
			case 'Home':
				if (isOpen && visibleOptions.length) {
					event.preventDefault();
					activeIndex = 0;
					positionActiveOption();
				}
				break;
			case 'End':
				if (isOpen && visibleOptions.length) {
					event.preventDefault();
					activeIndex = visibleOptions.length - 1;
					positionActiveOption();
				}
				break;
			case 'Tab':
				closeOptions();
				break;
		}
	}

	function handleFocusOut(event: FocusEvent) {
		const container = event.currentTarget as HTMLElement;
		const nextTarget = event.relatedTarget;

		if (nextTarget instanceof Node && container.contains(nextTarget)) return;
		closeOptions();
	}
</script>

<div class="creatable-combobox" onfocusout={handleFocusOut}>
	<label for={id}>{label}</label>

	<div class="combobox-shell">
		<div class:open={isMenuVisible} class="combobox-control">
			<input
				bind:this={inputElement}
				{id}
				name={name ?? id}
				type="text"
				role="combobox"
				aria-haspopup="listbox"
				aria-autocomplete="list"
				aria-expanded={isMenuVisible}
				aria-controls={listboxId}
				aria-activedescendant={activeOptionId}
				aria-describedby={helperId}
				aria-required={required}
				{placeholder}
				{maxlength}
				{required}
				autocomplete="off"
				{value}
				onfocus={() => openOptions(true)}
				oninput={handleInput}
				onkeydown={handleKeydown}
			/>

			<button
				class="combobox-toggle"
				type="button"
				aria-label={isMenuVisible ? `Close ${label} options` : `Open ${label} options`}
				aria-haspopup="listbox"
				aria-expanded={isMenuVisible}
				aria-controls={listboxId}
				onclick={toggleOptions}
			>
				<span class:open={isMenuVisible} class="combobox-chevron" aria-hidden="true"></span>
			</button>
		</div>

		{#if isMenuVisible}
			<div class="combobox-menu">
				<div class="combobox-menu-heading" aria-hidden="true">
					<span>{showAllOptions ? 'Current categories' : 'Matching categories'}</span>
					<small>{visibleOptions.length}</small>
				</div>

				<div class="combobox-options" id={listboxId} role="listbox" aria-label={label}>
					{#each visibleOptions as option, index (option)}
						<button
							class:active={index === activeIndex}
							class:selected={option.toLocaleLowerCase() === normalizedValue}
							class="combobox-option"
							id={`${listboxId}-option-${index}`}
							type="button"
							role="option"
							aria-selected={option.toLocaleLowerCase() === normalizedValue}
							tabindex="-1"
							onpointerdown={(event) => event.preventDefault()}
							onmouseenter={() => (activeIndex = index)}
							onclick={() => selectOption(option)}
						>
							<span class="combobox-option-mark" aria-hidden="true">
								{option.charAt(0).toLocaleUpperCase()}
							</span>
							<span class="combobox-option-name">{option}</span>
							{#if option.toLocaleLowerCase() === normalizedValue}
								<span class="combobox-check" aria-hidden="true">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<p class="combobox-help" id={helperId}>{helperText}</p>
</div>

<style>
	.creatable-combobox {
		min-width: 0;
	}

	.creatable-combobox label {
		display: block;
		margin-bottom: 8px;
		color: #465266;
		font-size: 13px;
		font-weight: 650;
	}

	.combobox-shell {
		position: relative;
	}

	.combobox-control {
		height: 50px;
		display: flex;
		align-items: center;
		border: 1px solid #d9e2dc;
		border-radius: 12px;
		background: #fbfdfc;
		transition:
			border-color 0.2s,
			box-shadow 0.2s,
			background 0.2s;
	}

	.combobox-control:hover {
		border-color: #bdcbc4;
	}

	.combobox-control:focus-within,
	.combobox-control.open {
		border-color: #2ba872;
		background: #fff;
		box-shadow: 0 0 0 3px rgba(43, 168, 114, 0.13);
	}

	.combobox-control input {
		min-width: 0;
		height: 100%;
		flex: 1;
		padding: 0 4px 0 14px;
		border: 0;
		color: #172033;
		background: transparent;
		font: inherit;
		font-size: 15px;
		font-weight: 550;
		outline: 0;
	}

	.combobox-control input::placeholder {
		color: #a4acb6;
	}

	.combobox-toggle {
		width: 42px;
		height: 42px;
		flex: 0 0 42px;
		display: grid;
		place-items: center;
		margin-right: 3px;
		padding: 0;
		border: 0;
		border-radius: 9px;
		color: #687386;
		background: transparent;
		cursor: pointer;
	}

	.combobox-toggle:hover {
		color: #168c59;
		background: #edf7f1;
	}

	.combobox-toggle:focus-visible {
		outline: 2px solid rgba(43, 168, 114, 0.35);
		outline-offset: -2px;
	}

	.combobox-chevron {
		width: 8px;
		height: 8px;
		border-right: 2px solid currentColor;
		border-bottom: 2px solid currentColor;
		transform: translateY(-2px) rotate(45deg);
		transition: transform 0.2s ease;
	}

	.combobox-chevron.open {
		transform: translateY(2px) rotate(225deg);
	}

	.combobox-menu {
		position: absolute;
		z-index: 20;
		top: calc(100% + 7px);
		left: 0;
		width: 100%;
		overflow: hidden;
		border: 1px solid #dbe5df;
		border-radius: 14px;
		background: #fff;
		box-shadow: 0 16px 36px rgba(19, 39, 57, 0.18);
		animation: menu-in 0.16s ease-out;
	}

	.combobox-menu-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 10px 12px 7px;
		color: #778397;
		font-size: 10px;
		font-weight: 750;
		letter-spacing: 0.07em;
		text-transform: uppercase;
	}

	.combobox-menu-heading small {
		min-width: 20px;
		padding: 2px 6px;
		border-radius: 999px;
		color: #168c59;
		background: #eaf7f0;
		font-size: 10px;
		line-height: 1.4;
		text-align: center;
	}

	.combobox-options {
		max-height: min(300px, 50dvh);
		overflow-y: auto;
		padding: 3px 6px 6px;
		scrollbar-width: thin;
		scrollbar-color: #cbd8d1 transparent;
	}

	.combobox-option {
		width: 100%;
		min-height: 44px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px 9px;
		border: 0;
		border-radius: 10px;
		color: #2f3a4d;
		background: transparent;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
	}

	.combobox-option:hover,
	.combobox-option.active {
		color: #116f48;
		background: #eef8f2;
	}

	.combobox-option.selected {
		color: #0d7e4c;
	}

	.combobox-option-mark {
		width: 30px;
		height: 30px;
		flex: 0 0 30px;
		display: grid;
		place-items: center;
		border-radius: 9px;
		color: #138551;
		background: #e7f6ed;
		font-size: 12px;
		font-weight: 750;
	}

	.combobox-option-name {
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.combobox-check {
		color: #15905b;
		font-size: 15px;
		font-weight: 750;
	}

	.combobox-help {
		margin: 6px 1px 0;
		color: #758093;
		font-size: 11.5px;
		font-weight: 500;
		line-height: 1.35;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.99);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	:global(html[data-theme='dark']) .creatable-combobox label {
		color: #b9c5d5;
	}

	:global(html[data-theme='dark']) .combobox-control {
		border-color: #385044;
		background: #0d1723;
	}

	:global(html[data-theme='dark']) .combobox-control:hover {
		border-color: #4b6559;
	}

	:global(html[data-theme='dark']) .combobox-control:focus-within,
	:global(html[data-theme='dark']) .combobox-control.open {
		border-color: #38b985;
		background: #101c2c;
	}

	:global(html[data-theme='dark']) .combobox-control input {
		color: #edf2fa;
	}

	:global(html[data-theme='dark']) .combobox-toggle {
		color: #9eabbd;
	}

	:global(html[data-theme='dark']) .combobox-toggle:hover {
		color: #79d5ac;
		background: #172d27;
	}

	:global(html[data-theme='dark']) .combobox-menu {
		border-color: #34465a;
		background: #152235;
		box-shadow: 0 18px 42px rgba(0, 0, 0, 0.42);
	}

	:global(html[data-theme='dark']) .combobox-menu-heading {
		color: #8f9db0;
	}

	:global(html[data-theme='dark']) .combobox-menu-heading small {
		color: #80d7b0;
		background: #17352a;
	}

	:global(html[data-theme='dark']) .combobox-options {
		scrollbar-color: #45576d transparent;
	}

	:global(html[data-theme='dark']) .combobox-option {
		color: #dbe3ee;
	}

	:global(html[data-theme='dark']) .combobox-option:hover,
	:global(html[data-theme='dark']) .combobox-option.active {
		color: #9de1c2;
		background: #1a332c;
	}

	:global(html[data-theme='dark']) .combobox-option.selected {
		color: #8eddb8;
	}

	:global(html[data-theme='dark']) .combobox-option-mark {
		color: #86dab4;
		background: #1b392f;
	}

	:global(html[data-theme='dark']) .combobox-check {
		color: #79d5aa;
	}

	:global(html[data-theme='dark']) .combobox-help {
		color: #8f9db0;
	}

	@media (prefers-reduced-motion: reduce) {
		.combobox-menu {
			animation: none;
		}

		.combobox-chevron {
			transition: none;
		}
	}
</style>
