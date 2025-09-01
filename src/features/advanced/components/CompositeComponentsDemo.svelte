<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	import Accordion from './Accordion.svelte';
	import AccordionItem from './AccordionItem.svelte';
	
	// 演示控制状态
	let showAdvancedExample = false;
	let customTheme = 'default';
	let animationSpeed = 'normal';
	
	const themes = [
		{ value: 'default', label: '默认主题' },
		{ value: 'minimal', label: '简约主题' },
		{ value: 'colorful', label: '彩色主题' }
	];
	
	const speeds = [
		{ value: 'slow', label: '慢速' },
		{ value: 'normal', label: '正常' },
		{ value: 'fast', label: '快速' }
	];
	
	function resetDemo() {
		showAdvancedExample = false;
		customTheme = 'default';
		animationSpeed = 'normal';
	}
</script>

<DemoContainer 
	title="复合组件模式演示"
	description="学习如何使用Svelte的Context API创建复合组件，实现组件间的状态共享和通信，构建可复用的组件系统"
>
	<div slot="demo" class="composite-demo">
		<div class="demo-section">
			<h4>单选手风琴</h4>
			<p class="section-description">在单选模式下，同时只能打开一个部分</p>
			
			<Accordion>
				<AccordionItem id="intro" title="第一部分：介绍">
					<div class="content-block">
						<p>这是第一部分的内容。在单选模式下，同时只能打开一个部分。</p>
						<p>点击其他部分会自动关闭当前打开的部分。这种模式适用于FAQ、产品特性展示等场景。</p>
						<div class="feature-list">
							<span class="feature-tag">状态共享</span>
							<span class="feature-tag">自动切换</span>
							<span class="feature-tag">键盘导航</span>
						</div>
					</div>
				</AccordionItem>
				
				<AccordionItem id="features" title="第二部分：特性">
					<div class="content-block">
						<p>这是第二部分的内容，展示了复合组件的核心特性：</p>
						<ul class="feature-details">
							<li><strong>状态共享</strong> - 使用Context API在父子组件间共享状态</li>
							<li><strong>组件通信</strong> - 通过事件和回调实现组件间通信</li>
							<li><strong>可复用性</strong> - 封装复杂逻辑，提供简洁的使用接口</li>
							<li><strong>灵活配置</strong> - 支持多种模式和自定义选项</li>
						</ul>
					</div>
				</AccordionItem>
				
				<AccordionItem id="implementation" title="第三部分：实现原理">
					<div class="content-block">
						<p>复合组件的实现原理：</p>
						<div class="code-example">
							<pre><code>// 1. 父组件创建Context
const accordionContext = setContext('accordion', &#123;
  activeItem: writable(null),
  toggle: (id) =&gt; &#123; /* 切换逻辑 */ &#125;
&#125;);

// 2. 子组件获取Context
const context = getContext('accordion');

// 3. 响应式状态同步
$: isActive = $context.activeItem === itemId;</code></pre>
						</div>
					</div>
				</AccordionItem>
			</Accordion>
		</div>

		<div class="demo-section">
			<h4>多选手风琴</h4>
			<p class="section-description">在多选模式下，可以同时打开多个部分</p>
			
			<Accordion multiple={true} defaultOpen={['advanced', 'styling']}>
				<AccordionItem id="advanced" title="第四部分：高级功能">
					<div class="content-block">
						<p>在多选模式下，可以同时打开多个部分。每个部分都可以独立控制开关状态。</p>
						<div class="demo-controls">
							<label>
								<input type="checkbox" bind:checked={showAdvancedExample} />
								显示高级示例
							</label>
						</div>
						{#if showAdvancedExample}
							<div class="advanced-example">
								<h5>高级示例：嵌套内容</h5>
								<div class="nested-content">
									<div class="info-card">
										<h6>性能优化</h6>
										<p>使用懒加载和虚拟滚动提升大数据量场景下的性能。</p>
									</div>
									<div class="info-card">
										<h6>无障碍访问</h6>
										<p>支持键盘导航和屏幕阅读器，符合WCAG标准。</p>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</AccordionItem>
				
				<AccordionItem id="features-multi" title="第五部分：多选特性">
					<div class="content-block">
						<p>多选模式包含以下特性：</p>
						<div class="features-grid">
							<div class="feature-card">
								<div class="feature-icon">🔄</div>
								<h6>独立状态</h6>
								<p>每个面板都有独立的开关状态</p>
							</div>
							<div class="feature-card">
								<div class="feature-icon">⚡</div>
								<h6>动画过渡</h6>
								<p>平滑的展开收起动画效果</p>
							</div>
							<div class="feature-card">
								<div class="feature-icon">💾</div>
								<h6>状态持久化</h6>
								<p>可选的状态记忆功能</p>
							</div>
							<div class="feature-card">
								<div class="feature-icon">⌨️</div>
								<h6>键盘支持</h6>
								<p>完整的键盘导航支持</p>
							</div>
						</div>
					</div>
				</AccordionItem>
				
				<AccordionItem id="styling" title="第六部分：自定义样式">
					<div class="content-block">
						<p>可以通过CSS变量和主题系统自定义样式：</p>
						<div class="style-showcase">
							<div class="style-example primary">主要样式</div>
							<div class="style-example secondary">次要样式</div>
							<div class="style-example success">成功样式</div>
							<div class="style-example warning">警告样式</div>
							<div class="style-example danger">危险样式</div>
						</div>
						<div class="css-variables">
							<h6>CSS变量示例：</h6>
							<code>--accordion-border-color: #e9ecef;<br>
--accordion-header-bg: #f8f9fa;<br>
--accordion-content-bg: #ffffff;<br>
--accordion-transition: 0.3s ease;</code>
						</div>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>主题控制</h5>
			<select bind:value={customTheme}>
				{#each themes as theme}
					<option value={theme.value}>{theme.label}</option>
				{/each}
			</select>
		</div>

		<div class="control-group">
			<h5>动画速度</h5>
			<select bind:value={animationSpeed}>
				{#each speeds as speed}
					<option value={speed.value}>{speed.label}</option>
				{/each}
			</select>
		</div>

		<div class="control-group">
			<h5>演示选项</h5>
			<label>
				<input type="checkbox" bind:checked={showAdvancedExample} />
				显示高级示例
			</label>
		</div>

		<button class="secondary" on:click={resetDemo}>重置演示</button>
		
		<div class="status-info">
			<strong>当前配置：</strong><br>
			主题: {themes.find(t => t.value === customTheme)?.label}<br>
			动画: {speeds.find(s => s.value === animationSpeed)?.label}<br>
			高级示例: {showAdvancedExample ? '开启' : '关闭'}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>Context API架构：</strong>使用setContext创建共享状态，getContext获取状态</li>
			<li><strong>组件组合模式：</strong>通过插槽系统实现灵活的内容组合和布局</li>
			<li><strong>状态共享机制：</strong>在组件树中共享状态，避免props drilling</li>
			<li><strong>事件驱动通信：</strong>通过自定义事件实现组件间的松耦合通信</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>Context创建：</strong>在父组件中使用setContext创建共享上下文</li>
			<li><strong>Context消费：</strong>在子组件中使用getContext获取共享状态</li>
			<li><strong>插槽系统：</strong>使用slot实现内容投影和组件组合</li>
			<li><strong>状态管理：</strong>使用writable store管理复杂的状态逻辑</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>复合组件模式：</strong>将复杂组件拆分为多个协作的子组件</li>
			<li><strong>状态提升：</strong>将状态提升到共同的父组件中管理</li>
			<li><strong>依赖注入：</strong>通过Context API实现依赖注入</li>
			<li><strong>组合模式：</strong>通过组合而非继承实现功能复用</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>合理使用Context，避免不必要的重新渲染</li>
			<li>使用响应式声明优化状态计算</li>
			<li>避免在Context中存储过大的数据</li>
			<li>合理拆分组件，减少单个组件的复杂度</li>
		</ul>
		
		<p><strong>🛠️ 设计原则：</strong></p>
		<ul>
			<li><strong>单一职责：</strong>每个组件专注于特定功能，职责清晰</li>
			<li><strong>组合优于继承：</strong>通过组合实现复杂功能，提高灵活性</li>
			<li><strong>接口一致：</strong>提供统一的使用接口，降低学习成本</li>
			<li><strong>可扩展性：</strong>支持配置和自定义扩展，适应不同需求</li>
		</ul>
		
		<p><strong>🎨 应用场景：</strong></p>
		<ul>
			<li><strong>手风琴组件：</strong>FAQ、产品特性展示、折叠面板</li>
			<li><strong>表单组件：</strong>表单验证、字段组合、动态表单</li>
			<li><strong>数据展示：</strong>表格、列表、卡片组合、数据网格</li>
			<li><strong>导航组件：</strong>菜单、标签页、面包屑、分页器</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>避免Context嵌套过深，影响性能</li>
			<li>合理设计Context的粒度，避免过度抽象</li>
			<li>注意Context的生命周期管理</li>
			<li>考虑向后兼容性，避免破坏性变更</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  import &#123; setContext, getContext &#125; from 'svelte';
  import &#123; writable &#125; from 'svelte/store';
  
  // 父组件：创建Context
  function createAccordion(multiple = false) &#123;
    const activeItems = writable(multiple ? [] : null);
    
    function toggle(id) &#123;
      activeItems.update(current =&gt; &#123;
        if (multiple) &#123;
          return current.includes(id) 
            ? current.filter(item =&gt; item !== id)
            : [...current, id];
        &#125; else &#123;
          return current === id ? null : id;
        &#125;
      &#125;);
    &#125;
    
    const context = &#123; activeItems, toggle &#125;;
    setContext('accordion', context);
    return context;
  &#125;
  
  // 子组件：使用Context
  const &#123; activeItems, toggle &#125; = getContext('accordion');
  $: isActive = multiple 
    ? $activeItems.includes(id)
    : $activeItems === id;
&lt;/script&gt;

&lt;!-- 使用示例 --&gt;
&lt;Accordion multiple=&#123;true&#125;&gt;
  &lt;AccordionItem id="item1" title="标题1"&gt;
    内容1
  &lt;/AccordionItem&gt;
  &lt;AccordionItem id="item2" title="标题2"&gt;
    内容2
  &lt;/AccordionItem&gt;
&lt;/Accordion&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.composite-demo {
		padding: 20px;
		min-height: 500px;
	}

	.demo-section {
		margin-bottom: 32px;
		padding: 24px;
		background: #f8f9fa;
		border-radius: 8px;
		border: 1px solid #e9ecef;
	}

	h4 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 1.2em;
		font-weight: 600;
	}

	h5 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.9em;
	}

	h6 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.85em;
		font-weight: 600;
	}

	.section-description {
		margin: 0 0 20px 0;
		color: #666;
		font-size: 0.9em;
	}



	.content-block {
		padding: 16px 0;
	}

	.content-block p {
		margin: 0 0 12px 0;
		line-height: 1.6;
		color: #444;
	}

	.feature-list {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-top: 16px;
	}

	.feature-tag {
		background: #007bff;
		color: white;
		padding: 4px 12px;
		border-radius: 16px;
		font-size: 0.8em;
		font-weight: 500;
	}

	.feature-details {
		margin: 16px 0;
		padding-left: 20px;
	}

	.feature-details li {
		margin-bottom: 8px;
		line-height: 1.5;
		color: #444;
	}

	.code-example {
		margin: 16px 0;
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		overflow: hidden;
	}

	.code-example pre {
		margin: 0;
		padding: 16px;
		background: #2d3748;
		color: #e2e8f0;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 0.85em;
		line-height: 1.5;
		overflow-x: auto;
	}

	.demo-controls {
		margin: 16px 0;
		padding: 12px;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 6px;
	}

	.demo-controls label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9em;
		cursor: pointer;
	}

	.advanced-example {
		margin-top: 16px;
		padding: 16px;
		background: #e3f2fd;
		border-radius: 6px;
		border-left: 4px solid #2196f3;
	}

	.nested-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
		margin-top: 12px;
	}

	.info-card {
		background: white;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #e3f2fd;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin: 16px 0;
	}

	.feature-card {
		background: white;
		padding: 16px;
		border-radius: 8px;
		border: 1px solid #e9ecef;
		text-align: center;
	}

	.feature-icon {
		font-size: 2em;
		margin-bottom: 8px;
	}

	.style-showcase {
		display: flex;
		gap: 12px;
		margin: 16px 0;
		flex-wrap: wrap;
	}

	.style-example {
		padding: 8px 16px;
		border-radius: 20px;
		color: white;
		font-size: 0.85em;
		font-weight: 600;
	}

	.style-example.primary { background: #007bff; }
	.style-example.secondary { background: #6c757d; }
	.style-example.success { background: #28a745; }
	.style-example.warning { background: #ffc107; color: #212529; }
	.style-example.danger { background: #dc3545; }

	.css-variables {
		margin-top: 16px;
		padding: 16px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.css-variables code {
		display: block;
		background: #2d3748;
		color: #e2e8f0;
		padding: 12px;
		border-radius: 4px;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 0.8em;
		line-height: 1.4;
		white-space: pre;
		margin-top: 8px;
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
		padding: 6px 8px;
		border: 1px solid #e9ecef;
		border-radius: 4px;
		background: white;
		font-size: 0.9em;
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
		.features-grid {
			grid-template-columns: 1fr;
		}

		.nested-content {
			grid-template-columns: 1fr;
		}

		.style-showcase {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
