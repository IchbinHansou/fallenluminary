# Fallen Luminaries 🌙�?

> **An interactive system connecting poetry, emotional AI, and human memory.**
>
> 一个融合动态诗歌、互动游戏与AI心理支持的创新性网站项�?

---

## 🌌 项目概述

**Fallen Luminaries** 是一个梦境般的数字诗歌空间，�?坠落的星�?为核心意象，探索诗歌、游戏和AI技术的交融�?

### 核心特色

- 🪶 **动态叙事诗�?*：Framer Motion 驱动的诗歌展示，每一行都有独特的进场动画
- 🎮 **互动诗境**：两款原创小游戏，让文字与玩家互�?
- 🌙 **Luna AI**：温柔的AI倾听者，为青少年提供心理支持研究平台
- 🎵 **沉浸式体�?*：星空背景、视差效果、背景音乐营造梦幻氛�?

---

## 🛠�?技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **AI**: OpenAI GPT-4 Turbo
- **部署**: Vercel (推荐)

---

## 🚀 快速开�?

### 1. 克隆项目

\`\`\`bash
git clone <your-repo-url>
cd fallenluminaries
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 3. 配置环境变量

复制 `.env.local.example` �?`.env.local`:

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

编辑 `.env.local` 文件，填入你�?OpenAI API 密钥:

\`\`\`
OPENAI_API_KEY=sk-your-actual-api-key-here
\`\`\`

> 💡 获取 API 密钥: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 4. 准备音乐文件（可选）

将背景音乐文件放置在 `public/music/bg.mp3`

如果没有音乐文件，音乐播放器仍会显示但不会播放（不影响其他功能）�?

### 5. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开浏览器访�?[http://localhost:3000](http://localhost:3000)

---

## 📁 项目结构

\`\`\`
fallenluminaries/
├── app/
�?  ├── page.tsx                 # 首页（星空入口）
�?  ├── poems/
�?  �?  └── page.tsx            # 诗集页面
�?  ├── games/
�?  �?  └── page.tsx            # 游戏选择页面
�?  ├── aura/
�?  �?  └── page.tsx            # Luna 聊天页面
�?  ├── ai-support/
�?  �?  └── page.tsx            # AI 心理支持研究页面
�?  └── api/
�?      └── chat/
�?          └── route.ts        # OpenAI API 路由
�?
├── components/
�?  ├── Navigation.tsx           # 导航�?
�?  ├── StarfieldBackground.tsx  # 星空背景（Canvas�?
�?  ├── FloatingStars.tsx        # 漂浮星星动画
�?  ├── PoemSection.tsx          # 单首诗歌组件
�?  ├── MusicPlayer.tsx          # 音乐播放�?
�?  ├── ChatWindow.tsx           # 聊天窗口
�?  ├── ChatButton.tsx           # 聊天按钮（悬浮）
�?  └── games/
�?      ├── StarCatcherGame.tsx  # 捕星者游�?
�?      └── PoemBuilderGame.tsx  # 诗歌拼图游戏
�?
├── public/
�?  └── music/
�?      └── bg.mp3              # 背景音乐（需自行添加�?
�?
└── styles/
    └── globals.css             # 全局样式
\`\`\`

---

## 🎨 设计理念

### 视觉风格

- **色彩系统**:
  - 主色: 深夜�?`#0a192f`
  - 强调�? 薄荷�?`#64ffda`
  - 文本: 星白 `#f8faff`
- **字体**:
  - 诗歌: Serif（Playfair Display / Georgia�?
  - UI: Sans-serif（Inter�?
- **动画**: 1.2s 缓动，营造流畅梦幻感

### Luna AI 人格设计

Luna 是一个温柔的AI伙伴，具有以下特征：

- 🌙 **温柔鼓励**: 用温暖的语言回应
- 🪶 **诗意表达**: 用比喻和意象沟�?
- 💬 **简洁有�?*: 每次回复 1-3 �?
- 💫 **情感共鸣**: 善于倾听和理�?

---

## 🎮 游戏说明

### 捕星�?

点击坠落的星辰，收集诗句碎片，获得分数�?

### 诗歌拼图

将散落的诗句按你喜欢的顺序重新组合，创造属于你的诗歌�?

---

## 🔬 学术研究背景

本项目的AI心理支持部分旨在探索�?

1. AI 在青少年心理健康领域的应用潜�?
2. 非专业陪伴型 AI 的有效�?
3. 诗意化表达对情绪疏导的影�?
4. 简短对话模式在青少年中的接受度

**重要声明**: Luna 不能替代专业心理咨询或治疗�?

---

## 🚢 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. �?[Vercel](https://vercel.com) 导入项目
3. �?Vercel 项目设置中添加环境变�?`OPENAI_API_KEY`
4. 自动部署完成�?

### 其他平台

支持所有支�?Next.js 的平台（Netlify, Railway, AWS 等）

---

## 📝 待办事项

- [ ] 添加更多诗歌内容
- [ ] 开发更多互动游�?
- [ ] 优化移动端体�?
- [ ] 添加用户诗歌创作功能
- [ ] 实现诗歌收藏与分�?
- [ ] Luna 对话历史记录
- [ ] 多语言支持

---

## 🤝 贡献

欢迎提交 Issues �?Pull Requests�?

---

## 📄 许可�?

MIT License

---

## 🌟 致谢

灵感来源于每一个在黑暗中寻找光芒的人�?

**"在黑暗中，我们是坠落的星辰。在诗歌中，我们找寻失落的光芒�?**

---

Made with 💫 by Hansou

