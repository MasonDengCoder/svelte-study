# Svelte 教程统一布局组件

这是一套完整的教程布局组件系统，确保所有教程都使用一致的设计风格和结构。

## 🎯 组件概览

### 核心布局组件
- **TutorialLayout** - 主布局容器
- **TutorialSection** - 内容区域包装器
- **TutorialButton** - 统一按钮组件
- **TutorialInput** - 统一输入组件

## 🏗️ 组件架构

```
TutorialLayout (主容器)
├── tutorial-header (渐变色头部)
├── tutorial-content (内容区域)
│   ├── TutorialSection (内容块)
│   ├── TutorialSection (内容块)
│   └── ...
└── tutorial-footer (底部操作区)
```

## 📱 组件详解

### 1. TutorialLayout - 主布局容器

主布局组件，提供统一的页面结构和样式。

#### 属性
- `title` - 页面标题
- `description` - 页面描述
- `icon` - 头部图标
- `showProgress` - 是否显示进度条
- `currentStep` - 当前步骤
- `totalSteps` - 总步骤数

#### 事件
- `help` - 帮助按钮点击
- `next` - 下一步按钮点击

#### 插槽
- `default` - 主要内容
- `footer` - 底部操作区域

#### 使用示例
```svelte
<script>
  import TutorialLayout from './lib/components/TutorialLayout.svelte';
  
  function handleHelp() {
    console.log('显示帮助信息');
  }
  
  function handleNext() {
    console.log('进入下一步');
  }
</script>

<TutorialLayout
  title="Hello World 演示"
  description="这是你的第一个 Svelte 组件，学习基础语法和结构"
  icon="👋"
  showProgress={true}
  currentStep={1}
  totalSteps={5}
  on:help={handleHelp}
  on:next={handleNext}
>
  <!-- 主要内容 -->
  <div>你的教程内容</div>
  
  <!-- 自定义底部 -->
  <svelte:fragment slot="footer">
    <button>自定义按钮</button>
  </svelte:fragment>
</TutorialLayout>
```

### 2. TutorialSection - 内容区域包装器

用于包装不同的演示部分，提供一致的视觉样式。

#### 属性
- `title` - 区域标题
- `subtitle` - 区域副标题
- `icon` - 区域图标
- `variant` - 样式变体 (default, info, warning, success)

#### 使用示例
```svelte
<script>
  import TutorialSection from './lib/components/TutorialSection.svelte';
</script>

<TutorialSection
  title="基础交互"
  subtitle="学习基本的用户交互功能"
  icon="🖱️"
  variant="default"
>
  <p>这里是区域内容...</p>
</TutorialSection>

<TutorialSection
  title="重要提示"
  icon="⚠️"
  variant="warning"
>
  <p>这是一个警告信息...</p>
</TutorialSection>
```

### 3. TutorialButton - 统一按钮组件

提供多种样式和尺寸的按钮组件。

#### 属性
- `variant` - 按钮样式 (primary, secondary, success, warning, danger)
- `size` - 按钮尺寸 (small, medium, large)
- `disabled` - 是否禁用
- `loading` - 是否显示加载状态
- `icon` - 按钮图标
- `iconPosition` - 图标位置 (left, right)

#### 使用示例
```svelte
<script>
  import TutorialButton from './lib/components/TutorialButton.svelte';
  
  function handleClick() {
    console.log('按钮被点击');
  }
</script>

<TutorialButton
  variant="primary"
  size="medium"
  icon="🚀"
  on:click={handleClick}
>
  开始学习
</TutorialButton>

<TutorialButton
  variant="success"
  size="large"
  icon="✅"
  iconPosition="right"
  on:click={handleClick}
>
  完成
</TutorialButton>
```

### 4. TutorialInput - 统一输入组件

提供多种输入类型和样式的表单组件。

#### 属性
- `type` - 输入类型 (text, email, password, number, etc.)
- `label` - 输入标签
- `placeholder` - 占位符文本
- `value` - 输入值
- `required` - 是否必填
- `disabled` - 是否禁用
- `error` - 错误信息
- `helpText` - 帮助文本
- `variant` - 样式变体 (default, success, warning, error)
- `size` - 尺寸 (small, medium, large)

#### 事件
- `input` - 输入事件
- `change` - 值变化事件
- `focus` - 聚焦事件
- `blur` - 失焦事件

#### 使用示例
```svelte
<script>
  import TutorialInput from './lib/components/TutorialInput.svelte';
  
  let name = '';
  let email = '';
  let password = '';
  
  function handleInput(event) {
    console.log('输入值:', event.detail.value);
  }
</script>

<TutorialInput
  label="用户名"
  placeholder="请输入用户名"
  bind:value={name}
  required={true}
  on:input={handleInput}
/>

<TutorialInput
  type="email"
  label="邮箱"
  placeholder="请输入邮箱地址"
  bind:value={email}
  variant="success"
  helpText="我们将使用此邮箱发送通知"
/>

<TutorialInput
  type="password"
  label="密码"
  placeholder="请输入密码"
  bind:value={password}
  variant="error"
  error="密码长度至少6位"
/>
```

## 🎨 样式系统

### 颜色主题
- **主色调**: `#667eea` (蓝色渐变)
- **成功色**: `#28a745` (绿色)
- **警告色**: `#ffc107` (黄色)
- **错误色**: `#dc3545` (红色)
- **信息色**: `#17a2b8` (青色)

### 间距系统
- **小间距**: 8px, 12px
- **中间距**: 16px, 20px, 24px
- **大间距**: 30px, 40px

### 圆角系统
- **小圆角**: 4px, 6px
- **中圆角**: 8px, 12px
- **大圆角**: 16px, 25px

## 📱 响应式设计

所有组件都支持响应式设计，在不同屏幕尺寸下自动调整：

- **桌面端** (≥768px): 完整功能展示
- **平板端** (≥480px): 适配中等屏幕
- **移动端** (<480px): 移动优先设计

## 🚀 最佳实践

### 1. 组件组合
```svelte
<TutorialLayout title="完整教程" icon="📚">
  <TutorialSection title="第一部分" icon="1️⃣">
    <TutorialInput label="姓名" bind:value={name} />
    <TutorialButton variant="primary" on:click={handleSubmit}>
      提交
    </TutorialButton>
  </TutorialSection>
</TutorialLayout>
```

### 2. 事件处理
```svelte
<script>
  function handleInput(event) {
    const { value } = event.detail;
    // 处理输入值
  }
  
  function handleButtonClick() {
    // 处理按钮点击
  }
</script>

<TutorialInput on:input={handleInput} />
<TutorialButton on:click={handleButtonClick}>
  点击我
</TutorialButton>
```

### 3. 状态管理
```svelte
<script>
  let isLoading = false;
  let hasError = false;
  let errorMessage = '';
</script>

<TutorialButton loading={isLoading} disabled={hasError}>
  {isLoading ? '加载中...' : '提交'}
</TutorialButton>

<TutorialInput
  variant={hasError ? 'error' : 'default'}
  error={errorMessage}
/>
```

## 🔧 自定义和扩展

### 1. 样式覆盖
```svelte
<style>
  :global(.tutorial-layout) {
    --primary-color: #your-color;
    --border-radius: 20px;
  }
</style>
```

### 2. 主题切换
```svelte
<script>
  let isDarkMode = false;
</script>

<div class:dark-mode={isDarkMode}>
  <TutorialLayout>
    <!-- 内容 -->
  </TutorialLayout>
</div>

<style>
  .dark-mode {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
</style>
```

## 📄 许可证

MIT License

---

**使用这套布局组件，让您的教程更加专业和一致！** 🎉
