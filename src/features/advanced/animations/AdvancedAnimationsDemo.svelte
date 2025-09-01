<script lang="ts">
	import DemoContainer from '@/components/DemoContainer.svelte';
	import { fly, fade, slide, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	
	let showBox = true;
	let items = [
		{ id: 1, text: '项目 1', color: '#ff6b6b' },
		{ id: 2, text: '项目 2', color: '#4ecdc4' },
		{ id: 3, text: '项目 3', color: '#45b7d1' },
		{ id: 4, text: '项目 4', color: '#96ceb4' },
		{ id: 5, text: '项目 5', color: '#feca57' }
	];
	
	let selectedTransition = 'fade';
	let currentId = 6;
	
	const transitions = {
		fade: { name: 'fade', fn: fade },
		fly: { name: 'fly', fn: fly },
		slide: { name: 'slide', fn: slide },
		scale: { name: 'scale', fn: scale }
	};
	
	function toggleBox() {
		showBox = !showBox;
	}
	
	function addItem() {
		const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#f7b801', '#a55eea'];
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		items = [...items, { 
			id: currentId++, 
			text: `项目 ${currentId - 1}`, 
			color: randomColor 
		}];
	}
	
	function removeItem(id: any) {
		items = items.filter(item => item.id !== id);
	}
	
	function shuffleItems() {
		items = [...items].sort(() => Math.random() - 0.5);
	}
	
	function resetItems() {
		items = [
			{ id: 1, text: '项目 1', color: '#ff6b6b' },
			{ id: 2, text: '项目 2', color: '#4ecdc4' },
			{ id: 3, text: '项目 3', color: '#45b7d1' },
			{ id: 4, text: '项目 4', color: '#96ceb4' },
			{ id: 5, text: '项目 5', color: '#feca57' }
		];
		currentId = 6;
		showBox = true;
	}
	
	function getTransitionParams() {
		switch (selectedTransition) {
			case 'fly':
				return { y: 200, duration: 300 };
			case 'slide':
				return { duration: 300 };
			case 'scale':
				return { duration: 300, opacity: 0.5, start: 0.5 };
			default:
				return { duration: 300 };
		}
	}
</script>

<DemoContainer 
	title="动画过渡演示"
	description="学习Svelte的动画系统，包括transition、animation和自定义动画效果"
>
	<div slot="demo" class="animations-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>基础过渡动画</h4>
				<div class="transition-demo">
					<div class="controls">
						<button class="toggle-btn" on:click={toggleBox}>
							{showBox ? '隐藏' : '显示'} 方块
						</button>
						<select bind:value={selectedTransition}>
							<option value="fade">淡入淡出</option>
							<option value="fly">飞入飞出</option>
							<option value="slide">滑入滑出</option>
							<option value="scale">缩放</option>
						</select>
					</div>
					
					<div class="animation-area">
						{#if showBox}
							<div 
								class="demo-box"
								in:fade={getTransitionParams()}
								out:fade={getTransitionParams()}
							>
								<span>{selectedTransition.toUpperCase()}</span>
								<span>过渡动画</span>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>列表动画 (flip + transition)</h4>
				<div class="list-demo">
					<div class="list-controls">
						<button on:click={addItem}>添加项目</button>
						<button on:click={shuffleItems}>随机排序</button>
						<button on:click={resetItems}>重置列表</button>
					</div>
					
					<div class="animated-list">
						{#each items as item (item.id)}
							<div 
								class="list-item"
								style="background-color: {item.color}"
								animate:flip={{ duration: 400, easing: quintOut }}
								in:scale={{ duration: 300 }}
								out:fade={{ duration: 200 }}
							>
								<span>{item.text}</span>
								<button 
									class="remove-btn"
									on:click={() => removeItem(item.id)}
								>×</button>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>CSS动画示例</h4>
				<div class="css-animations">
					<div class="spinner"></div>
					<div class="pulse-circle"></div>
					<div class="bounce-ball"></div>
					<div class="wave">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>过渡控制</h5>
			<button on:click={toggleBox}>切换显示</button>
			<select bind:value={selectedTransition}>
				<option value="fade">淡入淡出</option>
				<option value="fly">飞入飞出</option>
				<option value="slide">滑入滑出</option>
				<option value="scale">缩放</option>
			</select>
		</div>

		<div class="control-group">
			<h5>列表操作</h5>
			<button on:click={addItem}>添加项目</button>
			<button on:click={shuffleItems}>打乱顺序</button>
			<button on:click={resetItems}>重置列表</button>
		</div>

		<button class="secondary" on:click={resetItems}>重置演示</button>
		
		<div class="status-info">
			<strong>动画状态：</strong><br>
			方块显示: {showBox ? '是' : '否'}<br>
			当前过渡: {selectedTransition}<br>
			列表项数: {items.length}个<br>
			CSS动画: 4个运行中
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>动画系统架构：</strong>基于Svelte的transition、animation和action三大动画机制</li>
			<li><strong>状态驱动动画：</strong>通过响应式状态变化自动触发相应的动画效果</li>
			<li><strong>参数化配置：</strong>支持动态配置动画参数，实现灵活的动画控制</li>
			<li><strong>性能优化：</strong>使用CSS transform和opacity实现硬件加速动画</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>Transition系统：</strong>处理元素进入/离开DOM时的过渡效果</li>
			<li><strong>Animation系统：</strong>处理列表项位置变化时的FLIP动画</li>
			<li><strong>Action机制：</strong>自定义动画逻辑，实现复杂的交互效果</li>
			<li><strong>CSS动画：</strong>结合CSS keyframes实现持续动画效果</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>声明式动画：</strong>通过指令声明动画效果，而非命令式控制</li>
			<li><strong>组合模式：</strong>将多个动画效果组合使用，创建复杂动画</li>
			<li><strong>参数化设计：</strong>通过配置对象实现动画参数的自定义</li>
			<li><strong>响应式动画：</strong>动画效果随状态变化自动响应</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>使用CSS transform和opacity实现硬件加速</li>
			<li>合理设置动画时长，避免过长影响用户体验</li>
			<li>使用will-change属性优化动画性能</li>
			<li>避免在动画过程中触发重排和重绘</li>
		</ul>
		
		<p><strong>🛠️ 常用动画类型：</strong></p>
		<ul>
			<li><strong>fade：</strong>透明度变化，适合淡入淡出效果</li>
			<li><strong>fly：</strong>位移+透明度，适合飞入飞出效果</li>
			<li><strong>slide：</strong>高度/宽度变化，适合展开收起效果</li>
			<li><strong>scale：</strong>缩放变化，适合放大缩小效果</li>
			<li><strong>flip：</strong>列表位置变化，适合排序重排效果</li>
		</ul>
		
		<p><strong>🎨 动画设计原则：</strong></p>
		<ul>
			<li>保持动画时长在300ms以内，确保响应性</li>
			<li>使用缓动函数(easing)让动画更自然</li>
			<li>避免过度动画，保持界面简洁</li>
			<li>考虑用户偏好，支持减少动画设置</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  import &#123; fly, fade, scale &#125; from 'svelte/transition';
  import &#123; flip &#125; from 'svelte/animate';
  
  let showBox = true;
  let items = [&#123; id: 1, text: '项目1' &#125;];
&lt;/script&gt;

&lt;!-- 基础过渡 --&gt;
&#123;#if showBox&#125;
  &lt;div 
    in:fly=&#123;&#123; y: 200, duration: 300 &#125;&#125;
    out:fade=&#123;&#123; duration: 200 &#125;&#125;
  &gt;
    内容
  &lt;/div&gt;
&#123;/if&#125;

&lt;!-- 列表动画 --&gt;
&#123;#each items as item (item.id)&#125;
  &lt;div 
    animate:flip=&#123;&#123; duration: 400 &#125;&#125;
    in:scale=&#123;&#123; duration: 300 &#125;&#125;
  &gt;
    &#123;item.text&#125;
  &lt;/div&gt;
&#123;/each&#125;</code></pre>
	</div>
</DemoContainer>

<style>
	.animations-demo {
		padding: 20px;
		min-height: 500px;
	}

	.demo-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.demo-section {
		background: #f8f9fa;
		padding: 20px;
		border-radius: 8px;
		border: 1px solid #e9ecef;
	}

	h4 {
		margin: 0 0 16px 0;
		color: #333;
		font-size: 1.1em;
	}

	h5 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.9em;
	}

	.transition-demo {
		background: white;
		padding: 20px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.controls {
		display: flex;
		gap: 12px;
		margin-bottom: 20px;
		align-items: center;
		justify-content: center;
	}

	.toggle-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}

	.controls select {
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.animation-area {
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		border-radius: 6px;
		position: relative;
	}

	.demo-box {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 20px;
		border-radius: 8px;
		text-align: center;
		min-width: 120px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.demo-box span {
		display: block;
		font-weight: 600;
	}

	.list-demo {
		background: white;
		padding: 20px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.list-controls {
		display: flex;
		gap: 12px;
		margin-bottom: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.list-controls button {
		background: #28a745;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9em;
	}

	.list-controls button:hover {
		background: #218838;
	}

	.animated-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-height: 200px;
		overflow-y: auto;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		border-radius: 6px;
		color: white;
		font-weight: 500;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.remove-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		cursor: pointer;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.css-animations {
		background: white;
		padding: 20px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}

	/* CSS 动画 */
	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #007bff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.pulse-circle {
		width: 40px;
		height: 40px;
		background: #28a745;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.3); opacity: 0.6; }
	}

	.bounce-ball {
		width: 40px;
		height: 40px;
		background: #ffc107;
		border-radius: 50%;
		animation: bounce 1s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-20px); }
	}

	.wave {
		display: flex;
		gap: 4px;
	}

	.wave span {
		width: 8px;
		height: 40px;
		background: #dc3545;
		border-radius: 4px;
		animation: wave 1.2s ease-in-out infinite;
	}

	.wave span:nth-child(2) {
		animation-delay: 0.1s;
	}

	.wave span:nth-child(3) {
		animation-delay: 0.2s;
	}

	@keyframes wave {
		0%, 100% { transform: scaleY(1); }
		50% { transform: scaleY(0.3); }
	}

	.control-group {
		margin-bottom: 16px;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.control-group select {
		width: 100%;
		padding: 6px;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-top: 8px;
	}

	.status-info {
		background: #f8f9fa;
		padding: 12px;
		border-radius: 6px;
		margin-top: 16px;
		font-size: 0.9em;
		line-height: 1.6;
		border: 1px solid #e9ecef;
	}

	pre {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 4px;
		padding: 12px;
		margin: 0;
		font-size: 0.8em;
		overflow-x: auto;
		line-height: 1.4;
	}

	code {
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		color: #333;
	}

	@media (max-width: 768px) {
		.controls {
			flex-direction: column;
		}

		.list-controls {
			flex-direction: column;
		}

		.css-animations {
			justify-content: center;
			gap: 30px;
		}
	}
</style>
