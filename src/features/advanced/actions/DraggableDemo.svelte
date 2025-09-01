<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 拖拽 action
	function draggable(node, options = {}) {
		let x = options.x || 0;
		let y = options.y || 0;
		let isDragging = false;
		let startX, startY;
		
		function handleMouseDown(event) {
			isDragging = true;
			startX = event.clientX - x;
			startY = event.clientY - y;
			node.style.cursor = 'grabbing';
			
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}
		
		function handleMouseMove(event) {
			if (!isDragging) return;
			
			x = event.clientX - startX;
			y = event.clientY - startY;
			
			node.style.transform = `translate(${x}px, ${y}px)`;
			
			// 触发自定义事件
			node.dispatchEvent(new CustomEvent('drag', {
				detail: { x, y }
			}));
		}
		
		function handleMouseUp() {
			isDragging = false;
			node.style.cursor = 'grab';
			
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			
			node.dispatchEvent(new CustomEvent('dragend', {
				detail: { x, y }
			}));
		}
		
		node.addEventListener('mousedown', handleMouseDown);
		node.style.cursor = 'grab';
		node.style.position = 'relative';
		node.style.zIndex = '1000';
		
		return {
			destroy() {
				node.removeEventListener('mousedown', handleMouseDown);
			},
			update(newOptions) {
				if (newOptions.x !== undefined) x = newOptions.x;
				if (newOptions.y !== undefined) y = newOptions.y;
				node.style.transform = `translate(${x}px, ${y}px)`;
			}
		};
	}
	
	let dragPosition = { x: 0, y: 0 };
	let dragHistory = [];
	
	function handleDrag(event) {
		dragPosition = event.detail;
	}
	
	function handleDragEnd(event) {
		dragHistory = [...dragHistory, event.detail];
		if (dragHistory.length > 10) {
			dragHistory = dragHistory.slice(-10);
		}
	}

	function resetPosition() {
		// 获取拖拽元素并重置位置
		const draggableElement = document.querySelector('.draggable-box');
		if (draggableElement) {
			draggableElement.style.transform = 'translate(0px, 0px)';
			dragPosition = { x: 0, y: 0 };
		}
	}

	function clearHistory() {
		dragHistory = [];
	}
</script>

<DemoContainer 
	title="拖拽功能演示"
	description="自定义Action实现拖拽功能，支持位置跟踪和历史记录"
	demoHeight="400px"
>
	<div slot="demo" class="draggable-demo">
		<div 
			class="draggable-box"
			use:draggable={{ x: 0, y: 0 }}
			on:drag={handleDrag}
			on:dragend={handleDragEnd}
		>
			拖拽我！
		</div>
	</div>

	<div slot="controls">
		<button on:click={resetPosition}>重置位置</button>
		<button class="secondary" on:click={clearHistory}>清除历史</button>
		
		<div class="position-info">
			<strong>当前位置:</strong><br>
			X: {dragPosition.x}px<br>
			Y: {dragPosition.y}px
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>Action函数设计：</strong>接收DOM节点和配置选项，返回生命周期方法</li>
			<li><strong>事件监听机制：</strong>在mousedown时启动拖拽，在document上监听mousemove和mouseup</li>
			<li><strong>位置计算：</strong>基于鼠标位置和初始偏移量计算元素新位置</li>
			<li><strong>状态管理：</strong>维护拖拽状态、位置信息和历史记录</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>DOM操作：</strong>直接操作元素的transform属性实现位置更新</li>
			<li><strong>事件委托：</strong>在document级别监听鼠标事件，确保拖拽过程中不丢失事件</li>
			<li><strong>自定义事件：</strong>通过dispatchEvent触发drag和dragend事件，实现组件通信</li>
			<li><strong>生命周期管理：</strong>在destroy方法中清理事件监听器，防止内存泄漏</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>Action模式：</strong>将复杂的DOM交互逻辑封装为可复用的Action</li>
			<li><strong>事件驱动：</strong>通过自定义事件实现松耦合的组件通信</li>
			<li><strong>配置化：</strong>支持初始位置配置，提高Action的灵活性</li>
			<li><strong>响应式更新：</strong>通过update方法支持动态参数更新</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>使用transform而非left/top进行位置更新，避免重排</li>
			<li>在拖拽结束时才触发dragend事件，减少事件频率</li>
			<li>限制历史记录数量，避免内存占用过大</li>
			<li>合理的事件清理机制，防止内存泄漏</li>
		</ul>
		
		<p><strong>🛠️ 扩展思路：</strong></p>
		<ul>
			<li>添加拖拽边界限制，防止元素拖出可视区域</li>
			<li>实现拖拽吸附功能，支持网格对齐</li>
			<li>添加拖拽手柄，限制拖拽区域</li>
			<li>支持触摸设备，添加touch事件处理</li>
			<li>实现拖拽排序功能，支持列表重排</li>
		</ul>

		{#if dragHistory.length > 0}
			<div class="history-section">
				<strong>拖拽历史记录：</strong>
				<ul class="history-list">
					{#each dragHistory as pos, i}
						<li>第{dragHistory.length - i}次: ({pos.x}, {pos.y})</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<div slot="code">
		<pre><code>{`function draggable(node, options = {}) {
  let x = options.x || 0;
  let y = options.y || 0;
  
  function handleMouseDown(event) {
    // 拖拽逻辑
    node.style.transform = \`translate(\${x}px, \${y}px)\`;
    
    // 派发自定义事件
    node.dispatchEvent(new CustomEvent('drag', {
      detail: { x, y }
    }));
  }
  
  return {
    update: (newOptions) => {
      // 更新选项
    },
    destroy: () => {
      // 清理事件监听器
    }
  };
}`}</code></pre>
	</div>
</DemoContainer>

<style>
	.draggable-demo {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 350px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.draggable-box {
		width: 100px;
		height: 100px;
		background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		font-weight: bold;
		box-shadow: 0 4px 8px rgba(0,0,0,0.2);
		user-select: none;
		transition: box-shadow 0.2s ease;
	}

	.draggable-box:hover {
		box-shadow: 0 6px 12px rgba(0,0,0,0.3);
	}
	
	.position-info {
		background: #f8f9fa;
		padding: 12px;
		border-radius: 6px;
		margin-top: 16px;
		font-size: 0.9em;
		line-height: 1.6;
		border: 1px solid #e9ecef;
	}

	.history-section {
		margin-top: 16px;
		padding-top: 12px;
		border-top: 1px solid #e9ecef;
	}

	.history-list {
		max-height: 150px;
		overflow-y: auto;
		margin: 8px 0 0 0;
		padding: 0 0 0 16px;
		font-size: 0.85em;
	}

	.history-list li {
		padding: 2px 0;
		color: #666;
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
