# 故障排除指南

## 🚨 常见问题及解决方案

### 环境配置问题

#### Node.js 版本不兼容

**问题描述**: 
```
You are using Node.js 18.20.8. Vite requires Node.js version 20.19+ or 22.12+.
```

**解决方案**:
1. **升级 Node.js** (推荐)
   ```bash
   # 使用 nvm 管理 Node.js 版本
   nvm install 20
   nvm use 20
   
   # 或直接下载安装
   # 访问 https://nodejs.org/ 下载 LTS 版本
   ```

2. **使用兼容模式** (临时方案)
   ```javascript
   // svelte.config.js
   export default {
     compilerOptions: {
       componentApi: '4'  // 使用 Svelte 4 兼容模式
     }
   }
   ```

#### 依赖安装失败

**问题描述**: 
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/package.json
```

**解决方案**:
```bash
# 清除缓存
pnpm store prune
# 或
npm cache clean --force

# 删除 node_modules 和 lock 文件
rm -rf node_modules pnpm-lock.yaml
# 或
rm -rf node_modules package-lock.json

# 重新安装
pnpm install
# 或
npm install
```

### 编译错误

#### Svelte 组件 API 错误

**问题描述**:
```
Uncaught Svelte error: component_api_invalid_new
Attempted to instantiate src/pages/App.svelte with `new App`, which is no longer valid in Svelte 5.
```

**解决方案**:
```typescript
// src/main.ts - 使用 mount API
import { mount } from 'svelte'
import App from './pages/App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!
})
```

#### TypeScript 类型错误

**问题描述**:
```
Type 'string' is not assignable to type 'number'
```

**解决方案**:
```typescript
// 添加类型注解
let count: number = 0;

// 或使用类型断言
let value = input.value as number;

// 或使用类型守卫
if (typeof input.value === 'number') {
  count = input.value;
}
```

#### 导入路径错误

**问题描述**:
```
Cannot find module '../features/advanced/MainDemo.svelte'
```

**解决方案**:
1. **检查文件路径**: 确保文件确实存在
2. **检查导入语法**: 使用正确的相对路径
3. **检查文件扩展名**: 确保包含 `.svelte` 扩展名

### 运行时错误

#### 端口被占用

**问题描述**:
```
Port 5173 is already in use
```

**解决方案**:
```bash
# 使用不同端口
pnpm dev --port 3000

# 或查找并关闭占用进程
lsof -ti:5173 | xargs kill -9
```

#### 热重载不工作

**问题描述**: 代码修改后浏览器不自动刷新

**解决方案**:
1. **检查文件监听**: 确保文件在 src 目录下
2. **重启开发服务器**: 停止并重新启动 `pnpm dev`
3. **检查浏览器控制台**: 查看是否有错误信息

#### 样式不生效

**问题描述**: CSS 样式没有正确应用

**解决方案**:
1. **检查 CSS 导入**: 确保在组件中正确导入样式
2. **检查类名**: 确保 CSS 类名与 HTML 中的一致
3. **检查作用域**: 使用 `:global()` 包装全局样式

### 构建问题

#### 构建失败

**问题描述**:
```
Build failed with errors
```

**解决方案**:
```bash
# 检查 TypeScript 错误
pnpm check

# 查看详细构建信息
pnpm build --verbose

# 清理构建缓存
rm -rf dist
pnpm build
```

#### 生产版本问题

**问题描述**: 开发环境正常，生产版本有问题

**解决方案**:
1. **检查环境变量**: 确保生产环境配置正确
2. **检查依赖**: 确保所有依赖都正确安装
3. **检查构建输出**: 查看 `dist` 目录是否正确生成

### 性能问题

#### 开发服务器启动慢

**问题描述**: `pnpm dev` 启动时间过长

**解决方案**:
```bash
# 使用快速启动模式
pnpm dev --force

# 或清理依赖缓存
pnpm store prune
pnpm install
```

#### 页面加载慢

**问题描述**: 页面首次加载时间过长

**解决方案**:
1. **代码分割**: 使用动态导入分割代码
2. **懒加载**: 实现组件的懒加载
3. **优化依赖**: 检查并移除不必要的依赖

### 浏览器兼容性

#### 现代浏览器特性不支持

**问题描述**: 在某些浏览器中功能不正常

**解决方案**:
1. **添加 polyfill**: 为不支持的特性添加兼容代码
2. **检查浏览器支持**: 使用 `@babel/preset-env` 配置
3. **渐进增强**: 确保基本功能在所有浏览器中可用

### 调试技巧

#### 使用浏览器开发者工具

1. **控制台日志**: 使用 `console.log()` 输出调试信息
2. **断点调试**: 在代码中设置断点
3. **网络面板**: 检查网络请求和资源加载
4. **元素面板**: 检查 DOM 结构和样式

#### 使用 Svelte DevTools

1. **安装扩展**: 在浏览器中安装 Svelte DevTools
2. **组件树**: 查看组件层次结构
3. **状态监控**: 监控组件状态变化
4. **性能分析**: 分析组件渲染性能

#### 使用 TypeScript 检查

```bash
# 检查类型错误
pnpm check

# 或使用 tsc 直接检查
npx tsc --noEmit
```

### 预防措施

#### 代码质量

1. **使用 ESLint**: 配置代码质量检查规则
2. **使用 Prettier**: 统一代码格式
3. **类型检查**: 启用严格的 TypeScript 检查
4. **测试覆盖**: 编写单元测试和集成测试

#### 开发流程

1. **版本控制**: 使用 Git 管理代码版本
2. **分支管理**: 使用功能分支开发新功能
3. **代码审查**: 提交前进行代码审查
4. **持续集成**: 配置自动化测试和构建

### 获取帮助

#### 官方资源

- **Svelte 文档**: https://svelte.dev/docs
- **Svelte 教程**: https://svelte.dev/tutorial
- **Svelte 社区**: https://github.com/sveltejs/svelte/discussions

#### 社区支持

- **GitHub Issues**: 在项目仓库提交 Issue
- **Stack Overflow**: 搜索相关问题或提问
- **Discord 社区**: 加入 Svelte Discord 服务器

#### 本地调试

```bash
# 启用详细日志
DEBUG=* pnpm dev

# 检查依赖树
pnpm list

# 检查构建配置
pnpm build --debug
```

---

**如果问题仍然存在，请提供详细的错误信息和环境配置，我们将尽力帮助您解决！** 🛠️
