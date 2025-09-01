<script lang="ts">
  let display: string = $state('0');
  let previousValue: number = $state(0);
  let operation: string = $state('');
  let waitingForNewValue: boolean = $state(false);
  let history: string = $state('');
  let showingResult: boolean = $state(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      display = num;
      waitingForNewValue = false;
      showingResult = false;
    } else {
      display = display === '0' ? num : display + num;
    }
    
    // 如果刚显示完结果，清空历史记录开始新计算
    if (showingResult) {
      history = '';
      showingResult = false;
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === 0) {
      previousValue = inputValue;
      history = `${inputValue} ${getOperationSymbol(nextOperation)} `;
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation();
      
      history += `${inputValue} = ${newValue} ${getOperationSymbol(nextOperation)} `;
      display = String(newValue);
      previousValue = newValue;
    }

    waitingForNewValue = true;
    operation = nextOperation;
    showingResult = false;
  };

  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '×';
      case '/': return '÷';
      default: return op;
    }
  };

  const performCalculation = (): number => {
    const prev = previousValue;
    const current = parseFloat(display);

    switch (operation) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const calculate = () => {
    if (operation && previousValue !== 0) {
      const currentValue = parseFloat(display);
      const newValue = performCalculation();
      
      // 更新历史记录显示完整的计算过程
      history += `${currentValue} = ${newValue}`;
      
      display = String(newValue);
      previousValue = 0;
      operation = '';
      waitingForNewValue = true;
      showingResult = true;
    }
  };

  const clear = () => {
    display = '0';
    previousValue = 0;
    operation = '';
    waitingForNewValue = false;
    history = '';
    showingResult = false;
  };

  const clearEntry = () => {
    display = '0';
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      display = '0.';
      waitingForNewValue = false;
    } else if (display.indexOf('.') === -1) {
      display = display + '.';
    }
    
    // 如果刚显示完结果，清空历史记录开始新计算
    if (showingResult) {
      history = '';
      showingResult = false;
    }
  };
</script>

<div class="calculator">
  <!-- 显示屏 -->
  <div class="display">
    <div class="history">{history || '\u00A0'}</div>
    <div class="screen">{display}</div>
  </div>

  <!-- 按钮面板 -->
  <div class="buttons">
    <!-- 第一行：清除按钮 -->
    <button class="btn clear" onclick={clear}>C</button>
    <button class="btn clear" onclick={clearEntry}>CE</button>
    <button class="btn operation" onclick={() => inputOperation('/')}>/</button>
    <button class="btn operation" onclick={() => inputOperation('*')}>×</button>

    <!-- 第二行：数字7-9和减号 -->
    <button class="btn number" onclick={() => inputNumber('7')}>7</button>
    <button class="btn number" onclick={() => inputNumber('8')}>8</button>
    <button class="btn number" onclick={() => inputNumber('9')}>9</button>
    <button class="btn operation" onclick={() => inputOperation('-')}>-</button>

    <!-- 第三行：数字4-6和加号 -->
    <button class="btn number" onclick={() => inputNumber('4')}>4</button>
    <button class="btn number" onclick={() => inputNumber('5')}>5</button>
    <button class="btn number" onclick={() => inputNumber('6')}>6</button>
    <button class="btn operation" onclick={() => inputOperation('+')}>+</button>

    <!-- 第四行：数字1-3和等号（跨行） -->
    <button class="btn number" onclick={() => inputNumber('1')}>1</button>
    <button class="btn number" onclick={() => inputNumber('2')}>2</button>
    <button class="btn number" onclick={() => inputNumber('3')}>3</button>
    <button class="btn equals" onclick={calculate}>=</button>

    <!-- 第五行：0和小数点 -->
    <button class="btn number zero" onclick={() => inputNumber('0')}>0</button>
    <button class="btn number" onclick={inputDecimal}>.</button>
  </div>
</div>

<style>
  .calculator {
    max-width: 320px;
    margin: 20px auto;
    background: #2a2a2a;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    font-family: 'Arial', sans-serif;
  }

  .display {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px solid #333;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .history {
    color: #888888;
    font-size: 1em;
    text-align: right;
    min-height: 20px;
    margin-bottom: 10px;
    word-break: break-all;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    opacity: 0.8;
  }

  .screen {
    color: #ffffff;
    font-size: 2.5em;
    font-weight: bold;
    text-align: right;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    word-break: break-all;
    overflow: hidden;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 12px;
  }

  .btn {
    border: none;
    border-radius: 8px;
    font-size: 1.4em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .number {
    background: #404040;
    color: #ffffff;
  }

  .number:hover {
    background: #505050;
  }

  .operation {
    background: #ff9500;
    color: #ffffff;
  }

  .operation:hover {
    background: #ffad33;
  }

  .clear {
    background: #a6a6a6;
    color: #000000;
  }

  .clear:hover {
    background: #b6b6b6;
  }

  .equals {
    background: #ff9500;
    color: #ffffff;
    grid-row: span 2;
  }

  .equals:hover {
    background: #ffad33;
  }

  .zero {
    grid-column: span 2;
  }

  /* 响应式设计 */
  @media (max-width: 480px) {
    .calculator {
      max-width: 280px;
      padding: 15px;
    }

    .display {
      min-height: 80px;
      padding: 15px;
    }

    .history {
      font-size: 0.9em;
      min-height: 18px;
      margin-bottom: 8px;
    }

    .screen {
      font-size: 2em;
    }

    .btn {
      font-size: 1.2em;
    }

    .buttons {
      gap: 8px;
    }
  }
</style>
