<div align="center">

# 🌌 Space-Exploration-Post

### 探索宇宙帖子 · Explore the Universe Together

[![GitHub Stars](https://img.shields.io/github/stars/polytrack114514/Space-Exploration-Post?style=flat-square&logo=github&color=yellow)](https://github.com/polytrack114514/Space-Exploration-Post/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/polytrack114514/Space-Exploration-Post?style=flat-square&logo=github&color=blue)](https://github.com/polytrack114514/Space-Exploration-Post/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/polytrack114514/Space-Exploration-Post?style=flat-square&logo=github&color=red)](https://github.com/polytrack114514/Space-Exploration-Post/issues)
[![Last Commit](https://img.shields.io/github/last-commit/polytrack114514/Space-Exploration-Post?style=flat-square&logo=git&color=green)](https://github.com/polytrack114514/Space-Exploration-Post/commits)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square&logo=opensourceinitiative)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-brightgreen?style=flat-square&logo=githubpages)](https://polytrack114514.github.io/Space-Exploration-Post/)
[![Language](https://img.shields.io/badge/Language-HTML%20%7C%20CSS%20%7C%20JS-orange?style=flat-square&logo=html5)](https://github.com/polytrack114514/Space-Exploration-Post)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=flat-square&logo=supabase)](https://supabase.com/)

**[🌐 在线预览 / Live Demo](https://polytrack114514.github.io/Space-Exploration-Post/)** · 
**[📦 仓库 / Repository](https://github.com/polytrack114514/Space-Exploration-Post)**

🌐 **语言 / Language:** [简体中文](#-简体中文) · [English](#-english)

</div>

---

## 🇨🇳 简体中文

### 📖 项目简介

**Space-Exploration-Post** 是一个以太空探索为主题的社区帖子平台，采用 Grok 风格暗色极简 UI，集帖子发布、评论互动、火箭发射时间表于一体。前端代码已模块化拆分，结构清晰易于维护。

### 📁 项目结构

```
Space-Exploration-Post/
├── index.html          # HTML 页面结构（引用 style.css 和 app.js）
├── style.css           # 全部 CSS 样式（暗色主题）
├── app.js              # 全部 JavaScript 逻辑（Supabase 交互、倒计时等）
├── supabase_setup.sql  # Supabase 数据库初始化脚本
└── README.md           # 项目说明文档
```

### ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 📝 帖子系统 | 图文发布，热门/最新双标签切换 |
| 🔍 搜索帖子 | 按标题、内容、作者、来源 URL 实时搜索 |
| 🔗 内容来源 | 发帖时可填写原文网址，帖子中可点击访问 |
| 💬 评论互动 | 帖子下方可展开评论区 |
| 📌 置顶帖子 | 管理员可置顶重要帖子 |
| ❤️ 点赞分享 | 一键点赞与链接分享 |
| 👤 用户系统 | 注册/登录，个性化头像 |
| 🖼️ 图片上传 | 发帖支持上传图片 |
| 🚀 发射时间表 | 实时倒计时，精确到秒 |
| 🏁 已发射归档 | 自动归档，保留最近 20 条 |
| 🏛️ 官方账号 | NASA/CNSA/SpaceX 专属徽标与权限 |
| 💓 心跳保活 | 每 12 小时自动访问防止数据过期 |

### 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构（`index.html`） |
| CSS3 | 暗色极简 UI 样式（`style.css`） |
| JavaScript | 前端逻辑、Supabase 交互、实时倒计时（`app.js`） |
| Supabase | 云端数据库（PostgreSQL） |
| GitHub Pages | 静态网站托管 |

### 📸 功能预览

```
┌─────────────────────────────────────────┐
│           🌌 探索宇宙帖子                │
├─────────────────────────────────────────┤
│  🚀 近期发射  │  🏁 已发射              │
│  ┌─────────────────────────────────┐    │
│  │ SpaceX · Starship               │    │
│  │ 倒计时: 03天 14:22:08           │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  🔥 热门 │ 🆕 最新  🔍搜索  [登录/注册] │
│  ┌─────────────────────────────────┐    │
│  │ 📌 [置顶] NASA 发现新行星        │    │
│  │ ❤️ 42  💬 8  🔗 来源  🔗 分享     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)

---

## 🇬🇧 English

### 📖 About

**Space-Exploration-Post** is a space-themed community platform with a Grok-style dark UI, integrating post publishing, comments, and rocket launch schedules. The frontend code is modularized into separate files for clarity and maintainability.

### 📁 Project Structure

```
Space-Exploration-Post/
├── index.html          # HTML page structure (links style.css and app.js)
├── style.css           # All CSS styles (dark theme)
├── app.js              # All JavaScript logic (Supabase, countdown, etc.)
├── supabase_setup.sql  # Supabase database initialization script
└── README.md           # Project documentation
```

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 Posts | Image/text posts with Hot/New tabs |
| 🔍 Search | Real-time search by title, content, author, source URL |
| 🔗 Content Source | Add original URL to posts, clickable in post view |
| 💬 Comments | Expandable comment section |
| 📌 Pin | Admins can pin posts |
| ❤️ Like & Share | One-click like and link share |
| 👤 Users | Register/login with avatars |
| 🖼️ Image Upload | Upload images in posts |
| 🚀 Launch Schedule | Real-time countdown to the second |
| 🏁 Archive | Auto-archived, keeps latest 20 |
| 🏛️ Official Accounts | NASA/CNSA/SpaceX badges & permissions |
| 💓 Heartbeat | Auto-ping every 12h to prevent expiry |

### 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| HTML5 | Page structure (`index.html`) |
| CSS3 | Dark minimalist UI styles (`style.css`) |
| JavaScript | Logic, Supabase interaction, countdown (`app.js`) |
| Supabase | Cloud database (PostgreSQL) |
| GitHub Pages | Static hosting |

### 📸 Preview

```
┌─────────────────────────────────────────┐
│        🌌 Space-Exploration-Post         │
├─────────────────────────────────────────┤
│  🚀 Upcoming  │  🏁 Launched             │
│  ┌─────────────────────────────────┐    │
│  │ SpaceX · Starship               │    │
│  │ Countdown: 03d 14:22:08         │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  🔥 Hot │ 🆕 New  🔍Search  [Login]     │
│  ┌─────────────────────────────────┐    │
│  │ 📌 [Pinned] NASA Finds New Planet│    │
│  │ ❤️ 42  💬 8  🔗 Source  🔗 Share │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 📄 License

[MIT License](https://opensource.org/licenses/MIT)
