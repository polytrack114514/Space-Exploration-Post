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

**Space-Exploration-Post** 是一个以太空探索为主题的社区帖子平台，集帖子发布、评论互动、用户关注、火箭发射追踪、ISS 实时定位、行星位置可视化、NASA 每日天文一图、AI 太空助手于一体。采用全新深空配色与玻璃态设计，全面适配手机/平板/桌面。全部代码整合在单个 `index.html` 文件中，部署简单。

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
| 🔍 搜索帖子 | 按标题、内容、作者实时搜索 |
| 💬 评论互动 | 帖子下方可展开评论区 |
| 📌 置顶帖子 | 管理员可置顶重要帖子 |
| ❤️ 点赞 | 一键点赞，自动通知帖子作者 |
| 🚩 帖子举报 | 用户可举报不当内容，管理员审核 |
| 👤 用户系统 | 注册/登录（Supabase Auth），个性化头像 |
| 👥 关注系统 | 关注/取消关注，用户主页显示关注数和粉丝数 |
| 🔔 消息通知 | 点赞、评论、关注 实时通知 |
| 🎬 视频嵌入 | 自动识别 YouTube 和 B站链接，嵌入视频播放器（autoplay 已禁用）|
| 🚀 发射时间表 | 实时倒计时精确到秒，支持折叠/展开 |
| 🏁 已发射归档 | 自动归档，保留最近 15 条 |
| 📊 发射结果 | 官方账号可标记发射结果（成功/部分成功/失败）|
| 🏛️ 官方账号 | NASA/CNSA/SpaceX/其他火箭发射 专属徽标与权限 |
| 🛰️ ISS 实时追踪 | 国际空间站实时位置、速度、高度（wheretheiss.at API）|
| 🪐 行星位置可视化 | 基于开普勒轨道力学计算 8 大行星实时 3D 位置（含天王星、海王星、轨道倾角）|
| 🤖 AI 太空助手 | agnes-2.5-flash 模型，通过 Supabase Edge Function 代理，专注太空/航天话题 |
| 🌌 NASA APOD | 每日天文一图，点击可放大查看 |
| 🟢 在线用户 | 实时显示在线探索者数量 |
| 🖼️ 图片放大 | 点击帖子图片弹出大图灯箱浏览 |
| 🛡️ 管理员后台 | 用户管理（查看/禁言）、举报审核、站点设置（注册开关）|
| 🚀 加载动画 | 太空主题曲速引擎加载动画 |
| 📱 响应式布局 | 适配手机（480px）、平板（768px/1024px）、桌面 |
| ✨ 视觉设计 | 深空配色（电蓝+紫罗兰）、Orbitron/Rajdhani 字体、玻璃态/霓虹效果 |
| 🎬 动画增强 | 卡片进场动画、hover 微交互、骨架屏加载、扫描线效果 |

### 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式设计（玻璃态、霓虹、动画、响应式） |
| JavaScript | 前端逻辑、Supabase 交互、实时倒计时、开普勒轨道计算 |
| Supabase | 云端数据库（PostgreSQL）+ 用户认证 + Edge Functions |
| Supabase Edge Functions | AI 助手 API 代理（保护 API Key） |
| GitHub Pages | 静态网站托管 |
| Google Fonts | Orbitron / Rajdhani / Audiowide / Michroma / Exo 2 |
| wheretheiss.at API | ISS 实时位置数据 |
| NASA APOD API | 每日天文一图 |
| agnes-ai API | AI 太空助手（agnes-2.5-flash 模型） |

### 📊 数据库结构

| 表名 | 主要字段 |
|------|---------|
| posts | id, title, content, author, avatar, image, source_url, time, likes, comments, pinned |
| users | name, password, follows, source_url, last_active, banned |
| launches | id, rocket, agency, date, location, mission, image, description, status, result |
| notifications | id, target_user, from_user, type, post_id, content, is_read, created_at |
| reports | id, post_id, reporter, reason, status, created_at |
| site_settings | id, disableRegister |

### 🎨 设计系统

| 属性 | 值 |
|------|------|
| 主色 | 电蓝 `#5b8fff` |
| 辅色 | 紫罗兰 `#b558ff` |
| 霓虹青 | `#00e8ff` |
| 霓虹品红 | `#ff3d7f` |
| 背景 | 深空蓝 `#060814` |
| 表面 | `rgba(14, 18, 36, 0.75)` |
| 字体 | Orbitron（标题）/ Rajdhani（正文）/ Michroma（标签） |
| 圆角 | 卡片 16px / 弹窗 24px |
| 动效 | 进场动画 / hover 变换 / 骨架屏 / 扫描线 |

### 📸 功能预览

```
┌──────────────────────────────────────────────┐
│           🌌 探索宇宙帖子                      │
│        (渐变文字 + 发光效果)                    │
├──────────────────────────────────────────────┤
│  🚀 火箭发射时间表                    [▼]    │  ← 可折叠
│  ┌──────────────────────────────────────────┐ │
│  │ 🚀 近期发射  │  🏁 已发射               │ │
│  │ SpaceX · Starship                        │ │
│  │ 倒计时: 03天 14:22:08                    │ │
│  └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│  🔥 热门  🆕 最新  👥 关注  🤖 AI   🔔 🛰️   │
│  ┌──────────────────────────────────────────┐ │
│  │ 👤 NASA  🏛️  2小时前           ⋯       │ │
│  │ NASA 发现新行星                            │ │
│  │ [配图]                                    │ │
│  │ ❤️ 42   💬 8   🚩                         │ │
│  └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│  🛰️ 太空数据中心 (扫描线动效)                  │
│  [ISS 追踪]  [行星位置 8大行星 3D]            │
│  🤖 AI助手 (agnes-2.5-flash)                  │
│  🟢 在线: 12 人  🌌 NASA APOD               │
└──────────────────────────────────────────────┘
```

### 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)

---

## 🇬🇧 English

### 📖 About

**Space-Exploration-Post** is a space-themed community platform integrating post publishing, comments, user following, rocket launch tracking, ISS real-time tracking, planet position visualization, NASA APOD, and an AI space assistant. Features a new deep-space color palette with glassmorphism design, fully responsive for mobile/tablet/desktop. All code is combined in a single `index.html` file for easy deployment.

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
| 🔍 Search | Real-time search by title, content, author |
| 💬 Comments | Expandable comment section |
| 📌 Pin | Admins can pin posts |
| ❤️ Likes | One-click like with auto-notification to author |
| 🚩 Report | Users can report inappropriate content for admin review |
| 👤 Users | Register/login (Supabase Auth) with avatars |
| 👥 Follow | Follow/unfollow users, profile shows following/follower counts |
| 🔔 Notifications | Real-time notifications for likes, comments, follows |
| 🎬 Video Embed | Auto-detects YouTube and Bilibili links (autoplay disabled) |
| 🚀 Launch Schedule | Real-time countdown to the second, collapsible section |
| 🏁 Archive | Auto-archived, keeps latest 15 |
| 📊 Launch Results | Official accounts can mark results (success/partial/failure) |
| 🏛️ Official Accounts | NASA/CNSA/SpaceX badges & permissions |
| 🛰️ ISS Tracking | Real-time ISS position, velocity, altitude (wheretheiss.at API) |
| 🪐 Planet Positions | Keplerian 3D orbit calculation of all 8 planets (incl. Uranus, Neptune, orbital inclination) |
| 🤖 AI Assistant | agnes-2.5-flash model via Supabase Edge Function proxy, space/astronautics topics |
| 🌌 NASA APOD | Astronomy Picture of the Day with lightbox view |
| 🟢 Online Users | Real-time online explorer count |
| 🖼️ Image Lightbox | Click post images to enlarge in lightbox |
| 🛡️ Admin Dashboard | User management (view/ban), report moderation, site settings (registration toggle) |
| 🚀 Loading Animation | Space-themed warp speed loading animation |
| 📱 Responsive | Mobile (480px) / Tablet (768px/1024px) / Desktop |
| ✨ Visual Design | Deep-space palette (electric blue + violet), Orbitron/Rajdhani fonts, glassmorphism/neon |
| 🎬 Animations | Card entrance, hover micro-interactions, skeleton loading, scanline effects |

### 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| HTML5 | Page structure |
| CSS3 | Styling (glassmorphism, neon, animations, responsive) |
| JavaScript | Logic, Supabase interaction, countdown, Keplerian orbital calculations |
| Supabase | Cloud database (PostgreSQL) + Authentication + Edge Functions |
| Supabase Edge Functions | AI assistant API proxy (protects API Key) |
| GitHub Pages | Static hosting |
| Google Fonts | Orbitron / Rajdhani / Audiowide / Michroma / Exo 2 |
| wheretheiss.at API | ISS real-time position data |
| NASA APOD API | Astronomy Picture of the Day |
| agnes-ai API | AI space assistant (agnes-2.5-flash model) |

### 📊 Database Schema

| Table | Key Fields |
|-------|-----------|
| posts | id, title, content, author, avatar, image, source_url, time, likes, comments, pinned |
| users | name, password, follows, source_url, last_active, banned |
| launches | id, rocket, agency, date, location, mission, image, description, status, result |
| notifications | id, target_user, from_user, type, post_id, content, is_read, created_at |
| reports | id, post_id, reporter, reason, status, created_at |
| site_settings | id, disableRegister |

### 🎨 Design System

| Property | Value |
|----------|-------|
| Primary | Electric Blue `#5b8fff` |
| Secondary | Violet `#b558ff` |
| Neon Cyan | `#00e8ff` |
| Neon Magenta | `#ff3d7f` |
| Background | Deep Space `#060814` |
| Surface | `rgba(14, 18, 36, 0.75)` |
| Fonts | Orbitron (headings) / Rajdhani (body) / Michroma (labels) |
| Radius | Cards 16px / Modals 24px |
| Animations | Entrance / Hover transforms / Skeleton / Scanline |

### 📸 Preview

```
┌──────────────────────────────────────────────┐
│           🌌 Space-Exploration-Post           │
│        (gradient text + glow effect)          │
├──────────────────────────────────────────────┤
│  🚀 Rocket Launch Schedule           [▼]    │  ← Collapsible
│  ┌──────────────────────────────────────────┐ │
│  │ 🚀 Upcoming  │  🏁 Launched             │ │
│  │ SpaceX · Starship                        │ │
│  │ Countdown: 03d 14:22:08                   │ │
│  └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│  🔥 Hot  🆕 New  👥 Following  🤖 AI  🔔 🛰️│
│  ┌──────────────────────────────────────────┐ │
│  │ 👤 NASA  🏛️  2h ago             ⋯     │ │
│  │ NASA Discovers New Planet                  │ │
│  │ [Image]                                    │ │
│  │ ❤️ 42   💬 8   🚩                         │ │
│  └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│  🛰️ Space Data Center (scanline effect)       │
│  [ISS Tracking]  [Planets 3D - 8 planets]    │
│  🤖 AI Assistant (agnes-2.5-flash)            │
│  🟢 Online: 12  🌌 NASA APOD                 │
└──────────────────────────────────────────────┘
```

### 📄 License

[MIT License](https://opensource.org/licenses/MIT)
