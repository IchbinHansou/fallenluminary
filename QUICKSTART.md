# 🚀 Fallen Luminaries - 快速启动指南

## ✅ 当前状态

项目已完全搭建完成！包含：

- ✨ 首页（星空视差效果）
- 🪶 动态诗集页面（3首示例诗歌）
- 🎮 互动游戏（捕星者 + 诗歌拼图）
- 🌙 Luna AI聊天（需配置OpenAI API）
- 🔬 AI心理支持研究页面
- 🎵 音乐播放器（需添加音乐文件）

---

## 📋 启动步骤

### 第一步：配置环境变量

创建 `.env.local` 文件：

\`\`\`bash
# Windows PowerShell
Copy-Item .env.local.example .env.local
\`\`\`

编辑 `.env.local`，填入你的 OpenAI API 密钥：

\`\`\`
OPENAI_API_KEY=sk-你的真实API密钥
\`\`\`

> 💡 **获取API密钥**: https://platform.openai.com/api-keys
>
> ⚠️ **注意**: 没有API密钥也可以运行项目，Luna会显示友好的提示信息

### 第二步：（可选）添加背景音乐

将你喜欢的纯音乐文件重命名为 `bg.mp3`，放入：

\`\`\`
public/music/bg.mp3
\`\`\`

推荐：柔和、舒缓、2-5分钟的纯音乐

### 第三步：启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

### 第四步：访问网站

打开浏览器访问: **http://localhost:3000**

---

## 🎨 页面导览

启动后你会看到：

1. **首页** (`/`)
   - 炫酷的星空背景（随鼠标移动）
   - 发光的标题动画
   - 三个入口按钮

2. **诗集** (`/poems`)
   - 滚动触发的诗句淡入动画
   - 漂浮星星背景
   - 底部音乐播放器

3. **互动游戏** (`/games`)
   - **捕星者**：点击坠落的星辰收集诗句
   - **诗歌拼图**：重新组合诗句创作

4. **Luna** (`/aura`)
   - AI聊天界面（需要OpenAI API密钥）
   - 温柔诗意的对话风格
   - 适合青少年心理支持

5. **AI研究** (`/ai-support`)
   - 学术研究背景介绍
   - Luna的设计理念
   - 完整的聊天界面

---

## 🎮 快速测试

### 测试诗集动画
1. 访问 `/poems`
2. 慢慢向下滚动
3. 观察诗句逐行淡入动画

### 测试游戏
1. 访问 `/games`
2. 点击"捕星者"
3. 快速点击坠落的星星

### 测试Luna（需API密钥）
1. 确保 `.env.local` 已配置
2. 访问 `/aura`
3. 输入："今天有点累"
4. Luna会给出温柔的回复

---

## 🔧 开发命令

\`\`\`bash
# 开发模式（热重载）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
\`\`\`

---

## 📱 移动端测试

1. 获取你的局域网IP（如 192.168.1.100）
2. 确保手机和电脑在同一网络
3. 在手机浏览器访问: `http://你的IP:3000`

---

## 🐛 遇到问题？

### 依赖安装失败
\`\`\`bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 端口被占用
\`\`\`bash
# 使用其他端口
npm run dev -- -p 3001
\`\`\`

### TypeScript 错误
\`\`\`bash
# 重新生成类型文件
npm run build
\`\`\`

### Luna 不回复
- 检查 `.env.local` 是否存在且API密钥正确
- 确认OpenAI账户有余额
- 查看浏览器控制台的错误信息

---

## 🚀 部署到Vercel

1. 推送代码到GitHub
2. 访问 https://vercel.com
3. 点击 "Import Project"
4. 选择你的仓库
5. 在环境变量中添加 `OPENAI_API_KEY`
6. 部署！

---

## ✨ 下一步

- 📝 在 `app/poems/page.tsx` 添加更多诗歌
- 🎮 创建新游戏（参考 `GUIDE.md`）
- 🎨 调整颜色和动画
- 🤖 优化Luna的对话风格
- 📊 添加数据分析功能

---

## 💬 需要帮助？

查看以下文档：
- `README.md` - 项目总览
- `GUIDE.md` - 开发详细指南
- `package.json` - 依赖列表

---

**祝你开发愉快！在黑暗中，成为坠落的星辰 ✨🌙**

