# SpaceHub 🌌

> **⚠️ 紧急安全公告（2026-08-27）**：本项目存在严重安全漏洞，密码字段已从数据库设计中移除。请立即执行 [supabase_fix_emergency.sql](supabase_fix_emergency.sql) 关闭泄露通道。

## 🚨 紧急安全操作

### 第一步：旋转 API Key
前往 [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API → **Regenerate ANON PUBLIC key**

### 第二步：执行紧急修复 SQL
复制 [supabase_fix_emergency.sql](supabase_fix_emergency.sql) 内容到 Supabase SQL Editor 运行。

### 第三步：通知用户重置密码
旧密码以明文存储，需通知所有用户重新设置密码。

## 🛠️ 快速开始

### 新建项目
1. Supabase SQL Editor 中运行 [supabase_setup.sql](supabase_setup.sql)
2. 部署 `index.html` 到 GitHub Pages

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 📝 帖子系统 | 图文发布，热门/最新切换 |
| 💬 评论互动 | 帖子评论区 |
| 📌 置顶帖子 | 管理员可置顶 |
| ❤️ 点赞 | 一键点赞 |
| 👤 用户系统 | 注册/登录 |
| 🚀 发射时间表 | 实时倒计时 |
| 🛰️ 太空数据中心 | ISS 追踪 / 月相 / 小行星 等 |
| 🤖 AI 太空助手 | 基于 agnes-2.5-flash |

## 🔒 安全说明

- 密码字段已从数据库表中移除
- RLS 策略限制 anon 角色仅可读取公开数据
- API Key 通过 Edge Function 在服务端使用

## 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)
