<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 基础响应式变量
	let firstName = "张";
	let lastName = "三";
	let age = 25;
	let isStudent = true;
	
	// 派生状态（响应式计算）
	$: fullName = firstName + lastName;
	$: canVote = age >= 18;
	$: status = isStudent ? "学生" : "非学生";
	$: birthYear = new Date().getFullYear() - age;
	
	// 对象和数组的响应式
	let user = {
		name: "李四",
		email: "lisi@example.com",
		preferences: {
			theme: "light",
			language: "zh-CN"
		}
	};
	
	let hobbies = ["阅读", "编程", "运动"];
	
	// 更新函数
	function updateAge() {
		age += 1;
	}
	
	function toggleStudent() {
		isStudent = !isStudent;
	}
	
	function addHobby() {
		hobbies = [...hobbies, "新爱好"];
	}
	
	function updateUser() {
		user = {
			...user,
			preferences: {
				...user.preferences,
				theme: user.preferences.theme === "light" ? "dark" : "light"
			}
		};
	}

	function resetData() {
		firstName = "张";
		lastName = "三";
		age = 25;
		isStudent = true;
		user = {
			name: "李四",
			email: "lisi@example.com",
			preferences: {
				theme: "light",
				language: "zh-CN"
			}
		};
		hobbies = ["阅读", "编程", "运动"];
	}
</script>

<DemoContainer 
	title="响应式数据演示"
	description="理解Svelte的响应式系统和数据绑定机制，包括基础变量、派生状态和对象数组的响应式更新"
>
	<div slot="demo" class="reactive-demo">
		<div class="demo-content">
			<div class="form-section">
				<h4>基础变量</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="firstName">姓：</label>
						<input id="firstName" bind:value={firstName} placeholder="输入姓氏" />
					</div>
					<div class="form-group">
						<label for="lastName">名：</label>
						<input id="lastName" bind:value={lastName} placeholder="输入名字" />
					</div>
					<div class="form-group">
						<label for="age">年龄：</label>
						<input id="age" type="number" bind:value={age} min="0" max="120" />
					</div>
					<div class="form-group checkbox-group">
						<label>
							<input type="checkbox" bind:checked={isStudent} />
							<span>是学生</span>
						</label>
					</div>
				</div>
			</div>

			<div class="derived-section">
				<h4>派生状态（自动计算）</h4>
				<div class="derived-grid">
					<div class="derived-item">
						<span class="label">全名：</span>
						<span class="value">{fullName}</span>
					</div>
					<div class="derived-item">
						<span class="label">投票权：</span>
						<span class="value {canVote ? 'positive' : 'negative'}">
							{canVote ? '有' : '无'}
						</span>
					</div>
					<div class="derived-item">
						<span class="label">身份：</span>
						<span class="value">{status}</span>
					</div>
					<div class="derived-item">
						<span class="label">出生年份：</span>
						<span class="value">{birthYear}</span>
					</div>
				</div>
			</div>

			<div class="object-section">
				<h4>对象和数组</h4>
				<div class="info-grid">
					<div class="info-item">
						<span class="label">用户：</span>
						<span class="value">{user.name} ({user.email})</span>
					</div>
					<div class="info-item">
						<span class="label">主题：</span>
						<span class="value theme-badge {user.preferences.theme}">
							{user.preferences.theme}
						</span>
					</div>
					<div class="info-item">
						<span class="label">爱好：</span>
						<span class="value">{hobbies.join(", ")}</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<button on:click={updateAge}>增加年龄</button>
		<button on:click={toggleStudent}>切换学生状态</button>
		<button on:click={addHobby}>添加爱好</button>
		<button on:click={updateUser}>切换主题</button>
		<button class="secondary" on:click={resetData}>重置数据</button>
		
		<div class="status-info">
			<strong>当前状态：</strong><br>
			年龄: {age}岁<br>
			学生: {isStudent ? '是' : '否'}<br>
			爱好数量: {hobbies.length}个
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 核心知识点：</strong></p>
		<ul>
			<li><strong>自动响应式：</strong>变量变化时，依赖它们的UI自动更新，无需手动触发</li>
			<li><strong>派生状态：</strong>使用 <code>$:</code> 创建响应式计算值，自动追踪依赖</li>
			<li><strong>不可变更新：</strong>数组和对象使用展开运算符创建新引用，确保响应式更新</li>
			<li><strong>双向绑定：</strong><code>bind:value</code> 实现表单与数据的实时同步</li>
		</ul>
		
		<p><strong>📚 重要概念：</strong></p>
		<ul>
			<li><strong>响应式声明：</strong> <code>$: 变量名 = 表达式</code> - 当依赖项变化时自动重新计算</li>
			<li><strong>依赖追踪：</strong> Svelte自动追踪派生状态中使用的所有变量</li>
			<li><strong>更新策略：</strong> 对象和数组必须创建新引用才能触发响应式更新</li>
			<li><strong>性能优化：</strong> 只有真正变化的部分才会重新渲染</li>
		</ul>
		
		<p><strong>🔧 语法要点：</strong></p>
		<ul>
			<li>响应式声明：<code>$: fullName = firstName + lastName</code></li>
			<li>条件派生：<code>$: canVote = age >= 18</code></li>
			<li>数组更新：<code>hobbies = [...hobbies, "新爱好"]</code></li>
			<li>对象更新：<code>user = &#123;...user, name: "新名字"&#125;</code></li>
			<li>嵌套对象：<code>user = &#123;...user, preferences: &#123;...user.preferences, theme: "dark"&#125;&#125;</code></li>
		</ul>
		
		<p><strong>💡 最佳实践：</strong></p>
		<ul>
			<li>使用派生状态避免重复计算和状态不一致</li>
			<li>始终使用不可变更新模式处理数组和对象</li>
			<li>合理使用响应式声明，避免过度计算</li>
			<li>理解数据流向：用户输入 → 变量更新 → 派生状态重新计算 → UI更新</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>直接修改数组或对象不会触发响应式更新</li>
			<li>派生状态中的依赖必须是响应式变量</li>
			<li>避免在派生状态中产生副作用</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;script&gt;
  // 基础响应式变量
  let firstName = "张";
  let lastName = "三";
  
  // 派生状态（自动计算）
  $: fullName = firstName + lastName;
  $: canVote = age >= 18;
  
  // 数组更新
  function addHobby() &#123;
    hobbies = [...hobbies, "新爱好"];
  &#125;
&lt;/script&gt;

&lt;input bind:value=&#123;firstName&#125; /&gt;
&lt;h3&gt;你好，&#123;fullName&#125;！&lt;/h3&gt;
&lt;button on:click=&#123;addHobby&#125;&gt;添加爱好&lt;/button&gt;</code></pre>
	</div>
</DemoContainer>

<style>
	.reactive-demo {
		padding: 20px;
		min-height: 400px;
	}

	.demo-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.form-section, .derived-section, .object-section {
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

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.form-group label {
		font-weight: 500;
		color: #555;
		font-size: 0.9em;
	}

	.form-group input {
		padding: 8px 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 0.9em;
	}

	.checkbox-group {
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}

	.checkbox-group input[type="checkbox"] {
		width: auto;
		margin: 0;
	}

	.derived-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
	}

	.derived-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: white;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.label {
		font-weight: 500;
		color: #666;
	}

	.value {
		font-weight: 600;
		color: #333;
	}

	.value.positive {
		color: #28a745;
	}

	.value.negative {
		color: #dc3545;
	}

	.info-grid {
		display: grid;
		gap: 12px;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: white;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.theme-badge {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.8em;
		font-weight: 500;
	}

	.theme-badge.light {
		background: #f8f9fa;
		color: #495057;
	}

	.theme-badge.dark {
		background: #343a40;
		color: #f8f9fa;
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
		.form-grid {
			grid-template-columns: 1fr;
		}

		.derived-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
