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

**Space-Exploration-Post** 是一个以太空探索为主题的社区帖子平台，采用 Grok 风格暗色极简 UI，集帖子发布、评论互动、用户关注、消息通知、火箭发射时间表、发射日历于一体。全部代码整合在单个 `index.html` 文件中，部署简单。

### 📁 项目结构

```
Space-Exploration-Post/
├── index.html          # 全部代码（HTML + CSS + JavaScript 单文件）
├── supabase_setup.sql  # Supabase 数据库初始化脚本
└── README.md           # 项目说明文档
```

### ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 📝 帖子系统 | 图文发布，热门/最新/关注三标签切换 |
| ✏️ 编辑历史 | 帖子编辑后显示"已编辑"徽章，可查看完整编辑历史 |
| 🔍 搜索帖子 | 按标题、内容、作者、来源 URL 实时搜索 |
| 💬 评论互动 | 帖子下方可展开评论区，支持 @提及 |
| @ 提及功能 | 帖子/评论中 @用户名 自动变为可点击链接，并通知对方 |
| 📌 置顶帖子 | 管理员可置顶重要帖子 |
| ❤️ 点赞 | 一键点赞，自动通知帖子作者 |
| 👤 用户系统 | 注册/登录（Supabase Auth），个性化头像 |
| 👥 关注系统 | 关注/取消关注，用户主页显示关注数和粉丝数 |
| 🔔 消息通知 | 点赞、评论、关注、@提及 实时通知 |
| 🎬 视频嵌入 | 自动识别 YouTube 和 B站链接，嵌入视频播放器 |
| 🚀 发射时间表 | 实时倒计时，精确到秒 |
| 📅 发射日历 | 月历视图展示所有发射计划，支持月份切换 |
| 🏁 已发射归档 | 自动归档，保留最近 15 条 |
| 📊 发射结果 | 官方账号可标记发射结果（成功/部分成功/失败），含统计 |
| 🏛️ 官方账号 | NASA/CNSA/SpaceX/其他火箭发射 专属徽标与权限 |
| 🌗 主题切换 | 暗色/亮色主题一键切换 |
| 🚀 加载动画 | 太空主题火箭起飞加载动画 |

### 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 暗色/亮色主题样式 |
| JavaScript | 前端逻辑、Supabase 交互、实时倒计时、日历等 |
| Supabase | 云端数据库（PostgreSQL）+ 用户认证 |
| GitHub Pages | 静态网站托管 |

### 📊 数据库结构

| 表名 | 主要字段 |
|------|---------|
| posts | id, title, content, author, avatar, image, source_url, time, likes, comments, pinned, edit_history |
| users | name, password, follows, source_url |
| launches | id, rocket, agency, date, location, mission, image, description, status, result |
| notifications | id, target_user, from_user, type, post_id, content, is_read, created_at |

### 📸 功能预览

```
┌─────────────────────────────────────────┐
│           🌌 探索宇宙帖子                │
├─────────────────────────────────────────┤
│  🚀 近期发射 │ 🏁 已发射 │ 📅 日历      │
│  ┌─────────────────────────────────┐    │
│  │ SpaceX · Starship               │    │
│  │ 倒计时: 03天 14:22:08           │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  🔥 热门 │ 🆕 最新 │ 👥 关注  🔔  🌙   │
│  ┌─────────────────────────────────┐    │
│  │ 📌 [置顶] NASA 发现新行星  ✏️已编辑│   │
│  │ @SpaceX 你怎么看这个发现？       │    │
│  │ ❤️ 42  💬 8                      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)

---

## 🇬🇧 English

### 📖 About

**Space-Exploration-Post** is a space-themed community platform with a Grok-style dark UI, integrating post publishing, comments, user following, message notifications, rocket launch schedules, and a launch calendar. All code is combined in a single `index.html` file for easy deployment.

### 📁 Project Structure

```
Space-Exploration-Post/
├── index.html          # All code (HTML + CSS + JavaScript in one file)
├── supabase_setup.sql  # Supabase database initialization script
└── README.md           # Project documentation
```

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 Posts | Image/text posts with Hot/New/Following tabs |
| ✏️ Edit History | Edited posts show "Edited" badge with full edit history |
| 🔍 Search | Real-time search by title, content, author, source URL |
| 💬 Comments | Expandable comment section with @mention support |
| @ Mentions | @username auto-links to user profile & sends notification |
| 📌 Pin | Admins can pin posts |
| ❤️ Likes | One-click like with auto-notification to author |
| 👤 Users | Register/login (Supabase Auth) with avatars |
| 👥 Follow | Follow/unfollow users, profile shows following/follower counts |
| 🔔 Notifications | Real-time notifications for likes, comments, follows, mentions |
| 🎬 Video Embed | Auto-detects YouTube and Bilibili links, embeds video player |
| 🚀 Launch Schedule | Real-time countdown to the second |
| 📅 Launch Calendar | Monthly calendar view of all launches with month navigation |
| 🏁 Archive | Auto-archived, keeps latest 15 |
| 📊 Launch Results | Official accounts can mark results (success/partial/failure) with stats |
| 🏛️ Official Accounts | NASA/CNSA/SpaceX badges & permissions |
| 🌗 Theme Toggle | Dark/light theme switch |
| 🚀 Loading Animation | Space-themed rocket launch loading animation |

### 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| HTML5 | Page structure |
| CSS3 | Dark/light theme styles |
| JavaScript | Logic, Supabase interaction, countdown, calendar |
| Supabase | Cloud database (PostgreSQL) + Authentication |
| GitHub Pages | Static hosting |

### 📊 Database Schema

| Table | Key Fields |
|-------|-----------|
| posts | id, title, content, author, avatar, image, source_url, time, likes, comments, pinned, edit_history |
| users | name, password, follows, source_url |
| launches | id, rocket, agency, date, location, mission, image, description, status, result |
| notifications | id, target_user, from_user, type, post_id, content, is_read, created_at |

### 📸 Preview

```
┌─────────────────────────────────────────┐
│        🌌 Space-Exploration-Post         │
├─────────────────────────────────────────┤
│  🚀 Upcoming │ 🏁 Launched │ 📅 Calendar │
│  ┌─────────────────────────────────┐    │
│  │ SpaceX · Starship               │    │
│  │ Countdown: 03d 14:22:08         │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  🔥 Hot │ 🆕 New │ 👥 Following  🔔  🌙 │
│  ┌─────────────────────────────────┐    │
│  │ 📌 [Pinned] NASA Finds Planet ✏️│    │
│  │ @SpaceX what do you think?      │    │
│  │ ❤️ 42  💬 8                     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### 📄 License

[MIT License](https://opensource.org/licenses/MIT)
