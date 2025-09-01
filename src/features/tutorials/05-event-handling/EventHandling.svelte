<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 基础事件状态
	let clickCount = 0;
	let mousePosition = { x: 0, y: 0 };
	let keyPressed = "";
	let inputValue = "";
	
	// 表单状态
	let formData = {
		name: "",
		email: "",
		message: ""
	};
	
	// 基础点击事件
	function handleClick() {
		clickCount++;
	}
	
	// 鼠标事件
	function handleMouseMove(event: any) {
		const rect = event.currentTarget.getBoundingClientRect();
		mousePosition = { 
			x: event.clientX - rect.left, 
			y: event.clientY - rect.top 
		};
	}
	
	// 键盘事件
	function handleKeyDown(event: any) {
		keyPressed = `${event.key} (${event.keyCode})`;
	}
	
	// 表单事件
	function handleSubmit(event: any) {
		event.preventDefault();
		alert(`表单提交成功！\n姓名: ${formData.name}\n邮箱: ${formData.email}`);
	}
	
	// 双击事件
	function handleDoubleClick() {
		alert('双击事件触发！');
	}
	
	// 重置函数
	function resetDemo() {
		clickCount = 0;
		mousePosition = { x: 0, y: 0 };
		keyPressed = "";
		inputValue = "";
		formData = { name: "", email: "", message: "" };
	}
	
	function resetClickCount() {
		clickCount = 0;
	}
	
	function resetMousePosition() {
		mousePosition = { x: 0, y: 0 };
	}
	
	function clearForm() {
		formData = { name: "", email: "", message: "" };
	}
</script>

<DemoContainer 
	title="事件处理演示"
	description="学习Svelte的事件处理机制，包括鼠标、键盘、表单等各种事件的绑定和处理"
>
	<div slot="demo" class="event-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>点击事件</h4>
				<div class="click-area">
					<button class="click-btn" on:click={handleClick}>
						点击我 (已点击 {clickCount} 次)
					</button>
					<button class="double-click-btn" on:dblclick={handleDoubleClick}>
						双击我试试
					</button>
				</div>
			</div>

			<div class="demo-section">
				<h4>鼠标移动事件</h4>
				<div class="mouse-area" role="application" on:mousemove={handleMouseMove}>
					<p>在这个区域移动鼠标</p>
					<div class="mouse-info">
						<span class="coordinate">X: {mousePosition.x.toFixed(0)}</span>
						<span class="coordinate">Y: {mousePosition.y.toFixed(0)}</span>
					</div>
					<div 
						class="mouse-cursor" 
						style="left: {mousePosition.x}px; top: {mousePosition.y}px;"
					></div>
				</div>
			</div>

			<div class="demo-section">
				<h4>键盘事件</h4>
				<div class="keyboard-area">
					<input 
						bind:value={inputValue}
						on:keydown={handleKeyDown}
						placeholder="在这里输入，观察按键检测"
					/>
					<div class="key-info">
						{#if keyPressed}
							<p>最后按下的键: <strong>{keyPressed}</strong></p>
						{:else}
							<p>请按任意键...</p>
						{/if}
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>表单事件</h4>
				<form class="demo-form" on:submit={handleSubmit}>
					<div class="form-group">
						<label for="name">姓名:</label>
						<input 
							id="name"
							type="text" 
							bind:value={formData.name}
							placeholder="请输入姓名"
							required
						/>
					</div>
					<div class="form-group">
						<label for="email">邮箱:</label>
						<input 
							id="email"
							type="email" 
							bind:value={formData.email}
							placeholder="请输入邮箱"
							required
						/>
					</div>
					<div class="form-group">
						<label for="message">留言:</label>
						<textarea 
							id="message"
							bind:value={formData.message}
							placeholder="请输入留言"
							rows="3"
						></textarea>
					</div>
					<button type="submit" class="submit-btn">提交表单</button>
				</form>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>点击控制</h5>
			<button on:click={resetClickCount}>重置点击计数</button>
		</div>

		<div class="control-group">
			<h5>鼠标控制</h5>
			<button on:click={resetMousePosition}>重置鼠标位置</button>
		</div>

		<div class="control-group">
			<h5>表单控制</h5>
			<button on:click={clearForm}>清空表单</button>
		</div>

		<button class="secondary" on:click={resetDemo}>重置所有</button>
		
		<div class="status-info">
			<strong>事件统计：</strong><br>
			点击次数: {clickCount}<br>
			鼠标位置: ({mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)})<br>
			输入长度: {inputValue.length}个字符<br>
			表单完整度: {formData.name && formData.email ? '完整' : '不完整'}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 核心知识点：</strong></p>
		<ul>
			<li><strong>基础事件：</strong><code>on:click={handleClick}</code> - 绑定点击事件处理函数</li>
			<li><strong>鼠标事件：</strong><code>on:mousemove</code>、<code>on:mouseenter</code>、<code>on:mouseleave</code> - 处理鼠标交互</li>
			<li><strong>键盘事件：</strong><code>on:keydown</code>、<code>on:keyup</code>、<code>on:keypress</code> - 处理键盘输入</li>
			<li><strong>表单事件：</strong><code>on:submit</code>、<code>on:input</code>、<code>on:change</code> - 处理表单交互</li>
		</ul>
		
		<p><strong>📚 重要概念：</strong></p>
		<ul>
			<li><strong>事件绑定：</strong> 使用 <code>on:事件名</code> 语法绑定事件处理函数</li>
			<li><strong>事件对象：</strong> 事件处理函数自动接收事件对象作为参数</li>
			<li><strong>事件冒泡：</strong> 事件会从触发元素向上传播到父元素</li>
			<li><strong>事件委托：</strong> 在父元素上监听子元素的事件，提高性能</li>
		</ul>
		
		<p><strong>🔧 语法要点：</strong></p>
		<ul>
			<li>基础绑定：<code>&lt;button on:click={handleClick}&gt;点击&lt;/button&gt;</code></li>
			<li>内联函数：<code>&lt;button on:click={() => clickCount++}&gt;增加&lt;/button&gt;</code></li>
			<li>事件参数：<code>&lt;input on:keydown={(e: KeyboardEvent) => handleKeyDown(e)} /&gt;</code></li>
			<li>阻止默认：<code>&lt;form on:submit|preventDefault={handleSubmit}&gt;</code></li>
		</ul>
		
		<p><strong>🎛️ 事件修饰符：</strong></p>
		<ul>
			<li><code>on:click|preventDefault</code> - 阻止默认行为（如阻止表单提交）</li>
			<li><code>on:click|stopPropagation</code> - 阻止事件冒泡到父元素</li>
			<li><code>on:click|once</code> - 事件只触发一次，之后自动解绑</li>
			<li><code>on:click|passive</code> - 被动事件监听，提高滚动性能</li>
			<li><code>on:click|capture</code> - 在捕获阶段处理事件</li>
			<li><code>on:click|self</code> - 只有事件目标是当前元素时才触发</li>
		</ul>
		
		<p><strong>💡 常用事件类型：</strong></p>
		<ul>
			<li><strong>鼠标事件：</strong>click、dblclick、mousedown、mouseup、mousemove、mouseenter、mouseleave</li>
			<li><strong>键盘事件：</strong>keydown、keyup、keypress</li>
			<li><strong>表单事件：</strong>submit、input、change、focus、blur</li>
			<li><strong>触摸事件：</strong>touchstart、touchmove、touchend</li>
			<li><strong>窗口事件：</strong>resize、scroll、load、unload</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>使用事件委托减少事件监听器数量</li>
			<li>合理使用事件修饰符，避免不必要的事件处理</li>
			<li>避免在事件处理函数中进行复杂计算</li>
			<li>使用防抖和节流优化频繁触发的事件</li>
		</ul>
		
		<p><strong>🛠️ 高级技巧：</strong></p>
		<ul>
			<li><strong>自定义事件：</strong>使用 <code>createEventDispatcher</code> 创建自定义事件</li>
			<li><strong>事件转发：</strong>使用 <code>on:click</code> 将事件转发给父组件</li>
			<li><strong>条件事件：</strong>根据条件动态绑定或解绑事件</li>
			<li><strong>事件组合：</strong>组合多个事件修饰符</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>事件处理函数中的this指向当前组件实例</li>
			<li>避免在事件处理函数中直接修改响应式变量，可能导致无限循环</li>
			<li>合理使用事件修饰符，不要过度使用</li>
			<li>注意事件的内存泄漏，及时清理事件监听器</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;!-- 基础事件绑定 --&gt;
&lt;button on:click=&#123;handleClick&#125;&gt;点击我&lt;/button&gt;

&lt;!-- 鼠标事件 --&gt;
&lt;div on:mousemove=&#123;handleMouseMove&#125;&gt;
  鼠标位置: &#123;mousePosition.x&#125;, &#123;mousePosition.y&#125;
&lt;/div&gt;

&lt;!-- 键盘事件 --&gt;
&lt;input on:keydown=&#123;handleKeyDown&#125; /&gt;

&lt;!-- 表单事件 --&gt;
&lt;form on:submit=&#123;handleSubmit&#125;&gt;
  &lt;input bind:value=&#123;formData.name&#125; /&gt;
  &lt;button type="submit"&gt;提交&lt;/button&gt;
&lt;/form&gt;

&lt;!-- 事件修饰符 --&gt;
&lt;button on:click|preventDefault=&#123;handleClick&#125;&gt;
  阻止默认行为
&lt;/button&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.event-demo {
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

	.click-area {
		display: flex;
		gap: 12px;
		justify-content: center;
		align-items: center;
	}

	.click-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		font-size: 1em;
		cursor: pointer;
		transition: background 0.2s;
	}

	.click-btn:hover {
		background: #0056b3;
	}

	.double-click-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		font-size: 1em;
		cursor: pointer;
		transition: background 0.2s;
	}

	.double-click-btn:hover {
		background: #1e7e34;
	}

	.mouse-area {
		position: relative;
		background: white;
		border: 2px dashed #ddd;
		border-radius: 8px;
		height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		cursor: crosshair;
	}

	.mouse-area p {
		margin: 0 0 12px 0;
		color: #666;
		font-size: 1.1em;
	}

	.mouse-info {
		display: flex;
		gap: 16px;
	}

	.coordinate {
		background: #e9ecef;
		padding: 4px 8px;
		border-radius: 4px;
		font-family: monospace;
		font-size: 0.9em;
		color: #495057;
	}

	.mouse-cursor {
		position: absolute;
		width: 12px;
		height: 12px;
		background: #dc3545;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		transition: all 0.1s ease;
	}

	.keyboard-area {
		text-align: center;
	}

	.keyboard-area input {
		width: 100%;
		max-width: 400px;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 1em;
		margin-bottom: 12px;
	}

	.key-info {
		background: white;
		padding: 12px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
		display: inline-block;
		min-width: 200px;
	}

	.key-info p {
		margin: 0;
		color: #333;
	}

	.demo-form {
		background: white;
		padding: 20px;
		border-radius: 8px;
		border: 1px solid #e9ecef;
		max-width: 400px;
		margin: 0 auto;
	}

	.form-group {
		margin-bottom: 16px;
	}

	.form-group label {
		display: block;
		margin-bottom: 6px;
		font-weight: 500;
		color: #333;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9em;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	.submit-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		font-size: 0.9em;
		cursor: pointer;
		width: 100%;
	}

	.submit-btn:hover {
		background: #0056b3;
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
		.click-area {
			flex-direction: column;
		}

		.mouse-info {
			flex-direction: column;
			gap: 8px;
		}

		.demo-form {
			max-width: 100%;
		}
	}
</style>
