-- ============================================
-- Space-Exploration-Post Supabase 数据库初始化
-- 在 Supabase SQL Editor 中运行此脚本
-- ============================================

-- 帖子表
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT DEFAULT '',
    content TEXT DEFAULT '',
    author TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    image TEXT DEFAULT '',
    time BIGINT DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments JSONB DEFAULT '[]'::jsonb,
    pinned BOOLEAN DEFAULT FALSE
);

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    password TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 火箭发射表
CREATE TABLE IF NOT EXISTS launches (
    id SERIAL PRIMARY KEY,
    rocket TEXT DEFAULT '',
    agency TEXT DEFAULT '',
    date BIGINT DEFAULT 0,
    location TEXT DEFAULT '',
    mission TEXT DEFAULT '',
    image TEXT DEFAULT '',
    desc TEXT DEFAULT '',
    status TEXT DEFAULT 'tentative',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;

-- 帖子表策略（允许匿名读写，因为前端使用自定义认证）
CREATE POLICY "posts_select" ON posts FOR SELECT USING (true);
CREATE POLICY "posts_insert" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "posts_update" ON posts FOR UPDATE USING (true);
CREATE POLICY "posts_delete" ON posts FOR DELETE USING (true);

-- 用户表策略
CREATE POLICY "users_select" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update" ON users FOR UPDATE USING (true);

-- 火箭发射表策略
CREATE POLICY "launches_select" ON launches FOR SELECT USING (true);
CREATE POLICY "launches_insert" ON launches FOR INSERT WITH CHECK (true);
CREATE POLICY "launches_update" ON launches FOR UPDATE USING (true);
CREATE POLICY "launches_delete" ON launches FOR DELETE USING (true);
