# 开发规范

## 📋 代码规范

### 文件命名规范

#### 组件文件
- **Svelte 组件**: 使用 PascalCase，如 `NavigationMenu.svelte`
- **TypeScript 文件**: 使用 camelCase，如 `navigationStore.ts`
- **CSS 文件**: 使用 kebab-case，如 `navigation-menu.css`

#### 目录命名
- **功能模块**: 使用 kebab-case，如 `tutorials/`, `advanced/`
- **共享资源**: 使用 camelCase，如 `components/`, `ui/`
- **页面组件**: 使用 camelCase，如 `pages/`

### 代码风格

#### Svelte 组件结构
```svelte
<script lang="ts">
  // 1. 导入语句
  import Component from './Component.svelte';
  
  // 2. 类型定义
  interface Props {
    title: string;
    count?: number;
  }
  
  // 3. 属性定义
  export let title: string;
  export let count = 0;
  
  // 4. 响应式声明
  $: doubled = count * 2;
  
  // 5. 函数定义
  function handleClick() {
    count += 1;
  }
</script>

<!-- 6. HTML 模板 -->
<div class="component">
  <h1>{title}</h1>
  <p>Count: {count}</p>
  <button on:click={handleClick}>Increment</button>
</div>

<!-- 7. 样式定义 -->
<style>
  .component {
    padding: 1rem;
    border: 1px solid #ccc;
  }
</style>
```

#### TypeScript 规范
```typescript
// 使用明确的类型注解
let count: number = 0;
let name: string = '';

// 使用接口定义对象结构
interface User {
  id: number;
  name: string;
  email: string;
}

// 使用类型别名
type Status = 'loading' | 'success' | 'error';

// 使用泛型
function createStore<T>(initial: T) {
  // 实现
}
```

### 组件设计原则

#### 单一职责
- 每个组件只负责一个功能
- 避免组件过于复杂
- 合理拆分大型组件

#### 可复用性
- 设计通用的组件接口
- 使用插槽传递内容
- 支持主题和样式自定义

#### 可维护性
- 清晰的组件结构
- 良好的命名规范
- 完整的类型定义

## 🏗️ 项目结构规范

### 目录组织
```
src/
├── pages/                    # 页面级组件
│   └── App.svelte          # 主应用组件
├── features/                # 功能模块
│   ├── tutorials/          # 基础教学模块
│   └── advanced/           # 高级特性模块
├── shared/                  # 共享资源
│   ├── components/         # 通用组件
│   └── ui/                 # 基础UI组件
├── assets/                  # 静态资源
├── app.css                  # 全局样式
└── main.ts                  # 应用入口
```

### 导入路径规范
```typescript
// 使用相对路径导入
import Component from '../shared/components/Component.svelte';

// 避免深层嵌套
// ❌ 错误
import Component from '../../../../lib/components/Component.svelte';

// ✅ 正确
import Component from '../shared/components/Component.svelte';
```

## 🎨 样式规范

### CSS 类命名
```css
/* 使用 BEM 命名规范 */
.component { }
.component__element { }
.component--modifier { }

/* 示例 */
.navigation { }
.navigation__item { }
.navigation__item--active { }
.navigation__item--disabled { }
```

### 响应式设计
```css
/* 移动优先设计 */
.component {
  padding: 1rem;
}

/* 平板端 */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
  }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
  }
}
```

### 主题系统
```css
/* 使用 CSS 变量定义主题 */
:root {
  --primary-color: #667eea;
  --secondary-color: #ff3e00;
  --text-color: #333;
  --bg-color: #fff;
}

/* 深色主题 */
[data-theme="dark"] {
  --primary-color: #8b9df9;
  --text-color: #fff;
  --bg-color: #1a1a1a;
}
```

## 📝 文档规范

### 组件文档
```svelte
<!--
  @component NavigationMenu
  @description 主导航菜单组件
  @example
    <NavigationMenu 
      currentPath="/tutorials"
      showNavigation={true}
      on:navigate={handleNavigation}
    />
-->
<script lang="ts">
  // 组件实现
</script>
```

### README 文件
- 每个功能模块都要有 README.md
- 包含组件说明、使用方法、示例代码
- 使用清晰的标题和结构
- 提供完整的 API 文档

## 🧪 测试规范

### 测试覆盖
- 核心功能必须有测试
- 测试覆盖率不低于 80%
- 包含单元测试和集成测试

### 测试文件命名
```
Component.svelte          # 组件文件
Component.test.ts         # 测试文件
Component.spec.ts         # 规范文件
```

### 测试示例
```typescript
import { render, fireEvent } from '@testing-library/svelte';
import Component from './Component.svelte';

describe('Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(Component, { props: { title: 'Test' } });
    expect(getByText('Test')).toBeInTheDocument();
  });
  
  it('should handle click events', async () => {
    const { getByRole } = render(Component);
    const button = getByRole('button');
    
    await fireEvent.click(button);
    // 验证点击后的状态
  });
});
```

## 🔄 版本控制规范

### Git 提交规范
```bash
# 使用约定式提交
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 分支管理
```
main                    # 主分支
├── develop            # 开发分支
├── feature/tutorials  # 功能分支
├── bugfix/navigation  # 修复分支
└── release/v1.0.0     # 发布分支
```

### 代码审查
- 所有代码必须经过审查
- 使用 Pull Request 流程
- 确保代码质量和一致性

## 🚀 性能优化

### 代码分割
```typescript
// 使用动态导入实现懒加载
const Component = await import('./Component.svelte');
```

### 组件优化
- 避免不必要的重新渲染
- 使用 `{#key}` 优化列表渲染
- 合理使用 `onMount` 和 `onDestroy`

### 资源优化
- 压缩图片和字体文件
- 使用 CDN 加速静态资源
- 实现资源的预加载

## 🔒 安全规范

### 输入验证
```typescript
// 验证用户输入
function validateInput(input: string): boolean {
  return input.length > 0 && input.length <= 100;
}
```

### XSS 防护
```svelte
<!-- 使用 {text} 而不是 {@html} -->
<p>{userInput}</p>

<!-- 只在必要时使用 {@html} -->
{@html sanitizedHtml}
```

### 权限控制
```typescript
// 检查用户权限
function checkPermission(action: string): boolean {
  return user.permissions.includes(action);
}
```

## 📊 质量检查

### 代码检查工具
```json
// package.json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.svelte",
    "format": "prettier --write src",
    "type-check": "svelte-check --tsconfig ./tsconfig.app.json",
    "test": "vitest",
    "build": "vite build"
  }
}
```

### 提交前检查
```bash
# 使用 husky 配置 Git hooks
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

## 🤝 团队协作

### 代码审查清单
- [ ] 代码符合项目规范
- [ ] 功能实现完整
- [ ] 测试覆盖充分
- [ ] 文档更新及时
- [ ] 性能影响评估

### 沟通规范
- 使用清晰的语言描述问题
- 提供完整的上下文信息
- 及时响应团队成员的反馈
- 积极参与技术讨论

---

**遵循这些规范，让我们的代码更加专业和可维护！** 🎯
