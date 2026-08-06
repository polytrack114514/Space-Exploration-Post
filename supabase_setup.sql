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
    source_url TEXT DEFAULT '',
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
    follows TEXT DEFAULT '[]',
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
    description TEXT DEFAULT '',
    status TEXT DEFAULT 'tentative',
    result TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 通知表
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    target_user TEXT NOT NULL,
    from_user TEXT DEFAULT '',
    type TEXT DEFAULT '',
    post_id TEXT,
    content TEXT DEFAULT '',
    is_read BOOLEAN DEFAULT FALSE,
    created_at BIGINT DEFAULT 0
);

-- 私信表
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    from_user TEXT NOT NULL,
    to_user TEXT NOT NULL,
    content TEXT DEFAULT '',
    is_read BOOLEAN DEFAULT FALSE,
    created_at BIGINT DEFAULT 0
);

-- 启用 Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 帖子表策略
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

-- 通知表策略
CREATE POLICY "notifications_select" ON notifications FOR SELECT USING (true);
CREATE POLICY "notifications_insert" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "notifications_update" ON notifications FOR UPDATE USING (true);
CREATE POLICY "notifications_delete" ON notifications FOR DELETE USING (true);

-- 私信表策略
CREATE POLICY "messages_select" ON messages FOR SELECT USING (true);
CREATE POLICY "messages_insert" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_update" ON messages FOR UPDATE USING (true);
CREATE POLICY "messages_delete" ON messages FOR DELETE USING (true);

-- ============================================
-- 增量更新（如果表已存在，添加缺失的列）
-- ============================================
ALTER TABLE posts ADD COLUMN IF NOT EXISTS source_url TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS follows TEXT DEFAULT '[]';
ALTER TABLE launches ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE launches ADD COLUMN IF NOT EXISTS result TEXT DEFAULT 'pending';
