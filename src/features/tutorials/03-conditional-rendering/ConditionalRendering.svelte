<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 基础条件变量
	let showContent = true;
	let userRole = "guest";
	let score = 85;
	let isLoggedIn = false;
	
	// 复杂条件
	let weather = "sunny";
	let temperature = 25;
	
	// 切换函数
	function toggleContent() {
		showContent = !showContent;
	}
	
	function changeRole() {
		const roles = ["guest", "user", "admin", "moderator"];
		const currentIndex = roles.indexOf(userRole);
		userRole = roles[(currentIndex + 1) % roles.length];
	}
	
	function updateScore() {
		score = Math.floor(Math.random() * 100) + 1;
	}
	
	function toggleLogin() {
		isLoggedIn = !isLoggedIn;
	}
	
	function changeWeather() {
		const weathers = ["sunny", "cloudy", "rainy", "snowy"];
		const currentIndex = weathers.indexOf(weather);
		weather = weathers[(currentIndex + 1) % weathers.length];
	}

	function resetDemo() {
		showContent = true;
		userRole = "guest";
		score = 85;
		isLoggedIn = false;
		weather = "sunny";
		temperature = 25;
	}
</script>

<DemoContainer 
	title="条件渲染演示"
	description="学习Svelte的条件渲染语法，包括if/else、多重条件和动态内容显示"
>
	<div slot="demo" class="conditional-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>基础条件渲染</h4>
				<div class="demo-area">
					{#if showContent}
						<div class="content-box">
							<p>这是条件显示的内容！</p>
							<p>当前状态：显示</p>
						</div>
					{:else}
						<div class="hidden-box">
							<p>内容已隐藏</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="demo-section">
				<h4>if/else 条件</h4>
				<div class="demo-area">
					{#if isLoggedIn}
						<div class="success-box">
							<h5>欢迎回来！</h5>
							<p>您已成功登录系统</p>
						</div>
					{:else}
						<div class="warning-box">
							<h5>请先登录</h5>
							<p>登录后才能访问完整功能</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="demo-section">
				<h4>多重条件</h4>
				<div class="demo-area">
					<p>当前角色：<strong>{userRole}</strong></p>
					
					{#if userRole === "admin"}
						<div class="admin-box">
							<h5>管理员面板</h5>
							<p>您可以访问所有功能</p>
						</div>
					{:else if userRole === "moderator"}
						<div class="moderator-box">
							<h5>版主面板</h5>
							<p>您可以管理内容</p>
						</div>
					{:else if userRole === "user"}
						<div class="user-box">
							<h5>用户面板</h5>
							<p>您可以访问基本功能</p>
						</div>
					{:else}
						<div class="guest-box">
							<h5>访客模式</h5>
							<p>请登录获取更多功能</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="demo-section">
				<h4>动态内容</h4>
				<div class="demo-area">
					<div class="weather-display">
						<p>天气：<span class="weather-icon">{weather === 'sunny' ? '☀️' : weather === 'cloudy' ? '☁️' : weather === 'rainy' ? '🌧️' : '❄️'}</span> {weather}</p>
						<p>温度：{temperature}°C</p>
						
						{#if temperature > 30}
							<p class="hot">天气很热，注意防暑！</p>
						{:else if temperature > 20}
							<p class="warm">天气温暖，适合外出！</p>
						{:else if temperature > 10}
							<p class="cool">天气凉爽，记得加衣！</p>
						{:else}
							<p class="cold">天气寒冷，注意保暖！</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<button on:click={toggleContent}>{showContent ? '隐藏' : '显示'} 内容</button>
		<button on:click={toggleLogin}>{isLoggedIn ? '退出登录' : '登录'}</button>
		<button on:click={changeRole}>切换角色</button>
		<button on:click={updateScore}>随机分数</button>
		<button on:click={changeWeather}>切换天气</button>
		<button class="secondary" on:click={resetDemo}>重置演示</button>
		
		<div class="status-info">
			<strong>当前状态：</strong><br>
			内容显示: {showContent ? '是' : '否'}<br>
			登录状态: {isLoggedIn ? '已登录' : '未登录'}<br>
			用户角色: {userRole}<br>
			当前分数: {score}<br>
			天气: {weather}
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 核心知识点：</strong></p>
		<ul>
			<li><strong>基础if：</strong><code>&#123;#if showContent&#125;...&#123;/if&#125;</code> - 根据条件显示或隐藏内容</li>
			<li><strong>if/else：</strong><code>&#123;#if isLoggedIn&#125;...&#123;:else&#125;...&#123;/if&#125;</code> - 提供两种互斥的显示选项</li>
			<li><strong>多重条件：</strong><code>&#123;#if userRole === "admin"&#125;...&#123;:else if userRole === "user"&#125;...&#123;:else&#125;...&#123;/if&#125;</code> - 处理多种可能的情况</li>
			<li><strong>动态内容：</strong>根据变量值动态显示不同内容，实现个性化界面</li>
		</ul>
		
		<p><strong>📚 重要概念：</strong></p>
		<ul>
			<li><strong>条件块：</strong> 使用 <code>&#123;#if&#125;</code> 和 <code>&#123;/if&#125;</code> 包围条件内容</li>
			<li><strong>else分支：</strong> 使用 <code>&#123;:else&#125;</code> 定义默认显示内容</li>
			<li><strong>else if：</strong> 使用 <code>&#123;:else if 条件&#125;</code> 定义多个条件分支</li>
			<li><strong>条件表达式：</strong> 支持所有JavaScript逻辑表达式和比较操作</li>
		</ul>
		
		<p><strong>🔧 语法要点：</strong></p>
		<ul>
			<li>基础条件：<code>&#123;#if 布尔值&#125;内容&#123;/if&#125;</code></li>
			<li>比较条件：<code>&#123;#if score >= 90&#125;优秀&#123;/if&#125;</code></li>
			<li>复合条件：<code>&#123;#if isLoggedIn && userRole === "admin"&#125;管理员面板&#123;/if&#125;</code></li>
			<li>三元表达式：<code>&#123;isLoggedIn ? "已登录" : "未登录"&#125;</code></li>
		</ul>
		
		<p><strong>💡 使用场景：</strong></p>
		<ul>
			<li><strong>权限控制：</strong>根据用户角色显示不同的功能界面</li>
			<li><strong>状态显示：</strong>根据数据状态显示不同的提示信息</li>
			<li><strong>条件显示：</strong>根据用户操作显示或隐藏特定内容</li>
			<li><strong>动态渲染：</strong>根据配置或用户偏好显示个性化内容</li>
			<li><strong>错误处理：</strong>根据错误状态显示不同的错误信息</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>条件为false时，内容完全不会渲染，节省性能</li>
			<li>避免在条件块中使用复杂的计算，考虑使用派生状态</li>
			<li>合理使用else if，避免过多的嵌套条件</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>条件表达式必须是布尔值或可以转换为布尔值的表达式</li>
			<li>else if的顺序很重要，会按顺序检查条件</li>
			<li>避免在条件块中修改响应式变量，可能导致无限循环</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;!-- 基础条件渲染 --&gt;
&#123;#if showContent&#125;
  &lt;div&gt;内容显示&lt;/div&gt;
&#123;:else&#125;
  &lt;div&gt;内容隐藏&lt;/div&gt;
&#123;/if&#125;

&lt;!-- 多重条件 --&gt;
&#123;#if userRole === "admin"&#125;
  &lt;div&gt;管理员面板&lt;/div&gt;
&#123;:else if userRole === "user"&#125;
  &lt;div&gt;用户面板&lt;/div&gt;
&#123;:else&#125;
  &lt;div&gt;访客模式&lt;/div&gt;
&#123;/if&#125;

&lt;!-- 动态内容 --&gt;
&#123;#if temperature > 30&#125;
  &lt;p&gt;天气很热！&lt;/p&gt;
&#123;:else if temperature > 20&#125;
  &lt;p&gt;天气温暖！&lt;/p&gt;
&#123;:else&#125;
  &lt;p&gt;天气凉爽！&lt;/p&gt;
&#123;/if&#125;</code></pre>
	</div>
</DemoContainer>

<style>
	.conditional-demo {
		padding: 20px;
		min-height: 500px;
	}

	.demo-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.demo-section {
		background: #f8f9fa;
		padding: 20px;
		border-radius: 8px;
		border: 1px solid #e9ecef;
	}

	h4 {
		margin: 0 0 16px 0;
		color: #333;
		font-size: 1.1em;
	}

	h5 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 1em;
	}

	.demo-area {
		text-align: center;
	}

	.content-box {
		background: #d4edda;
		color: #155724;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #c3e6cb;
		margin-top: 12px;
	}

	.hidden-box {
		background: #f8d7da;
		color: #721c24;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #f5c6cb;
		margin-top: 12px;
	}

	.success-box {
		background: #d4edda;
		color: #155724;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #c3e6cb;
		margin-top: 12px;
	}

	.warning-box {
		background: #fff3cd;
		color: #856404;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #ffeaa7;
		margin-top: 12px;
	}

	.admin-box {
		background: #d1ecf1;
		color: #0c5460;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #bee5eb;
		margin-top: 12px;
	}

	.moderator-box {
		background: #e2e3e5;
		color: #383d41;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #d6d8db;
		margin-top: 12px;
	}

	.user-box {
		background: #d4edda;
		color: #155724;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #c3e6cb;
		margin-top: 12px;
	}

	.guest-box {
		background: #f8d7da;
		color: #721c24;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #f5c6cb;
		margin-top: 12px;
	}

	.weather-display {
		background: white;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
		margin-top: 12px;
	}

	.weather-icon {
		font-size: 1.2em;
	}

	.hot {
		color: #dc3545;
		font-weight: 600;
	}

	.warm {
		color: #fd7e14;
		font-weight: 600;
	}

	.cool {
		color: #17a2b8;
		font-weight: 600;
	}

	.cold {
		color: #6f42c1;
		font-weight: 600;
	}

	.status-info {
		background: #f8f9fa;
		padding: 12px;
		border-radius: 6px;
		margin-top: 16px;
		font-size: 0.9em;
		line-height: 1.6;
		border: 1px solid #e9ecef;
	}

	pre {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 4px;
		padding: 12px;
		margin: 0;
		font-size: 0.8em;
		overflow-x: auto;
		line-height: 1.4;
	}

	code {
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		color: #333;
	}

	@media (max-width: 768px) {
		.demo-content {
			gap: 16px;
		}

		.demo-section {
			padding: 16px;
		}
	}
</style>
