# 快速开始指南

## 🚀 环境要求

### 系统要求
- **操作系统**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **Node.js**: 版本 18.0.0 或更高 (推荐 20.x LTS)
- **包管理器**: pnpm (推荐) 或 npm

### 开发工具
- **代码编辑器**: VS Code (推荐) 或其他支持 Svelte 的编辑器
- **浏览器**: Chrome, Firefox, Safari, Edge (最新版本)
- **Git**: 版本控制工具

## 📦 安装步骤

### 1. 安装 Node.js

#### Windows
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本安装包
3. 运行安装程序，按提示完成安装
4. 验证安装：打开命令提示符，运行 `node --version`

#### macOS
```bash
# 使用 Homebrew 安装
brew install node

# 或使用官方安装包
# 访问 https://nodejs.org/ 下载安装
```

#### Linux (Ubuntu/Debian)
```bash
# 使用 apt 安装
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 2. 安装 pnpm (推荐)

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 验证安装
pnpm --version
```

### 3. 克隆项目

```bash
# 克隆项目到本地
git clone <your-repository-url>
cd my-svelte-app

# 或下载 ZIP 文件并解压
```

### 4. 安装项目依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 或使用 npm
npm install
```

## 🏃‍♂️ 运行项目

### 启动开发服务器

```bash
# 启动开发服务器
pnpm dev

# 或使用 npm
npm run dev
```

### 访问应用

开发服务器启动后，在浏览器中打开：
- **本地地址**: http://localhost:5173
- **网络地址**: http://your-ip:5173 (局域网访问)

### 开发模式特性

- **热重载**: 代码修改后自动刷新浏览器
- **错误提示**: 实时显示编译错误和警告
- **源码映射**: 支持浏览器调试
- **快速构建**: 优化的开发构建流程

## 🏗️ 构建和部署

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 或使用 npm
npm run build
```

### 预览生产版本

```bash
# 预览构建结果
pnpm preview

# 或使用 npm
npm run preview
```

### 部署选项

#### 静态托管
- **Netlify**: 拖拽 `dist` 文件夹到 Netlify
- **Vercel**: 连接 Git 仓库自动部署
- **GitHub Pages**: 配置 GitHub Actions 自动部署

#### 服务器部署
```bash
# 将 dist 文件夹上传到服务器
# 配置 Nginx 或 Apache 指向 dist 目录
```

## 🔧 开发工具配置

### VS Code 配置

#### 推荐扩展
- **Svelte for VS Code**: Svelte 语言支持
- **TypeScript Importer**: 自动导入 TypeScript 类型
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Auto Rename Tag**: 自动重命名标签

#### 工作区设置
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "svelte.enable-ts-plugin": true,
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### 浏览器扩展

#### 开发工具
- **Svelte DevTools**: Svelte 组件调试
- **React Developer Tools**: 兼容的组件调试工具
- **Vue.js devtools**: 部分功能兼容

## 📚 学习路径

### 1. 熟悉项目结构
- 查看 `docs/` 目录下的文档
- 了解 `src/` 目录的组织方式
- 阅读 `README.md` 和 `PROJECT_STRUCTURE.md`

### 2. 运行基础教学
- 启动项目，访问首页
- 点击"基础教学"开始学习
- 按照导航顺序学习每个模块

### 3. 探索高级特性
- 完成基础教学后，尝试高级特性
- 查看组件源码，理解实现原理
- 尝试修改代码，观察效果变化

### 4. 动手实践
- 基于现有功能添加新特性
- 创建自己的组件和页面
- 尝试不同的 Svelte 特性组合

## 🐛 常见问题

### 安装问题

#### Node.js 版本过低
```bash
# 错误信息: Node.js version 18.20.8 is not supported
# 解决方案: 升级到 Node.js 20.x 或更高版本
```

#### 依赖安装失败
```bash
# 清除缓存后重试
pnpm store prune
pnpm install

# 或使用 npm
npm cache clean --force
npm install
```

### 运行问题

#### 端口被占用
```bash
# 错误信息: Port 5173 is already in use
# 解决方案: 修改端口或关闭占用进程
pnpm dev --port 3000
```

#### 编译错误
- 检查 TypeScript 语法
- 查看控制台错误信息
- 确保所有依赖已正确安装

### 构建问题

#### 构建失败
```bash
# 检查 TypeScript 错误
pnpm check

# 查看详细错误信息
pnpm build --verbose
```

## 📖 下一步

### 深入学习
- 阅读 [Svelte 官方文档](https://svelte.dev/docs)
- 查看 [Svelte 教程](https://svelte.dev/tutorial)
- 参与 [Svelte 社区讨论](https://github.com/sveltejs/svelte/discussions)

### 项目贡献
- 提交 Issue 报告问题
- 创建 Pull Request 贡献代码
- 改进文档和示例
- 分享使用经验和建议

### 扩展功能
- 添加新的教学模块
- 实现更多高级特性演示
- 优化用户界面和交互体验
- 支持更多设备和平台

---

**现在开始你的 Svelte 学习之旅吧！** 🎉

如果遇到问题，请查看 [故障排除指南](./troubleshooting.md) 或提交 Issue。
