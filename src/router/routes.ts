// 路由类型定义

// 导入页面组件
import Welcome from '@/pages/welcome.svelte'
import MainTutorial from '@/features/tutorials/MainTutorial.svelte'
import MainAdvanced from '@/features/advanced/MainAdvanced.svelte'
import MainPractical from '@/features/practical/MainPractical.svelte'
import Counter from '@/shared/ui/Counter.svelte'

// 路由配置
export const routes: any = {
  // 首页
  '/': Welcome,
  
  // 教程页面
  '/tutorials': MainTutorial,
  '/tutorials/*': MainTutorial, // 支持嵌套路由
  
  // 高级特性
  '/advanced': MainAdvanced,
  '/advanced/*': MainAdvanced, // 支持嵌套路由
  
  // 实践应用
  '/practical': MainPractical,
  '/practical/*': MainPractical, // 支持嵌套路由
  
  // 计算器示例
  '/counter': Counter,
  
  // 404 页面
  '*': Welcome // 默认重定向到首页
}

// 路由信息配置
export const routeInfo = {
  '/': { name: '首页', description: '欢迎使用 Svelte 学习平台' },
  '/tutorials': { name: '基础教程', description: '从零开始学习 Svelte' },
  '/advanced': { name: '高级特性', description: '探索 Svelte 的强大功能' },
  '/practical': { name: '实践应用', description: '实际应用案例演示' },
  '/counter': { name: '计算器', description: '简单的计算器组件示例' }
}

// 导航菜单项
export const navigationItems = [
  { path: '/', name: '首页', icon: '🏠' },
  { path: '/tutorials', name: '基础教程', icon: '📚' },
  { path: '/advanced', name: '高级特性', icon: '🚀' },
  { path: '/practical', name: '实践应用', icon: '🛠️' },
  { path: '/counter', name: '计算器', icon: '🔢' }
]
