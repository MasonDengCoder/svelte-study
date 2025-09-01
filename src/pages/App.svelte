<script lang="ts">
	import Router, { location } from 'svelte-spa-router'
	import { routes, routeInfo } from '@/router/routes'
	import EnhancedNavigation from '@/components/EnhancedNavigation.svelte'
	
	// 监听路由变化
	$: currentPath = $location
	$: currentRouteInfo = (routeInfo as any)[currentPath] || routeInfo['/']
</script>

<svelte:head>
	<title>Svelte 学习平台 - {currentRouteInfo.name}</title>
</svelte:head>

<!-- 增强路由导航系统 -->
<EnhancedNavigation />

<main class="main-content min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
	<div class="max-w-8xl mx-auto">
		<!-- 路由容器 -->
		<Router {routes} />
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	
	.main-content {
		transition: all 0.3s ease;
	}
</style>