# Svelte 高级特性演示项目

这是一个完整的 Svelte 高级特性演示项目，包含了我们在教程中讨论的所有高级功能。

## 🚀 项目特性

### 1. 自定义 Actions
- **长按检测**: 实现长按触发事件的 Action
- **拖拽功能**: 可拖拽元素的 Action，支持位置追踪

### 2. 生命周期钩子
- 完整的生命周期演示，包括 `onMount`、`onDestroy`、`beforeUpdate`、`afterUpdate` 和 `tick`
- 实时状态显示和控制台日志

### 3. 高级 Stores
- **自定义 Store 类**: 计数器 Store 带多种操作方法
- **异步 Store**: 模拟 API 调用的异步状态管理
- **持久化 Store**: 自动保存到 localStorage 的设置 Store
- **派生 Store**: 基于计数器状态的派生计算

### 4. 高级动画
- **自定义过渡**: 支持位置、缩放、透明度的自定义过渡
- **弹性过渡**: 使用弹性缓动函数的动画效果
- **弹跳过渡**: 弹跳效果的进入/退出动画
- **交错动画**: 列表项目的交错动画效果

### 5. 状态机
- 完整的工作流状态机实现
- 状态转换规则和验证
- 状态历史追踪
- 可视化状态指示器

### 6. 复合组件
- **Accordion 组件**: 支持单选和多选模式
- **Context API 使用**: 组件间状态共享
- **插槽系统**: 灵活的内容传递

## 📁 项目结构

```
src/
├── lib/
│   ├── advanced/
│   │   ├── actions/           # Actions 演示
│   │   │   ├── LongPressDemo.svelte
│   │   │   ├── DraggableDemo.svelte
│   │   │   └── index.svelte
│   │   ├── lifecycle/         # 生命周期演示
│   │   │   └── LifecycleDemo.svelte
│   │   ├── stores/            # Stores 演示
│   │   │   └── AdvancedStoresDemo.svelte
│   │   ├── animations/        # 动画演示
│   │   │   └── AdvancedAnimationsDemo.svelte
│   │   ├── state-machines/    # 状态机演示
│   │   │   └── StateMachineDemo.svelte
│   │   ├── components/        # 复合组件演示
│   │   │   ├── Accordion.svelte
│   │   │   └── AccordionItem.svelte
│   │   ├── MainDemo.svelte    # 主演示入口
│   │   ├── index.ts           # 导出索引
│   │   └── README.md          # 演示说明
│   └── Counter.svelte         # 基础计数器组件
├── App.svelte                 # 主应用组件
└── main.ts                    # 应用入口
```

## 🎯 使用方法

### 启动项目
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 查看演示
1. 启动项目后，在浏览器中打开应用
2. 点击"查看高级特性演示"按钮
3. 使用顶部导航切换不同的演示模块
4. 每个演示都可以独立交互和测试

## 🔧 技术要点

### Actions 实现
- 使用 `use:` 指令绑定自定义 Action
- Action 返回 `destroy` 和 `update` 方法
- 支持参数传递和动态更新

### 生命周期管理
- 正确使用 `onMount` 进行初始化
- 在 `onDestroy` 中清理资源
- 使用 `tick` 等待 DOM 更新

### Store 模式
- 封装 Store 创建逻辑
- 支持异步操作和错误处理
- 实现数据持久化

### 动画系统
- 自定义 CSS 过渡函数
- 使用 Svelte 内置缓动函数
- 支持复杂的动画组合

### 状态机设计
- 状态转换规则定义
- 事件驱动的状态更新
- 状态历史追踪

### 组件通信
- 使用 Context API 共享状态
- 插槽系统传递内容
- 事件系统处理交互

## 📚 学习建议

1. **循序渐进**: 按照导航顺序学习各个模块
2. **动手实践**: 修改代码参数，观察效果变化
3. **理解原理**: 深入理解每个特性的实现原理
4. **组合使用**: 尝试将不同特性组合使用
5. **扩展功能**: 基于现有演示添加新功能

## 🐛 故障排除

### 常见问题
1. **依赖问题**: 确保所有依赖已正确安装
2. **编译错误**: 检查 Svelte 语法是否正确
3. **样式问题**: 确保 CSS 类名和选择器正确

### 调试技巧
1. 使用浏览器开发者工具查看控制台输出
2. 检查网络请求和资源加载
3. 使用 Svelte DevTools 调试组件状态

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个演示项目！

## 📄 许可证

MIT License
