<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { location } from 'svelte-spa-router'

	const dispatch = createEventDispatcher()

	// 表单数据
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: '',
		category: 'general'
	}

	let isSubmitting = false
	let submitSuccess = false
	let submitError = ''

	const categories = [
		{ value: 'general', label: '一般咨询' },
		{ value: 'technical', label: '技术支持' },
		{ value: 'sales', label: '销售咨询' },
		{ value: 'partnership', label: '合作洽谈' },
		{ value: 'feedback', label: '意见反馈' }
	]

	// 提交表单
	async function handleSubmit() {
		if (!validateForm()) return

		isSubmitting = true
		submitError = ''

		try {
			// 模拟 API 调用
			await new Promise(resolve => setTimeout(resolve, 2000))

			// 模拟成功/失败（90% 成功率）
			if (Math.random() > 0.1) {
				submitSuccess = true
				resetForm()
			} else {
				throw new Error('网络错误，请稍后重试')
			}
		} catch (error) {
			submitError = error instanceof Error ? error.message : '提交失败'
		} finally {
			isSubmitting = false
		}
	}

	// 表单验证
	function validateForm() {
		if (!formData.name.trim()) {
			submitError = '请输入您的姓名'
			return false
		}
		if (!formData.email.trim()) {
			submitError = '请输入您的邮箱'
			return false
		}
		if (!formData.subject.trim()) {
			submitError = '请输入邮件主题'
			return false
		}
		if (!formData.message.trim()) {
			submitError = '请输入邮件内容'
			return false
		}
		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			submitError = '请输入有效的邮箱地址'
			return false
		}
		return true
	}

	// 重置表单
	function resetForm() {
		formData = {
			name: '',
			email: '',
			subject: '',
			message: '',
			category: 'general'
		}
	}

	// 重置提交状态
	function resetSubmitState() {
		submitSuccess = false
		submitError = ''
	}

	// 联系方式数据
	const contactMethods = [
		{
			icon: '📧',
			title: '邮箱联系',
			value: 'contact@example.com',
			description: '工作日内24小时回复'
		},
		{
			icon: '📞',
			title: '电话联系',
			value: '+86 400-123-4567',
			description: '工作时间：9:00-18:00'
		},
		{
			icon: '💬',
			title: '在线客服',
			value: '点击咨询',
			description: '实时在线支持'
		},
		{
			icon: '📍',
			title: '办公地址',
			value: '北京市朝阳区xxx大厦',
			description: '欢迎预约参观'
		}
	]

	// 常见问题
	const faqs = [
		{
			question: '如何开始使用 Svelte？',
			answer: '建议从我们的基础教程开始，逐步学习 Svelte 的核心概念和实践应用。'
		},
		{
			question: 'SPA Router 支持哪些功能？',
			answer: '支持动态路由、路由守卫、历史管理、查询参数等完整的路由功能。'
		},
		{
			question: '是否提供技术支持？',
			answer: '我们提供完善的技术支持服务，包括文档、社区论坛和专业客服。'
		},
		{
			question: '产品更新频率如何？',
			answer: '我们会根据用户反馈和技术发展定期更新产品，保持与最新标准同步。'
		}
	]

	let expandedFaq = -1

	function toggleFaq(index: number) {
		expandedFaq = expandedFaq === index ? -1 : index
	}
</script>

<div class="page contact-page">
	<div class="page-header">
		<h1>📞 联系我们</h1>
		<p class="page-subtitle">我们随时准备为您提供帮助和支持</p>
	</div>

	<div class="contact-content">
		<!-- 联系方式 -->
		<div class="contact-methods">
			<h2>🌟 多种联系方式</h2>
			<div class="methods-grid">
				{#each contactMethods as method}
					<div class="method-card">
						<div class="method-icon">{method.icon}</div>
						<h4 class="method-title">{method.title}</h4>
						<div class="method-value">{method.value}</div>
						<p class="method-description">{method.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- 联系表单 -->
		<div class="contact-form-section">
			<h2>✉️ 发送消息</h2>
			
			{#if submitSuccess}
				<div class="success-message">
					<h3>🎉 提交成功！</h3>
					<p>我们已收到您的消息，将在24小时内回复您。</p>
					<button on:click={resetSubmitState} class="reset-btn">
						发送新消息
					</button>
				</div>
			{:else}
				<form on:submit|preventDefault={handleSubmit} class="contact-form">
					<div class="form-row">
						<div class="form-group">
							<label for="name">姓名 *</label>
							<input 
								type="text" 
								id="name"
								bind:value={formData.name}
								disabled={isSubmitting}
								placeholder="请输入您的姓名"
								class="form-input"
							>
						</div>
						
						<div class="form-group">
							<label for="email">邮箱 *</label>
							<input 
								type="email" 
								id="email"
								bind:value={formData.email}
								disabled={isSubmitting}
								placeholder="请输入您的邮箱"
								class="form-input"
							>
						</div>
					</div>

					<div class="form-row">
						<div class="form-group">
							<label for="category">咨询类别</label>
							<select 
								id="category"
								bind:value={formData.category}
								disabled={isSubmitting}
								class="form-select"
							>
								{#each categories as category}
									<option value={category.value}>{category.label}</option>
								{/each}
							</select>
						</div>
						
						<div class="form-group">
							<label for="subject">主题 *</label>
							<input 
								type="text" 
								id="subject"
								bind:value={formData.subject}
								disabled={isSubmitting}
								placeholder="请输入邮件主题"
								class="form-input"
							>
						</div>
					</div>

					<div class="form-group">
						<label for="message">消息内容 *</label>
						<textarea 
							id="message"
							bind:value={formData.message}
							disabled={isSubmitting}
							placeholder="请详细描述您的问题或需求..."
							class="form-textarea"
							rows="6"
						></textarea>
					</div>

					{#if submitError}
						<div class="error-message">
							❌ {submitError}
						</div>
					{/if}

					<button 
						type="submit" 
						disabled={isSubmitting}
						class="submit-btn"
						class:submitting={isSubmitting}
					>
						{#if isSubmitting}
							⏳ 发送中...
						{:else}
							📤 发送消息
						{/if}
					</button>
				</form>
			{/if}
		</div>

		<!-- 常见问题 -->
		<div class="faq-section">
			<h2>❓ 常见问题</h2>
			<div class="faq-list">
				{#each faqs as faq, index}
					<div class="faq-item">
						<button 
							class="faq-question"
							class:expanded={expandedFaq === index}
							on:click={() => toggleFaq(index)}
						>
							<span class="faq-question-text">{faq.question}</span>
							<span class="faq-toggle">
								{expandedFaq === index ? '−' : '+'}
							</span>
						</button>
						
						{#if expandedFaq === index}
							<div class="faq-answer">
								<p>{faq.answer}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- 路由状态展示 -->
		<div class="route-demo">
			<h3>🔗 路由状态演示</h3>
			<div class="route-info">
				<strong>当前页面路由:</strong> 
				<code>{$location}</code>
			</div>
			<p class="route-description">
				这个联系页面通过 SPA Router 加载，页面切换无需刷新，提供流畅的用户体验。
			</p>
		</div>
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
		margin-bottom: 3rem;
		padding: 2rem;
		background: linear-gradient(135deg, #fd7e14 0%, #e83e8c 100%);
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

	.contact-content {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.contact-methods h2,
	.contact-form-section h2,
	.faq-section h2 {
		margin: 0 0 1.5rem 0;
		color: #333;
		font-size: 1.8rem;
	}

	.methods-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.method-card {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		transition: transform 0.2s ease;
	}

	.method-card:hover {
		transform: translateY(-5px);
	}

	.method-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.method-title {
		margin: 0 0 0.5rem 0;
		color: #333;
		font-size: 1.3rem;
	}

	.method-value {
		font-weight: 600;
		color: #007bff;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.method-description {
		color: #666;
		margin: 0;
		font-size: 0.9rem;
	}

	.contact-form-section {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.success-message {
		text-align: center;
		padding: 2rem;
		background: #d4edda;
		border: 1px solid #c3e6cb;
		border-radius: 8px;
		color: #155724;
	}

	.success-message h3 {
		margin: 0 0 1rem 0;
		color: #155724;
	}

	.success-message p {
		margin: 0 0 2rem 0;
	}

	.reset-btn {
		background: #28a745;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s;
	}

	.reset-btn:hover {
		background: #218838;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #495057;
		font-size: 0.9rem;
	}

	.form-input, .form-select, .form-textarea {
		padding: 0.75rem;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		font-size: 1rem;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.form-input:focus, .form-select:focus, .form-textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
	}

	.form-input:disabled, .form-select:disabled, .form-textarea:disabled {
		background-color: #f8f9fa;
		opacity: 0.6;
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
	}

	.error-message {
		background: #f8d7da;
		border: 1px solid #f5c6cb;
		color: #721c24;
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.submit-btn {
		background: #007bff;
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		align-self: flex-start;
	}

	.submit-btn:hover:not(:disabled) {
		background: #0056b3;
		transform: translateY(-1px);
	}

	.submit-btn:disabled {
		background: #6c757d;
		cursor: not-allowed;
		transform: none;
	}

	.submit-btn.submitting {
		background: #6c757d;
	}

	.faq-section {
		background: white;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 2px 10px rgba(0,0,0,0.05);
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.faq-item {
		border: 1px solid #e9ecef;
		border-radius: 8px;
		overflow: hidden;
	}

	.faq-question {
		width: 100%;
		background: #f8f9fa;
		border: none;
		padding: 1rem;
		text-align: left;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: background-color 0.2s;
		font-size: 1rem;
	}

	.faq-question:hover {
		background: #e9ecef;
	}

	.faq-question.expanded {
		background: #e9ecef;
	}

	.faq-question-text {
		font-weight: 600;
		color: #333;
	}

	.faq-toggle {
		font-size: 1.2rem;
		font-weight: bold;
		color: #007bff;
		width: 20px;
		text-align: center;
	}

	.faq-answer {
		padding: 1rem;
		background: white;
		border-top: 1px solid #e9ecef;
		animation: slideDown 0.3s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: 200px;
		}
	}

	.faq-answer p {
		margin: 0;
		color: #666;
		line-height: 1.5;
	}

	.route-demo {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 1.5rem;
	}

	.route-demo h3 {
		margin: 0 0 1rem 0;
		color: #333;
	}

	.route-info {
		margin-bottom: 1rem;
		color: #495057;
	}

	.route-info code {
		background: #e9ecef;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
	}

	.route-description {
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

		.page-subtitle {
			font-size: 1rem;
		}

		.methods-grid {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-form-section,
		.faq-section,
		.route-demo {
			padding: 1rem;
		}

		.submit-btn {
			align-self: stretch;
		}
	}
</style>
