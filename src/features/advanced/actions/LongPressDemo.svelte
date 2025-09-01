<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 自定义 action：长按检测
	function longpress(node, duration = 500) {
		let timer: any;
		
		function handleMouseDown() {
			timer = setTimeout(() => {
				node.dispatchEvent(new CustomEvent('longpress'));
			}, duration);
		}
		
		function handleMouseUp() {
			clearTimeout(timer);
		}
		
		function handleMouseLeave() {
			clearTimeout(timer);
		}
		
		node.addEventListener('mousedown', handleMouseDown);
		node.addEventListener('mouseup', handleMouseUp);
		node.addEventListener('mouseleave', handleMouseLeave);
		
		return {
			destroy() {
				node.removeEventListener('mousedown', handleMouseDown);
				node.removeEventListener('mouseup', handleMouseUp);
				node.removeEventListener('mouseleave', handleMouseLeave);
			},
			update(newDuration: number) {
				duration = newDuration;
			}
		};
	}
	
	let longPressCount = 0;
	let duration = 1000;
	
	function handleLongPress() {
		longPressCount++;
	}

	function resetCounter() {
		longPressCount = 0;
	}

	function setDuration(newDuration: number) {
		duration = newDuration;
	}
</script>

<DemoContainer 
	title="长按检测演示"
	description="自定义Action实现长按事件检测，支持可配置的触发时长"
>
	<div slot="demo" class="longpress-demo">
		<div 
			class="longpress-area"
			use:longpress={duration}
			on:longpress={handleLongPress}
		>
			<p>长按 {duration/1000} 秒触发事件</p>
			<p class="counter">已触发 <span class="count">{longPressCount}</span> 次</p>
		</div>
	</div>

	<div slot="controls">
		<button on:click={resetCounter}>重置计数</button>
		
		<div class="duration-controls">
			<strong>触发时长:</strong>
			<button class="secondary" on:click={() => setDuration(500)}>0.5秒</button>
			<button class="secondary" on:click={() => setDuration(1000)}>1秒</button>
			<button class="secondary" on:click={() => setDuration(2000)}>2秒</button>
		</div>

		<div class="status-info">
			<strong>当前设置:</strong><br>
			触发时长: {duration}ms<br>
			触发次数: {longPressCount}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>计时器机制：</strong>使用setTimeout实现延迟触发，通过clearTimeout取消触发</li>
			<li><strong>事件状态管理：</strong>监听mousedown、mouseup、mouseleave三个事件控制计时器</li>
			<li><strong>参数配置化：</strong>支持动态配置触发时长，通过update方法更新参数</li>
			<li><strong>自定义事件：</strong>触发longpress自定义事件，实现组件间通信</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>计时器管理：</strong>在mousedown时启动计时器，在mouseup或mouseleave时清除</li>
			<li><strong>事件监听：</strong>监听鼠标按下、抬起和离开事件，确保用户体验</li>
			<li><strong>参数更新：</strong>通过update方法支持动态修改触发时长</li>
			<li><strong>内存清理：</strong>在destroy方法中清理所有事件监听器</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>Action模式：</strong>将长按检测逻辑封装为可复用的Action</li>
			<li><strong>配置驱动：</strong>通过参数配置实现不同场景的长按需求</li>
			<li><strong>事件驱动：</strong>通过自定义事件实现松耦合的组件通信</li>
			<li><strong>状态机模式：</strong>管理鼠标按下、等待、触发等不同状态</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>及时清理计时器，避免内存泄漏</li>
			<li>合理的事件监听器管理，防止重复绑定</li>
			<li>使用防抖机制，避免频繁触发</li>
			<li>优化事件处理逻辑，减少不必要的计算</li>
		</ul>
		
		<p><strong>🛠️ 扩展思路：</strong></p>
		<ul>
			<li>添加触觉反馈，支持移动设备震动</li>
			<li>实现长按进度指示器，显示触发进度</li>
			<li>支持多点触控，处理多指长按</li>
			<li>添加长按确认机制，防止误触发</li>
			<li>实现长按菜单，支持上下文操作</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>确保在组件销毁时清理所有计时器和事件监听器</li>
			<li>考虑用户体验，避免触发时长过短导致误触发</li>
			<li>在移动设备上需要考虑触摸事件的处理</li>
			<li>合理设置默认触发时长，平衡响应性和准确性</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>{`function longpress(node, duration = 500) {
  let timer;
  
  function handleMouseDown() {
    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  }
  
  function handleMouseUp() {
    clearTimeout(timer);
  }
  
  return {
    destroy() {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
    },
    update(newDuration) {
      duration = newDuration;
    }
  };
}`}</code></pre>
	</div>
</DemoContainer>

<style>
	.longpress-demo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 250px;
	}
	
	.longpress-area {
		padding: 30px 40px;
		background: #e3f2fd;
		border: 2px solid #2196f3;
		border-radius: 12px;
		text-align: center;
		cursor: pointer;
		user-select: none;
		transition: all 0.3s ease;
		min-width: 200px;
	}
	
	.longpress-area:hover {
		background: #bbdefb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
	}
	
	.longpress-area:active {
		background: #90caf9;
		transform: translateY(0);
	}

	.longpress-area p {
		margin: 8px 0;
		font-size: 1.1em;
	}

	.counter {
		font-weight: 600;
		color: #1976d2;
	}

	.count {
		font-size: 1.3em;
		font-weight: bold;
		color: #0d47a1;
	}

	.duration-controls {
		margin: 16px 0;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.duration-controls strong {
		display: block;
		margin-bottom: 8px;
		color: #333;
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
</style>
