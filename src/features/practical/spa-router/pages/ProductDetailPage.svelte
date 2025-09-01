<script lang="ts">
	import { link, location } from 'svelte-spa-router'
	import { onMount } from 'svelte'

	// 路由参数
	export let params: any = {}

	// 模拟产品数据
	const products = [
		{
			id: 1,
			name: 'Svelte 学习指南',
			category: 'education',
			price: 99,
			image: '📚',
			description: '从零开始学习 Svelte 框架，包含实际项目案例',
			longDescription: `
				这是一套完整的 Svelte 学习指南，适合前端开发者快速掌握 Svelte 框架的核心概念和实践技巧。

				课程内容包括：
				• Svelte 基础语法和组件开发
				• 响应式编程和状态管理
				• 组件通信和生命周期
				• 路由和导航处理
				• 构建工具和部署实践
				• 真实项目案例分析

				通过学习本指南，您将能够独立开发现代化的 Svelte 应用程序。
			`,
			features: [
				'💡 清晰的概念解释',
				'🔨 实践项目案例',
				'📖 详细的代码示例',
				'🎯 最佳实践指导',
				'📞 技术支持服务'
			],
			reviews: [
				{
					author: '张开发',
					rating: 5,
					comment: '非常棒的学习资源，内容详实，案例丰富，强烈推荐！',
					date: '2024-01-15'
				},
				{
					author: '李前端',
					rating: 4,
					comment: '质量很高，帮助我快速上手了 Svelte 开发',
					date: '2024-01-10'
				}
			]
		},
		{
			id: 2,
			name: 'TypeScript 进阶课程',
			category: 'education',
			price: 149,
			image: '💻',
			description: '深入学习 TypeScript 高级特性和最佳实践',
			longDescription: `
				深度解析 TypeScript 的高级特性，帮助开发者写出更安全、更高效的代码。

				主要内容：
				• 高级类型系统和泛型
				• 装饰器和元编程
				• 模块系统和命名空间
				• 编译器选项和配置
				• 与第三方库的集成
				• 大型项目最佳实践
			`,
			features: [
				'🎓 权威内容',
				'⚡ 性能优化',
				'🔧 实用工具',
				'📊 项目案例',
				'🆘 专家答疑'
			],
			reviews: [
				{
					author: '王架构',
					rating: 5,
					comment: 'TypeScript 进阶必看，内容深度很好',
					date: '2024-01-20'
				}
			]
		}
		// ... 可以添加更多产品
	]

	let product: any = null
	let loading = true
	let error = ''

	// 加载产品详情
	function loadProduct() {
		loading = true
		error = ''

		const productId = parseInt(params.id)
		
		// 模拟异步加载
		setTimeout(() => {
			const found = products.find(p => p.id === productId)
			
			if (found) {
				product = found
			} else {
				error = '产品不存在'
			}
			
			loading = false
		}, 500)
	}

	// 监听参数变化
	$: if (params.id) {
		loadProduct()
	}

	// 添加到购物车（模拟）
	function addToCart() {
		alert(`已将 "${product.name}" 添加到购物车！`)
	}

	// 购买（模拟）
	function buyNow() {
		alert(`正在跳转到支付页面购买 "${product.name}"...`)
	}

	// 格式化评分
	function formatRating(rating: number) {
		return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
	}
</script>

<svelte:head>
	{#if product}
		<title>{product.name} - 产品详情</title>
	{:else}
		<title>产品详情</title>
	{/if}
</svelte:head>

<div class="page product-detail-page">
	<!-- 面包屑导航 -->
	<nav class="breadcrumb">
		<a href="/products" use:link class="breadcrumb-link">← 返回产品列表</a>
		<span class="breadcrumb-separator">/</span>
		<span class="breadcrumb-current">产品详情</span>
	</nav>

	{#if loading}
		<div class="loading-state">
			<div class="loading-spinner">⏳</div>
			<p>正在加载产品信息...</p>
		</div>
	{:else if error}
		<div class="error-state">
			<h2>😕 出错了</h2>
			<p>{error}</p>
			<a href="/products" use:link class="back-btn">返回产品列表</a>
		</div>
	{:else if product}
		<div class="product-detail">
			<!-- 产品主要信息 -->
			<div class="product-header">
				<div class="product-image-large">
					{product.image}
				</div>
				
				<div class="product-main-info">
					<h1 class="product-title">{product.name}</h1>
					<p class="product-short-desc">{product.description}</p>
					
					<div class="product-price-section">
						<span class="price-label">价格:</span>
						<span class="price-value">¥{product.price}</span>
					</div>

					<div class="product-actions">
						<button on:click={buyNow} class="buy-now-btn">
							立即购买
						</button>
						<button on:click={addToCart} class="add-cart-btn">
							加入购物车
						</button>
					</div>

					<!-- 路由参数演示 -->
					<div class="route-info">
						<h4>🔗 路由参数演示</h4>
						<div class="param-info">
							<strong>产品 ID:</strong> <code>{params.id}</code>
						</div>
						<div class="param-info">
							<strong>当前路由:</strong> <code>{$location}</code>
						</div>
					</div>
				</div>
			</div>

			<!-- 产品详细信息 -->
			<div class="product-tabs">
				<div class="tab-section">
					<h3>📋 详细介绍</h3>
					<div class="product-description">
						{@html product.longDescription.replace(/\n/g, '<br>')}
					</div>
				</div>

				<div class="tab-section">
					<h3>✨ 主要特性</h3>
					<ul class="features-list">
						{#each product.features as feature}
							<li class="feature-item">{feature}</li>
						{/each}
					</ul>
				</div>

				<div class="tab-section">
					<h3>💬 用户评价</h3>
					{#if product.reviews && product.reviews.length > 0}
						<div class="reviews-list">
							{#each product.reviews as review}
								<div class="review-item">
									<div class="review-header">
										<span class="review-author">{review.author}</span>
										<span class="review-rating">
											{formatRating(review.rating)}
										</span>
										<span class="review-date">{review.date}</span>
									</div>
									<p class="review-comment">{review.comment}</p>
								</div>
							{/each}
						</div>
					{:else}
						<p class="no-reviews">暂无用户评价</p>
					{/if}
				</div>
			</div>

			<!-- 相关产品推荐 -->
			<div class="related-products">
				<h3>🔗 相关产品</h3>
				<div class="related-grid">
					{#each products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3) as relatedProduct}
						<div class="related-item">
							<div class="related-image">{relatedProduct.image}</div>
							<h4 class="related-name">{relatedProduct.name}</h4>
							<p class="related-price">¥{relatedProduct.price}</p>
							<a 
								href="/products/{relatedProduct.id}" 
								use:link 
								class="related-link"
							>
								查看详情
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.breadcrumb {
		margin-bottom: 2rem;
		font-size: 0.9rem;
		color: #666;
	}

	.breadcrumb-link {
		color: #007bff;
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb-link:hover {
		color: #0056b3;
		text-decoration: underline;
	}

	.breadcrumb-separator {
		margin: 0 0.5rem;
		color: #ccc;
	}

	.breadcrumb-current {
		color: #495057;
	}

	.loading-state, .error-state {
		text-align: center;
		padding: 4rem 2rem;
		background: #f8f9fa;
		border-radius: 12px;
		border: 1px solid #e9ecef;
	}

	.loading-spinner {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.error-state h2 {
		color: #dc3545;
		margin-bottom: 1rem;
	}

	.back-btn {
		display: inline-block;
		background: #007bff;
		color: white;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		margin-top: 1rem;
		transition: background-color 0.2s;
	}

	.back-btn:hover {
		background: #0056b3;
	}

	.product-detail {
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		overflow: hidden;
	}

	.product-header {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 2rem;
		padding: 2rem;
		border-bottom: 1px solid #e9ecef;
	}

	.product-image-large {
		font-size: 8rem;
		text-align: center;
		background: #f8f9fa;
		border-radius: 12px;
		padding: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-main-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.product-title {
		margin: 0;
		color: #333;
		font-size: 2rem;
		font-weight: 700;
	}

	.product-short-desc {
		color: #666;
		font-size: 1.1rem;
		line-height: 1.5;
		margin: 0;
	}

	.product-price-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.price-label {
		font-size: 1.1rem;
		color: #495057;
	}

	.price-value {
		font-size: 2rem;
		font-weight: 700;
		color: #dc3545;
	}

	.product-actions {
		display: flex;
		gap: 1rem;
	}

	.buy-now-btn, .add-cart-btn {
		flex: 1;
		padding: 1rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.buy-now-btn {
		background: #dc3545;
		color: white;
	}

	.buy-now-btn:hover {
		background: #c82333;
		transform: translateY(-1px);
	}

	.add-cart-btn {
		background: #007bff;
		color: white;
	}

	.add-cart-btn:hover {
		background: #0056b3;
		transform: translateY(-1px);
	}

	.route-info {
		background: #e3f2fd;
		border: 1px solid #90caf9;
		border-radius: 8px;
		padding: 1rem;
		margin-top: 1rem;
	}

	.route-info h4 {
		margin: 0 0 0.5rem 0;
		color: #1565c0;
		font-size: 1rem;
	}

	.param-info {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		color: #495057;
	}

	.param-info code {
		background: #f8f9fa;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-family: 'Courier New', monospace;
	}

	.product-tabs {
		padding: 2rem;
	}

	.tab-section {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e9ecef;
	}

	.tab-section:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.tab-section h3 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	.product-description {
		color: #666;
		line-height: 1.6;
		font-size: 1rem;
	}

	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 0.5rem;
	}

	.feature-item {
		background: #f8f9fa;
		padding: 0.75rem;
		border-radius: 6px;
		border: 1px solid #e9ecef;
		color: #495057;
	}

	.reviews-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.review-item {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1rem;
	}

	.review-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.review-author {
		font-weight: 600;
		color: #333;
	}

	.review-rating {
		color: #ffc107;
	}

	.review-date {
		color: #6c757d;
		font-size: 0.9rem;
	}

	.review-comment {
		margin: 0;
		color: #495057;
		line-height: 1.5;
	}

	.no-reviews {
		color: #6c757d;
		font-style: italic;
		text-align: center;
		padding: 2rem;
	}

	.related-products {
		padding: 2rem;
		background: #f8f9fa;
		border-top: 1px solid #e9ecef;
	}

	.related-products h3 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.5rem;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.related-item {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
		transition: transform 0.2s ease;
	}

	.related-item:hover {
		transform: translateY(-3px);
	}

	.related-image {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.related-name {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1rem;
	}

	.related-price {
		color: #dc3545;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.related-link {
		display: inline-block;
		background: #007bff;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.related-link:hover {
		background: #0056b3;
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem;
		}

		.product-header {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 1rem;
		}

		.product-image-large {
			font-size: 6rem;
			padding: 1rem;
		}

		.product-title {
			font-size: 1.5rem;
		}

		.price-value {
			font-size: 1.5rem;
		}

		.product-actions {
			flex-direction: column;
		}

		.features-list {
			grid-template-columns: 1fr;
		}

		.review-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
