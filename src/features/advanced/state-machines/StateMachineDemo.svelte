<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	import { writable, derived } from 'svelte/store';
	
	// 定义类型
	type StateType = string;
	type EventType = string;
	type TransitionsType = Record<StateType, Record<EventType, StateType>>;
	
	interface StateMachineState {
		state: StateType;
		history: StateType[];
		data: Record<string, any>;
	}
	
	// 状态机 Store
	function createStateMachine(initialState: StateType, transitions: TransitionsType) {
		const { subscribe, set, update } = writable({
			state: initialState,
			history: [initialState],
			data: {}
		});
		
		function transition(event: EventType, data: Record<string, any> = {}) {
			update(current => {
				const currentState = current.state;
				const availableTransitions = transitions[currentState];
				
				if (!availableTransitions || !availableTransitions[event]) {
					console.warn(`无法从状态 ${currentState} 通过事件 ${event} 转换`);
					return current;
				}
				
				const nextState = availableTransitions[event];
				const newHistory = [...current.history, nextState];
				
				return {
					state: nextState,
					history: newHistory,
					data: { ...current.data, ...data }
				};
			});
		}
		
		function canTransition(event: EventType) {
			let can = false;
			subscribe(current => {
				const currentState = current.state;
				const availableTransitions = transitions[currentState];
				can = !!(availableTransitions && availableTransitions[event]);
			})();
			return can;
		}
		
		function reset() {
			set({
				state: initialState,
				history: [initialState],
				data: {}
			});
		}
		
		return {
			subscribe,
			transition,
			canTransition,
			reset
		};
	}
	
	// 定义工作流状态机
	const workflowTransitions = {
		draft: {
			submit: 'pending',
			delete: 'deleted'
		},
		pending: {
			approve: 'approved',
			reject: 'rejected',
			return: 'draft'
		},
		approved: {
			implement: 'implemented',
			revert: 'draft'
		},
		rejected: {
			modify: 'draft',
			delete: 'deleted'
		},
		implemented: {
			complete: 'completed',
			rollback: 'approved'
		},
		completed: {
			archive: 'archived'
		},
		deleted: {
			restore: 'draft'
		},
		archived: {
			restore: 'completed'
		}
	};
	
	const workflow = createStateMachine('draft', workflowTransitions);
	
	// 派生状态
	const workflowInfo = derived(workflow, $workflow => {
		const stateColors: Record<StateType, string> = {
			draft: '#6c757d',
			pending: '#ffc107',
			approved: '#28a745',
			rejected: '#dc3545',
			implemented: '#17a2b8',
			completed: '#20c997',
			deleted: '#6c757d',
			archived: '#6f42c1'
		};
		
		const stateNames: Record<StateType, string> = {
			draft: '草稿',
			pending: '待审核',
			approved: '已批准',
			rejected: '已拒绝',
			implemented: '已实施',
			completed: '已完成',
			deleted: '已删除',
			archived: '已归档'
		};
		
		const currentState = $workflow.state as StateType;
		
		return {
			...$workflow,
			color: stateColors[currentState] || '#6c757d',
			name: stateNames[currentState] || currentState,
			availableEvents: Object.keys((workflowTransitions as any)[currentState] || {})
		};
	});
	
	function handleTransition(event: EventType) {
		workflow.transition(event, { timestamp: Date.now() });
	}
</script>

<DemoContainer 
	title="状态机 Store 演示"
	description="演示如何使用Svelte Store创建状态机，管理复杂的状态转换逻辑，适用于工作流、用户权限、UI状态等场景"
>
	<div slot="demo" class="state-machine-demo">
		<div class="current-state">
		<h3>当前状态</h3>
		<div 
			class="state-indicator"
			style="background-color: {$workflowInfo.color}"
		>
			{$workflowInfo.name}
		</div>
	</div>
	
	<div class="available-actions">
		<h3>可用操作</h3>
		<div class="action-buttons">
			{#each $workflowInfo.availableEvents as event}
				<button 
					on:click={() => handleTransition(event)}
					class="action-btn"
				>
					{event === 'submit' ? '提交' :
					 event === 'approve' ? '批准' :
					 event === 'reject' ? '拒绝' :
					 event === 'return' ? '退回' :
					 event === 'implement' ? '实施' :
					 event === 'revert' ? '撤销' :
					 event === 'modify' ? '修改' :
					 event === 'delete' ? '删除' :
					 event === 'complete' ? '完成' :
					 event === 'rollback' ? '回滚' :
					 event === 'archive' ? '归档' :
					 event === 'restore' ? '恢复' : event}
				</button>
			{/each}
		</div>
	</div>
	
	<div class="state-history">
		<h3>状态历史</h3>
		<div class="history-timeline">
			{#each $workflowInfo.history as state, i}
				<div class="history-item">
					<div class="history-state" style="background-color: {(workflowTransitions as any)[state] ? '#28a745' : '#6c757d'}">
						{state === 'draft' ? '草稿' :
						 state === 'pending' ? '待审核' :
						 state === 'approved' ? '已批准' :
						 state === 'rejected' ? '已拒绝' :
						 state === 'implemented' ? '已实施' :
						 state === 'completed' ? '已完成' :
						 state === 'deleted' ? '已删除' :
						 state === 'archived' ? '已归档' : state}
					</div>
					{#if i < $workflowInfo.history.length - 1}
						<div class="history-arrow">→</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>状态机控制</h5>
			<button on:click={() => workflow.reset()}>重置状态机</button>
		</div>
		
		<div class="status-info">
			<strong>当前状态：</strong><br>
			状态: {$workflowInfo.name}<br>
			历史步数: {$workflowInfo.history.length}<br>
			可用操作: {$workflowInfo.availableEvents.length}个
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 实现思路：</strong></p>
		<ul>
			<li><strong>状态机架构：</strong>基于有限状态机理论，明确定义状态和转换规则</li>
			<li><strong>Store集成：</strong>使用Svelte store管理状态机状态，实现响应式更新</li>
			<li><strong>事件驱动转换：</strong>通过事件触发状态转换，确保状态变化的可控性</li>
			<li><strong>历史追踪：</strong>维护状态变化历史，支持撤销和调试</li>
		</ul>
		
		<p><strong>🔧 核心技术点：</strong></p>
		<ul>
			<li><strong>状态定义：</strong>明确定义系统的所有可能状态和初始状态</li>
			<li><strong>转换规则：</strong>定义状态之间的合法转换路径和触发条件</li>
			<li><strong>事件处理：</strong>通过transition方法处理状态转换事件</li>
			<li><strong>状态验证：</strong>确保只有合法的状态转换才能执行</li>
		</ul>
		
		<p><strong>💡 设计模式：</strong></p>
		<ul>
			<li><strong>状态机模式：</strong>将复杂的状态逻辑抽象为状态机</li>
			<li><strong>事件驱动：</strong>通过事件触发状态变化，实现松耦合</li>
			<li><strong>命令模式：</strong>将状态转换封装为命令对象</li>
			<li><strong>观察者模式：</strong>状态变化时通知所有观察者</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>使用store的响应式特性，避免手动状态管理</li>
			<li>合理设计状态粒度，避免状态爆炸</li>
			<li>优化状态转换逻辑，减少不必要的计算</li>
			<li>限制历史记录数量，避免内存占用过大</li>
		</ul>
		
		<p><strong>🛠️ 应用场景：</strong></p>
		<ul>
			<li><strong>工作流管理：</strong>文档审批、订单处理、任务流程</li>
			<li><strong>用户权限：</strong>不同角色的权限状态管理</li>
			<li><strong>UI状态：</strong>加载、错误、成功等状态控制</li>
			<li><strong>游戏逻辑：</strong>角色状态、关卡进度、游戏流程</li>
			<li><strong>表单验证：</strong>表单状态、验证流程、提交状态</li>
		</ul>
		
		<p><strong>🎨 最佳实践：</strong></p>
		<ul>
			<li>明确定义所有可能的状态和转换规则</li>
			<li>使用TypeScript定义状态和事件的类型</li>
			<li>提供状态查询方法，如canTransition</li>
			<li>维护状态变化历史，便于调试和撤销</li>
			<li>支持状态机的重置和初始化</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>避免状态机过于复杂，影响可维护性</li>
			<li>确保状态转换的原子性，避免中间状态</li>
			<li>合理处理无效的状态转换请求</li>
			<li>考虑状态机的可测试性和可扩展性</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  import &#123; writable &#125; from 'svelte/store';
  
  // 创建状态机
  function createStateMachine(initialState, transitions) &#123;
    const &#123; subscribe, update &#125; = writable(&#123;
      state: initialState,
      history: [initialState]
    &#125;);
    
    function transition(event) &#123;
      update(current =&gt; &#123;
        const nextState = transitions[current.state][event];
        if (!nextState) return current;
        
        return &#123;
          state: nextState,
          history: [...current.history, nextState]
        &#125;;
      &#125;);
    &#125;
    
    return &#123; subscribe, transition &#125;;
  &#125;
  
  // 定义状态转换
  const machine = createStateMachine('idle', &#123;
    idle: &#123; start: 'running' &#125;,
    running: &#123; stop: 'idle', pause: 'paused' &#125;,
    paused: &#123; resume: 'running', stop: 'idle' &#125;
  &#125;);
&lt;/script&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.state-machine-demo {
		padding: 20px;
		min-height: 400px;
	}
	
	.current-state, .available-actions, .state-history {
		margin-bottom: 24px;
		padding: 20px;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		background: #f8f9fa;
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
	
	h5 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.9em;
	}
	
	.state-indicator {
		padding: 15px 30px;
		border-radius: 25px;
		color: white;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		display: inline-block;
	}
	
	.action-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	
	.action-btn {
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		background: #007bff;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	
	.action-btn:hover {
		background: #0056b3;
	}
	
	.history-timeline {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}
	
	.history-item {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	
	.history-state {
		padding: 8px 16px;
		border-radius: 20px;
		color: white;
		font-size: 14px;
		font-weight: bold;
	}
	
	.history-arrow {
		font-size: 20px;
		color: #666;
	}
	
	.control-group button {
		padding: 10px 20px;
		background: #6c757d;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.control-group button:hover {
		background: #5a6268;
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
