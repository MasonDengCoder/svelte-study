<script lang="ts">
  export let currentIndex: number = 0;
  export let totalCount: number = 1;
  export let progressLabel: string = '学习进度';
  export let tipsTitle: string = '学习建议';
  export let tips: string[] = [
    '按照顺序学习每个模块',
    '动手实践，加深理解',
    '遇到问题时查看文档',
    '多思考，多总结'
  ];
  export let variant: 'default' | 'grid' | 'floating' = 'default';

  // 折叠状态
  let isCollapsed = true;

  // 计算进度百分比
  $: progressPercentage = (currentIndex / totalCount) * 100;

  function toggleCollapsed() {
    isCollapsed = !isCollapsed;
  }
</script>

<div class="learning-tips-container" class:grid-layout={variant === 'grid'} class:floating-layout={variant === 'floating'} class:collapsed={isCollapsed}>
  {#if variant === 'floating'}
    <!-- 折叠按钮 -->
    <button class="collapse-toggle" on:click={toggleCollapsed} aria-label={isCollapsed ? '展开学习提示' : '折叠学习提示'}>
      {#if isCollapsed}
        📚
      {:else}
        ✕
      {/if}
    </button>
  {/if}
  
  {#if !isCollapsed || variant !== 'floating'}
    <div class="learning-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          style="width: {progressPercentage}%"
        ></div>
      </div>
      <p>{progressLabel}: {currentIndex} / {totalCount}</p>
    </div>
    
    <div class="learning-tips">
      <h3>{tipsTitle}</h3>
      <ul>
        {#each tips as tip}
          <li>{tip}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .learning-tips-container {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: relative;
  }

  .learning-tips-container.grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 0;
  }

  .learning-tips-container.grid-layout .learning-progress,
  .learning-tips-container.grid-layout .learning-tips {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .learning-tips-container.floating-layout {
    position: fixed;
    top: 80px;
    left: 16px;
    width: 300px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    z-index: 1000;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  }

  .learning-tips-container.floating-layout.collapsed {
    width: 60px;
    height: 60px;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
  }

  .collapse-toggle {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border: none;
    background: #667eea;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    z-index: 10;
    transition: all 0.2s ease;
  }

  .collapsed .collapse-toggle {
    position: static;
    width: 60px;
    height: 60px;
    font-size: 20px;
    border-radius: 50%;
  }

  .collapse-toggle:hover {
    background: #5a6fd8;
    transform: scale(1.05);
  }

  .learning-progress {
    text-align: center;
    margin-bottom: 30px;
  }

  .learning-tips-container.grid-layout .learning-progress {
    margin-bottom: 0;
  }

  .learning-tips-container.floating-layout .learning-progress {
    margin-bottom: 20px;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .learning-tips-container.grid-layout .progress-bar {
    background: #f0f0f0;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .learning-progress p {
    margin: 0;
    color: #666;
    font-weight: 500;
    font-size: 0.95em;
  }

  .learning-tips {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .learning-tips-container.grid-layout .learning-tips {
    background: white;
    border-left: none;
    border-top: 3px solid #667eea;
  }

  .learning-tips-container.floating-layout .learning-tips {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .learning-tips h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.3em;
  }

  .learning-tips ul {
    margin: 0;
    padding-left: 20px;
    list-style-type: none;
  }

  .learning-tips-container:not(.grid-layout) .learning-tips ul {
    list-style-type: disc;
  }

  .learning-tips li {
    position: relative;
    margin: 8px 0;
    color: #555;
    line-height: 1.5;
    padding: 4px 0;
  }

  .learning-tips-container.grid-layout .learning-tips li::before {
    content: '💡';
    position: absolute;
    left: -20px;
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .learning-tips-container.grid-layout {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .learning-tips-container.grid-layout .learning-progress,
    .learning-tips-container.grid-layout .learning-tips {
      padding: 20px;
    }

    .learning-tips-container {
      padding: 20px;
    }

    .learning-tips h3 {
      font-size: 1.1em;
    }

    .learning-tips-container.floating-layout {
      width: 280px;
    }
  }

  /* Floating 布局的特殊样式 */
  .learning-tips-container.floating-layout .learning-tips h3 {
    font-size: 1.1em;
    margin-bottom: 12px;
  }

  .learning-tips-container.floating-layout .learning-tips li {
    margin: 6px 0;
    font-size: 0.9em;
  }

  .learning-tips-container.floating-layout .learning-progress p {
    font-size: 0.85em;
  }
</style>
