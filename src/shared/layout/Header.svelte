<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let showStatus = false;
	export let statusText = '';
</script>

<header class="demo-header">
	<h1>{title}</h1>
	<p>{subtitle}</p>
	{#if showStatus && statusText}
		<div class="status-display">
			{statusText}
		</div>
	{/if}
</header>

<style>
	.demo-header {
		text-align: center;
		margin-bottom: 40px;
		padding: 40px 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 16px;
	}
	
	.demo-header h1 {
		margin: 0 0 16px 0;
		font-size: 2.5rem;
		font-weight: 700;
	}
	
	.demo-header p {
		margin: 0;
		font-size: 1.2rem;
		opacity: 0.9;
	}
	
	.status-display {
		margin-top: 16px;
		padding: 8px 16px;
		background: rgba(255,255,255,0.2);
		border-radius: 20px;
		font-size: 0.9em;
	}
	
	@media (max-width: 768px) {
		.demo-header h1 {
			font-size: 2rem;
		}
		
		.demo-header p {
			font-size: 1rem;
		}
	}
</style>
