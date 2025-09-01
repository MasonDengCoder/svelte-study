<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	export let type = 'text';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let required = false;
	export let disabled = false;
	export let error = '';
	export let helpText = '';
	export let variant = 'default'; // default, success, warning, error
	export let size = 'medium'; // small, medium, large
	
	// 根据变体和尺寸确定样式类
	$: inputClass = `tutorial-input ${variant} ${size}`;
	$: containerClass = `input-container ${variant}`;
	
	function handleInput(event) {
		value = event.target.value;
		dispatch('input', { value, event });
	}
	
	function handleChange(event) {
		dispatch('change', { value, event });
	}
	
	function handleFocus(event) {
		dispatch('focus', { value, event });
	}
	
	function handleBlur(event) {
		dispatch('blur', { value, event });
	}
</script>

<div class={containerClass}>
	{#if label}
		<label class="input-label" for="input-{Math.random().toString(36).substr(2, 9)}">
			{label}
			{#if required}
				<span class="required-mark">*</span>
			{/if}
		</label>
	{/if}
	
	<div class="input-wrapper">
		<input
			id="input-{Math.random().toString(36).substr(2, 9)}"
			class={inputClass}
			{type}
			{placeholder}
			bind:value
			{required}
			{disabled}
			on:input={handleInput}
			on:change={handleChange}
			on:focus={handleFocus}
			on:blur={handleBlur}
		/>
		
		{#if variant === 'error' && error}
			<span class="error-icon">⚠️</span>
		{/if}
		
		{#if variant === 'success'}
			<span class="success-icon">✅</span>
		{/if}
	</div>
	
	{#if error}
		<p class="error-message">{error}</p>
	{/if}
	
	{#if helpText}
		<p class="help-text">{helpText}</p>
	{/if}
</div>

<style>
	.input-container {
		margin-bottom: 20px;
	}
	
	.input-label {
		display: block;
		margin-bottom: 8px;
		font-weight: 500;
		color: #333;
		font-size: 1em;
	}
	
	.required-mark {
		color: #dc3545;
		margin-left: 4px;
	}
	
	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}
	
	.tutorial-input {
		width: 100%;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		background: #f8f9fa;
		transition: all 0.3s ease;
		font-family: inherit;
		box-sizing: border-box;
	}
	
	.tutorial-input:focus {
		outline: none;
		border-color: #667eea;
		background: white;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}
	
	.tutorial-input:disabled {
		background: #f5f5f5;
		color: #999;
		cursor: not-allowed;
	}
	
	/* 尺寸变体 */
	.tutorial-input.small {
		padding: 8px 12px;
		font-size: 14px;
	}
	
	.tutorial-input.medium {
		padding: 12px 16px;
		font-size: 16px;
	}
	
	.tutorial-input.large {
		padding: 16px 20px;
		font-size: 18px;
	}
	
	/* 样式变体 */
	.tutorial-input.default:focus {
		border-color: #667eea;
	}
	
	.tutorial-input.success {
		border-color: #28a745;
	}
	
	.tutorial-input.success:focus {
		border-color: #28a745;
		box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
	}
	
	.tutorial-input.warning {
		border-color: #ffc107;
	}
	
	.tutorial-input.warning:focus {
		border-color: #ffc107;
		box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
	}
	
	.tutorial-input.error {
		border-color: #dc3545;
	}
	
	.tutorial-input.error:focus {
		border-color: #dc3545;
		box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
	}
	
	.error-icon, .success-icon {
		position: absolute;
		right: 12px;
		font-size: 1.1em;
		pointer-events: none;
	}
	
	.error-icon {
		color: #dc3545;
	}
	
	.success-icon {
		color: #28a745;
	}
	
	.error-message {
		margin: 5px 0 0 0;
		color: #dc3545;
		font-size: 0.9em;
		display: flex;
		align-items: center;
		gap: 5px;
	}
	
	.help-text {
		margin: 5px 0 0 0;
		color: #666;
		font-size: 0.9em;
		line-height: 1.4;
	}
	
	/* 响应式设计 */
	@media (max-width: 768px) {
		.tutorial-input.medium {
			padding: 10px 14px;
			font-size: 16px; /* 防止iOS缩放 */
		}
		
		.tutorial-input.large {
			padding: 14px 18px;
			font-size: 16px;
		}
	}
</style>
