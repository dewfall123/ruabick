import{_ as s,o as n,c as a,j as p}from"./app.89be9997.js";const C=JSON.parse('{"title":"Ts api \u6587\u6863\u81EA\u52A8\u751F\u6210","description":"","frontmatter":{"realPath":"docs\\\\features\\\\api-ts.zh-CN.md"},"headers":[{"level":3,"title":"<demo-props> Props","slug":"demo-props-props","link":"#demo-props-props","children":[]}],"relativePath":"features/api-ts.md","lastUpdated":null}'),l={name:"features/api-ts.md"},o=p(`<h1 id="ts-api-\u6587\u6863\u81EA\u52A8\u751F\u6210" tabindex="-1">Ts api \u6587\u6863\u81EA\u52A8\u751F\u6210 <a class="header-anchor" href="#ts-api-\u6587\u6863\u81EA\u52A8\u751F\u6210" aria-hidden="true">#</a></h1><p>markdown \u5199\u4E00\u4E2A API \u7EC4\u4EF6\uFF0C\u4F20\u5165 src \u5C5E\u6027\u3002</p><p>\u6682\u65F6\u53EA\u652F\u6301\u751F\u6210 interface \u6587\u6863\uFF0C\u800C\u4E14\u5FC5\u987B\u8981\u6709 jsDoc \u683C\u5F0F\u7684\u6CE8\u91CA\u3002</p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="vp-code-dark"><code><span class="line"><span style="color:#C9D1D9;">&lt;API src=&quot;./api-demo.ts&quot; lang=&quot;zh&quot;&gt;&lt;/API&gt;</span></span>
<span class="line"></span></code></pre><pre class="vp-code-light"><code><span class="line"><span style="color:#24292F;">&lt;API src=&quot;./api-demo.ts&quot; lang=&quot;zh&quot;&gt;&lt;/API&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u751F\u6210\u7684\u7ED3\u679C:</p><h3 id="demo-props-props" tabindex="-1"><code>&lt;demo-props&gt;</code> Props <a class="header-anchor" href="#demo-props-props" aria-hidden="true">#</a></h3><table><thead><tr><th>\u53C2\u6570\u540D</th><th>\u63CF\u8FF0</th><th>\u7C7B\u578B</th><th style="text-align:center;">\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>code</td><td>\u6E90\u7801\u5B57\u7B26\u4E32(\u9700\u7ECF\u8FC7encodeURIComponent\u5904\u7406)</td><td><code>string</code></td><td style="text-align:center;"><code>-</code></td></tr><tr><td>title</td><td>\u6807\u9898</td><td><code>string</code></td><td style="text-align:center;"><code>-</code></td></tr><tr><td>desc</td><td>\u63CF\u8FF0</td><td><code>string</code></td><td style="text-align:center;"><code>-</code></td></tr><tr><td>lang</td><td>\u8BED\u8A00</td><td><code>string</code></td><td style="text-align:center;"><code>-</code></td></tr></tbody></table><p>Demo.vue Props \u5185\u5BB9\u5982\u4E0B</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code-dark"><code><span class="line"><span style="color:#FF7B72;">export</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">interface</span><span style="color:#C9D1D9;"> </span><span style="color:#FFA657;">DemoProps</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;">   * \u6E90\u7801\u5B57\u7B26\u4E32(\u9700\u7ECF\u8FC7encodeURIComponent\u5904\u7406)</span></span>
<span class="line"><span style="color:#8B949E;">   */</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FFA657;">code</span><span style="color:#FF7B72;">:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">string</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;">   * \u6807\u9898</span></span>
<span class="line"><span style="color:#8B949E;">   */</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FFA657;">title</span><span style="color:#FF7B72;">?:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">string</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;">   * \u63CF\u8FF0</span></span>
<span class="line"><span style="color:#8B949E;">   */</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FFA657;">desc</span><span style="color:#FF7B72;">?:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">string</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">/**</span></span>
<span class="line"><span style="color:#8B949E;">   * \u8BED\u8A00</span></span>
<span class="line"><span style="color:#8B949E;">   */</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#FFA657;">lang</span><span style="color:#FF7B72;">?:</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">string</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><pre class="vp-code-light"><code><span class="line"><span style="color:#CF222E;">export</span><span style="color:#24292F;"> </span><span style="color:#CF222E;">interface</span><span style="color:#24292F;"> </span><span style="color:#953800;">DemoProps</span><span style="color:#24292F;"> {</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;">   * \u6E90\u7801\u5B57\u7B26\u4E32(\u9700\u7ECF\u8FC7encodeURIComponent\u5904\u7406)</span></span>
<span class="line"><span style="color:#6E7781;">   */</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#953800;">code</span><span style="color:#CF222E;">:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">string</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;">   * \u6807\u9898</span></span>
<span class="line"><span style="color:#6E7781;">   */</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#953800;">title</span><span style="color:#CF222E;">?:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">string</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;">   * \u63CF\u8FF0</span></span>
<span class="line"><span style="color:#6E7781;">   */</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#953800;">desc</span><span style="color:#CF222E;">?:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">string</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#6E7781;">/**</span></span>
<span class="line"><span style="color:#6E7781;">   * \u8BED\u8A00</span></span>
<span class="line"><span style="color:#6E7781;">   */</span></span>
<span class="line"><span style="color:#24292F;">  </span><span style="color:#953800;">lang</span><span style="color:#CF222E;">?:</span><span style="color:#24292F;"> </span><span style="color:#0550AE;">string</span><span style="color:#24292F;">;</span></span>
<span class="line"><span style="color:#24292F;">}</span></span>
<span class="line"></span></code></pre></div>`,9),e=[o];function t(c,r,d,y,i,F){return n(),a("div",null,e)}const g=s(l,[["render",t]]);export{C as __pageData,g as default};
