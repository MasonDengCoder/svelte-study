<script lang="ts">
	import { link, location, querystring } from 'svelte-spa-router'
	import { onMount } from 'svelte'

	// 模拟产品数据
	const products = [
		{
			id: 1,
			name: 'Svelte 学习指南',
			category: 'education',
			price: 99,
			image: '📚',
			description: '从零开始学习 Svelte 框架，包含实际项目案例'
		},
		{
			id: 2,
			name: 'TypeScript 进阶课程',
			category: 'education',
			price: 149,
			image: '💻',
			description: '深入学习 TypeScript 高级特性和最佳实践'
		},
		{
			id: 3,
			name: '前端工具包',
			category: 'tools',
			price: 79,
			image: '🛠️',
			description: '包含各种前端开发工具和组件库'
		},
		{
			id: 4,
			name: 'UI 设计模板',
			category: 'design',
			price: 199,
			image: '🎨',
			description: '精美的 UI 设计模板和设计系统'
		},
		{
			id: 5,
			name: '性能优化方案',
			category: 'tools',
			price: 299,
			image: '⚡',
			description: '全面的前端性能优化解决方案'
		},
		{
			id: 6,
			name: '移动端适配指南',
			category: 'education',
			price: 129,
			image: '📱',
			description: '响应式设计和移动端优化最佳实践'
		}
	]

	const categories = [
		{ value: '', label: '全部分类' },
		{ value: 'education', label: '教育课程' },
		{ value: 'tools', label: '开发工具' },
		{ value: 'design', label: '设计资源' }
	]

	const sortOptions = [
		{ value: '', label: '默认排序' },
		{ value: 'price_asc', label: '价格从低到高' },
		{ value: 'price_desc', label: '价格从高到低' },
		{ value: 'name', label: '按名称排序' }
	]

	let filteredProducts = products
	let currentCategory = ''
	let currentSort = ''
	let searchTerm = ''

	// 监听查询参数变化
	$: {
		const params = new URLSearchParams($querystring)
		currentCategory = params.get('category') || ''
		currentSort = params.get('sort') || ''
		searchTerm = params.get('search') || ''
		filterProducts()
	}

	function filterProducts() {
		let result = [...products]

		// 按分类筛选
		if (currentCategory) {
			result = result.filter(product => product.category === currentCategory)
		}

		// 按搜索词筛选
		if (searchTerm) {
			result = result.filter(product => 
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.description.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		// 排序
		if (currentSort === 'price_asc') {
			result.sort((a, b) => a.price - b.price)
		} else if (currentSort === 'price_desc') {
			result.sort((a, b) => b.price - a.price)
		} else if (currentSort === 'name') {
			result.sort((a, b) => a.name.localeCompare(b.name))
		}

		filteredProducts = result
	}

	function updateUrl() {
		const params = new URLSearchParams()
		if (currentCategory) params.set('category', currentCategory)
		if (currentSort) params.set('sort', currentSort)
		if (searchTerm) params.set('search', searchTerm)
		
		const queryStr = params.toString()
		const newUrl = `/products${queryStr ? '?' + queryStr : ''}`
		
		// 使用 replaceState 避免增加历史记录
		history.replaceState({}, '', `#${newUrl}`)
	}

	function handleCategoryChange(event: Event) {
		const target = event.target as HTMLSelectElement
		currentCategory = target.value
		updateUrl()
	}

	function handleSortChange(event: Event) {
		const target = event.target as HTMLSelectElement
		currentSort = target.value
		updateUrl()
	}

	function handleSearchInput(event: Event) {
		const target = event.target as HTMLInputElement
		searchTerm = target.value
		updateUrl()
	}

	function clearFilters() {
		currentCategory = ''
		currentSort = ''
		searchTerm = ''
		history.replaceState({}, '', '#/products')
	}
</script>

<div class="page products-page">
	<div class="page-header">
		<h1>🛍️ 产品目录</h1>
		<p class="page-subtitle">浏览我们精选的产品和服务</p>
	</div>

	<!-- 筛选和搜索 -->
	<div class="filters-section">
		<div class="search-box">
			<input 
				type="text" 
				placeholder="搜索产品..." 
				bind:value={searchTerm}
				on:input={handleSearchInput}
				class="search-input"
			>
		</div>

		<div class="filter-controls">
			<select 
				bind:value={currentCategory} 
				on:change={handleCategoryChange}
				class="filter-select"
			>
				{#each categories as category}
					<option value={category.value}>{category.label}</option>
				{/each}
			</select>

			<select 
				bind:value={currentSort} 
				on:change={handleSortChange}
				class="filter-select"
			>
				{#each sortOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>

			<button on:click={clearFilters} class="clear-filters-btn">
				清除筛选
			</button>
		</div>
	</div>

	<!-- 当前筛选状态 -->
	{#if currentCategory || currentSort || searchTerm}
		<div class="filter-status">
			<span class="status-label">当前筛选:</span>
			{#if searchTerm}
				<span class="filter-tag">搜索: "{searchTerm}"</span>
			{/if}
			{#if currentCategory}
				<span class="filter-tag">
					分类: {categories.find(c => c.value === currentCategory)?.label}
				</span>
			{/if}
			{#if currentSort}
				<span class="filter-tag">
					排序: {sortOptions.find(s => s.value === currentSort)?.label}
				</span>
			{/if}
		</div>
	{/if}

	<!-- 产品列表 -->
	<div class="products-section">
		<div class="products-meta">
			<span class="results-count">
				找到 {filteredProducts.length} 个产品
			</span>
		</div>

		{#if filteredProducts.length === 0}
			<div class="no-results">
				<h3>😔 没有找到匹配的产品</h3>
				<p>请尝试调整筛选条件或搜索词</p>
				<button on:click={clearFilters} class="retry-btn">
					清除所有筛选
				</button>
			</div>
		{:else}
			<div class="products-grid">
				{#each filteredProducts as product}
					<div class="product-card">
						<div class="product-image">
							{product.image}
						</div>
						<div class="product-info">
							<h3 class="product-name">{product.name}</h3>
							<p class="product-description">{product.description}</p>
							<div class="product-meta">
								<span class="product-category">
									{categories.find(c => c.value === product.category)?.label}
								</span>
								<span class="product-price">¥{product.price}</span>
							</div>
							<a 
								href="/products/{product.id}" 
								use:link 
								class="view-details-btn"
							>
								查看详情
							</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- URL 演示 -->
	<div class="url-demo">
		<h3>🔗 URL 状态演示</h3>
		<div class="url-info">
			<strong>当前 URL:</strong> 
			<code>{$location}{$querystring ? '?' + $querystring : ''}</code>
		</div>
		<p class="url-description">
			注意 URL 如何根据筛选条件实时更新，这样用户可以分享和收藏特定的筛选结果。
		</p>
	</div>
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 2rem;
		padding: 2rem;
		background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
		color: white;
		border-radius: 12px;
	}

	.page-header h1 {
		margin: 0 0 1rem 0;
		font-size: 2.5rem;
		font-weight: 700;
	}

	.page-subtitle {
		font-size: 1.2rem;
		margin: 0;
		opacity: 0.9;
	}

	.filters-section {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.search-box {
		margin-bottom: 1rem;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #dee2e6;
		border-radius: 8px;
		font-size: 1rem;
		box-sizing: border-box;
	}

	.search-input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
	}

	.filter-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.filter-select {
		padding: 0.5rem;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		background: white;
		font-size: 0.9rem;
	}

	.clear-filters-btn {
		padding: 0.5rem 1rem;
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.clear-filters-btn:hover {
		background: #c82333;
	}

	.filter-status {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.status-label {
		font-weight: 600;
		color: #495057;
	}

	.filter-tag {
		background: #007bff;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.products-section {
		margin-bottom: 2rem;
	}

	.products-meta {
		margin-bottom: 1rem;
		color: #666;
		font-size: 0.9rem;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.product-card {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.product-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 20px rgba(0,0,0,0.15);
	}

	.product-image {
		font-size: 4rem;
		text-align: center;
		padding: 2rem;
		background: #f8f9fa;
	}

	.product-info {
		padding: 1.5rem;
	}

	.product-name {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.product-description {
		color: #666;
		margin: 0 0 1rem 0;
		line-height: 1.5;
		font-size: 0.95rem;
	}

	.product-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.product-category {
		background: #e9ecef;
		color: #495057;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
	}

	.product-price {
		font-weight: 700;
		color: #dc3545;
		font-size: 1.2rem;
	}

	.view-details-btn {
		display: block;
		background: #007bff;
		color: white;
		text-decoration: none;
		padding: 0.75rem;
		border-radius: 6px;
		text-align: center;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.view-details-btn:hover {
		background: #0056b3;
	}

	.no-results {
		text-align: center;
		padding: 3rem;
		background: #f8f9fa;
		border-radius: 12px;
		border: 1px solid #e9ecef;
	}

	.no-results h3 {
		color: #666;
		margin: 0 0 1rem 0;
	}

	.no-results p {
		color: #666;
		margin: 0 0 2rem 0;
	}

	.retry-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
	}

	.retry-btn:hover {
		background: #0056b3;
	}

	.url-demo {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
	}

	.url-demo h3 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.url-info {
		margin-bottom: 1rem;
		color: #495057;
	}

	.url-info code {
		background: #e9ecef;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
		word-break: break-all;
	}

	.url-description {
		color: #666;
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.filter-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-select, .clear-filters-btn {
			width: 100%;
		}

		.products-grid {
			grid-template-columns: 1fr;
		}

		.filter-status {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
