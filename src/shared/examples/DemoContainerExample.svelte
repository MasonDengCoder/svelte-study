<script lang="ts">
  import DemoContainer from '../../components/DemoContainer.svelte';
  
  let count = 0;
  let message = 'Hello World!';
  let isVisible = true;
  let selectedColor = '#667eea';

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }

  function toggleVisibility() {
    isVisible = !isVisible;
  }

  function randomMessage() {
    const messages = [
      'Hello World!',
      'Svelte is awesome!',
      'Demo Container rocks!',
      'Keep coding!',
      'Stay creative!'
    ];
    message = messages[Math.floor(Math.random() * messages.length)];
  }
</script>

<div class="examples-container">
  <h2>DemoContainer 使用示例</h2>
  
  <!-- 基础示例 -->
  <DemoContainer 
    title="基础计算器演示"
    description="这是一个基础的计算器演示，展示了左侧演示内容和右侧操作控制的布局"
  >
    <div slot="demo" class="counter-demo">
      <div class="display">
        <h3>计数值: {count}</h3>
        <div class="status" class:positive={count > 0} class:negative={count < 0}>
          {count > 0 ? '正数' : count < 0 ? '负数' : '零'}
        </div>
      </div>
    </div>

    <div slot="controls">
      <button on:click={increment}>增加 (+1)</button>
      <button on:click={decrement}>减少 (-1)</button>
      <button class="secondary" on:click={reset}>重置</button>
    </div>

    <div slot="explanation">
      <p>这个演示展示了：</p>
      <ul>
        <li>响应式数据绑定</li>
        <li>事件处理机制</li>
        <li>条件样式应用</li>
        <li>组件状态管理</li>
      </ul>
    </div>

    <div slot="code">
      <pre><code>{`let count = 0;

function increment() {
  count += 1;
}

function decrement() {
  count -= 1;
}`}</code></pre>
    </div>
  </DemoContainer>

  <!-- 紧凑模式示例 -->
  <DemoContainer 
    title="文本演示"
    description="使用紧凑模式展示文本操作"
    variant="compact"
  >
    <div slot="demo" class="text-demo">
      {#if isVisible}
        <div class="message-display" style="color: {selectedColor}">
          {message}
        </div>
      {:else}
        <div class="hidden-message">消息已隐藏</div>
      {/if}
    </div>

    <div slot="controls">
      <button on:click={toggleVisibility}>
        {isVisible ? '隐藏' : '显示'}
      </button>
      <button on:click={randomMessage}>随机消息</button>
      
      <div class="color-picker">
        <label for="color-input">颜色：</label>
        <input id="color-input" type="color" bind:value={selectedColor} />
      </div>
    </div>

    <div slot="explanation">
      <p>演示了条件渲染和动态样式绑定。</p>
    </div>
  </DemoContainer>

  <!-- 全宽模式示例 -->
  <DemoContainer 
    title="全宽布局演示"
    description="适合简单演示的全宽模式"
    variant="fullwidth"
    demoHeight="200px"
  >
    <div slot="demo" class="fullwidth-demo">
      <div class="animated-box" style="background: {selectedColor}"></div>
    </div>

    <div slot="controls">
      <button on:click={() => selectedColor = '#ff6b6b'}>红色</button>
      <button on:click={() => selectedColor = '#4ecdc4'}>青色</button>
      <button on:click={() => selectedColor = '#45b7d1'}>蓝色</button>
    </div>

    <div slot="explanation">
      <p>全宽模式适合简单的演示场景。</p>
    </div>
  </DemoContainer>
</div>

<style>
  .examples-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .examples-container h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }

  .counter-demo {
    text-align: center;
    padding: 20px;
  }

  .display h3 {
    margin: 0 0 10px 0;
    font-size: 2em;
    color: #333;
  }

  .status {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 500;
    background: #f8f9fa;
    color: #666;
    display: inline-block;
  }

  .status.positive {
    background: #d4edda;
    color: #155724;
  }

  .status.negative {
    background: #f8d7da;
    color: #721c24;
  }

  .text-demo {
    text-align: center;
    padding: 30px 20px;
  }

  .message-display {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 10px;
    transition: all 0.3s ease;
  }

  .hidden-message {
    color: #999;
    font-style: italic;
  }

  .color-picker {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .color-picker label {
    font-size: 0.9em;
    color: #666;
  }

  .color-picker input[type="color"] {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .fullwidth-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .animated-box {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .animated-box:hover {
    transform: scale(1.1) rotate(5deg);
  }

  pre {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 12px;
    margin: 0;
    font-size: 0.85em;
    overflow-x: auto;
  }

  code {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #333;
  }
</style>
