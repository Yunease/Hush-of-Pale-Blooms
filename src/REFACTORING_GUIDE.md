# 苍白花院 (Hush of Pale Blooms)

个人博客重构指南

## 1. 配置文件信息

### siteConfig (src/config.ts)

```typescript
export const siteConfig: SiteConfig = {
    title: "苍白花院",
    subtitle: "灼原",
    lang: "zh_CN",
    themeColor: {
        hue: 300,        // 主题色 hue 值 (0-360)
        fixed: true,     // 隐藏主题色选择器
    },
    banner: {
        enable: false,   // Banner 已禁用
    },
    toc: {
        enable: true,   // 启用目录
        depth: 2,       // 目录深度
    },
};
```

### navBarConfig (src/config.ts)

```typescript
export const navBarConfig: NavBarConfig = {
    links: [
        LinkPreset.Home,    // 首页链接
        LinkPreset.Archive, // 归档链接
        LinkPreset.About,   // 关于链接
    ],
};
```

### profileConfig (src/config.ts)

```typescript
export const profileConfig: ProfileConfig = {
    avatar: "assets/images/demo-avatar.png",
    name: "薇尔斯缇娅",
    bio: "好",
    links: [],  // 目前无外部链接
};
```

### expressiveCodeConfig

```typescript
export const expressiveCodeConfig: ExpressiveCodeConfig = {
    theme: "github-dark",  // 代码高亮主题
};
```

---

## 2. 背景样式

博客使用了"空白花境"主题背景，包含以下样式:

### 2.1 斜瀑布云层背景 (CSS 源码)

在 `src/styles/transition.css` 中:

```css
/* 背景容器 */
.easter-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--easter-bg, #010724);
    z-index: -2;
    pointer-events: none;
}

/* 云层容器 */
.easter-clouds {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
}

/* 浮云样式 */
.easter-cloud {
    position: absolute;
    left: calc(-40% + var(--x, 0));
    top: calc(5% + var(--i, 0) * 5%);
    height: var(--h, 50px);
    width: var(--w, 200px);
    border-radius: 120px;
    filter: blur(18px);
    animation: cloudMove var(--d, 40s) linear infinite;
    animation-delay: var(--delay, 0s);
    opacity: 0.9;
    background: var(--easter-cloud-1, #1b1b1b);
}

.easter-cloud:nth-child(4n) {
    background: var(--easter-cloud-2, #151b33);
}

.easter-cloud:nth-child(7n) {
    background: var(--easter-cloud-3, #2a1833);
}

@keyframes cloudMove {
    from { transform: translateX(0); }
    to { transform: translateX(180vw); }
}
```

### 2.2 条状云背景 (CSS 源码)

```css
.easter-cloud-bg {
    position: absolute;
    width: 200%;
    height: 130%;
    z-index: -1;
    background: repeating-linear-gradient(
        -20deg,
        rgba(255, 255, 255, 0.03) 0px,
        rgba(8, 7, 72, 0.08) 20px,
        rgba(255, 11, 11, 0.08) 40px,
        rgba(68, 9, 100, 0.08) 60px,
        rgba(255, 255, 255, 0.03) 80px,
        transparent 80px,
        transparent 200px
    );
    animation: eggMove 60s linear infinite;
}

.easter-cloud-bg.slow {
    animation-duration: 120s;
    opacity: 0.4;
}

@keyframes eggMove {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
```

### 2.3 卡片样式

```css
.easter-box {
    background: var(--easter-box-bg, rgba(100, 20, 120, 0.4));
    backdrop-filter: blur(18px);
    border-radius: var(--radius-large);
}

.easter-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--easter-card-bg, rgba(100, 20, 120, 0.25));
    backdrop-filter: blur(18px);
    border-radius: var(--radius-large);
    transition: background 0.3s ease;
}

.easter-card:hover {
    background: var(--easter-card-bg-hover, rgba(100, 20, 120, 0.35));
}
```

### 2.4 使用方法

在需要使用背景的页面布局中，通过设置 `easter={true}` 属性来启用背景:

```astro
<MainGridLayout easter={true}>
    <!-- 页面内容 -->
</MainGridLayout>
```

或者在 Layout 组件中直接添加 HTML:

```astro
{easter && (
    <div class="easter-bg"></div>
    <div class="easter-clouds">
        <!-- 浮云元素 -->
        <div class="easter-cloud" style="--i:0; --x:-60vw; --h:50px; --w:260px; --d:38s; --delay:-5s;"></div>
        <!-- 更多云朵... -->
        <!-- 条状云背景 -->
        <div class="easter-cloud-bg"></div>
        <div class="easter-cloud-bg slow"></div>
    </div>
)}
```

### 2.5 主题变量 (src/styles/variables.styl)

```stylus
:root.easter
  --easter-bg: #010724
  --easter-cloud-1: #1b1b1b
  --easter-cloud-2: #151b33
  --easter-cloud-3: #2a1833
  --easter-card-bg: rgba(100, 20, 120, 0.25)
  --easter-card-bg-hover: rgba(100, 20, 120, 0.35)
  --easter-box-bg: rgba(100, 20, 120, 0.4)
  --easter-navbar-bg: rgba(1, 7, 36, 0.85)
  --easter-text-primary: white
  --easter-text-secondary: rgba(255, 255, 255, 0.8)
  --easter-text-tertiary: rgba(255, 255, 255, 0.6)
  --easter-text-quaternary: rgba(255, 255, 255, 0.5)
```

---

## 3. 暗色模式

博客默认强制使用暗色模式。在 `src/layouts/Layout.astro` 中:

```javascript
// 强制暗色模式
document.documentElement.classList.add('dark');
```

如果需要恢复亮色模式，删除或注释这行代码即可。

---

## 4. 首页路由结构

博客没有单独的首页文件，根路径 `/` 直接映射到 `[...page].astro`，该文件同时处理 rant 列表分页。

### 路由配置

- 首页 `/` -> rant 列表第 1 页
- 分页 `/2`, `/3` -> rant 列表第 2、3 页...

---

## 5. Rant 页面 (首页) 样式和读取逻辑

### 文件位置

`src/pages/[...page].astro`

### 读取逻辑

```typescript
export const getStaticPaths = (async ({ paginate }) => {
    const allBlogPosts = await getSortedPosts();

    // 过滤包含 "rant" 标签的文章
    const rantPosts = allBlogPosts.filter((post) => post.data.tags.includes("rant"));

    // 按发布日期排序 (最新优先)
    rantPosts.sort(
        (a, b) =>
            new Date(b.data.published).getTime() - new Date(a.data.published).getTime(),
    );

    // 每页显示 15 篇文章
    return paginate(rantPosts, { pageSize: 15 });
}) satisfies GetStaticPaths;
```

### 显示样式

```astro
<MainGridLayout easter={true}>
    <div class="flex flex-col">
        <!-- 标题卡片 -->
        <div class="easter-box p-6 mb-8 onload-animation">
            <h1 class="text-3xl font-bold text-white mb-3">吐槽</h1>
            <p class="text-white/80 leading-relaxed">日常吐槽 · 碎碎念</p>
        </div>

        <!-- 文章列表 -->
        <div class="flex flex-col rounded-[var(--radius-large)] gap-4 mb-4">
            {page.data.map((post: any) => (
                <div class="easter-card onload-animation">
                    <!-- 时间线 -->
                    <div class="flex flex-col items-center min-w-[4.5rem]">
                        <div class="w-3 h-3 rounded-full bg-white/80 relative z-10"></div>
                        <div class="text-xs font-medium text-white/80">{formatDate(new Date(post.data.published))}</div>
                        <div class="text-xs font-light text-white/50">{formatTime(new Date(post.data.published))}</div>
                    </div>
                    <!-- 内容 -->
                    <div class="flex-1 rounded-[var(--radius-large)] p-4">
                        <div class="text-white/90 leading-relaxed whitespace-pre-wrap">
                            {post.body}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <!-- 分页 -->
        <Pagination class="mx-auto onload-animation" page={page}></Pagination>
    </div>
</MainGridLayout>
```

### 关键点总结

1. **数据筛选**: 只显示带有 `rant` 标签的文章
2. **排序**: 按发布时间降序 (最新在前)
3. **分页**: 每页 15 篇
4. **显示格式**:
   - 标题: "吐槽"
   - 副标题: "日常吐槽 · 碎碎念"
   - 文章显示: 时间线 (月.日 + 时:分) + 正文内容
   - 正文使用 `whitespace-pre-wrap` 保留换行

---

## 6. 页面组件层级

```
Layout.astro (根布局)
    └── MainGridLayout.astro (主网格布局)
            ├── Navbar.astro (导航栏)
            ├── SideBar.astro (侧边栏，可选)
            ├── 页面内容 (slot)
            │       ├── [..page].astro (首页/rant 列表)
            │       ├── archive.astro (归档页)
            │       ├── about.astro (关于页)
            │       └── posts/[...slug].astro (文章详情页)
            └── Footer.astro (页脚)
```

---

## 7. 其他页面

### Archive 页面 (src/pages/archive.astro)

```astro
<MainGridLayout title={i18n(I18nKey.archive)}>
    <ArchivePanel sortedPosts={sortedPostsList} client:only="svelte"></ArchivePanel>
</MainGridLayout>
```

### About 页面 (src/pages/about.astro)

待查看具体实现。

---

## 8. 构建和运行

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览
npm run preview
```
