<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	import { 
		onMount, 
		onDestroy, 
		beforeUpdate, 
		afterUpdate,
		tick 
	} from 'svelte';
	
	let count = 0;
	let mounted = false;
	let updateCount = 0;
	let tickCount = 0;
	let logMessages: any[] = [];
	let timer: any;
	
	function addLog(message: any) {
		logMessages = [...logMessages, `${new Date().toLocaleTimeString()}: ${message}`];
	}
	
	// 组件挂载后执行
	onMount(() => {
		mounted = true;
		addLog('组件已挂载 (onMount)');
		
		// 可以在这里进行 API 调用、事件监听等
		timer = setInterval(() => {
			count++;
		}, 2000);
		
		// 返回清理函数
		return () => {
			clearInterval(timer);
			addLog('定时器已清理 (onMount cleanup)');
		};
	});
	
	// 组件销毁前执行
	onDestroy(() => {
		addLog('组件即将销毁 (onDestroy)');
	});
	
	// 更新前执行
	beforeUpdate(() => {
		// 不在这里直接记录日志，避免无限循环
		console.log('组件即将更新 (beforeUpdate)');
	});
	
	// 更新后执行
	afterUpdate(() => {
		updateCount++;
		// 不在这里直接记录日志，避免无限循环
		console.log('组件已更新 (afterUpdate)');
	});
	
	// 等待下一个 tick
	async function handleTick() {
		tickCount++;
		addLog('执行 tick() 前');
		await tick();
		addLog('执行 tick() 后');
	}
	
	function incrementCount() {
		count++;
		addLog('手动增加计算器');
	}
	
	function clearLogs() {
		logMessages = [];
		addLog('日志已清空');
	}
	
	function resetDemo() {
		count = 0;
		updateCount = 0;
		tickCount = 0;
		logMessages = [];
		addLog('演示已重置');
	}
	
	function stopTimer() {
		if (timer) {
			clearInterval(timer);
			timer = null;
			addLog('手动停止定时器');
		}
	}
	
	function startTimer() {
		if (!timer) {
			timer = setInterval(() => {
				count++;
			}, 2000);
			addLog('手动启动定时器');
		}
	}
	
	function triggerUpdate() {
		// 这个函数演示正确的更新方式
		// beforeUpdate和afterUpdate会触发，但不会修改响应式状态
		count++;
		addLog('触发了一次更新 - 查看控制台的beforeUpdate/afterUpdate日志');
	}
</script>

<DemoContainer 
	title="生命周期演示"
	description="学习Svelte组件的生命周期钩子函数，包括onMount、onDestroy、beforeUpdate、afterUpdate和tick函数"
>
	<div slot="demo" class="lifecycle-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>生命周期日志</h4>
				<div class="log-container">
					{#each logMessages as message}
						<div class="log-entry">{message}</div>
					{/each}
					{#if logMessages.length === 0}
						<div class="log-entry empty">暂无日志记录</div>
					{/if}
				</div>
			</div>
			<div class="demo-section">
				<h4>组件状态</h4>
				<div class="status-grid">
					<div class="status-item">
						<span class="status-label">挂载状态:</span>
						<span class="status-value {mounted ? 'mounted' : 'unmounted'}">
							{mounted ? '已挂载' : '未挂载'}
						</span>
					</div>
					<div class="status-item">
						<span class="status-label">自动计算器:</span>
						<span class="status-value">{count}</span>
					</div>
					<div class="status-item">
						<span class="status-label">更新次数:</span>
						<span class="status-value">{updateCount}</span>
					</div>
					<div class="status-item">
						<span class="status-label">Tick调用:</span>
						<span class="status-value">{tickCount}次</span>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>操作按钮</h4>
				<div class="button-grid">
					<button class="action-btn" on:click={incrementCount}>
						手动增加计数
					</button>
					<button class="action-btn" on:click={handleTick}>
						调用 tick()
					</button>
					<button class="action-btn" on:click={startTimer}>
						启动定时器
					</button>
					<button class="action-btn" on:click={stopTimer}>
						停止定时器
					</button>
					<button class="action-btn" on:click={triggerUpdate}>
						测试更新钩子
					</button>
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>定时器控制</h5>
			<button on:click={startTimer}>启动定时器</button>
			<button on:click={stopTimer}>停止定时器</button>
		</div>

		<div class="control-group">
			<h5>计算器控制</h5>
			<button on:click={incrementCount}>增加计数</button>
			<button on:click={() => count = 0}>重置计数</button>
		</div>

		<div class="control-group">
			<h5>日志控制</h5>
			<button on:click={clearLogs}>清空日志</button>
		</div>

		<button class="secondary" on:click={resetDemo}>重置演示</button>
		
		<div class="status-info">
			<strong>当前状态：</strong><br>
			挂载: {mounted ? '是' : '否'}<br>
			定时器: {timer ? '运行中' : '已停止'}<br>
			总更新次数: {updateCount}<br>
			日志条数: {logMessages.length}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>生命周期管理：</strong>通过钩子函数在组件的不同阶段执行特定逻辑</li>
			<li><strong>资源管理：</strong>在组件挂载时初始化资源，销毁时清理资源</li>
			<li><strong>DOM操作时机：</strong>确保在正确的时机操作DOM元素</li>
			<li><strong>副作用控制：</strong>通过生命周期钩子控制副作用的执行时机</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>onMount：</strong>组件挂载到DOM后执行，适合API调用、事件监听、定时器启动</li>
			<li><strong>onDestroy：</strong>组件销毁前执行，适合清理定时器、事件监听、订阅</li>
			<li><strong>beforeUpdate：</strong>组件更新前执行，DOM尚未更新</li>
			<li><strong>afterUpdate：</strong>组件更新后执行，DOM已更新完成</li>
			<li><strong>tick：</strong>等待下一个微任务，确保DOM更新完成</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>资源管理模式：</strong>在挂载时获取资源，销毁时释放资源</li>
			<li><strong>副作用隔离：</strong>将副作用逻辑隔离在生命周期钩子中</li>
			<li><strong>异步操作管理：</strong>通过tick()确保异步操作的执行时机</li>
			<li><strong>清理函数模式：</strong>onMount返回清理函数，自动在销毁时执行</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>及时清理资源，避免内存泄漏</li>
			<li>合理使用beforeUpdate/afterUpdate，避免频繁触发</li>
			<li>使用tick()等待DOM更新，避免直接操作DOM</li>
			<li>避免在生命周期钩子中进行复杂计算</li>
		</ul>
		
		<p><strong>🛠️ 使用场景：</strong></p>
		<ul>
			<li><strong>数据获取：</strong>在onMount中调用API获取数据</li>
			<li><strong>事件监听：</strong>在onMount中添加事件监听，onDestroy中移除</li>
			<li><strong>定时器管理：</strong>在onMount中启动定时器，onDestroy中清理</li>
			<li><strong>DOM操作：</strong>使用tick()等待DOM更新后操作元素</li>
			<li><strong>第三方库集成：</strong>在生命周期钩子中初始化和清理第三方库</li>
		</ul>
		
		<p><strong>🎨 最佳实践：</strong></p>
		<ul>
			<li>在onMount中进行初始化操作，返回清理函数</li>
			<li>在onDestroy中清理所有资源，防止内存泄漏</li>
			<li>使用tick()确保DOM更新完成后再进行操作</li>
			<li>避免在beforeUpdate/afterUpdate中修改响应式变量</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li><strong>避免在beforeUpdate/afterUpdate中修改响应式变量</strong> - 会导致无限循环</li>
			<li>这些钩子会在每次状态变化时触发，要谨慎使用</li>
			<li>如需在更新时记录日志，建议使用console.log而不是修改组件状态</li>
			<li>确保所有资源都能在组件销毁时得到清理</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  import &#123; onMount, onDestroy, tick &#125; from 'svelte';
  
  let timer;
  
  // 组件挂载后执行
  onMount(() =&gt; &#123;
    console.log('组件已挂载');
    
    // 启动定时器
    timer = setInterval(() =&gt; &#123;
      count++;
    &#125;, 1000);
    
    // 返回清理函数
    return () =&gt; &#123;
      clearInterval(timer);
    &#125;;
  &#125;);
  
  // 组件销毁前执行
  onDestroy(() =&gt; &#123;
    console.log('组件即将销毁');
  &#125;);
  
  // 等待DOM更新
  async function handleClick() &#123;
    count++;
    await tick();
    // DOM已更新
  &#125;
&lt;/script&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.lifecycle-demo {
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

	.status-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 12px;
	}

	.status-item {
		background: white;
		padding: 12px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.status-label {
		font-weight: 500;
		color: #666;
	}

	.status-value {
		font-weight: 600;
		color: #333;
	}

	.status-value.mounted {
		color: #28a745;
	}

	.status-value.unmounted {
		color: #dc3545;
	}

	.button-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 12px;
	}

	.action-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 10px 16px;
		border-radius: 6px;
		font-size: 0.9em;
		cursor: pointer;
		transition: background 0.2s;
	}

	.action-btn:hover {
		background: #0056b3;
	}

	.log-container {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		padding: 12px;
		height: 200px;
		overflow-y: auto;
		font-family: monospace;
		font-size: 0.85em;
	}

	.log-entry {
		padding: 4px 0;
		border-bottom: 1px solid #f8f9fa;
		color: #333;
	}

	.log-entry:last-child {
		border-bottom: none;
	}

	.log-entry.empty {
		color: #666;
		font-style: italic;
		text-align: center;
		padding: 20px 0;
	}

	.control-group {
		margin-bottom: 16px;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
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
		.status-grid {
			grid-template-columns: 1fr;
		}

		.button-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
