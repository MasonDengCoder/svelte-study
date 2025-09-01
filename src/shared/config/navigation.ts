/**
 * 统一的导航配置文件
 * 所有导航组件都从这里获取数据，确保一致性
 */

// 导航项目的类型定义
export interface NavigationItem {
  title: string;
  icon: string;
  description: string;
  path?: string;
  color?: string;
  children?: Record<string, NavigationChild>;
}

export interface NavigationChild {
  title: string;
  description: string;
  path: string;
  icon?: string;
}

// 路径信息类型
export interface PathInfo {
  title: string;
  icon: string;
  color?: string;
}

// 主导航配置
export const navigationConfig: Record<string, NavigationItem> = {
  'welcome': {
    title: '欢迎页面',
    icon: '🏠',
    description: '项目首页和导航',
    path: '',
    color: '#667eea'
  },
  'tutorials': {
    title: '基础教学',
    icon: '📚',
    description: '从零开始学习 Svelte',
    path: '/tutorials',
    color: '#28a745',
    children: {
      'hello-world': {
        title: 'Hello World',
        description: '第一个 Svelte 组件',
        path: '/tutorials/hello-world',
        icon: '👋'
      },
      'reactive-data': {
        title: '响应式数据',
        description: '数据绑定和响应式系统',
        path: '/tutorials/reactive-data',
        icon: '⚡'
      },
      'conditional-rendering': {
        title: '条件渲染',
        description: 'if/else 条件和动态内容',
        path: '/tutorials/conditional-rendering',
        icon: '🔀'
      },
      'list-rendering': {
        title: '列表渲染',
        description: 'each 循环和数组操作',
        path: '/tutorials/list-rendering',
        icon: '📋'
      },
      'event-handling': {
        title: '事件处理',
        description: '用户交互和事件系统',
        path: '/tutorials/event-handling',
        icon: '🖱️'
      }
    }
  },
  'advanced': {
    title: '高级特性',
    icon: '🚀',
    description: '探索 Svelte 的强大功能',
    path: '/advanced',
    color: '#ff3e00',
    children: {
      'actions': {
        title: '自定义 Actions',
        description: 'DOM 操作和自定义指令',
        path: '/advanced/actions',
        icon: '⚙️'
      },
      'lifecycle': {
        title: '生命周期钩子',
        description: '组件生命周期管理',
        path: '/advanced/lifecycle',
        icon: '🔄'
      },
      'stores': {
        title: '高级 Stores',
        description: '状态管理和数据流',
        path: '/advanced/stores',
        icon: '🏪'
      },
      'animations': {
        title: '高级动画',
        description: '过渡效果和动画系统',
        path: '/advanced/animations',
        icon: '🎬'
      },
      'state-machines': {
        title: '状态机',
        description: '复杂状态流程管理',
        path: '/advanced/state-machines',
        icon: '🤖'
      },
      'components': {
        title: '复合组件',
        description: '组件组合和通信模式',
        path: '/advanced/components',
        icon: '🧩'
      }
    }
  },
  'practical': {
    title: '应用实操',
    icon: '🛠️',
    description: '实际应用案例和项目演示',
    path: '/practical',
    color: '#6f42c1',
    children: {
      'calculator': {
        title: '计算器应用',
        description: '功能完整的计算器实现',
        path: '/practical/calculator',
        icon: '🧮'
      }
    }
  },
  'counter': {
    title: '基础计算器',
    icon: '🔢',
    description: '简单的计算器组件演示',
    path: '/counter',
    color: '#17a2b8'
  }
};

// 为快速导航生成简化的配置
export const quickNavItems = Object.entries(navigationConfig)
  .filter(([_, item]) => item.path !== undefined)
  .map(([id, item]) => ({
    id,
    title: item.title,
    icon: item.icon,
    description: item.description,
    path: item.path || '',
    color: item.color || '#6c757d'
  }));

// 路径映射表（用于面包屑导航）
export const pathMap: Record<string, PathInfo> = {};

// 自动生成路径映射
function generatePathMap() {
  // 添加根路径
  pathMap[''] = { 
    title: navigationConfig.welcome.title, 
    icon: navigationConfig.welcome.icon,
    color: navigationConfig.welcome.color
  };
  
  // 添加主要部分
  Object.entries(navigationConfig).forEach(([key, item]) => {
    if (item.path !== undefined) {
      const pathKey = item.path.replace(/^\//, ''); // 移除开头的斜杠
      if (pathKey) {
        pathMap[pathKey] = {
          title: item.title,
          icon: item.icon,
          color: item.color
        };
      }
    }
    
    // 对于没有明确路径的主要部分，也添加到映射中
    pathMap[key] = {
      title: item.title,
      icon: item.icon,
      color: item.color
    };
    
    // 添加子项
    if (item.children) {
      Object.entries(item.children).forEach(([childKey, child]) => {
        const childPathKey = child.path.split('/').pop() || childKey;
        pathMap[childPathKey] = {
          title: child.title,
          icon: child.icon || '•',
          color: item.color
        };
      });
    }
  });
}

// 初始化路径映射
generatePathMap();

// 导航工具函数
export function getNavigationPath(section: NavigationItem, sectionKey: string): string {
  // 如果有显式的路径，使用它
  if (section.path !== undefined) return section.path;
  
  // 对于特殊情况
  if (sectionKey === 'welcome') return '';
  
  // 默认情况：使用 sectionKey 作为路径
  return `/${sectionKey}`;
}

export function isPathActive(currentPath: string, targetPath: string): boolean {
  if (!targetPath && (!currentPath || currentPath === '/')) return true;
  if (!currentPath) return targetPath === '' || targetPath === '/';
  
  // 去除路径前缀斜杠进行比较
  const normalizedCurrent = currentPath.replace(/^\//, '');
  const normalizedTarget = targetPath.replace(/^\//, '');
  
  // 完全匹配
  if (normalizedCurrent === normalizedTarget) return true;
  
  // 对于根路径的特殊处理
  if (targetPath === '' && (currentPath === '' || currentPath === '/')) return true;
  if (targetPath === '/' && (currentPath === '' || currentPath === '/')) return true;
  
  return false;
}

export function isParentSectionActive(section: NavigationItem, sectionKey: string, currentPath: string): boolean {
  if (section.children) {
    // 检查是否有子项被激活
    const hasActiveChild = Object.values(section.children).some(child => 
      isPathActive(currentPath, child.path)
    );
    if (hasActiveChild) return true;
    
    // 检查是否访问的是这个部分的主页
    const sectionPath = `/${sectionKey}`;
    return isPathActive(currentPath, sectionPath) || isPathActive(currentPath, sectionKey);
  }
  
  // 对于没有子项的部分，检查路径匹配
  const targetPath = getNavigationPath(section, sectionKey);
  return isPathActive(currentPath, targetPath);
}

// 生成面包屑导航
export function generateBreadcrumbs(currentPath: string) {
  if (!currentPath) return [{ title: '首页', icon: '🏠', path: '', isLast: true }];
  
  const segments = currentPath.split('/').filter(Boolean);
  const result = [{ title: '首页', icon: '🏠', path: '', isLast: false }];
  
  let buildPath = '';
  segments.forEach((segment, index) => {
    buildPath += `/${segment}`;
    const pathInfo = pathMap[segment];
    if (pathInfo) {
      result.push({
        title: pathInfo.title,
        icon: pathInfo.icon,
        path: buildPath,
        isLast: index === segments.length - 1
      });
    }
  });
  
  return result;
}

// 应用视图配置（用于主应用路由）
export const viewConfig = {
  welcome: { name: '欢迎页面', component: 'welcome' },
  tutorial: { name: '基础教学', component: 'tutorial' },
  advanced: { name: '高级特性', component: 'advanced' },
  practical: { name: '应用实操', component: 'practical' },
  counter: { name: '基础计算器', component: 'counter' }
};

// 路由解析函数
export function resolveRoute(path: string): string {
  if (!path || path === '/') return 'welcome';
  
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  switch (firstSegment) {
    case 'tutorials':
      return 'tutorial';
    case 'advanced':
      return 'advanced';
    case 'practical':
      return 'practical';
    case 'counter':
      return 'counter';
    default:
      return 'welcome';
  }
}
