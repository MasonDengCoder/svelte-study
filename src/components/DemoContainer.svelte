<script lang="ts">
  export let title: string = "";
  export let description: string = "";
  export let variant: "default" | "compact" | "fullwidth" = "default";
  export let demoHeight: string = "auto";
  export let showBorder: boolean = true;
</script>

<div
  class="demo-container"
  class:compact={variant === "compact"}
  class:fullwidth={variant === "fullwidth"}
>
  {#if title}
    <div class="demo-header">
      <h3 class="demo-title">{title}</h3>
      {#if description}
        <p class="demo-description">{description}</p>
      {/if}
    </div>
  {/if}

  <div class="demo-content" class:with-border={showBorder}>
    <!-- 左侧：演示内容区域 -->
    <div class="demo-preview" style="min-height: {demoHeight}">
      <slot name="demo">
        <div class="placeholder">
          <p>请在 demo 插槽中添加演示内容</p>
        </div>
      </slot>
    </div>

    <!-- 右侧：操作按钮和说明区域 -->
    <div class="demo-controls">
      <div class="controls-section">
        <h4>操作控制</h4>
        <div class="controls-content">
          <slot name="controls">
            <p class="no-controls">暂无可操作的控件</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
  <div class="demo-footer flex flex-row p-4">
    {#if $$slots.explanation}
      <div class="explanation-section flex-1">
        <h4>说明</h4>
        <div class="explanation-content">
          <slot name="explanation"></slot>
        </div>
      </div>
    {/if}

    {#if $$slots.code}
      <div class="code-section flex-1">
        <h4>代码示例</h4>
        <div class="code-content">
          <slot name="code"></slot>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .demo-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 20px;
  }

  .demo-header {
    padding: 20px 24px 0 24px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0;
  }

  .demo-title {
    margin: 0 0 8px 0;
    font-size: 1.4em;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .demo-description {
    margin: 0 0 20px 0;
    color: #666;
    font-size: 0.95em;
    line-height: 1.5;
  }

  .demo-content {
    display: grid;
    grid-template-columns: 1fr 450px;
    min-height: 400px;
  }

  .demo-content.with-border .demo-preview {
    border-right: 1px solid #f0f0f0;
  }

  .demo-preview {
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fafbfc;
    position: relative;
  }

  .placeholder {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 40px 20px;
  }

  .demo-controls {
    padding: 24px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
  }

  .demo-footer {
    display: flex;
    gap: 20px;
  }

  .controls-section,
  .explanation-section,
  .code-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    border-left: 3px solid #667eea;
  }

  .controls-section h4,
  .explanation-section h4,
  .code-section h4 {
    margin: 0 0 12px 0;
    font-size: 1.1em;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .controls-section h4::before {
    content: "🎛️";
    font-size: 0.9em;
  }

  .explanation-section h4::before {
    content: "💡";
    font-size: 0.9em;
  }

  .code-section h4::before {
    content: "📝";
    font-size: 0.9em;
  }

  .controls-content,
  .explanation-content,
  .code-content {
    margin: 0;
  }

  .no-controls {
    color: #999;
    font-style: italic;
    margin: 0;
    font-size: 0.9em;
  }

  /* 紧凑模式 */
  .demo-container.compact .demo-content {
    grid-template-columns: 1fr 280px;
    min-height: 300px;
  }

  .demo-container.compact .demo-preview,
  .demo-container.compact .demo-controls {
    padding: 16px;
  }

  .demo-container.compact .controls-section,
  .demo-container.compact .explanation-section,
  .demo-container.compact .code-section {
    padding: 12px;
  }

  /* 全宽模式 */
  .demo-container.fullwidth .demo-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .demo-container.fullwidth .demo-controls {
    border-top: 1px solid #f0f0f0;
    background: #fafbfc;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }

  .demo-container.fullwidth .controls-section,
  .demo-container.fullwidth .explanation-section,
  .demo-container.fullwidth .code-section {
    flex: 1;
  }

  /* 响应式设计 */
  @media (max-width: 1024px) {
    .demo-content {
      grid-template-columns: 1fr 260px;
    }

    .demo-container.compact .demo-content {
      grid-template-columns: 1fr 240px;
    }
  }

  @media (max-width: 768px) {
    .demo-content {
      grid-template-columns: 1fr;
    }

    .demo-content.with-border .demo-preview {
      border-right: none;
      border-bottom: 1px solid #f0f0f0;
    }

    .demo-preview {
      min-height: 250px;
    }

    .demo-controls {
      padding: 20px;
      gap: 16px;
    }

    .demo-container.fullwidth .demo-controls {
      flex-direction: column;
    }

    .controls-section,
    .explanation-section,
    .code-section {
      padding: 14px;
    }
  }

  @media (max-width: 480px) {
    .demo-header {
      padding: 16px 20px 0 20px;
    }

    .demo-preview,
    .demo-controls {
      padding: 16px;
    }

    .demo-title {
      font-size: 1.2em;
    }

    .demo-description {
      font-size: 0.9em;
    }
  }

  /* 全局样式重置 */
  :global(.demo-container .controls-content > *:first-child) {
    margin-top: 0;
  }

  :global(.demo-container .controls-content > *:last-child) {
    margin-bottom: 0;
  }

  :global(.demo-container .explanation-content > *:first-child) {
    margin-top: 0;
  }

  :global(.demo-container .explanation-content > *:last-child) {
    margin-bottom: 0;
  }

  :global(.demo-container .code-content > *:first-child) {
    margin-top: 0;
  }

  :global(.demo-container .code-content > *:last-child) {
    margin-bottom: 0;
  }

  /* 按钮样式 */
  :global(.demo-container button) {
    padding: 8px 16px;
    margin: 4px 8px 4px 0;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  :global(.demo-container button:hover) {
    background: #5a6fd8;
    transform: translateY(-1px);
  }

  :global(.demo-container button:active) {
    transform: translateY(0);
  }

  :global(.demo-container button.secondary) {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e0e0e0;
  }

  :global(.demo-container button.secondary:hover) {
    background: #e9ecef;
    border-color: #ced4da;
  }

  :global(.demo-container button.danger) {
    background: #dc3545;
  }

  :global(.demo-container button.danger:hover) {
    background: #c82333;
  }

  :global(.demo-container button:disabled) {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
  }

  :global(.demo-container button:disabled:hover) {
    transform: none;
  }
</style>
