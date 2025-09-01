<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	let name = "世界";
	let count = 0;
	
	function sayHello() {
		alert(`你好，${name}！`);
	}
	
	function increment() {
		count += 1;
	}
	
	function reset() {
		count = 0;
		name = "世界";
	}

	function setExampleName() {
		name = "Svelte";
	}
</script>

<DemoContainer 
	title="Hello World 演示"
	description="学习Svelte的基础语法：数据绑定、事件处理和响应式更新"
>
	<div slot="demo" class="hello-demo">
		<div class="greeting-section">
			<h3>你好，{name}！</h3>
			<p class="intro">这是你的第一个 Svelte 组件</p>
		</div>

		<div class="status-section">
			<div class="status-card">
				<span class="label">当前计数：</span>
				<span class="value">{count}</span>
			</div>
			<div class="status-card">
				<span class="label">名字长度：</span>
				<span class="value">{name.length} 个字符</span>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="input-group">
			<label for="nameInput">输入你的名字：</label>
			<input 
				id="nameInput"
				type="text" 
				bind:value={name} 
				placeholder="输入名字..."
			/>
		</div>

		<button on:click={sayHello}>打招呼 👋</button>
		<button on:click={increment}>计数 +1</button>
		<button class="secondary" on:click={setExampleName}>示例名字</button>
		<button class="secondary" on:click={reset}>重置所有</button>
	</div>

	<div slot="explanation">
		<p><strong>🎯 核心知识点：</strong></p>
		<ul>
			<li><strong>响应式变量：</strong> <code>let name = "世界"</code> - Svelte的变量自动具有响应式特性</li>
			<li><strong>数据绑定：</strong> <code>bind:value=&#123;name&#125;</code> - 实现表单输入与变量的双向同步</li>
			<li><strong>事件处理：</strong> <code>on:click=&#123;sayHello&#125;</code> - 使用on:事件名绑定事件处理函数</li>
			<li><strong>文本插值：</strong> <code>&#123;name&#125;</code> - 在模板中使用花括号插入变量值</li>
		</ul>
		
		<p><strong>📚 重要概念：</strong></p>
		<ul>
			<li><strong>组件结构：</strong> Svelte组件由script、模板和style三部分组成</li>
			<li><strong>响应式更新：</strong> 变量值改变时，依赖它的UI会自动重新渲染</li>
			<li><strong>事件驱动：</strong> 通过事件处理函数响应用户交互</li>
			<li><strong>数据流：</strong> 数据从变量流向UI，用户输入通过绑定流回变量</li>
		</ul>
		
		<p><strong>🔧 语法要点：</strong></p>
		<ul>
			<li>变量声明使用 <code>let</code> 而不是 <code>const</code>（因为需要重新赋值）</li>
			<li>事件绑定语法：<code>on:事件类型=&#123;处理函数&#125;</code></li>
			<li>数据绑定语法：<code>bind:属性名=&#123;变量名&#125;</code></li>
			<li>模板插值语法：<code>&#123;表达式&#125;</code></li>
		</ul>
		
		<p><strong>💡 学习建议：</strong></p>
		<ul>
			<li>尝试修改输入框中的名字，观察标题的实时变化</li>
			<li>点击"计数 +1"按钮，理解响应式更新的机制</li>
			<li>点击"打招呼"按钮，体验事件处理的工作流程</li>
			<li>观察控制台，了解Svelte的编译过程</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  let name = "世界";
  let count = 0;
  
  function sayHello() &#123;
    alert("你好，" + name + "！");
  &#125;
&lt;/script&gt;

&lt;h3&gt;你好，&#123;name&#125;！&lt;/h3&gt;
&lt;input bind:value=&#123;name&#125; /&gt;
&lt;button on:click=&#123;sayHello&#125;&gt;打招呼&lt;/button&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.hello-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30px 20px;
		text-align: center;
		min-height: 300px;
	}

	.greeting-section {
		margin-bottom: 30px;
	}

	.greeting-section h3 {
		font-size: 2em;
		margin: 0 0 10px 0;
		color: #333;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.intro {
		color: #666;
		font-size: 1.1em;
		margin: 0;
	}

	.status-section {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.status-card {
		background: #f8f9fa;
		padding: 15px 20px;
		border-radius: 10px;
		border: 1px solid #e9ecef;
		min-width: 120px;
	}

	.label {
		display: block;
		font-size: 0.9em;
		color: #666;
		margin-bottom: 4px;
	}

	.value {
		display: block;
		font-size: 1.4em;
		font-weight: bold;
		color: #333;
	}

	.input-group {
		margin-bottom: 16px;
		text-align: left;
	}

	.input-group label {
		display: block;
		margin-bottom: 6px;
		font-weight: 500;
		color: #333;
	}

	.input-group input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 0.9em;
		transition: border-color 0.2s ease;
	}

	.input-group input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
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

	/* 内联代码样式 */
	:global(.demo-container code:not(pre code)) {
		background: #f1f3f4;
		padding: 2px 6px;
		border-radius: 3px;
		font-size: 0.9em;
		color: #333;
	}

	@media (max-width: 480px) {
		.status-section {
			flex-direction: column;
			gap: 12px;
		}

		.status-card {
			min-width: auto;
		}

		.greeting-section h3 {
			font-size: 1.6em;
		}
	}
</style>
