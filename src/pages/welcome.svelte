<script lang="ts">
    import { link } from 'svelte-spa-router';
    import logo from '@/assets/svelte.svg';
</script>

<div class="text-center">
    <div class="my-20">
        <img src={logo} alt="Svelte Logo" class="w-32 h-32 mx-auto mb-6 animate-bounce-gentle" />
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎使用 Svelte!
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            这是一个包含基础教学和高级特性演示的 Svelte 应用，现在集成了 Tailwind CSS 4！
        </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <a 
            href="/tutorials"
            use:link
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-300 text-decoration-none"
        >
            <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">基础教学</h3>
                <p class="text-gray-600 text-sm">从零开始学习 Svelte</p>
            </div>
        </a>
        
        <a 
            href="/advanced"
            use:link
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-300 text-decoration-none"
        >
            <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">高级特性</h3>
                <p class="text-gray-600 text-sm">探索 Svelte 的强大功能</p>
            </div>
        </a>
        
        <a 
            href="/practical"
            use:link
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 text-decoration-none"
        >
            <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🛠️</div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">应用实操</h3>
                <p class="text-gray-600 text-sm">实际应用案例演示</p>
            </div>
        </a>
        
        <a 
            href="/counter"
            use:link
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-300 text-decoration-none"
        >
            <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🔢</div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">基础计算器</h3>
                <p class="text-gray-600 text-sm">查看简单的计算器组件</p>
            </div>
        </a>
    </div>
</div>

<style>
    a {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    
    a:hover {
        text-decoration: none;
        color: inherit;
    }
    
    a:visited {
        color: inherit;
    }
    
    .text-decoration-none {
        text-decoration: none !important;
    }
    
    @keyframes bounce-gentle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    :global(.animate-bounce-gentle) {
        animation: bounce-gentle 2s infinite;
    }
</style>