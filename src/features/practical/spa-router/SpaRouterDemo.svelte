<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import Router, { link, location, push, replace } from 'svelte-spa-router'
	import DemoContainer from '@/components/DemoContainer.svelte'
	import { onMount } from 'svelte'

	// 子页面组件
	import HomePage from './pages/HomePage.svelte'
	import AboutPage from './pages/AboutPage.svelte'
	import ContactPage from './pages/ContactPage.svelte'
	import ProductsPage from './pages/ProductsPage.svelte'
	import ProductDetailPage from './pages/ProductDetailPage.svelte'
	import NotFoundPage from './pages/NotFoundPage.svelte'

	const dispatch = createEventDispatcher()

	// Demo 路由配置
	const demoRoutes = {
		'/': HomePage,
		'/about': AboutPage,
		'/contact': ContactPage,
		'/products': ProductsPage,
		'/products/:id': ProductDetailPage,
		'*': NotFoundPage
	}

	// 导航菜单项
	const navItems = [
		{ path: '/', label: '首页', icon: '🏠' },
		{ path: '/about', label: '关于我们', icon: '📖' },
		{ path: '/products', label: '产品', icon: '🛍️' },
		{ path: '/contact', label: '联系我们', icon: '📞' }
	]

	// 监听当前路由
	$: currentPath = $location

	let routeHistory: string[] = []

	// 监听路由变化
	function handleRouteChanged(event: any) {
		const newLocation = event.detail?.location || $location
		if (newLocation && !routeHistory.includes(newLocation)) {
			routeHistory = [...routeHistory, newLocation].slice(-10) // 保留最近10个路由
		}
	}

	onMount(() => {
		// 设置初始路由历史
		if ($location) {
			routeHistory = [$location]
		}
	})

	// 清除历史记录
	function clearHistory() {
		routeHistory = []
	}

	// 示例数据
	const features = [
		{
			title: '声明式路由',
			description: '通过简单的对象配置定义路由规则，支持静态路由和动态参数',
			code: `const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/products/:id': ProductDetailPage
}`
		},
		{
			title: '编程式导航',
			description: '使用 push 和 replace 方法进行编程式导航',
			code: `import { push, replace } from 'svelte-spa-router'

// 导航到指定路由
push('/products/123')

// 替换当前路由
replace('/login')`
		},
		{
			title: '路由参数获取',
			description: '获取动态路由参数和查询参数',
			code: `import { location, querystring } from 'svelte-spa-router'

// 在组件中获取参数
export let params = {}

// 监听路由变化
$: console.log('当前路由:', $location)
$: console.log('查询参数:', $querystring)`
		},
		{
			title: '路由守卫',
			description: '通过条件函数实现路由守卫功能',
			code: `const routes = {
  '/admin/*': wrap({
    component: AdminPanel,
    conditions: [() => isAuthenticated]
  })
}`
		}
	]
</script>

<svelte:head>
	<title>Svelte SPA Router 使用示例</title>
</svelte:head>

<DemoContainer title="Svelte SPA Router 使用示例" variant="fullwidth">
	<div class="spa-router-demo" slot="demo">
		<!-- 功能介绍 -->
		<div class="demo-intro">
			<h2>🔗 Svelte SPA Router</h2>
			<p>svelte-spa-router 是一个轻量级的 Svelte 单页应用路由库，提供了完整的路由功能。</p>
			
			<div class="features-grid">
				{#each features as feature}
					<div class="feature-card">
						<h4>{feature.title}</h4>
						<p>{feature.description}</p>
						<pre><code>{feature.code}</code></pre>
					</div>
				{/each}
			</div>
		</div>

		<!-- 路由导航演示 -->
		<div class="demo-section">
			<h3>📍 路由导航演示</h3>
			
			<!-- 导航栏 -->
			<nav class="demo-nav">
				{#each navItems as item}
					<a 
						href={item.path} 
						use:link 
						class="nav-item"
						class:active={currentPath === item.path}
					>
						<span class="nav-icon">{item.icon}</span>
						<span class="nav-label">{item.label}</span>
					</a>
				{/each}
			</nav>

			<!-- 当前路由信息 -->
			<div class="route-info">
				<div class="info-card">
					<strong>当前路由:</strong> 
					<code>{currentPath || '/'}</code>
				</div>
				
				{#if routeHistory.length > 0}
					<div class="info-card">
						<div class="history-header">
							<strong>路由历史:</strong>
							<button class="clear-btn" on:click={clearHistory}>清除历史</button>
						</div>
						<div class="history-list">
							{#each routeHistory as route, index}
								<span class="history-item" class:current={route === currentPath}>
									{index + 1}. {route}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- 路由内容区域 -->
			<div class="router-container">
				<Router 
					routes={demoRoutes}
					on:routeLoaded={handleRouteChanged}
				/>
			</div>
		</div>

		<!-- 编程式导航示例 -->
		<div class="demo-section">
			<h3>🎯 编程式导航示例</h3>
			<div class="navigation-examples">
				<button 
					class="nav-btn primary"
					on:click={() => push('/products/123')}
				>
					导航到产品详情 (ID: 123)
				</button>
				
				<button 
					class="nav-btn secondary"
					on:click={() => push('/products?category=electronics&sort=price')}
				>
					带查询参数的产品页
				</button>
				
				<button 
					class="nav-btn"
					on:click={() => replace('/about')}
				>
					替换到关于页面
				</button>

				<button 
					class="nav-btn danger"
					on:click={() => push('/nonexistent')}
				>
					测试 404 页面
				</button>
			</div>
		</div>

		<!-- 路由配置展示 -->
		<div class="demo-section">
			<h3>⚙️ 当前演示的路由配置</h3>
			<pre class="route-config"><code>{JSON.stringify(Object.keys(demoRoutes).reduce((acc: any, key) => {
				acc[key] = (demoRoutes as any)[key].name || '组件';
				return acc;
			}, {}), null, 2)}</code></pre>
		</div>
	</div>
</DemoContainer>

<style>
	.spa-router-demo {
		padding: 1rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.demo-intro h2 {
		color: #333;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.demo-intro p {
		color: #666;
		font-size: 1.1rem;
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.feature-card {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1rem;
	}

	.feature-card h4 {
		color: #495057;
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
	}

	.feature-card p {
		color: #6c757d;
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}

	.feature-card pre {
		background: #f1f3f4;
		border-radius: 4px;
		padding: 0.5rem;
		font-size: 0.8rem;
		overflow-x: auto;
		margin: 0;
	}

	.demo-section {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: white;
		border-radius: 12px;
		border: 1px solid #e9ecef;
	}

	.demo-section h3 {
		margin: 0 0 1rem 0;
		color: #333;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.demo-nav {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		padding: 0.5rem;
		background: #f8f9fa;
		border-radius: 8px;
		flex-wrap: wrap;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: white;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		text-decoration: none;
		color: #495057;
		transition: all 0.2s ease;
		font-size: 0.9rem;
	}

	.nav-item:hover {
		background: #e9ecef;
		border-color: #adb5bd;
	}

	.nav-item.active {
		background: #007bff;
		color: white;
		border-color: #007bff;
	}

	.nav-icon {
		font-size: 1rem;
	}

	.route-info {
		margin-bottom: 1rem;
	}

	.info-card {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.info-card code {
		background: #e9ecef;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
		color: #495057;
	}

	.history-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.clear-btn {
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.2rem 0.5rem;
		font-size: 0.8rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.clear-btn:hover {
		background: #c82333;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.history-item {
		background: #e9ecef;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		color: #495057;
	}

	.history-item.current {
		background: #007bff;
		color: white;
	}

	.router-container {
		background: white;
		border: 2px solid #007bff;
		border-radius: 8px;
		min-height: 300px;
		padding: 1rem;
	}

	.navigation-examples {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.nav-btn {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s ease;
		background: #6c757d;
		color: white;
	}

	.nav-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.nav-btn.primary {
		background: #007bff;
	}

	.nav-btn.primary:hover {
		background: #0056b3;
	}

	.nav-btn.secondary {
		background: #6c757d;
	}

	.nav-btn.secondary:hover {
		background: #545b62;
	}

	.nav-btn.danger {
		background: #dc3545;
	}

	.nav-btn.danger:hover {
		background: #c82333;
	}

	.route-config {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.9rem;
		color: #495057;
		margin: 0;
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
		
		.demo-nav {
			flex-direction: column;
		}
		
		.navigation-examples {
			flex-direction: column;
		}
		
		.nav-btn {
			width: 100%;
		}
	}
</style>
