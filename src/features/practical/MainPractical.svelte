<script lang="ts">
  import CalculatorDemo from './calculator/CalculatorDemo.svelte';
  import SpaRouterDemo from './spa-router/SpaRouterDemo.svelte';
  import CalendarDemo from './calendar/CalendarDemo.svelte';
  import Header from '../../shared/layout/Header.svelte';
  import TabNavigation from '../../shared/navigation/TabNavigation.svelte';
  import LearningTips from '../../components/LearningTips.svelte';
  import TutorialLayout from '@/shared/layout/TutorialLayout.svelte';

  type PracticalKey = 'calculator' | 'spa-router' | 'calendar';
  let currentPractical: PracticalKey = 'calculator';

  const practicals: Record<PracticalKey, { name: string; component: string; description: string; icon: string }> = {
    'calculator': { 
      name: '计算器应用', 
      component: 'calculator',
      description: '功能完整的计算器应用，支持基本运算和历史记录功能',
      icon: '🧮'
    },
    'spa-router': {
      name: 'SPA 路由演示',
      component: 'spa-router', 
      description: '完整的 svelte-spa-router 使用演示，包含路由导航、参数传递、编程式导航等功能',
      icon: '🔗'
    },
    'calendar': {
      name: '日历组件',
      component: 'calendar',
      description: '功能完整的日历组件，支持事件管理、主题切换、日期选择等功能',
      icon: '📅'
    }
  };

  // 准备导航项目
  $: navigationItems = Object.entries(practicals).map(([key, practical]) => ({
    key,
    name: practical.name,
    description: practical.description
  }));

  function handleNavigate(key: string) {
    currentPractical = key as PracticalKey;
  }

  function getCurrentComponent() {
    switch (currentPractical) {
      case 'calculator':
        return CalculatorDemo;
      case 'spa-router':
        return SpaRouterDemo;
      case 'calendar':
        return CalendarDemo;
      default:
        return CalculatorDemo;
    }
  }
</script>

<svelte:head>
  <title>Svelte 应用实操 - {practicals[currentPractical].name}</title>
</svelte:head>

<TutorialLayout>
  <Header 
    title="Svelte 应用实操"
    subtitle="通过实际项目案例学习 Svelte 应用开发技能"
  />
  
  <TabNavigation 
    items={navigationItems}
    currentKey={currentPractical}
    onNavigate={handleNavigate}
  />
  
  <main class="practical-content">
    <div class="practical-demo">
      <svelte:component this={getCurrentComponent()} />
    </div>
  </main>
  
  <LearningTips 
    variant="floating"
    currentIndex={Object.keys(practicals).indexOf(currentPractical) + 1}
    totalCount={Object.keys(practicals).length}
    progressLabel="实操进度"
    tipsTitle="实操建议"
    tips={[
      '尝试理解每个组件的实现原理',
      '查看源代码并修改参数观察变化',
      '思考如何扩展现有功能',
      '将学到的技术应用到自己的项目中',
      '注意代码的组织结构和最佳实践'
    ]}
  />
</TutorialLayout>

<style>
  /* Header 和 Navigation 样式已移至独立组件 */
  .practical-content {
    margin-bottom: 40px;
  }
  
  .practical-demo {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    min-height: 500px;
  }
</style>
