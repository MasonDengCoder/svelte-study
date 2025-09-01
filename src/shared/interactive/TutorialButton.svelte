<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let variant = 'primary'; // primary, secondary, success, warning, danger
	export let size = 'medium'; // small, medium, large
	export let disabled = false;
	export let loading = false;
	export let icon = '';
	export let iconPosition = 'left'; // left, right
	
	// 根据变体和尺寸确定样式类
	$: buttonClass = `tutorial-button ${variant} ${size}`;
	
	function handleClick(event) {
		if (!disabled && !loading) {
			dispatch('click', event);
		}
	}
</script>

<button 
	class={buttonClass}
	class:disabled
	class:loading
	on:click={handleClick}
	{disabled}
	{type}
>
	{#if loading}
		<span class="loading-spinner"></span>
	{:else}
		{#if icon && iconPosition === 'left'}
			<span class="button-icon left">{icon}</span>
		{/if}
		
		<span class="button-text">
			<slot />
		</span>
		
		{#if icon && iconPosition === 'right'}
			<span class="button-icon right">{icon}</span>
		{/if}
	{/if}
</button>

<style>
	.tutorial-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border: none;
		border-radius: 25px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		font-family: inherit;
	}
	
	.tutorial-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none !important;
		box-shadow: none !important;
	}
	
	.tutorial-button.loading {
		cursor: wait;
	}
	
	/* 尺寸变体 */
	.tutorial-button.small {
		padding: 8px 16px;
		font-size: 14px;
		min-width: 100px;
	}
	
	.tutorial-button.medium {
		padding: 12px 24px;
		font-size: 16px;
		min-width: 140px;
	}
	
	.tutorial-button.large {
		padding: 16px 32px;
		font-size: 18px;
		min-width: 180px;
	}
	
	/* 样式变体 */
	.tutorial-button.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}
	
	.tutorial-button.primary:hover:not(:disabled):not(.loading) {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
	}
	
	.tutorial-button.secondary {
		background: white;
		color: #333;
		border: 2px solid #e0e0e0;
	}
	
	.tutorial-button.secondary:hover:not(:disabled):not(.loading) {
		border-color: #667eea;
		color: #667eea;
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
	}
	
	.tutorial-button.success {
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
		color: white;
	}
	
	.tutorial-button.success:hover:not(:disabled):not(.loading) {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
	}
	
	.tutorial-button.warning {
		background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
		color: #856404;
	}
	
	.tutorial-button.warning:hover:not(:disabled):not(.loading) {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
	}
	
	.tutorial-button.danger {
		background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
		color: white;
	}
	
	.tutorial-button.danger:hover:not(:disabled):not(.loading) {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
	}
	
	.button-icon {
		font-size: 1.1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.button-text {
		white-space: nowrap;
	}
	
	.loading-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	/* 响应式设计 */
	@media (max-width: 768px) {
		.tutorial-button.medium {
			padding: 10px 20px;
			font-size: 15px;
			min-width: 120px;
		}
		
		.tutorial-button.large {
			padding: 14px 28px;
			font-size: 16px;
			min-width: 160px;
		}
	}
</style>
