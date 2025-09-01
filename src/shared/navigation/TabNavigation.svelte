<script lang="ts">
	export let items: Array<{ key: string; name: string; description?: string }> = []
	export let currentKey: string = ''
	export let onNavigate: (key: string) => void = () => {}

	function handleClick(key: string) {
		onNavigate(key)
	}
</script>

<nav class="tab-navigation">
	<div class="tab-container">
		{#each items as item}
			<button 
				class="tab-item"
				class:active={currentKey === item.key}
				on:click={() => handleClick(item.key)}
			>
				<div class="tab-content">
					<span class="tab-name">{item.name}</span>
					{#if item.description}
						<span class="tab-description">{item.description}</span>
					{/if}
				</div>
				<div class="tab-indicator"></div>
			</button>
		{/each}
	</div>
</nav>

<style>
	.tab-navigation {
		margin-bottom: 2rem;
		padding: 0 1rem;
	}

	.tab-container {
		display: flex;
		gap: 0.75rem;
		overflow-x: auto;
		padding: 0.75rem;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-radius: 16px;
		border: 1px solid rgba(226, 232, 240, 0.8);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
		scrollbar-width: thin;
		scrollbar-color: #cbd5e1 transparent;
		position: relative;
		overflow: hidden;
	}

	.tab-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
		pointer-events: none;
	}

	.tab-container::-webkit-scrollbar {
		height: 8px;
	}

	.tab-container::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 4px;
	}

	.tab-container::-webkit-scrollbar-thumb {
		background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.tab-container::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
	}

	.tab-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 1.25rem 1rem;
		background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
		border: 1px solid rgba(226, 232, 240, 0.8);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 160px;
		flex-shrink: 0;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
	}

	.tab-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		transition: left 0.5s;
		pointer-events: none;
	}

	.tab-item:hover {
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-color: #3b82f6;
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.tab-item:hover::before {
		left: 100%;
	}

	.tab-item.active {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: white;
		border-color: #3b82f6;
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25), 0 4px 10px rgba(0, 0, 0, 0.1);
		transform: translateY(-1px);
	}

	.tab-item.active:hover {
		background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
		border-color: #2563eb;
		box-shadow: 0 12px 35px rgba(59, 130, 246, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15);
		transform: translateY(-2px);
	}

	.tab-item.active .tab-indicator {
		opacity: 1;
		transform: scaleX(1);
	}

	.tab-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.tab-name {
		font-weight: 700;
		font-size: 1rem;
		white-space: nowrap;
		letter-spacing: -0.025em;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.tab-item.active .tab-name {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	.tab-description {
		font-size: 0.8rem;
		opacity: 0.7;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-weight: 500;
		color: #64748b;
	}

	.tab-item.active .tab-description {
		opacity: 0.9;
		color: rgba(255, 255, 255, 0.9);
	}

	.tab-indicator {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 60%;
		height: 3px;
		background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
		border-radius: 2px 2px 0 0;
		opacity: 0;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.tab-navigation {
			padding: 0 0.5rem;
		}

		.tab-container {
			gap: 0.5rem;
			padding: 0.5rem;
			border-radius: 12px;
		}

		.tab-item {
			padding: 1rem 0.75rem;
			min-width: 140px;
		}

		.tab-name {
			font-size: 0.9rem;
		}

		.tab-description {
			font-size: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.tab-container {
			gap: 0.25rem;
			padding: 0.25rem;
		}

		.tab-item {
			min-width: 120px;
			padding: 0.75rem 0.5rem;
		}

		.tab-name {
			font-size: 0.85rem;
		}

		.tab-description {
			display: none; /* 在小屏幕上隐藏描述 */
		}

		.tab-indicator {
			height: 2px;
		}
	}
</style>
