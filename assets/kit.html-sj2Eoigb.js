import{_ as c,c as r,e,a as s,b as a,d as t,f as l,r as o,o as d}from"./app-DyKCri5g.js";const u={},k={href:"https://github.com/cacjs/cac",target:"_blank",rel:"noopener noreferrer"},v={href:"https://vitejs.dev/config/",target:"_blank",rel:"noopener noreferrer"};function m(g,n){const i=o("RouteLink"),p=o("ExternalLinkIcon");return d(),r("div",null,[n[34]||(n[34]=e(`<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p><p>If your kit is to be published to npm, please refer to <strong>Standard Kit</strong>; if your kit is only used in your own project, please refer to <strong>Local Kit</strong>.</p></div><h2 id="standard-kit" tabindex="-1"><a class="header-anchor" href="#standard-kit"><span>Standard Kit</span></a></h2><h3 id="initialization" tabindex="-1"><a class="header-anchor" href="#initialization"><span>Initialization</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">├── dist</span>
<span class="line">│   ├── node</span>
<span class="line">│   │   └── index.js</span>
<span class="line">│   └── client</span>
<span class="line">│   │   ├── main.js</span>
<span class="line">│   │   └── App.vue</span>
<span class="line">└── src</span>
<span class="line">    ├── node</span>
<span class="line">    │   └── index.ts</span>
<span class="line">    └── client</span>
<span class="line">        ├── main.ts</span>
<span class="line">        └── App.vue</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">npm</span> <span class="token function">install</span> revili@next <span class="token parameter variable">-g</span></span>
<span class="line">revili create:kit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="development" tabindex="-1"><a class="header-anchor" href="#development"><span>Development</span></a></h3><p>The development of the kit is divided into two parts, <strong>Custom Command</strong> and <strong>GUI</strong>。</p><p>The two themselves are independent and not interdependent, and only one of the capabilities can be developed according to user habits; at the same time, they can also be used as different manifestations of connected functions, allowing users to choose the use method based on their own habits or interests.</p><p><code>Revili</code> adopts the principle that conventions are greater than specifications to restrict the file structure of the kit:</p>`,9)),s("ul",null,[s("li",null,[n[1]||(n[1]=s("code",null,"node",-1)),n[2]||(n[2]=a(" folder: Place an instance of the kit, declare the kit through ")),n[3]||(n[3]=s("code",null,"defineKit",-1)),n[4]||(n[4]=a(", and use it to register custom commands and ")),n[5]||(n[5]=s("code",null,"Local Communication Service",-1)),n[6]||(n[6]=a(" for the GUI. For details, please refer to ")),t(i,{to:"/docs/api/node-api.html"},{default:l(()=>n[0]||(n[0]=[a("Node API")])),_:1}),n[7]||(n[7]=a(";"))]),n[8]||(n[8]=s("li",null,[s("code",null,"client"),a(" folder: Place code related to the "),s("strong",null,"User Operation Interface"),a(" of the GUI.")],-1))]),n[35]||(n[35]=s("h4",{id:"custom-command",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#custom-command"},[s("span",null,"Custom Command")])],-1)),s("p",null,[n[10]||(n[10]=a("Register a custom command through ")),n[11]||(n[11]=s("code",null,"registerCommand",-1)),n[12]||(n[12]=a(", ")),n[13]||(n[13]=s("code",null,"registerCommand",-1)),n[14]||(n[14]=a(" exposes an instance of ")),s("a",k,[n[9]||(n[9]=a("CAC")),t(p)]),n[15]||(n[15]=a(" to the outside world."))]),n[36]||(n[36]=e(`<p><strong>registerCommand</strong></p><ul><li>Type:<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token punctuation">(</span><span class="token punctuation">{</span> program<span class="token operator">:</span> <span class="token constant">CAC</span><span class="token punctuation">,</span> appConfig<span class="token operator">:</span> AppConfig <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>Example:<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineKit<span class="token punctuation">,</span> <span class="token keyword">type</span> <span class="token class-name">Kit</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;revili/node&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> demoKit<span class="token operator">:</span> Kit <span class="token operator">=</span> <span class="token function">defineKit</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  name<span class="token operator">:</span> <span class="token string">&#39;revili-kit-demo&#39;</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">registerCommand</span><span class="token punctuation">(</span>program<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    program<span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;You triggered the test command!&#39;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> demoKit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="gui" tabindex="-1"><a class="header-anchor" href="#gui"><span>GUI</span></a></h4><p>GUI development is divided into two parts, <strong>User Operation Interface</strong> and <strong>Local Communication Service</strong>.</p><h5 id="user-operation-interface" tabindex="-1"><a class="header-anchor" href="#user-operation-interface"><span>User Operation Interface</span></a></h5><p>The technical stack of the <strong>User Operation Interface</strong> is specified through the <code>webFramework</code>. Currently, only <code>vue</code> is supported, and <code>react</code>,<code>servlet</code>,<code>web component</code>, etc. will be supported later.</p><div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineKit<span class="token punctuation">,</span> <span class="token keyword">type</span> <span class="token class-name">Kit</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;revili/node&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> demoKit<span class="token operator">:</span> Kit <span class="token operator">=</span> <span class="token function">defineKit</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  name<span class="token operator">:</span> <span class="token string">&#39;revili-kit-demo&#39;</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  webFramework<span class="token operator">:</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> demoKit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)),s("p",null,[n[17]||(n[17]=a("Developing Web applications in the ")),n[18]||(n[18]=s("code",null,"client",-1)),n[19]||(n[19]=a(" folder is no different from traditional Web development. Note that the entry file uses ")),n[20]||(n[20]=s("code",null,"main. (ts|js)",-1)),n[21]||(n[21]=a(". If you want to customize the development environment, you can configure it through ")),n[22]||(n[22]=s("code",null,"viteOptions",-1)),n[23]||(n[23]=a(". For configuration details, please refer to ")),s("a",v,[n[16]||(n[16]=a("Vite")),t(p)]),n[24]||(n[24]=a("."))]),n[37]||(n[37]=e(`<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineKit<span class="token punctuation">,</span> <span class="token keyword">type</span> <span class="token class-name">Kit</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;revili/node&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> demoKit<span class="token operator">:</span> Kit <span class="token operator">=</span> <span class="token function">defineKit</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  name<span class="token operator">:</span> <span class="token string">&#39;revili-kit-demo&#39;</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  webFramework<span class="token operator">:</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  viteOptions<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> demoKit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="local-communication-service" tabindex="-1"><a class="header-anchor" href="#local-communication-service"><span>Local Communication Service</span></a></h5><p>Register local services that communicate with the <strong>User Operation Interface</strong> through <code>registerService</code>, and communicate with the <strong>User Operation Interface</strong> through <code>useServerSocket</code>.</p><p><strong>registerService</strong></p><ul><li>Type:<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token punctuation">(</span>server<span class="token operator">:</span> ViteDevServer<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>Example:<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineKit<span class="token punctuation">,</span> useServerSocket<span class="token punctuation">,</span> <span class="token keyword">type</span> <span class="token class-name">Kit</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;revili/node&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> demoKit<span class="token operator">:</span> Kit <span class="token operator">=</span> <span class="token function">defineKit</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  name<span class="token operator">:</span> <span class="token string">&#39;revili-kit-demo&#39;</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">  <span class="token function-variable function">registerService</span><span class="token operator">:</span> server <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> socket <span class="token operator">=</span> <span class="token function">useServerSocket</span><span class="token punctuation">(</span>server<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Listen for instructions sent by the user operation interface client:message</span></span>
<span class="line">    socket<span class="token operator">?.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;client:message&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">===</span> <span class="token string">&#39;USER_PATH&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> userPath <span class="token operator">=</span> <span class="token function">getUserPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// Send server command server:message</span></span>
<span class="line">        socket<span class="token operator">?.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;server:message&#39;</span><span class="token punctuation">,</span> userPath<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> demoKit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>In the <strong>User Operation Interface</strong>, communicate with local services through <code>useClientSocket</code>.</p><div class="language-vue line-numbers-mode" data-highlighter="prismjs" data-ext="vue" data-title="vue"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> useClientSocket <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;revili/client&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> socket <span class="token operator">=</span> <span class="token function">useClientSocket</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">const</span> msgFromServer <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;click button to get&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Listen for commands from local services server:message</span></span>
<span class="line">socket<span class="token operator">?.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;server:message&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">data</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  msgFromServer<span class="token punctuation">.</span>value <span class="token operator">=</span> data</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">getCurrnetPath</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// Send a command to the local service client:message</span></span>
<span class="line">  socket<span class="token operator">?.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;client:message&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;USER_PATH&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>getCurrnetPath<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>get user path<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>user path: {{ msgFromServer }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kit-s-data-persistence" tabindex="-1"><a class="header-anchor" href="#kit-s-data-persistence"><span>Kit&#39;s data persistence</span></a></h4>`,8)),s("p",null,[n[26]||(n[26]=a("Revili provides ")),n[27]||(n[27]=s("code",null,"getKitData",-1)),n[28]||(n[28]=a(", ")),n[29]||(n[29]=s("code",null,"writeKitData",-1)),n[30]||(n[30]=a(", and ")),n[31]||(n[31]=s("code",null,"updateKitData",-1)),n[32]||(n[32]=a(" 3 APIs to achieve data persistence, refer to ")),t(i,{to:"/docs/api/node-api.html"},{default:l(()=>n[25]||(n[25]=[a("Node API")])),_:1}),n[33]||(n[33]=a(" for details."))]),n[38]||(n[38]=e(`<h3 id="debug" tabindex="-1"><a class="header-anchor" href="#debug"><span>Debug</span></a></h3><p>The products of the <code>Standard Kit</code> are stored under the <code>dist</code> folder, so add <code>--dir=./dist</code> parameter when you need to execute a command in the root directory of the kit.</p><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>Modifications to the <code>User Operation Interface</code> do not require restarting the service, and modifications to the <code>Local Communication Service</code> require re-execution of the start command.</p></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Local Develop Server</span></span>
<span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># GUI Debug</span></span>
<span class="line">revili start <span class="token parameter variable">--dir</span><span class="token operator">=</span>./dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Command Debug</span></span>
<span class="line">revili command-registered-by-kit <span class="token parameter variable">--dir</span><span class="token operator">=</span>./dist</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because the <code>--dir</code> parameter has been added, it needs to be processed:</p><ol><li>Add the definition of the <code>--dir</code> parameter<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line">program</span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;cunstom-command&#39;</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">option</span><span class="token punctuation">(</span><span class="token string">&#39;--dir &lt;dir&gt;&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Specify the entry file path for kit&#39;</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// ...</span></span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>Setting allows unknown parameters<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line">program</span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">&#39;cunstom-command&#39;</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">allowUnknownOptions</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// ...</span></span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="publish" tabindex="-1"><a class="header-anchor" href="#publish"><span>Publish</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Build</span></span>
<span class="line"><span class="token function">npm</span> run build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Publish</span></span>
<span class="line"><span class="token function">npm</span> run publish</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="local-kit" tabindex="-1"><a class="header-anchor" href="#local-kit"><span>Local Kit</span></a></h2><h3 id="initial" tabindex="-1"><a class="header-anchor" href="#initial"><span>Initial</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">├── node</span>
<span class="line">│   └── index.js</span>
<span class="line">└── client</span>
<span class="line">    ├── main.js</span>
<span class="line">    └── App.vue</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="develop" tabindex="-1"><a class="header-anchor" href="#develop"><span>Develop</span></a></h3><p>Refer to <strong>Standard Kit</strong>。</p><h3 id="debug-1" tabindex="-1"><a class="header-anchor" href="#debug-1"><span>Debug</span></a></h3><p>Files for the <code>Local Kit</code> are stored in the root folder, so add <code>--dir=./</code> parameter when you need to execute a command in the root directory of the kit.</p><div class="custom-container warning"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg><p class="custom-container-title">WARNING</p><p>Modifications to the user operation interface do not require restarting the service, and modifications to the <code>Local Communication Service</code> require re-execution of the <code>start</code> command.</p></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># GUI Debuger</span></span>
<span class="line">revili start <span class="token parameter variable">--dir</span><span class="token operator">=</span>./</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Command Debug</span></span>
<span class="line">revili command-registered-by-kit <span class="token parameter variable">--dir</span><span class="token operator">=</span>./</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because the <code>--dir</code> parameter has been added, it needs to be processed. For details, please refer to the <strong>Standard Kit</strong>.</p><h3 id="publish-1" tabindex="-1"><a class="header-anchor" href="#publish-1"><span>Publish</span></a></h3><p>No need to pay attention.</p>`,20))])}const h=c(u,[["render",m],["__file","kit.html.vue"]]),f=JSON.parse('{"path":"/docs/guide/kit.html","title":"Develop Kit","lang":"en-US","frontmatter":{"title":"Develop Kit"},"headers":[{"level":2,"title":"Standard Kit","slug":"standard-kit","link":"#standard-kit","children":[{"level":3,"title":"Initialization","slug":"initialization","link":"#initialization","children":[]},{"level":3,"title":"Development","slug":"development","link":"#development","children":[]},{"level":3,"title":"Debug","slug":"debug","link":"#debug","children":[]},{"level":3,"title":"Publish","slug":"publish","link":"#publish","children":[]}]},{"level":2,"title":"Local Kit","slug":"local-kit","link":"#local-kit","children":[{"level":3,"title":"Initial","slug":"initial","link":"#initial","children":[]},{"level":3,"title":"Develop","slug":"develop","link":"#develop","children":[]},{"level":3,"title":"Debug","slug":"debug-1","link":"#debug-1","children":[]},{"level":3,"title":"Publish","slug":"publish-1","link":"#publish-1","children":[]}]}],"git":{"createdTime":1734447996000,"updatedTime":1734447996000,"contributors":[{"name":"reco_luan","email":"recoluan@qq.com","commits":1}]},"filePathRelative":"docs/guide/kit.md"}');export{h as comp,f as data};
