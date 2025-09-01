<script lang="ts">
	import DemoContainer from '../../../components/DemoContainer.svelte';
	
	// 基础数组
	let fruits = ["苹果", "香蕉", "橙子", "葡萄"];
	let numbers = [1, 2, 3, 4, 5];
	
	// 对象数组
	let users = [
		{ id: 1, name: "张三", age: 25, role: "用户" },
		{ id: 2, name: "李四", age: 30, role: "管理员" },
		{ id: 3, name: "王五", age: 28, role: "用户" },
		{ id: 4, name: "赵六", age: 35, role: "版主" }
	];
	
	// 新项目输入
	let newFruit = "";
	let newUserName = "";
	let newUserAge = "";
	let newUserRole = "用户";
	
	// 添加水果
	function addFruit() {
		if (newFruit.trim()) {
			fruits = [...fruits, newFruit.trim()];
			newFruit = "";
		}
	}
	
	// 删除水果
	function removeFruit(index: any) {
		fruits = fruits.filter((_, i) => i !== index);
	}
	
	// 添加用户
	function addUser() {
		if (newUserName.trim() && newUserAge) {
			const newUser = {
				id: users.length + 1,
				name: newUserName.trim(),
				age: parseInt(newUserAge),
				role: newUserRole
			};
			users = [...users, newUser];
			newUserName = "";
			newUserAge = "";
			newUserRole = "用户";
		}
	}
	
	// 删除用户
	function removeUser(id: any) {
		users = users.filter(user => user.id !== id);
	}
	
	// 更新用户角色
	function updateUserRole(id: any, newRole: any) {
		users = users.map(user => 
			user.id === id ? { ...user, role: newRole } : user
		);
	}
	
	// 清空列表
	function clearFruits() {
		fruits = [];
	}
	
	function clearUsers() {
		users = [];
	}
	
	// 排序
	function sortFruits() {
		fruits = [...fruits].sort();
	}
	
	function sortUsersByName() {
		users = [...users].sort((a, b) => a.name.localeCompare(b.name));
	}
	
	function sortUsersByAge() {
		users = [...users].sort((a, b) => a.age - b.age);
	}

	function resetDemo() {
		fruits = ["苹果", "香蕉", "橙子", "葡萄"];
		users = [
			{ id: 1, name: "张三", age: 25, role: "用户" },
			{ id: 2, name: "李四", age: 30, role: "管理员" },
			{ id: 3, name: "王五", age: 28, role: "用户" },
			{ id: 4, name: "赵六", age: 35, role: "版主" }
		];
		newFruit = "";
		newUserName = "";
		newUserAge = "";
		newUserRole = "用户";
	}
</script>

<DemoContainer 
	title="列表渲染演示"
	description="学习Svelte的列表渲染语法，包括基础数组、对象数组的遍历、添加、删除和排序操作"
>
	<div slot="demo" class="list-demo">
		<div class="demo-content">
			<div class="demo-section">
				<h4>基础数组渲染</h4>
				<div class="list-display">
					<h5>水果列表 ({fruits.length}个)</h5>
					<ul class="fruit-list">
						{#each fruits as fruit, index}
							<li class="fruit-item">
								<span class="fruit-name">{fruit}</span>
								<button class="remove-btn" on:click={() => removeFruit(index)}>删除</button>
							</li>
						{/each}
					</ul>
					
					<div class="add-form">
						<input 
							bind:value={newFruit} 
							placeholder="输入水果名称"
							on:keydown={(e) => e.key === 'Enter' && addFruit()}
						/>
						<button on:click={addFruit}>添加</button>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>对象数组渲染</h4>
				<div class="list-display">
					<h5>用户列表 ({users.length}个)</h5>
					<div class="user-grid">
						{#each users as user}
							<div class="user-card">
								<div class="user-info">
									<h6>{user.name}</h6>
									<p>年龄: {user.age}岁</p>
									<p>角色: <span class="role-badge {user.role}">{user.role}</span></p>
								</div>
								<div class="user-actions">
									<select 
										value={user.role} 
										on:change={(e) => updateUserRole(user.id, (e.target as any)?.value)}
									>
										<option value="用户">用户</option>
										<option value="版主">版主</option>
										<option value="管理员">管理员</option>
									</select>
									<button class="remove-btn" on:click={() => removeUser(user.id)}>删除</button>
								</div>
							</div>
						{/each}
					</div>
					
					<div class="add-form">
						<input 
							bind:value={newUserName} 
							placeholder="用户名"
						/>
						<input 
							type="number" 
							bind:value={newUserAge} 
							placeholder="年龄"
							min="1"
							max="120"
						/>
						<select bind:value={newUserRole}>
							<option value="用户">用户</option>
							<option value="版主">版主</option>
							<option value="管理员">管理员</option>
						</select>
						<button on:click={addUser}>添加用户</button>
					</div>
				</div>
			</div>

			<div class="demo-section">
				<h4>数字序列</h4>
				<div class="number-display">
					<div class="number-grid">
						{#each numbers as number}
							<div class="number-item">{number}</div>
						{/each}
					</div>
					<p class="number-info">数字总和: {numbers.reduce((sum, num) => sum + num, 0)}</p>
				</div>
			</div>
		</div>
	</div>

	<div slot="controls">
		<div class="control-group">
			<h5>水果操作</h5>
			<button on:click={sortFruits}>排序水果</button>
			<button on:click={clearFruits}>清空水果</button>
		</div>

		<div class="control-group">
			<h5>用户操作</h5>
			<button on:click={sortUsersByName}>按姓名排序</button>
			<button on:click={sortUsersByAge}>按年龄排序</button>
			<button on:click={clearUsers}>清空用户</button>
		</div>

		<button class="secondary" on:click={resetDemo}>重置演示</button>
		
		<div class="status-info">
			<strong>列表统计：</strong><br>
			水果数量: {fruits.length}个<br>
			用户数量: {users.length}个<br>
			数字数量: {numbers.length}个
		</div>
	</div>

	<div slot="explanation">
		<p><strong>🎯 核心知识点：</strong></p>
		<ul>
			<li><strong>基础遍历：</strong><code>&#123;#each array as item&#125;...&#123;/each&#125;</code> - 遍历数组中的每个元素</li>
			<li><strong>带索引：</strong><code>&#123;#each array as item, index&#125;...&#123;/each&#125;</code> - 同时获取元素和索引</li>
			<li><strong>对象遍历：</strong><code>&#123;#each users as user&#125;...&#123;/each&#125;</code> - 遍历对象数组，访问对象属性</li>
			<li><strong>条件渲染：</strong>结合 <code>&#123;#if&#125;</code> 在循环中进行条件判断</li>
		</ul>
		
		<p><strong>📚 重要概念：</strong></p>
		<ul>
			<li><strong>each块：</strong> 使用 <code>&#123;#each&#125;</code> 和 <code>&#123;/each&#125;</code> 包围循环内容</li>
			<li><strong>迭代变量：</strong> 在循环中定义的变量只在循环块内有效</li>
			<li><strong>key属性：</strong> 为每个项目提供唯一标识，优化渲染性能</li>
			<li><strong>响应式更新：</strong> 数组变化时，列表会自动重新渲染</li>
		</ul>
		
		<p><strong>🔧 语法要点：</strong></p>
		<ul>
			<li>基础循环：<code>&#123;#each items as item&#125;&lt;div&gt;&#123;item&#125;&lt;/div&gt;&#123;/each&#125;</code></li>
			<li>带索引：<code>&#123;#each items as item, i&#125;&lt;div&gt;&#123;i + 1&#125;. &#123;item&#125;&lt;/div&gt;&#123;/each&#125;</code></li>
			<li>对象属性：<code>&#123;#each users as user&#125;&lt;div&gt;&#123;user.name&#125; - &#123;user.age&#125;&lt;/div&gt;&#123;/each&#125;</code></li>
			<li>条件循环：<code>&#123;#each items as item&#125;&#123;#if item.active&#125;&lt;div&gt;&#123;item.name&#125;&lt;/div&gt;&#123;/if&#125;&#123;/each&#125;</code></li>
		</ul>
		
		<p><strong>💡 常用操作：</strong></p>
		<ul>
			<li><strong>添加项目：</strong><code>array = [...array, newItem]</code> - 在数组末尾添加新项目</li>
			<li><strong>删除项目：</strong><code>array = array.filter(item => condition)</code> - 根据条件过滤项目</li>
			<li><strong>更新项目：</strong><code>array = array.map(item => updatedItem)</code> - 批量更新项目</li>
			<li><strong>排序：</strong><code>array = [...array].sort()</code> - 对数组进行排序</li>
			<li><strong>查找：</strong><code>array.find(item => condition)</code> - 查找符合条件的项目</li>
		</ul>
		
		<p><strong>⚡ 性能优化：</strong></p>
		<ul>
			<li>使用key属性帮助Svelte识别项目变化，避免不必要的重新渲染</li>
			<li>避免在循环中进行复杂计算，考虑使用派生状态</li>
			<li>合理使用数组方法，避免直接修改原数组</li>
			<li>对于大型列表，考虑使用虚拟滚动或分页</li>
		</ul>
		
		<p><strong>🛠️ 高级技巧：</strong></p>
		<ul>
			<li><strong>嵌套循环：</strong>在each块内嵌套其他each块处理二维数据</li>
			<li><strong>动态列表：</strong>根据条件动态显示不同的列表内容</li>
			<li><strong>列表操作：</strong>结合事件处理实现列表的增删改查</li>
			<li><strong>数据转换：</strong>在循环中对数据进行格式化或转换</li>
		</ul>
		
		<p><strong>⚠️ 注意事项：</strong></p>
		<ul>
			<li>始终使用不可变更新模式，直接修改数组不会触发响应式更新</li>
			<li>循环中的事件处理函数要注意闭包问题</li>
			<li>避免在循环中修改正在遍历的数组</li>
			<li>合理使用索引，但不要依赖索引作为唯一标识</li>
		</ul>
	</div>

	<div slot="code">
		<pre><code>&lt;!-- 基础数组遍历 --&gt;
&#123;#each fruits as fruit, index&#125;
  &lt;li&gt;
    &#123;fruit&#125;
    &lt;button on:click=&#123;() =&gt; removeFruit(index)&#125;&gt;删除&lt;/button&gt;
  &lt;/li&gt;
&#123;/each&#125;

&lt;!-- 对象数组遍历 --&gt;
&#123;#each users as user&#125;
  &lt;div&gt;
    &lt;h6&gt;&#123;user.name&#125;&lt;/h6&gt;
    &lt;p&gt;年龄: &#123;user.age&#125;岁&lt;/p&gt;
  &lt;/div&gt;
&#123;/each&#125;

&lt;!-- 添加新项目 --&gt;
function addFruit() &#123;
  fruits = [...fruits, newFruit];
  newFruit = "";
&#125;

&lt;!-- 删除项目 --&gt;
function removeFruit(index) &#123;
  fruits = fruits.filter((_, i) =&gt; i !== index);
&#125;</code></pre>
	</div>
</DemoContainer>

<style>
	.list-demo {
		padding: 20px;
		min-height: 500px;
	}

	.demo-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
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
		margin: 0 0 12px 0;
		color: #555;
		font-size: 1em;
	}

	h6 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.95em;
	}

	.list-display {
		background: white;
		padding: 16px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.fruit-list {
		list-style: none;
		padding: 0;
		margin: 0 0 16px 0;
	}

	.fruit-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		margin-bottom: 8px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.fruit-name {
		font-weight: 500;
		color: #333;
	}

	.remove-btn {
		background: #dc3545;
		color: white;
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.8em;
		cursor: pointer;
	}

	.remove-btn:hover {
		background: #c82333;
	}

	.add-form {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.add-form input,
	.add-form select {
		padding: 6px 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.add-form button {
		background: #28a745;
		color: white;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 0.9em;
		cursor: pointer;
	}

	.add-form button:hover {
		background: #218838;
	}

	.user-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 12px;
		margin-bottom: 16px;
	}

	.user-card {
		background: white;
		padding: 12px;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.user-info h6 {
		color: #333;
		margin-bottom: 8px;
	}

	.user-info p {
		margin: 4px 0;
		font-size: 0.9em;
		color: #666;
	}

	.role-badge {
		padding: 2px 6px;
		border-radius: 3px;
		font-size: 0.8em;
		font-weight: 500;
	}

	.role-badge.用户 {
		background: #e3f2fd;
		color: #1976d2;
	}

	.role-badge.版主 {
		background: #fff3e0;
		color: #f57c00;
	}

	.role-badge.管理员 {
		background: #e8f5e8;
		color: #388e3c;
	}

	.user-actions {
		display: flex;
		gap: 8px;
		margin-top: 12px;
	}

	.user-actions select {
		flex: 1;
		padding: 4px 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.8em;
	}

	.number-display {
		text-align: center;
	}

	.number-grid {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-bottom: 12px;
	}

	.number-item {
		width: 40px;
		height: 40px;
		background: #007bff;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-weight: bold;
	}

	.number-info {
		margin: 0;
		color: #666;
		font-size: 0.9em;
	}

	.control-group {
		margin-bottom: 16px;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #e9ecef;
	}

	.control-group h5 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 0.9em;
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
		.user-grid {
			grid-template-columns: 1fr;
		}

		.add-form {
			flex-direction: column;
			align-items: stretch;
		}

		.user-actions {
			flex-direction: column;
		}
	}
</style>
