<script lang="ts">
	import Calendar from './Calendar.svelte'
	import DemoContainer from '@/components/DemoContainer.svelte'

	// 演示状态
	let selectedDate = new Date()
	let currentTheme: 'light' | 'dark' = 'light'
	let showWeekNumbers = false
	let highlightToday = true
	let allowDateSelection = true

	// 示例事件数据
	let events = [
		{
			id: '1',
			date: new Date(2024, 11, 15),
			title: '项目会议',
			description: '讨论项目进度和下一步计划',
			color: '#007bff'
		},
		{
			id: '2',
			date: new Date(2024, 11, 20),
			title: '生日聚会',
			description: '朋友的生日庆祝活动',
			color: '#28a745'
		},
		{
			id: '3',
			date: new Date(2024, 11, 25),
			title: '医生预约',
			description: '年度体检',
			color: '#dc3545'
		},
		{
			id: '4',
			date: new Date(2024, 11, 30),
			title: '购物清单',
			description: '准备新年用品',
			color: '#ffc107'
		},
		{
			id: '5',
			date: new Date(2024, 11, 15),
			title: '代码审查',
			description: '团队代码审查会议',
			color: '#6f42c1'
		},
		{
			id: '6',
			date: new Date(2024, 11, 22),
			title: '健身课程',
			description: '每周健身训练',
			color: '#fd7e14'
		}
	]

	// 事件处理
	function handleDateSelect(event: CustomEvent) {
		selectedDate = event.detail.date
		console.log('选中日期:', selectedDate.toLocaleDateString())
	}

	function handleMonthChange(event: CustomEvent) {
		console.log('月份变化:', event.detail.month.toLocaleDateString())
	}

	// 添加新事件
	function addRandomEvent() {
		const randomDate = new Date()
		randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30))
		
		const eventColors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#fd7e14', '#e83e8c']
		const eventTitles = ['会议', '约会', '购物', '运动', '学习', '休息', '旅行']
		
		const newEvent = {
			id: Date.now().toString(),
			date: randomDate,
			title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
			description: `随机生成的事件 - ${randomDate.toLocaleDateString()}`,
			color: eventColors[Math.floor(Math.random() * eventColors.length)]
		}
		
		events = [...events, newEvent]
	}

	// 清除所有事件
	function clearAllEvents() {
		events = []
	}

	// 跳转到今天
	function goToToday() {
		selectedDate = new Date()
	}

	// 格式化日期显示
	function formatDate(date: Date): string {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long'
		})
	}

	// 获取当前月份的事件统计
	$: currentMonthEvents = events.filter(event => 
		event.date.getMonth() === selectedDate.getMonth() &&
		event.date.getFullYear() === selectedDate.getFullYear()
	)

	$: selectedDateEvents = events.filter(event => 
		event.date.getDate() === selectedDate.getDate() &&
		event.date.getMonth() === selectedDate.getMonth() &&
		event.date.getFullYear() === selectedDate.getFullYear()
	)
</script>

<DemoContainer title="日历组件演示" variant="fullwidth">
	<div class="calendar-demo" slot="demo">
		<!-- 控制面板 -->
		<div class="controls-panel">
			<div class="control-group">
				<h4>🎨 主题设置</h4>
				<div class="control-buttons">
					<button 
						class="control-btn" 
						class:active={currentTheme === 'light'}
						on:click={() => currentTheme = 'light'}
					>
						浅色主题
					</button>
					<button 
						class="control-btn" 
						class:active={currentTheme === 'dark'}
						on:click={() => currentTheme = 'dark'}
					>
						深色主题
					</button>
				</div>
			</div>

			<div class="control-group">
				<h4>⚙️ 功能开关</h4>
				<div class="control-options">
					<label class="control-option">
						<input type="checkbox" bind:checked={showWeekNumbers}>
						<span>显示周数</span>
					</label>
					<label class="control-option">
						<input type="checkbox" bind:checked={highlightToday}>
						<span>高亮今天</span>
					</label>
					<label class="control-option">
						<input type="checkbox" bind:checked={allowDateSelection}>
						<span>允许选择日期</span>
					</label>
				</div>
			</div>

			<div class="control-group">
				<h4>📅 快速操作</h4>
				<div class="control-buttons">
					<button class="control-btn" on:click={goToToday}>
						跳转到今天
					</button>
					<button class="control-btn" on:click={addRandomEvent}>
						添加随机事件
					</button>
					<button class="control-btn danger" on:click={clearAllEvents}>
						清除所有事件
					</button>
				</div>
			</div>
		</div>

		<!-- 日历组件 -->
		<div class="calendar-container">
			<Calendar
				bind:selectedDate
				{events}
				{showWeekNumbers}
				{highlightToday}
				{allowDateSelection}
				theme={currentTheme}
				on:dateSelect={handleDateSelect}
				on:monthChange={handleMonthChange}
			/>
		</div>

		<!-- 信息面板 -->
		<div class="info-panel">
			<div class="info-section">
				<h4>📊 统计信息</h4>
				<div class="stats-grid">
					<div class="stat-item">
						<span class="stat-label">当前月份事件</span>
						<span class="stat-value">{currentMonthEvents.length}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">选中日期事件</span>
						<span class="stat-value">{selectedDateEvents.length}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">总事件数</span>
						<span class="stat-value">{events.length}</span>
					</div>
				</div>
			</div>

			<div class="info-section">
				<h4>📅 选中日期详情</h4>
				<div class="selected-date-details">
					<p><strong>日期:</strong> {formatDate(selectedDate)}</p>
					{#if selectedDateEvents.length > 0}
						<div class="events-list">
							<strong>事件列表:</strong>
							{#each selectedDateEvents as event}
								<div class="event-detail" style="border-left-color: {event.color}">
									<span class="event-title">{event.title}</span>
									{#if event.description}
										<span class="event-desc">{event.description}</span>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<p class="no-events">该日期暂无事件</p>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<h4>🎛️ 组件属性</h4>
		<div class="props-list">
			<div class="prop-item">
				<code>selectedDate</code>
				<span>当前选中的日期</span>
			</div>
			<div class="prop-item">
				<code>events</code>
				<span>事件数组</span>
			</div>
			<div class="prop-item">
				<code>showWeekNumbers</code>
				<span>是否显示周数</span>
			</div>
			<div class="prop-item">
				<code>highlightToday</code>
				<span>是否高亮今天</span>
			</div>
			<div class="prop-item">
				<code>allowDateSelection</code>
				<span>是否允许选择日期</span>
			</div>
			<div class="prop-item">
				<code>theme</code>
				<span>主题样式 (light/dark)</span>
			</div>
		</div>

		<h4>📡 事件</h4>
		<div class="events-list">
			<div class="event-item">
				<code>dateSelect</code>
				<span>日期选择事件</span>
			</div>
			<div class="event-item">
				<code>monthChange</code>
				<span>月份变化事件</span>
			</div>
		</div>
	</div>

	<div slot="explanation">
		<h4>💡 功能说明</h4>
		<ul>
			<li><strong>月份导航</strong>：使用左右箭头按钮切换月份</li>
			<li><strong>日期选择</strong>：点击日期进行选择，支持跨月份选择</li>
			<li><strong>事件显示</strong>：有事件的日期会显示彩色圆点指示器</li>
			<li><strong>主题切换</strong>：支持浅色和深色两种主题</li>
			<li><strong>响应式设计</strong>：适配各种屏幕尺寸</li>
			<li><strong>无障碍支持</strong>：支持键盘导航和屏幕阅读器</li>
		</ul>

		<h4>🔧 技术特性</h4>
		<ul>
			<li>使用 Svelte 的响应式系统自动更新日历视图</li>
			<li>支持事件管理和动态添加/删除事件</li>
			<li>完整的 TypeScript 类型定义</li>
			<li>CSS Grid 布局实现灵活的日历网格</li>
			<li>事件派发器实现组件间通信</li>
		</ul>
	</div>

	<div slot="code">
		<h4>📝 使用示例</h4>
		<pre><code>{`<script>
  import Calendar from './Calendar.svelte'
  
  let selectedDate = new Date()
  let events = [
    {
      id: '1',
      date: new Date(2024, 11, 15),
      title: '会议',
      description: '项目讨论',
      color: '#007bff'
    }
  ]
  
  function handleDateSelect(event) {
    selectedDate = event.detail.date
  }
</script>

<Calendar
  bind:selectedDate
  {events}
  showWeekNumbers={true}
  highlightToday={true}
  theme="light"
  on:dateSelect={handleDateSelect}
/>`}</code></pre>
	</div>
</DemoContainer>

<style>
	.calendar-demo {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}

	.controls-panel {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 1.5rem;
		background: #f8f9fa;
		border-radius: 12px;
		border: 1px solid #e9ecef;
	}

	.control-group h4 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.1rem;
	}

	.control-buttons {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.control-btn {
		padding: 0.5rem 1rem;
		border: 1px solid #dee2e6;
		background: white;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.control-btn:hover {
		background: #f8f9fa;
		border-color: #007bff;
	}

	.control-btn.active {
		background: #007bff;
		color: white;
		border-color: #007bff;
	}

	.control-btn.danger {
		background: #dc3545;
		color: white;
		border-color: #dc3545;
	}

	.control-btn.danger:hover {
		background: #c82333;
		border-color: #c82333;
	}

	.control-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.control-option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.control-option input[type="checkbox"] {
		width: 1rem;
		height: 1rem;
	}

	.calendar-container {
		display: flex;
		justify-content: center;
	}

	.info-panel {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.info-section {
		padding: 1.5rem;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.info-section h4 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.1rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
	}

	.stat-item {
		text-align: center;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
		border: 1px solid #e9ecef;
	}

	.stat-label {
		display: block;
		font-size: 0.8rem;
		color: #6c757d;
		margin-bottom: 0.5rem;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #007bff;
	}

	.selected-date-details p {
		margin: 0 0 0.5rem 0;
		color: #495057;
	}

	.events-list {
		margin-top: 1rem;
	}

	.event-detail {
		padding: 0.75rem;
		margin: 0.5rem 0;
		background: #f8f9fa;
		border-radius: 6px;
		border-left: 3px solid;
	}

	.event-title {
		display: block;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.25rem;
	}

	.event-desc {
		display: block;
		font-size: 0.85rem;
		color: #6c757d;
	}

	.no-events {
		color: #6c757d;
		font-style: italic;
	}

	.props-list, .events-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.prop-item, .event-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.5rem;
		background: #f8f9fa;
		border-radius: 4px;
	}

	.prop-item code, .event-item code {
		background: #e9ecef;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
		font-size: 0.85rem;
		color: #495057;
	}

	.prop-item span, .event-item span {
		font-size: 0.85rem;
		color: #666;
	}

	pre {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.4;
	}

	code {
		font-family: 'Courier New', monospace;
	}

	@media (max-width: 768px) {
		.calendar-demo {
			padding: 0.5rem;
		}

		.controls-panel {
			grid-template-columns: 1fr;
			padding: 1rem;
		}

		.info-panel {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.control-buttons {
			flex-direction: column;
		}

		.control-btn {
			width: 100%;
		}
	}
</style>
