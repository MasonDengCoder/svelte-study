<script lang="ts">
	import { link } from 'svelte-spa-router'
</script>

<div class="page home-page">
	<div class="hero-section">
		<h1>🏠 欢迎来到首页</h1>
		<p class="hero-subtitle">这是一个使用 Svelte SPA Router 构建的演示应用</p>
	</div>

	<div class="content-grid">
		<div class="card">
			<h3>📖 关于我们</h3>
			<p>了解我们的团队和使命</p>
			<a href="/about" use:link class="card-link">查看详情 →</a>
		</div>

		<div class="card">
			<h3>🛍️ 产品展示</h3>
			<p>浏览我们的产品目录</p>
			<a href="/products" use:link class="card-link">浏览产品 →</a>
		</div>

		<div class="card">
			<h3>📞 联系我们</h3>
			<p>获取支持或了解更多信息</p>
			<a href="/contact" use:link class="card-link">联系我们 →</a>
		</div>
	</div>

	<div class="features-section">
		<h2>🌟 主要特性</h2>
		<ul class="features-list">
			<li>✅ 基于 Hash 路由的 SPA 导航</li>
			<li>✅ 支持动态路由参数</li>
			<li>✅ 编程式路由导航</li>
			<li>✅ 路由历史管理</li>
			<li>✅ 响应式路由状态</li>
		</ul>
	</div>
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.hero-section {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 12px;
	}

	.hero-section h1 {
		margin: 0 0 1rem 0;
		font-size: 2.5rem;
		font-weight: 700;
	}

	.hero-subtitle {
		font-size: 1.2rem;
		margin: 0;
		opacity: 0.9;
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.card {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 20px rgba(0,0,0,0.15);
	}

	.card h3 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.card p {
		color: #666;
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	.card-link {
		color: #007bff;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.card-link:hover {
		color: #0056b3;
		text-decoration: underline;
	}

	.features-section {
		background: #f8f9fa;
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid #e9ecef;
	}

	.features-section h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		text-align: center;
	}

	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 0.75rem;
	}

	.features-list li {
		padding: 0.75rem;
		background: white;
		border-radius: 8px;
		border: 1px solid #e9ecef;
		color: #495057;
		font-size: 0.95rem;
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem;
		}

		.hero-section h1 {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.content-grid {
			grid-template-columns: 1fr;
		}

		.features-list {
			grid-template-columns: 1fr;
		}
	}
</style>
