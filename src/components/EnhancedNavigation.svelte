<script lang="ts">
	import { link, location } from 'svelte-spa-router'
	import { navigationItems, routeInfo } from '@/router/routes'
	import { onMount } from 'svelte'

	// 导航状态
	let showQuickNav = false
	let recentItems: any[] = []
	
	// 响应式状态
	$: currentPath = $location
	$: currentRouteInfo = (routeInfo as any)[currentPath] || routeInfo['/']
	$: breadcrumbs = generateBreadcrumbs(currentPath)
	
	// 生成面包屑
	function generateBreadcrumbs(path: string) {
		const breadcrumbs = [{ title: '首页', icon: '🏠', path: '/' }]
		
		const currentItem = navigationItems.find(item => item.path === path)
		if (currentItem && path !== '/') {
			breadcrumbs.push({
				title: currentItem.name,
				icon: currentItem.icon,
				path: currentItem.path
			})
		}
		
		return breadcrumbs
	}
	
	// 切换快速导航
	function toggleQuickNav() {
		showQuickNav = !showQuickNav
		if (typeof window !== 'undefined') {
			localStorage.setItem('quickNav-show', showQuickNav.toString())
		}
	}
	
	// 处理导航
	function handleNavigation(path: string) {
		updateRecentItems(path)
	}
	
	// 更新最近访问
	function updateRecentItems(path: string) {
		const item = navigationItems.find(item => item.path === path)
		if (item && !recentItems.find(recent => recent.path === path)) {
			recentItems = [item, ...recentItems.filter(recent => recent.path !== path)].slice(0, 3)
			if (typeof window !== 'undefined') {
				localStorage.setItem('navigation-recent', JSON.stringify(recentItems))
			}
		}
	}
	
	// 初始化
	onMount(() => {
		if (typeof window !== 'undefined') {
			const savedRecent = localStorage.getItem('navigation-recent')
			if (savedRecent) {
				recentItems = JSON.parse(savedRecent)
			}
			
			const savedQuickNav = localStorage.getItem('quickNav-show')
			if (savedQuickNav !== null) {
				showQuickNav = savedQuickNav === 'true'
			}
		}
		
		// 监听路由变化更新最近访问
		updateRecentItems(currentPath)
	})
	
	// 监听路由变化
	$: if (currentPath) {
		updateRecentItems(currentPath)
	}
</script>

<!-- 顶部导航栏 -->
<header class="top-navigation">
	<div class="nav-container">
		<!-- 中间：面包屑导航 -->
		<nav class="breadcrumb" aria-label="面包屑导航">
			<ol class="breadcrumb-list">
				{#each breadcrumbs as breadcrumb, index}
					<li class="breadcrumb-item">
						{#if index === breadcrumbs.length - 1}
							<span class="breadcrumb-current">
								<span class="breadcrumb-icon">{breadcrumb.icon}</span>
								<span class="breadcrumb-text">{breadcrumb.title}</span>
							</span>
						{:else}
							<a 
								href={breadcrumb.path} 
								use:link 
								class="breadcrumb-link"
							>
								<span class="breadcrumb-icon">{breadcrumb.icon}</span>
								<span class="breadcrumb-text">{breadcrumb.title}</span>
							</a>
							<span class="breadcrumb-separator">/</span>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>
		
		<!-- 右侧：页面信息和快速操作 -->
		<div class="nav-actions">
			<button class="quick-nav-toggle" on:click={toggleQuickNav} aria-label="切换快速导航">
				<span class="quick-nav-icon">⚡</span>
			</button>
			<div class="page-title">
				<span class="title-text">{currentRouteInfo.name}</span>
			</div>
		</div>
	</div>
</header>

<!-- 快速导航面板 -->
{#if showQuickNav}
	<div class="quick-nav-panel">
		<div class="quick-nav-header">
			<h3>快速导航</h3>
			<button class="close-btn" on:click={toggleQuickNav}>✕</button>
		</div>
		
		<div class="quick-nav-grid">
			{#each navigationItems as item}
				<a 
					href={item.path} 
					use:link 
					class="quick-nav-item"
					class:active={currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path))}
					on:click={() => handleNavigation(item.path)}
				>
					<div class="quick-nav-icon">{item.icon}</div>
					<div class="quick-nav-content">
						<span class="quick-nav-title">{item.name}</span>
						<span class="quick-nav-description">
							{#if item.path === '/tutorials'}
								从零开始学习 Svelte
							{:else if item.path === '/advanced'}
								探索 Svelte 的强大功能
							{:else if item.path === '/practical'}
								实际应用案例演示
							{:else if item.path === '/counter'}
								简单的计算器组件
							{:else}
								欢迎使用 Svelte
							{/if}
						</span>
					</div>
				</a>
			{/each}
		</div>
		
		{#if recentItems.length > 0}
			<div class="recent-section">
				<h4>最近访问</h4>
				<div class="recent-items">
					{#each recentItems as item}
						<a 
							href={item.path} 
							use:link 
							class="recent-item"
							on:click={() => handleNavigation(item.path)}
						>
							<span class="recent-icon">{item.icon}</span>
							<span class="recent-title">{item.name}</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
		<div class="quick-nav-footer">
			<div class="nav-info">
				<p>当前路径: <strong>{currentPath || '/'}</strong></p>
			</div>
		</div>
	</div>
{/if}

<style>
	/* 顶部导航栏 */
	.top-navigation {
		position: sticky;
		top: 0;
		z-index: 1000;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}
	
	.nav-container {
		max-width: 1360px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 4rem;
	}
	
	
	
	/* 面包屑导航 */
	.breadcrumb {
		flex: 1;
		display: flex;
	}
	
	.breadcrumb-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	
	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.breadcrumb-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		text-decoration: none;
		color: #007bff;
		transition: all 0.2s ease;
		font-size: 0.9em;
	}
	
	.breadcrumb-link:hover {
		background: rgba(0, 123, 255, 0.1);
		color: #0056b3;
	}
	
	.breadcrumb-current {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		background: rgba(25, 118, 210, 0.1);
		color: #1976d2;
		font-weight: 600;
		font-size: 0.9em;
	}
	
	.breadcrumb-separator {
		color: #999;
		font-weight: bold;
	}
	
	/* 右侧操作区 */
	.nav-actions {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.quick-nav-toggle {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.quick-nav-toggle:hover {
		background: #e9ecef;
		transform: scale(1.05);
	}
	
	.quick-nav-icon {
		font-size: 1.2em;
	}
	
	.page-title {
		text-align: right;
	}
	
	.title-text {
		font-size: 1rem;
		font-weight: 600;
		color: #333;
		padding: 0.5rem 1rem;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 0.5rem;
	}
	
	/* 快速导航面板 */
	.quick-nav-panel {
		position: fixed;
		top: 4rem;
		right: 1rem;
		width: 20rem;
		max-height: calc(100vh - 5rem);
		background: white;
		border-radius: 0.75rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		border: 1px solid #e9ecef;
		z-index: 999;
		overflow: hidden;
		animation: slideInRight 0.3s ease;
	}
	
	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	.quick-nav-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-bottom: 1px solid #e9ecef;
		background: #f8f9fa;
	}
	
	.quick-nav-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: #333;
	}
	
	.close-btn {
		background: none;
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		color: #666;
		padding: 0.25rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease;
	}
	
	.close-btn:hover {
		background: rgba(0, 0, 0, 0.1);
	}
	
	.quick-nav-grid {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 20rem;
		overflow-y: auto;
	}
	
	.quick-nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 0.5rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}
	
	.quick-nav-item:hover {
		background: #f8f9fa;
		border-color: #007bff;
		transform: translateY(-1px);
	}
	
	.quick-nav-item.active {
		background: #e3f2fd;
		border-color: #2196f3;
	}
	
	.quick-nav-icon {
		font-size: 1.5rem;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		border-radius: 0.5rem;
		flex-shrink: 0;
	}
	
	.quick-nav-content {
		flex: 1;
		min-width: 0;
	}
	
	.quick-nav-title {
		display: block;
		font-weight: 600;
		color: #333;
		margin-bottom: 0.25rem;
	}
	
	.quick-nav-description {
		display: block;
		font-size: 0.8rem;
		color: #666;
		line-height: 1.3;
	}
	
	/* 最近访问 */
	.recent-section {
		padding: 1rem;
		border-top: 1px solid #e9ecef;
		background: #f8f9fa;
	}
	
	.recent-section h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		color: #555;
	}
	
	.recent-items {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	
	.recent-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 0.25rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
		font-size: 0.8rem;
	}
	
	.recent-item:hover {
		background: #e9ecef;
	}
	
	.quick-nav-footer {
		padding: 1rem;
		border-top: 1px solid #e9ecef;
		background: #f8f9fa;
	}
	
	.nav-info p {
		margin: 0;
		font-size: 0.8rem;
		color: #666;
	}
	
	/* 响应式设计 */
	@media (max-width: 768px) {
		.nav-container {
			padding: 0 0.75rem;
			height: 3.5rem;
		}
		
		
		
		.breadcrumb-text {
			font-size: 0.8rem;
		}
		
		.title-text {
			font-size: 0.9rem;
			padding: 0.5rem 0.75rem;
		}
		
		.quick-nav-panel {
			right: 0.5rem;
			width: calc(100vw - 1rem);
			max-width: 18rem;
		}
		

	}
	
	@media (max-width: 480px) {
		.nav-container {
			padding: 0 0.5rem;
			height: 3rem;
		}
		
		.breadcrumb-text {
			display: none;
		}
		
		.page-title {
			display: none;
		}
		
		.quick-nav-panel {
			top: 3rem;
			right: 0.25rem;
			width: calc(100vw - 0.5rem);
		}
	}
</style>
