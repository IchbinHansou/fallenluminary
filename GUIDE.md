# Fallen Luminaries - 开发指南 🌙

## 🎨 设计系统

### 颜色定义

\`\`\`css
--night-blue: #0a192f    /* 主背景色 */
--mint-blue: #64ffda     /* 强调色/链接色 */
--star-white: #f8faff    /* 主文本色 */
--dark-blue: #112240     /* 次级背景色 */
\`\`\`

### 动画时长

- 快速交互: 0.3s
- 标准过渡: 0.8s
- 页面进入: 1.2s
- 缓动曲线: cubic-bezier(0.4, 0, 0.2, 1)

---

## 🧩 组件使用指南

### 1. FloatingStars（漂浮星星）

用于背景装饰的动画星星组件。

\`\`\`tsx
import FloatingStars from '@/components/FloatingStars'

<div className="relative">
  <FloatingStars />
  {/* 你的内容 */}
</div>
\`\`\`

### 2. MusicPlayer（音乐播放器）

全局音乐播放器，固定在页面底部。

\`\`\`tsx
import MusicPlayer from '@/components/MusicPlayer'

<MusicPlayer />
\`\`\`

确保 `public/music/bg.mp3` 文件存在。

### 3. PoemSection（诗歌段落）

用于展示单首诗歌，带滚动触发动画。

\`\`\`tsx
import PoemSection from '@/components/PoemSection'

<PoemSection 
  poem={{
    id: 1,
    title: "诗歌标题",
    lines: ["第一行", "第二行", ...]
  }}
  index={0}
/>
\`\`\`

### 4. ChatWindow（聊天窗口）

Luna AI 聊天界面。

\`\`\`tsx
import ChatWindow from '@/components/ChatWindow'

<ChatWindow />
\`\`\`

---

## 🎮 添加新游戏

1. 在 `components/games/` 创建新组件：

\`\`\`tsx
// components/games/YourNewGame.tsx
export default function YourNewGame() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* 游戏内容 */}
    </div>
  )
}
\`\`\`

2. 在 `app/games/page.tsx` 注册游戏：

\`\`\`tsx
import YourNewGame from '@/components/games/YourNewGame'

const games = [
  // ... 现有游戏
  {
    id: 'your-new-game',
    title: '游戏标题',
    emoji: '🎯',
    description: '游戏描述',
    component: YourNewGame,
  },
]
\`\`\`

---

## 📝 添加新诗歌

编辑 `app/poems/page.tsx`，在 `poems` 数组中添加：

\`\`\`tsx
const poems = [
  // ... 现有诗歌
  {
    id: 4,
    title: "新诗标题",
    lines: [
      "第一行诗句",
      "第二行诗句",
      "",  // 空行用于段落分隔
      "新段落第一行",
    ]
  },
]
\`\`\`

---

## 🤖 修改Luna人格

编辑 `app/api/chat/route.ts` 中的 `LUNA_SYSTEM_PROMPT`：

\`\`\`typescript
const LUNA_SYSTEM_PROMPT = \`你是Luna，一个...

修改这里的提示词来调整Luna的行为和风格
\`
\`\`\`

---

## 🎨 自定义动画

### Framer Motion 常用动画

\`\`\`tsx
// 淡入
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>

// 从下滑入
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

// 悬停缩放
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// 滚动触发
const ref = useRef(null)
const isInView = useInView(ref, { once: false, amount: 0.3 })

<motion.div
  ref={ref}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
>
\`\`\`

---

## 🚀 性能优化建议

### 1. 图片优化

使用 Next.js Image 组件：

\`\`\`tsx
import Image from 'next/image'

<Image 
  src="/images/photo.jpg"
  alt="描述"
  width={800}
  height={600}
  priority  // 首屏图片使用
/>
\`\`\`

### 2. 懒加载组件

\`\`\`tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { ssr: false }
)
\`\`\`

### 3. 减少动画数量

- 移动端减少 FloatingStars 数量
- 长列表使用虚拟滚动

---

## 📱 移动端适配

### 响应式断点

\`\`\`css
sm: 640px   /* 小屏手机 */
md: 768px   /* 平板 */
lg: 1024px  /* 小笔记本 */
xl: 1280px  /* 桌面 */
2xl: 1536px /* 大屏 */
\`\`\`

### 示例

\`\`\`tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
  响应式文字
</div>
\`\`\`

---

## 🔧 环境变量

在 `.env.local` 添加新变量：

\`\`\`
OPENAI_API_KEY=sk-xxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

- `NEXT_PUBLIC_` 前缀的变量会暴露给浏览器
- 不带前缀的仅在服务端可用

---

## 🐛 常见问题

### OpenAI API 错误

1. 检查 `.env.local` 中 API key 是否正确
2. 确认 OpenAI 账户有余额
3. 检查 API 速率限制

### 音乐不播放

1. 确认 `public/music/bg.mp3` 存在
2. 浏览器可能需要用户交互才能播放
3. 检查音频格式是否支持（推荐 mp3）

### 动画卡顿

1. 减少同时播放的动画数量
2. 使用 CSS transform 代替 position
3. 启用 GPU 加速：`will-change: transform`

---

## 📚 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [OpenAI API 文档](https://platform.openai.com/docs)

---

## 🎯 下一步开发建议

1. **用户系统**：添加登录、保存诗歌收藏
2. **创作功能**：让用户创作并分享自己的诗歌
3. **更多游戏**：文字冒险、诗歌接龙
4. **社区功能**：诗歌评论、点赞
5. **数据分析**：Luna 对话效果研究
6. **多语言**：支持英文等其他语言

---

Happy Coding! ✨🌙

