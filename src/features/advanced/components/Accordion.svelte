<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	
	// 复合组件的 Context - 使用字符串key确保一致性
	export const accordionContext = 'accordion-context';
	
	export let multiple = false;
	export let defaultOpen = [];
	
	const openItems = writable(new Set(defaultOpen));
	const { subscribe, set, update } = openItems;
	
	function toggleItem(id) {
		update(current => {
			const newSet = new Set(current);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				if (!multiple) {
					newSet.clear();
				}
				newSet.add(id);
			}
			return newSet;
		});
	}
	
	function isOpen(id) {
		let open = false;
		subscribe(current => {
			open = current.has(id);
		})();
		return open;
	}
	
	setContext(accordionContext, { openItems, toggleItem, isOpen });
</script>

<div class="accordion" class:multiple>
	<slot />
</div>

<style>
	.accordion {
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.accordion.multiple .accordion-item:not(:last-child) {
		border-bottom: 1px solid #ddd;
	}
</style>
