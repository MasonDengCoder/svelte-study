<script lang="ts">
	import { link, location } from 'svelte-spa-router'
	import { onMount } from 'svelte'

	let countdown = 5
	let redirectTimer: number

	// 自动跳转倒计时
	onMount(() => {
		redirectTimer = setInterval(() => {
			countdown--
			if (countdown <= 0) {
				clearInterval(redirectTimer)
				// 跳转到首页
				window.location.hash = '#/'
			}
		}, 1000)

		return () => {
			if (redirectTimer) {
				clearInterval(redirectTimer)
			}
		}
	})

	// 取消自动跳转
	function cancelRedirect() {
		if (redirectTimer) {
			clearInterval(redirectTimer)
			countdown = 0
		}
	}

	// 建议的页面链接
	const suggestedPages = [
		{ path: '/', name: '返回首页', icon: '🏠', description: '回到应用主页' },
		{ path: '/products', name: '浏览产品', icon: '🛍️', description: '查看我们的产品目录' },
		{ path: '/about', name: '关于我们', icon: '📖', description: '了解我们的团队和使命' },
		{ path: '/contact', name: '联系我们', icon: '📞', description: '获取帮助和支持' }
	]

	// 常见的错误路径和修正建议
	const pathSuggestions = [
		{ pattern: '/product', suggestion: '/products', description: '您可能想访问产品页面' },
		{ pattern: '/prod', suggestion: '/products', description: '您可能想访问产品页面' },
		{ pattern: '/about-us', suggestion: '/about', description: '您可能想访问关于页面' },
		{ pattern: '/contact-us', suggestion: '/contact', description: '您可能想访问联系页面' },
		{ pattern: '/home', suggestion: '/', description: '您可能想访问首页' }
	]

	// 检查当前路径是否匹配某个建议
	$: currentPath = $location
	$: matchedSuggestion = pathSuggestions.find(s => 
		currentPath.toLowerCase().includes(s.pattern)
	)
</script>

<svelte:head>
	<title>404 - 页面未找到</title>
</svelte:head>

<div class="page not-found-page">
	<div class="error-container">
		<!-- 404 主要内容 -->
		<div class="error-main">
			<div class="error-graphic">
				<div class="error-number">404</div>
				<div class="error-emoji">😵‍💫</div>
			</div>
			
			<h1 class="error-title">页面未找到</h1>
			<p class="error-description">
				抱歉，您访问的页面不存在或已被移除。
			</p>

			<!-- 当前访问的路径 -->
			<div class="current-path">
				<strong>您访问的路径:</strong> 
				<code>{currentPath}</code>
			</div>

			<!-- 路径建议 -->
			{#if matchedSuggestion}
				<div class="path-suggestion">
					<h3>💡 您是否要访问:</h3>
					<a 
						href={matchedSuggestion.suggestion} 
						use:link 
						class="suggestion-link"
						on:click={cancelRedirect}
					>
						<span class="suggestion-path">{matchedSuggestion.suggestion}</span>
						<span class="suggestion-desc">{matchedSuggestion.description}</span>
					</a>
				</div>
			{/if}
		</div>

		<!-- 自动跳转提示 -->
		{#if countdown > 0}
			<div class="auto-redirect">
				<div class="redirect-info">
					<span class="redirect-text">
						{countdown} 秒后自动跳转到首页
					</span>
					<button on:click={cancelRedirect} class="cancel-redirect">
						取消自动跳转
					</button>
				</div>
				<div class="progress-bar">
					<div 
						class="progress-fill" 
						style="width: {((5 - countdown) / 5) * 100}%"
					></div>
				</div>
			</div>
		{/if}

		<!-- 建议的页面 -->
		<div class="suggested-pages">
			<h2>🧭 您可能要访问的页面</h2>
			<div class="pages-grid">
				{#each suggestedPages as page}
					<a 
						href={page.path} 
						use:link 
						class="page-card"
						on:click={cancelRedirect}
					>
						<div class="page-icon">{page.icon}</div>
						<div class="page-info">
							<h4 class="page-name">{page.name}</h4>
							<p class="page-description">{page.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- 技术信息 -->
		<div class="tech-info">
			<h3>🔧 技术信息</h3>
			<div class="info-grid">
				<div class="info-item">
					<strong>错误类型:</strong>
					<span>路由未匹配 (404)</span>
				</div>
				<div class="info-item">
					<strong>请求路径:</strong>
					<code>{currentPath}</code>
				</div>
				<div class="info-item">
					<strong>路由处理:</strong>
					<span>Svelte SPA Router</span>
				</div>
				<div class="info-item">
					<strong>回退策略:</strong>
					<span>显示 404 页面</span>
				</div>
			</div>
			
			<div class="router-explanation">
				<h4>💭 为什么会显示这个页面？</h4>
				<ul class="explanation-list">
					<li>当前路径在路由配置中没有对应的组件</li>
					<li>SPA Router 使用通配符 (*) 路由捕获未匹配的路径</li>
					<li>显示此 404 页面而不是浏览器默认错误页</li>
					<li>提供友好的用户体验和导航选项</li>
				</ul>
			</div>
		</div>

		<!-- 搜索建议 -->
		<div class="search-section">
			<h3>🔍 搜索建议</h3>
			<p>如果您记得页面的部分信息，可以尝试以下方法：</p>
			<ul class="search-tips">
				<li>检查 URL 拼写是否正确</li>
				<li>尝试从导航菜单重新进入</li>
				<li>使用浏览器的后退按钮</li>
				<li>联系我们获取帮助</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		min-height: 80vh;
		display: flex;
		align-items: center;
	}

	.error-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.error-main {
		text-align: center;
		padding: 2rem;
		background: white;
		border-radius: 12px;
		border: 1px solid #e9ecef;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}

	.error-graphic {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.error-number {
		font-size: 6rem;
		font-weight: 900;
		color: #dc3545;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
	}

	.error-emoji {
		font-size: 4rem;
		animation: wobble 2s ease-in-out infinite;
	}

	@keyframes wobble {
		0%, 100% { transform: rotate(0deg); }
		25% { transform: rotate(-5deg); }
		75% { transform: rotate(5deg); }
	}

	.error-title {
		margin: 0 0 1rem 0;
		font-size: 2.5rem;
		color: #333;
		font-weight: 700;
	}

	.error-description {
		color: #666;
		font-size: 1.2rem;
		margin: 0 0 2rem 0;
		line-height: 1.5;
	}

	.current-path {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		color: #495057;
	}

	.current-path code {
		background: #e9ecef;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
		color: #dc3545;
		word-break: break-all;
	}

	.path-suggestion {
		background: #d1ecf1;
		border: 1px solid #bee5eb;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.path-suggestion h3 {
		margin: 0 0 0.5rem 0;
		color: #0c5460;
		font-size: 1.1rem;
	}

	.suggestion-link {
		display: block;
		text-decoration: none;
		color: inherit;
		background: white;
		border: 1px solid #bee5eb;
		border-radius: 6px;
		padding: 0.75rem;
		transition: all 0.2s ease;
	}

	.suggestion-link:hover {
		background: #f8f9fa;
		border-color: #86cfda;
		transform: translateY(-1px);
	}

	.suggestion-path {
		display: block;
		font-weight: 600;
		color: #007bff;
		margin-bottom: 0.25rem;
	}

	.suggestion-desc {
		display: block;
		color: #6c757d;
		font-size: 0.9rem;
	}

	.auto-redirect {
		background: #fff3cd;
		border: 1px solid #ffeaa7;
		border-radius: 8px;
		padding: 1rem;
	}

	.redirect-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.redirect-text {
		color: #856404;
		font-weight: 600;
	}

	.cancel-redirect {
		background: #ffc107;
		color: #212529;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.cancel-redirect:hover {
		background: #e0a800;
	}

	.progress-bar {
		height: 4px;
		background: #f8d7da;
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #dc3545;
		transition: width 1s linear;
	}

	.suggested-pages {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.suggested-pages h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.5rem;
		text-align: center;
	}

	.pages-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.page-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s ease;
	}

	.page-card:hover {
		background: #e9ecef;
		border-color: #007bff;
		transform: translateY(-2px);
	}

	.page-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.page-info {
		flex: 1;
		min-width: 0;
	}

	.page-name {
		margin: 0 0 0.25rem 0;
		color: #333;
		font-size: 1.1rem;
	}

	.page-description {
		margin: 0;
		color: #666;
		font-size: 0.9rem;
		line-height: 1.3;
	}

	.tech-info {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
	}

	.tech-info h3 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.info-item strong {
		color: #495057;
	}

	.info-item code {
		background: #e9ecef;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
		word-break: break-all;
	}

	.router-explanation h4 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.1rem;
	}

	.explanation-list {
		margin: 0;
		padding-left: 1.5rem;
		color: #666;
	}

	.explanation-list li {
		margin-bottom: 0.25rem;
		line-height: 1.4;
	}

	.search-section {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.search-section h3 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.search-section p {
		color: #666;
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	.search-tips {
		margin: 0;
		padding-left: 1.5rem;
		color: #666;
	}

	.search-tips li {
		margin-bottom: 0.5rem;
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem;
		}

		.error-number {
			font-size: 4rem;
		}

		.error-emoji {
			font-size: 3rem;
		}

		.error-title {
			font-size: 2rem;
		}

		.error-description {
			font-size: 1rem;
		}

		.pages-grid {
			grid-template-columns: 1fr;
		}

		.page-card {
			flex-direction: column;
			text-align: center;
		}

		.info-grid {
			grid-template-columns: 1fr;
		}

		.info-item {
			flex-direction: column;
			gap: 0.25rem;
			align-items: flex-start;
		}

		.redirect-info {
			flex-direction: column;
			align-items: stretch;
			text-align: center;
		}
	}
</style>
