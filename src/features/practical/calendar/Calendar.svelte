<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte'

	// 事件派发器
	const dispatch = createEventDispatcher()

	// 组件属性
	export let selectedDate: Date = new Date()
	export let events: Array<{
		id: string
		date: Date
		title: string
		description?: string
		color?: string
	}> = []
	export let showWeekNumbers: boolean = false
	export let highlightToday: boolean = true
	export let allowDateSelection: boolean = true
	export let theme: 'light' | 'dark' = 'light'

	// 内部状态
	let currentMonth: Date
	let hoveredDate: Date | null = null

	// 初始化当前月份
	$: currentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)

	// 获取月份名称
	function getMonthName(date: Date): string {
		return date.toLocaleDateString('zh-CN', { month: 'long' })
	}

	// 获取星期名称
	function getWeekdayNames(): string[] {
		return ['日', '一', '二', '三', '四', '五', '六']
	}

	// 获取月份的天数
	function getDaysInMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	}

	// 获取月份第一天是星期几
	function getFirstDayOfMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
	}

	// 生成日历网格数据
	$: calendarDays = (() => {
		const days: Array<{
			date: Date
			isCurrentMonth: boolean
			isToday: boolean
			isSelected: boolean
			hasEvents: boolean
			events: typeof events
		}> = []

		const firstDay = getFirstDayOfMonth(currentMonth)
		const daysInMonth = getDaysInMonth(currentMonth)
		const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
		const daysInPrevMonth = getDaysInMonth(prevMonth)

		// 添加上个月的日期
		for (let i = firstDay - 1; i >= 0; i--) {
			const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i)
			days.push({
				date,
				isCurrentMonth: false,
				isToday: isToday(date),
				isSelected: isSameDate(date, selectedDate),
				hasEvents: hasEventsOnDate(date),
				events: getEventsOnDate(date)
			})
		}

		// 添加当前月的日期
		for (let i = 1; i <= daysInMonth; i++) {
			const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
			days.push({
				date,
				isCurrentMonth: true,
				isToday: isToday(date),
				isSelected: isSameDate(date, selectedDate),
				hasEvents: hasEventsOnDate(date),
				events: getEventsOnDate(date)
			})
		}

		// 添加下个月的日期
		const remainingDays = 42 - days.length // 6行7列 = 42
		for (let i = 1; i <= remainingDays; i++) {
			const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i)
			days.push({
				date,
				isCurrentMonth: false,
				isToday: isToday(date),
				isSelected: isSameDate(date, selectedDate),
				hasEvents: hasEventsOnDate(date),
				events: getEventsOnDate(date)
			})
		}

		return days
	})()

	// 工具函数
	function isToday(date: Date): boolean {
		const today = new Date()
		return isSameDate(date, today)
	}

	function isSameDate(date1: Date, date2: Date): boolean {
		return date1.getFullYear() === date2.getFullYear() &&
			   date1.getMonth() === date2.getMonth() &&
			   date1.getDate() === date2.getDate()
	}

	function hasEventsOnDate(date: Date): boolean {
		return events.some(event => isSameDate(event.date, date))
	}

	function getEventsOnDate(date: Date): typeof events {
		return events.filter(event => isSameDate(event.date, date))
	}

	// 导航函数
	function goToPreviousMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
		dispatch('monthChange', { month: currentMonth })
	}

	function goToNextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
		dispatch('monthChange', { month: currentMonth })
	}

	function goToToday() {
		const today = new Date()
		currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
		selectedDate = today
		dispatch('dateSelect', { date: today })
		dispatch('monthChange', { month: currentMonth })
	}

	// 日期选择
	function selectDate(date: Date) {
		if (!allowDateSelection) return
		
		selectedDate = date
		dispatch('dateSelect', { date })
		
		// 如果选择的日期不在当前月份，切换到对应月份
		if (!isSameDate(date, new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))) {
			currentMonth = new Date(date.getFullYear(), date.getMonth(), 1)
			dispatch('monthChange', { month: currentMonth })
		}
	}

	// 获取事件颜色
	function getEventColor(event: typeof events[0]): string {
		return event.color || '#007bff'
	}

	// 格式化日期
	function formatDate(date: Date): string {
		return date.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
</script>

<div class="calendar" class:dark={theme === 'dark'}>
	<!-- 日历头部 -->
	<div class="calendar-header">
		<button class="nav-btn" on:click={goToPreviousMonth} aria-label="上个月">
			←
		</button>
		
		<div class="month-display">
			<h2 class="month-title">{getMonthName(currentMonth)} {currentMonth.getFullYear()}</h2>
			<button class="today-btn" on:click={goToToday}>今天</button>
		</div>
		
		<button class="nav-btn" on:click={goToNextMonth} aria-label="下个月">
			→
		</button>
	</div>

	<!-- 星期标题 -->
	<div class="weekdays" class:with-week-numbers={showWeekNumbers}>
		{#if showWeekNumbers}
			<div class="weekday-header week-number">周</div>
		{/if}
		{#each getWeekdayNames() as weekday}
			<div class="weekday-header">{weekday}</div>
		{/each}
	</div>

	<!-- 日历网格 -->
	<div class="calendar-grid" class:with-week-numbers={showWeekNumbers}>
		{#each calendarDays as day, index}
			{#if showWeekNumbers && index % 7 === 0}
				<div class="week-number">
					{Math.floor(index / 7) + 1}
				</div>
			{/if}
			
			<button
				class="calendar-day"
				class:current-month={day.isCurrentMonth}
				class:today={day.isToday && highlightToday}
				class:selected={day.isSelected}
				class:has-events={day.hasEvents}
				class:hovered={hoveredDate && isSameDate(day.date, hoveredDate)}
				on:click={() => selectDate(day.date)}
				on:mouseenter={() => hoveredDate = day.date}
				on:mouseleave={() => hoveredDate = null}
				disabled={!allowDateSelection}
			>
				<span class="day-number">{day.date.getDate()}</span>
				
				{#if day.hasEvents}
					<div class="event-indicators">
						{#each day.events.slice(0, 3) as event}
							<div 
								class="event-dot"
								style="background-color: {getEventColor(event)}"
								title="{event.title}"
							></div>
						{/each}
						{#if day.events.length > 3}
							<div class="event-more">+{day.events.length - 3}</div>
						{/if}
					</div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- 选中日期信息 -->
	{#if allowDateSelection}
		<div class="selected-date-info">
			<strong>选中日期:</strong> {formatDate(selectedDate)}
			{#if getEventsOnDate(selectedDate).length > 0}
				<div class="selected-events">
					<strong>事件:</strong>
					{#each getEventsOnDate(selectedDate) as event}
						<div class="event-item" style="border-left-color: {getEventColor(event)}">
							<span class="event-title">{event.title}</span>
							{#if event.description}
								<span class="event-description">{event.description}</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.calendar {
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.calendar.dark {
		background: #2d3748;
		color: white;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.nav-btn {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.2s ease;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.month-display {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.month-title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.today-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
	}

	.today-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		background: #f8f9fa;
		border-bottom: 1px solid #e9ecef;
	}

	.weekdays.with-week-numbers {
		grid-template-columns: auto repeat(7, 1fr);
	}

	.calendar.dark .weekdays {
		background: #4a5568;
		border-bottom-color: #718096;
	}

	.weekday-header {
		padding: 0.75rem;
		text-align: center;
		font-weight: 600;
		color: #495057;
		font-size: 0.9rem;
	}

	.calendar.dark .weekday-header {
		color: #e2e8f0;
	}

	.week-number {
		padding: 0.75rem;
		text-align: center;
		font-weight: 600;
		color: #6c757d;
		font-size: 0.8rem;
		background: #f1f3f4;
	}

	.calendar.dark .week-number {
		background: #4a5568;
		color: #a0aec0;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.calendar-grid.with-week-numbers {
		grid-template-columns: auto repeat(7, 1fr);
	}

	.calendar-day {
		position: relative;
		aspect-ratio: 1;
		border: none;
		background: white;
		color: #333;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		min-height: 60px;
	}

	.calendar.dark .calendar-day {
		background: #2d3748;
		color: white;
	}

	.calendar-day:hover {
		background: #f8f9fa;
		transform: scale(1.05);
		z-index: 1;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.calendar.dark .calendar-day:hover {
		background: #4a5568;
	}

	.calendar-day:not(.current-month) {
		color: #6c757d;
		background: #f8f9fa;
	}

	.calendar.dark .calendar-day:not(.current-month) {
		color: #718096;
		background: #4a5568;
	}

	.calendar-day.today {
		background: #e3f2fd;
		color: #1976d2;
		font-weight: 600;
	}

	.calendar.dark .calendar-day.today {
		background: #2c5282;
		color: #90cdf4;
	}

	.calendar-day.selected {
		background: #007bff;
		color: white;
		font-weight: 600;
	}

	.calendar.dark .calendar-day.selected {
		background: #3182ce;
	}

	.calendar-day.selected:hover {
		background: #0056b3;
	}

	.calendar.dark .calendar-day.selected:hover {
		background: #2c5282;
	}

	.calendar-day:disabled {
		cursor: default;
		opacity: 0.6;
	}

	.calendar-day:disabled:hover {
		transform: none;
		box-shadow: none;
	}

	.day-number {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 0.25rem;
		color: inherit;
	}

	.event-indicators {
		display: flex;
		gap: 2px;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		max-width: 100%;
	}

	.event-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.event-more {
		font-size: 0.7rem;
		color: #495057;
		font-weight: 600;
	}

	.calendar.dark .event-more {
		color: #a0aec0;
	}

	.selected-date-info {
		padding: 1rem;
		background: #f8f9fa;
		border-top: 1px solid #e9ecef;
		font-size: 0.9rem;
	}

	.calendar.dark .selected-date-info {
		background: #4a5568;
		border-top-color: #718096;
	}

	.selected-events {
		margin-top: 0.5rem;
	}

	.event-item {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		margin: 0.25rem 0;
		background: white;
		border-radius: 4px;
		border-left: 3px solid;
		font-size: 0.85rem;
	}

	.calendar.dark .event-item {
		background: #2d3748;
	}

	.event-title {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.event-description {
		color: #495057;
		font-size: 0.8rem;
	}

	.calendar.dark .event-description {
		color: #a0aec0;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.calendar-header {
			padding: 0.75rem;
		}

		.month-title {
			font-size: 1.2rem;
		}

		.month-display {
			flex-direction: column;
			gap: 0.5rem;
		}

		.calendar-day {
			min-height: 50px;
			padding: 0.25rem;
		}

		.day-number {
			font-size: 0.9rem;
		}

		.event-dot {
			width: 4px;
			height: 4px;
		}
	}

	@media (max-width: 480px) {
		.calendar-day {
			min-height: 40px;
		}

		.day-number {
			font-size: 0.8rem;
		}

		.event-indicators {
			display: none;
		}
	}
</style>
