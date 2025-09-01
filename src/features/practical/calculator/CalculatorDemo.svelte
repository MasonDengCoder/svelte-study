<script lang="ts">
  import DemoContainer from '@/components/DemoContainer.svelte';
  import Counter from '@/shared/ui/Counter.svelte'
</script> 

<DemoContainer 
  title="计算器应用"
  description="功能完整的计算器应用，展示Svelte 5的响应式特性和组件设计能力"
>
  <div slot="demo" class="calculator-demo-area">
    <Counter />
  </div>

  <div slot="controls">
    <div class="control-info">
      <p><strong>操作说明：</strong></p>
      <ul>
        <li>点击数字键输入数字</li>
        <li>点击运算符进行计算</li>
        <li>按等号显示结果</li>
        <li>C键全清除，CE键清除当前输入</li>
      </ul>
    </div>
  </div>

  <div slot="explanation">
    <p><strong>功能特性：</strong></p>
    <ul>
      <li><strong>基本运算：</strong>支持加法、减法、乘法、除法四则运算</li>
      <li><strong>历史记录：</strong>实时显示计算过程和历史记录</li>
      <li><strong>小数支持：</strong>支持小数点输入和小数运算</li>
      <li><strong>清除功能：</strong>C键全清除，CE键清除当前输入</li>
      <li><strong>连续运算：</strong>支持多步骤连续计算操作</li>
      <li><strong>响应式设计：</strong>适配不同屏幕尺寸，移动端友好</li>
    </ul>
    
    <p><strong>技术要点：</strong></p>
    <ul>
      <li>使用Svelte 5的 <code>$state</code> 进行状态管理</li>
      <li>CSS Grid布局实现按钮网格</li>
      <li>事件处理和响应式数据绑定</li>
      <li>媒体查询实现响应式设计</li>
      <li>防除零处理和错误边界</li>
    </ul>
  </div>

  <div slot="code">
    <pre><code>&lt;script&gt;
  // 使用 Svelte 5 状态管理
  let display = $state('0');
  let previousValue = $state(null);
  let operation = $state(null);
  let history = $state('');
  
  function inputNumber(num) &#123;
    if (display === '0') &#123;
      display = num.toString();
    &#125; else &#123;
      display = display + num;
    &#125;
  &#125;
  
  function inputOperation(nextOperation) &#123;
    if (previousValue === null) &#123;
      previousValue = parseFloat(display);
    &#125; else if (operation) &#123;
      performCalculation();
    &#125;
    
    operation = nextOperation;
    history = `$&#123;display&#125; $&#123;getOperationSymbol(nextOperation)&#125;`;
  &#125;
  
  function calculate() &#123;
    if (previousValue !== null && operation) &#123;
      performCalculation();
      history = `$&#123;history&#125; $&#123;display&#125; =`;
      operation = null;
      previousValue = null;
    &#125;
  &#125;
&lt;/script&gt;</code></pre>
  </div>
</DemoContainer>

<style>
  .calculator-demo-area {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 20px;
  }

  .control-info {
    background: #f8f9fa;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }

  .control-info p {
    margin: 0 0 8px 0;
    font-weight: 600;
    color: #333;
  }

  .control-info ul {
    margin: 0;
    padding-left: 16px;
    color: #666;
    font-size: 0.9em;
    line-height: 1.6;
  }

  .control-info li {
    margin-bottom: 4px;
  }

  code {
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.85em;
    background: #f8f9fa;
    padding: 2px 4px;
    border-radius: 3px;
    color: #e83e8c;
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

  pre code {
    background: none;
    padding: 0;
    color: #333;
  }
</style>
