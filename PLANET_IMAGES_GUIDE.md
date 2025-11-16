# 🌍 使用真实星球图片指南

## 🚀 快速开始

我已经为你准备好了代码，现在只需要添加真实的星球图片！

### 步骤1：获取图片

你可以从以下网站免费获取高质量的星球纹理：

#### ✅ 推荐网站（按易用性排序）：

1. **Solar System Scope** 
   - https://www.solarsystemscope.com/textures/
   - **最推荐！** 直接提供圆形行星纹理图
   - 点击下载即可，图片已经是球形拼接的

2. **NASA 3D Models**
   - https://solarsystem.nasa.gov/news/271/nasas-3d-models
   - 官方数据，高质量

3. **Freepik**
   - https://www.freepik.com/free-photos-vectors/3d-planet
   - 搜索 "planet texture sphere" 或 "planet ball"

#### 📦 需要的图片：
- 🌍 地球（中心行星）- 约 128x128 像素
- ⭐ 金星（诗集行星）- 约 60x60 像素  
- 🌙 月球（Luna行星）- 约 50x50 像素
- ☀️ 太阳（互动行星）- 约 55x55 像素

### 步骤2：放置图片

将下载的图片放在 `public/images/` 目录下：

```
fallenluminaries/
└── public/
    └── images/
        ├── earth-texture.jpg    ← 地球图片
        ├── venus-texture.jpg    ← 金星图片
        ├── moon-texture.jpg     ← 月球图片
        └── sun-texture.jpg      ← 太阳图片
```

### 步骤3：启用图片

1. 打开 `components/SolarSystem.tsx`
2. 找到第 22-26 行的 `centralPlanet` 配置
3. 取消注释 `imageUrl: '/images/earth-texture.jpg'`

4. 找到第 40-69 行的 `planets` 配置
5. 分别为每个行星取消注释对应的 `imageUrl`

示例：
```typescript
// 从这样：
imageUrl: '/images/earth-texture.jpg' // 取消注释使用

// 改为这样：
imageUrl: '/images/earth-texture.jpg' // 使用真实图片
```

### 🎨 如何选择图片

- **地球**：选择蓝色海洋、绿色陆地、白色云层的图片
- **金星**：选择橙黄色、表面有模糊纹理的图片
- **月球**：选择灰色、有陨石坑纹理的图片
- **太阳**：选择橙黄色、有燃烧火焰纹理的图片

### ❌ 如果不想使用图片

完全不需要做任何操作！代码会自动使用我之前创建的立体CSS效果，看起来也非常棒。

## 🎯 最终效果

启用后：
- ✅ 中心行星显示真实的地球照片
- ✅ 轨道上的行星显示真实的星球纹理
- ✅ 保留了3D光照和发光效果
- ✅ 行星会继续旋转
- ✅ 悬停和点击效果依然有效

有任何问题随时问我！

