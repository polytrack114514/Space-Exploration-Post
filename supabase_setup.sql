-- ============================================
-- SpaceHub Supabase 数据库初始化（安全版本 v2）
-- 在 Supabase SQL Editor 中运行此脚本
-- 修复：移除 password 字段、启用 RLS 策略
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
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户表（不含 password！密码哈希存储在后端 Edge Function）
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    avatar TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active TIMESTAMPTZ DEFAULT NOW(),
    banned BOOLEAN DEFAULT FALSE,
    follows JSONB DEFAULT '[]'::jsonb
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

-- ============================================
-- 安全修复：启用 Row Level Security + 撤销 anon 对敏感表的权限
-- ============================================

-- 用户表（最敏感）- 完全封锁 anon 直接访问
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE user_profiles FROM anon;
REVOKE ALL ON TABLE user_profiles FROM public;
-- 仅允许读取公开字段
CREATE POLICY "profiles_public_read" ON user_profiles
    FOR SELECT TO anon, authenticated
    USING (true);
-- 仅允许修改自己的资料
CREATE POLICY "profiles_update_own" ON user_profiles
    FOR UPDATE TO authenticated
    USING (auth.uid()::text = name)
    WITH CHECK (auth.uid()::text = name);
-- 禁止直接 INSERT（通过 Edge Function 注册）
CREATE POLICY "profiles_insert_via_edge" ON user_profiles
    FOR INSERT TO authenticated
    WITH CHECK (false);  -- 前端不允许直接插入

-- 帖子表 - 允许匿名读取，仅认证用户可写
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE posts FROM anon;
GRANT SELECT ON TABLE posts TO anon, authenticated;
CREATE POLICY "posts_public_read" ON posts
    FOR SELECT TO anon, authenticated
    USING (true);
CREATE POLICY "posts_insert" ON posts
    FOR INSERT TO authenticated
    WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "posts_update" ON posts
    FOR UPDATE TO authenticated
    USING (auth.role() = 'authenticated');
CREATE POLICY "posts_delete" ON posts
    FOR DELETE TO authenticated
    USING (auth.role() = 'authenticated');

-- 火箭发射表 - 允许匿名读取
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE launches FROM anon;
GRANT SELECT ON TABLE launches TO anon, authenticated;
CREATE POLICY "launches_public_read" ON launches
    FOR SELECT TO anon, authenticated
    USING (true);
CREATE POLICY "launches_admin_write" ON launches
    FOR ALL TO authenticated
    USING (auth.role() = 'authenticated');

-- 通知表 - 仅认证用户可访问
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE notifications FROM anon;
CREATE POLICY "notifications_select" ON notifications
    FOR SELECT TO authenticated
    USING (true);
CREATE POLICY "notifications_insert" ON notifications
    FOR INSERT TO authenticated
    WITH CHECK (auth.role() = 'authenticated');

-- 私信表 - 仅认证用户可访问
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE messages FROM anon;
CREATE POLICY "messages_select" ON messages
    FOR SELECT TO authenticated
    USING (auth.uid()::text = from_user OR auth.uid()::text = to_user);
CREATE POLICY "messages_insert" ON messages
    FOR INSERT TO authenticated
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 增量更新兼容（如果旧表 users 已存在）
-- ============================================
-- 将旧 users 表的 password 列设为 NULL 并隐藏
-- 注意：需要在 Supabase Dashboard 手动执行以下迁移
-- ALTER TABLE users DROP COLUMN IF EXISTS password;
-- 或者重命名旧表保留数据：
-- ALTER TABLE users RENAME TO users_legacy;
-- CREATE TABLE user_profiles (...); -- 上面已定义
