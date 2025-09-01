<script lang="ts">
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	
	// 使用与Accordion组件相同的context key
	const accordionContext = 'accordion-context';
	const { openItems, toggleItem, isOpen } = getContext(accordionContext);
	
	export let id;
	export let title;
	
	$: open = $openItems.has(id);
</script>

<div class="accordion-item">
	<button 
		class="accordion-header"
		class:open
		on:click={() => toggleItem(id)}
		aria-expanded={open}
	>
		<span class="title">{title}</span>
		<span class="icon">{open ? '−' : '+'}</span>
	</button>
	
	{#if open}
		<div class="accordion-content" transition:slide={{ duration: 300 }}>
			<div class="content-inner">
				<slot />
			</div>
		</div>
	{/if}
</div>

<style>
	.accordion-item {
		background: white;
	}
	
	.accordion-header {
		width: 100%;
		padding: 15px 20px;
		background: none;
		border: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	
	.accordion-header:hover {
		background: #f8f9fa;
	}
	
	.accordion-header.open {
		background: #e9ecef;
	}
	
	.title {
		font-weight: 500;
		color: #333;
	}
	
	.icon {
		font-size: 20px;
		font-weight: bold;
		color: #666;
		transition: transform 0.3s;
	}
	
	.accordion-header.open .icon {
		transform: rotate(180deg);
	}
	
	.accordion-content {
		overflow: hidden;
	}
	
	.content-inner {
		padding: 20px;
		color: #666;
		line-height: 1.6;
	}
</style>
