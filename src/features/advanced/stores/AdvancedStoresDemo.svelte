<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	import { writable, derived, readable } from 'svelte/store';
	
	// 基础可写store
	const count = writable(0);
	const name = writable('Svelte');
	
	// 派生store - 自动计算
	const doubled = derived(count, $count => $count * 2);
	const greeting = derived([name, count], ([$name, $count]) => 
		`Hello ${$name}! Count is ${$count}`
	);
	
	// 自定义store
	function createCounterStore(initialValue = 0) {
		const { subscribe, set, update } = writable(initialValue);
		
		return {
			subscribe,
			increment: () => update(n => n + 1),
			decrement: () => update(n => n - 1),
			reset: () => set(initialValue),
			set: (value: any) => set(value),
			double: () => update(n => n * 2)
		};
	}
	
	const customCounter = createCounterStore(0);
	
	// 可读store - 时间示例
	const time = readable(new Date(), function start(set) {
		const interval = setInterval(() => {
			set(new Date());
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	});
	
	// 本地状态
	let currentCount = 0;
	let currentName = '';
	let storeHistory: any[] = [];
	
	// 订阅store变化
	count.subscribe(value => {
		currentCount = value;
		addHistory(`Count changed to: ${value}`);
	});
	
	name.subscribe(value => {
		currentName = value;
		addHistory(`Name changed to: "${value}"`);
	});
	
	function addHistory(message: any) {
		storeHistory = [...storeHistory, `${new Date().toLocaleTimeString()}: ${message}`];
	}
	
	// 操作函数
	function incrementCount() {
		count.update(n => n + 1);
	}
	
	function decrementCount() {
		count.update(n => n - 1);
	}
	
	function resetCount() {
		count.set(0);
	}
	
	function setRandomCount() {
		count.set(Math.floor(Math.random() * 100));
	}
	
	function updateName(newName: any) {
		name.set(newName);
	}
	
	function clearHistory() {
		storeHistory = [];
		addHistory('History cleared');
	}
	
	function resetDemo() {
		count.set(0);
		name.set('Svelte');
		customCounter.reset();
		storeHistory = [];
		addHistory('Demo reset');
	}
</script>

<DemoContainer 
	title="状态管理演示"
	description="学习Svelte的状态管理系统，包括writable、derived、readable store和自定义store的使用"
>
	<div slot="demo" class="stores-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>基础Writable Store</h4>
				<div class="store-display">
					<div class="store-item">
						<span class="label">计算器:</span>
						<span class="value">{$count}</span>
					</div>
					<div class="store-item">
						<span class="label">名称:</span>
						<span class="value">"{$name}"</span>
					</div>
					<div class="button-group">
						<button on:click={incrementCount}>+1</button>
						<button on:click={decrementCount}>-1</button>
						<button on:click={resetCount}>重置</button>
						<button on:click={setRandomCount}>随机</button>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>Derived Store (派生状态)</h4>
				<div class="store-display">
					<div class="store-item">
						<span class="label">双倍计数:</span>
						<span class="value">{$doubled}</span>
					</div>
					<div class="store-item">
						<span class="label">组合问候:</span>
						<span class="value">"{$greeting}"</span>
					</div>
					<div class="input-group">
						<input 
							type="text" 
							value={$name}
							on:input={(e) => updateName((e.target as any)?.value)}
							placeholder="输入名称"
						/>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>自定义Store</h4>
				<div class="store-display">
					<div class="store-item">
						<span class="label">自定义计算器:</span>
						<span class="value">{$customCounter}</span>
					</div>
					<div class="button-group">
						<button on:click={customCounter.increment}>+1</button>
						<button on:click={customCounter.decrement}>-1</button>
						<button on:click={customCounter.double}>×2</button>
						<button on:click={customCounter.reset}>重置</button>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>Readable Store (时间)</h4>
				<div class="store-display">
					<div class="store-item">
						<span class="label">当前时间:</span>
						<span class="value">{$time.toLocaleTimeString()}</span>
					</div>
					<div class="store-item">
						<span class="label">日期:</span>
						<span class="value">{$time.toLocaleDateString()}</span>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>Store变化历史</h4>
				<div class="history-container">
					{#each storeHistory.slice(-5) as entry}
						<div class="history-entry">{entry}</div>
					{/each}
					{#if storeHistory.length === 0}
						<div class="history-entry empty">暂无历史记录</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>计算器操作</h5>
			<button on:click={incrementCount}>增加</button>
			<button on:click={decrementCount}>减少</button>
			<button on:click={setRandomCount}>随机数</button>
		</div>

		<div class="control-group">
			<h5>自定义Store</h5>
			<button on:click={customCounter.increment}>自定义+1</button>
			<button on:click={customCounter.double}>自定义×2</button>
			<button on:click={customCounter.reset}>自定义重置</button>
		</div>

		<div class="control-group">
			<h5>历史记录</h5>
			<button on:click={clearHistory}>清空历史</button>
		</div>

		<button class="secondary" on:click={resetDemo}>重置演示</button>
		
		<div class="status-info">
			<strong>Store状态：</strong><br>
			基础计数: {$count}<br>
			派生值: {$doubled}<br>
			自定义计数: {$customCounter}<br>
			历史条数: {storeHistory.length}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>响应式状态管理：</strong>基于观察者模式实现状态变化自动通知订阅者</li>
			<li><strong>Store类型分层：</strong>writable、derived、readable三种类型满足不同需求</li>
			<li><strong>自动订阅机制：</strong>使用$前缀实现自动订阅和取消订阅</li>
			<li><strong>组合式API：</strong>通过组合多个store创建复杂的状态逻辑</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>Writable Store：</strong>可读写的响应式存储，支持set和update操作</li>
			<li><strong>Derived Store：</strong>基于其他store计算的只读存储，自动追踪依赖</li>
			<li><strong>Readable Store：</strong>只读存储，通常用于外部数据源或复杂逻辑</li>
			<li><strong>自定义Store：</strong>封装特定业务逻辑的store，提供专用API</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>观察者模式：</strong>Store作为被观察者，组件作为观察者</li>
			<li><strong>发布订阅模式：</strong>通过subscribe方法实现松耦合的状态管理</li>
			<li><strong>工厂模式：</strong>通过createCounter等工厂函数创建专用store</li>
			<li><strong>组合模式：</strong>通过derived store组合多个store的状态</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>自动订阅机制避免内存泄漏</li>
			<li>derived store的惰性计算，只在依赖变化时重新计算</li>
			<li>合理使用store粒度，避免过度细粒度</li>
			<li>使用store组合而非单个大store，提高可维护性</li>
		</ul>
		
		<p><strong>🛠️ 使用场景：</strong></p>
		<ul>
			<li><strong>全局状态：</strong>用户信息、主题设置、语言偏好</li>
			<li><strong>应用状态：</strong>路由状态、加载状态、错误状态</li>
			<li><strong>数据缓存：</strong>API数据、计算结果、用户输入</li>
			<li><strong>组件通信：</strong>跨组件状态共享、事件总线</li>
		</ul>
		
		<p><strong>🎨 最佳实践：</strong></p>
		<ul>
			<li>使用$前缀自动订阅：<code>&#123;$count&#125;</code></li>
			<li>手动订阅管理：<code>store.subscribe(value => ...)</code></li>
			<li>状态更新：<code>store.set(value)</code> 或 <code>store.update(fn)</code></li>
			<li>组合多个store：<code>derived([store1, store2], ([$s1, $s2]) => ...)</code></li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>避免在store中存储过大的数据，影响性能</li>
			<li>合理设计store的粒度，避免过度抽象</li>
			<li>注意store的生命周期管理，及时清理订阅</li>
			<li>避免循环依赖，合理设计store之间的关系</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  import &#123; writable, derived &#125; from 'svelte/store';
  
  // 创建可写store
  const count = writable(0);
  
  // 创建派生store
  const doubled = derived(count, $count =&gt; $count * 2);
  
  // 自定义store
  function createCounter(initial = 0) &#123;
    const &#123; subscribe, set, update &#125; = writable(initial);
    
    return &#123;
      subscribe,
      increment: () =&gt; update(n =&gt; n + 1),
      reset: () =&gt; set(initial)
    &#125;;
  &#125;
  
  const counter = createCounter(0);
&lt;/script&gt;

&lt;!-- 使用store --&gt;
&lt;p&gt;计数: &#123;$count&#125;&lt;/p&gt;
&lt;p&gt;双倍: &#123;$doubled&#125;&lt;/p&gt;
&lt;button on:click=&#123;counter.increment&#125;&gt;+1&lt;/button&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.stores-demo {
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

	.store-display {
		background: white;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.store-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		margin-bottom: 8px;
		background: #f8f9fa;
		border-radius: 4px;
	}

	.store-item:last-child {
		margin-bottom: 12px;
	}

	.label {
		font-weight: 500;
		color: #666;
	}

	.value {
		font-weight: 600;
		color: #333;
		font-family: monospace;
	}

	.button-group {
		display: flex;
		gap: 8px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.button-group button {
		background: #007bff;
		color: white;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 0.9em;
		cursor: pointer;
		transition: background 0.2s;
	}

	.button-group button:hover {
		background: #0056b3;
	}

	.input-group {
		margin-top: 12px;
	}

	.input-group input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.history-container {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		padding: 12px;
		height: 150px;
		overflow-y: auto;
		font-family: monospace;
		font-size: 0.85em;
	}

	.history-entry {
		padding: 2px 0;
		color: #333;
		border-bottom: 1px solid #f8f9fa;
	}

	.history-entry:last-child {
		border-bottom: none;
	}

	.history-entry.empty {
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
		.button-group {
			justify-content: stretch;
		}

		.button-group button {
			flex: 1;
			min-width: auto;
		}
	}
</style>
