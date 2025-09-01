<script lang="ts">
	import LongPressDemo from './LongPressDemo.svelte';
	import DraggableDemo from './DraggableDemo.svelte';
</script>

<div class="actions-advanced">
	<h1>Svelte Actions 演示</h1>
	
	<LongPressDemo />
	<DraggableDemo />
</div>

<style>
	.actions-advanced {
		padding: 20px;
	}
	
	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 40px;
	}
</style>
