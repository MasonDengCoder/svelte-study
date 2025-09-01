<script lang="ts">
	import TutorialLayout from '@/shared/layout/TutorialLayout.svelte';
	import HelloWorld from './01-hello-world/HelloWorld.svelte';
	import ReactiveData from './02-reactive-data/ReactiveData.svelte';
	import ConditionalRendering from './03-conditional-rendering/ConditionalRendering.svelte';
	import ListRendering from './04-list-rendering/ListRendering.svelte';
	import EventHandling from './05-event-handling/EventHandling.svelte';
	import Header from '../../shared/layout/Header.svelte';
	import TabNavigation from '../../shared/navigation/TabNavigation.svelte';
	import LearningTips from '../../components/LearningTips.svelte';
	
	type TutorialKey = 'hello-world' | 'reactive-data' | 'conditional-rendering' | 'list-rendering' | 'event-handling';
	let currentTutorial: TutorialKey = 'hello-world';
	
	const tutorials: Record<TutorialKey, { name: string; component: string; description: string }> = {
		'hello-world': { 
			name: 'Hello World', 
			component: 'hello-world',
			description: '第一个 Svelte 组件，学习基础语法和结构'
		},
		'reactive-data': { 
			name: '响应式数据', 
			component: 'reactive-data',
			description: '理解 Svelte 的响应式系统和数据绑定'
		},
		'conditional-rendering': { 
			name: '条件渲染', 
			component: 'conditional-rendering',
			description: '学习 if/else 条件和动态内容显示'
		},
		'list-rendering': { 
			name: '列表渲染', 
			component: 'list-rendering',
			description: '掌握 each 循环和数组操作'
		},
		'event-handling': { 
			name: '事件处理', 
			component: 'event-handling',
			description: '学习各种事件处理和用户交互'
		}
	};
	
	// 准备导航项目
	$: navigationItems = Object.entries(tutorials).map(([key, tutorial]) => ({
		key,
		name: tutorial.name,
		description: tutorial.description
	}));
	
	function handleNavigate(key: string) {
		currentTutorial = key as TutorialKey;
	}
	
	function getCurrentComponent() {
		switch (currentTutorial) {
			case 'hello-world':
				return HelloWorld;
			case 'reactive-data':
				return ReactiveData;
			case 'conditional-rendering':
				return ConditionalRendering;
			case 'list-rendering':
				return ListRendering;
			case 'event-handling':
				return EventHandling;
			default:
				return HelloWorld;
		}
	}
</script>

<svelte:head>
	<title>Svelte 基础教学 - {tutorials[currentTutorial].name}</title>
</svelte:head>

<TutorialLayout>
	<Header 
		title="Svelte 基础教学"
		subtitle="从零开始学习 Svelte，掌握现代前端开发技能"
	/>
	
	<TabNavigation 
		items={navigationItems}
		currentKey={currentTutorial}
		onNavigate={handleNavigate}
	/>
	
	<main class="tutorial-content">
		<div class="tutorial-demo">
			<svelte:component this={getCurrentComponent()} />
		</div>
	</main>
	
	<LearningTips 
		variant="floating"
		currentIndex={Object.keys(tutorials).indexOf(currentTutorial) + 1}
		totalCount={Object.keys(tutorials).length}
		progressLabel="学习进度"
		tipsTitle="学习建议"
		tips={[
			'按照顺序学习每个教程',
			'动手修改代码，观察变化',
			'理解每个概念的原理',
			'尝试组合使用不同特性',
			'遇到问题时查看控制台输出'
		]}
	/>
</TutorialLayout>

<style>
	.tutorial-content {
		margin-bottom: 40px;
	}
	
	.tutorial-demo {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	
	@media (max-width: 768px) {
		/* 响应式样式已移至对应组件内部 */
	}
</style>
