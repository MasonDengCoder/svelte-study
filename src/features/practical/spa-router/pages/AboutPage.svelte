<script lang="ts">
	import { link } from 'svelte-spa-router'
</script>

<div class="page about-page">
	<div class="page-header">
		<h1>📖 关于我们</h1>
		<p class="page-subtitle">了解我们的团队、使命和技术栈</p>
	</div>

	<div class="content-sections">
		<section class="section">
			<h2>🎯 我们的使命</h2>
			<p>
				我们致力于创建高质量的前端应用，使用现代化的技术栈为用户提供最佳的体验。
				通过 Svelte 和 SPA Router，我们能够构建快速、响应式的单页应用。
			</p>
		</section>

		<section class="section">
			<h2>🛠️ 技术栈</h2>
			<div class="tech-grid">
				<div class="tech-item">
					<h4>⚡ Svelte</h4>
					<p>现代化的前端框架，编译时优化</p>
				</div>
				<div class="tech-item">
					<h4>🔗 SPA Router</h4>
					<p>轻量级的客户端路由解决方案</p>
				</div>
				<div class="tech-item">
					<h4>📱 TypeScript</h4>
					<p>类型安全的 JavaScript 开发</p>
				</div>
				<div class="tech-item">
					<h4>🎨 CSS3</h4>
					<p>现代化的样式和动画效果</p>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>👥 团队介绍</h2>
			<div class="team-grid">
				<div class="team-member">
					<div class="member-avatar">👨‍💻</div>
					<h4>张三</h4>
					<p>前端架构师</p>
					<span class="member-role">负责整体技术架构设计</span>
				</div>
				<div class="team-member">
					<div class="member-avatar">👩‍🎨</div>
					<h4>李四</h4>
					<p>UI/UX 设计师</p>
					<span class="member-role">负责用户界面和体验设计</span>
				</div>
				<div class="team-member">
					<div class="member-avatar">👨‍🔬</div>
					<h4>王五</h4>
					<p>前端工程师</p>
					<span class="member-role">负责功能开发和优化</span>
				</div>
			</div>
		</section>

		<section class="section">
			<h2>📈 项目统计</h2>
			<div class="stats-grid">
				<div class="stat-item">
					<div class="stat-number">50+</div>
					<div class="stat-label">完成项目</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">100k+</div>
					<div class="stat-label">代码行数</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">95%</div>
					<div class="stat-label">客户满意度</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">24/7</div>
					<div class="stat-label">技术支持</div>
				</div>
			</div>
		</section>
	</div>

	<div class="cta-section">
		<h3>🚀 准备开始您的项目？</h3>
		<p>联系我们，让我们一起创造卓越的用户体验</p>
		<a href="/contact" use:link class="cta-button">联系我们</a>
	</div>
</div>

<style>
	.page {
		padding: 2rem;
		max-width: 900px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
		padding: 2rem;
		background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
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

	.content-sections {
		margin-bottom: 3rem;
	}

	.section {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		margin-bottom: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.section h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.8rem;
	}

	.section p {
		color: #666;
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
	}

	.tech-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.tech-item {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 1.5rem;
		text-align: center;
	}

	.tech-item h4 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.2rem;
	}

	.tech-item p {
		margin: 0;
		color: #666;
		font-size: 0.95rem;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.team-member {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		transition: transform 0.2s ease;
	}

	.team-member:hover {
		transform: translateY(-5px);
	}

	.member-avatar {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.team-member h4 {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.team-member p {
		margin: 0 0 0.5rem 0;
		color: #007bff;
		font-weight: 600;
	}

	.member-role {
		color: #666;
		font-size: 0.9rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.stat-item {
		background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
		color: white;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	.cta-section {
		background: linear-gradient(135deg, #ffc107 0%, #ff8c00 100%);
		color: white;
		border-radius: 12px;
		padding: 3rem;
		text-align: center;
	}

	.cta-section h3 {
		margin: 0 0 1rem 0;
		font-size: 2rem;
	}

	.cta-section p {
		margin: 0 0 2rem 0;
		font-size: 1.2rem;
		opacity: 0.9;
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #333;
		text-decoration: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1.1rem;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 15px rgba(0,0,0,0.2);
	}

	@media (max-width: 768px) {
		.page {
			padding: 1rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.page-subtitle {
			font-size: 1rem;
		}

		.tech-grid, .team-grid, .stats-grid {
			grid-template-columns: 1fr;
		}

		.stat-number {
			font-size: 2rem;
		}

		.cta-section h3 {
			font-size: 1.5rem;
		}

		.cta-section p {
			font-size: 1rem;
		}
	}
</style>
