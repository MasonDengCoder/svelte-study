<script lang="ts">
	import LongPressDemo from './actions/LongPressDemo.svelte';
	import DraggableDemo from './actions/DraggableDemo.svelte';
	import LifecycleDemo from './lifecycle/LifecycleDemo.svelte';
	import AdvancedStoresDemo from './stores/AdvancedStoresDemo.svelte';
	import AdvancedAnimationsDemo from './animations/AdvancedAnimationsDemo.svelte';
	import StateMachineDemo from './state-machines/StateMachineDemo.svelte';
	import CompositeComponentsDemo from './components/CompositeComponentsDemo.svelte';
	import Header from '../../shared/layout/Header.svelte';
	import TabNavigation from '../../shared/navigation/TabNavigation.svelte';
	import LearningTips from '../../components/LearningTips.svelte';
  import TutorialLayout from '@/shared/layout/TutorialLayout.svelte';
	
	type DemoKey = 'actions' | 'lifecycle' | 'stores' | 'animations' | 'stateMachines' | 'components';
	let currentDemo: DemoKey = 'actions';
	
	// 调试信息
	$: console.log('当前演示：', currentDemo);
	
	const advanced: Record<DemoKey, { name: string; component: string }> = {
		actions: { name: '自定义 Actions', component: 'actions' },
		lifecycle: { name: '生命周期钩子', component: 'lifecycle' },
		stores: { name: '高级 Stores', component: 'stores' },
		animations: { name: '高级动画', component: 'animations' },
		stateMachines: { name: '状态机', component: 'stateMachines' },
		components: { name: '复合组件', component: 'components' }
	};
	
	// 准备导航项目
	$: navigationItems = Object.entries(advanced).map(([key, demo]) => ({
		key,
		name: demo.name
	}));
	
	function handleNavigate(key: string) {
		console.log('点击按钮：', key);
		currentDemo = key as DemoKey;
	}
</script>

<TutorialLayout>
	<Header 
		title="Svelte 高级特性演示"
		subtitle="探索 Svelte 的强大功能和高级特性"
		showStatus={true}
	/>
	
	<TabNavigation 
		items={navigationItems}
		currentKey={currentDemo}
		onNavigate={handleNavigate}
	/>
	
	<main class="demo-content">
		{#if currentDemo === 'actions'}
			<div class="demo-section">
				<LongPressDemo />
				<hr />
				<DraggableDemo />
			</div>
		{:else if currentDemo === 'lifecycle'}
			<div class="demo-section">
				<LifecycleDemo />
			</div>
		{:else if currentDemo === 'stores'}
			<div class="demo-section">
				<AdvancedStoresDemo />
			</div>
		{:else if currentDemo === 'animations'}
			<div class="demo-section">
				<AdvancedAnimationsDemo />
			</div>
		{:else if currentDemo === 'stateMachines'}
			<div class="demo-section">
				<StateMachineDemo />
			</div>
		{:else if currentDemo === 'components'}
			<div class="demo-section">
				<CompositeComponentsDemo />
			</div>
		{:else}
			<div class="demo-section">
				<div style="padding: 40px; text-align: center; color: #666;">
					<h3>未知的演示类型: {currentDemo}</h3>
					<p>请选择一个有效的演示选项</p>
					<button 
						on:click={() => currentDemo = 'actions'}
						style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;"
					>
						返回到自定义 Actions
					</button>
				</div>
			</div>
		{/if}
	</main>
	
	<LearningTips 
		variant="floating"
		currentIndex={Object.keys(advanced).indexOf(currentDemo) + 1}
		totalCount={Object.keys(advanced).length}
		progressLabel="学习进度"
		tipsTitle="高级特性学习建议"
		tips={[
			'从基础 Actions 开始学习',
			'理解组件生命周期机制',
			'掌握 Context API 使用',
			'学习高级 Stores 模式',
			'探索强大的模板语法',
			'掌握动画和过渡效果',
			'理解状态机设计模式',
			'学习复合组件开发'
		]}
	/>
</TutorialLayout>

<style>
	.main-demo {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	
	/* Header 和 Navigation 样式已移至独立组件 */
	
	.demo-content {
		min-height: 600px;
	}
	
	.demo-section {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	

	
	hr {
		border: none;
		border-top: 1px solid #e0e0e0;
		margin: 40px 0;
	}
</style>
