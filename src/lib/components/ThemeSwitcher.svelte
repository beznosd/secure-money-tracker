<script lang="ts">
	let { id = 'theme-toggle' }: { id?: string } = $props();
</script>

<input class="theme-switcher__input" type="checkbox" {id} aria-label="Use dark theme" />

<label class="theme-switcher" for={id}>
	<span class="theme-switcher__option theme-switcher__option--light">
		<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.72 5.28l-1.42 1.42M6.7 17.3l-1.42 1.42M18.72 18.72l-1.42-1.42M6.7 6.7 5.28 5.28"/></svg>
		Light
	</span>
	<span class="theme-switcher__track"><span></span></span>
	<span class="theme-switcher__option theme-switcher__option--dark">Dark</span>
</label>

<style>
	.theme-switcher__input { position: fixed; opacity: 0; pointer-events: none; }
	.theme-switcher { width: 256px; height: 60px; padding: 7px 18px 7px 13px; border: 1px solid var(--line, #e1e8f1); border-radius: 18px; display: flex; align-items: center; gap: 11px; background: var(--surface, #fff); box-shadow: 0 2px 4px rgba(7, 24, 58, .03); color: var(--ink, #061636); cursor: pointer; transition: border-color .25s, background .25s, transform .2s; }
	.theme-switcher:hover { transform: translateY(-2px); border-color: #b7c7dc; }
	.theme-switcher__option { font-size: 18px; line-height: 1; font-weight: 500; display: flex; align-items: center; gap: 9px; }
	.theme-switcher__option svg { width: 34px; height: 34px; padding: 8px; stroke: #5b6571; stroke-width: 1.6; fill: none; background: #f1f7f4; border-radius: 50%; }
	.theme-switcher__option--dark { margin-left: 2px; }
	.theme-switcher__track { width: 61px; height: 33px; padding: 3px; border-radius: 999px; background: #e6ebf2; transition: background .3s; }
	.theme-switcher__track span { width: 27px; height: 27px; display: block; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0, 0, 0, .15); transition: transform .3s ease; }
	.theme-switcher__input:checked + .theme-switcher .theme-switcher__track { background: #2a7bf0; }
	.theme-switcher__input:checked + .theme-switcher .theme-switcher__track span { transform: translateX(28px); }
	.theme-switcher__input:checked + .theme-switcher .theme-switcher__option--light { opacity: .55; }
	.theme-switcher__input:not(:checked) + .theme-switcher .theme-switcher__option--dark { opacity: .55; }
</style>
