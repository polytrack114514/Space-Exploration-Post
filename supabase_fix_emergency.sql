-- ============================================
-- SpaceHub 紧急安全修复 SQL
-- 执行时间：2026-08-27
-- 作用：立即关闭密码泄露通道
-- ============================================

-- 第一步：撤销 anon 角色对 users 表的全部权限
REVOKE ALL ON TABLE public.users FROM anon;
REVOKE ALL ON TABLE public.users FROM public;

-- 第二步：只允许读取非敏感字段（不含 password）
CREATE POLICY "users_anon_read_no_password" ON public.users
FOR SELECT TO anon, authenticated
USING (true)
WITH CHECK (false);

-- 第三步：明确禁止任何角色读取 password 列
REVOKE password ON TABLE public.users FROM anon;
REVOKE password ON TABLE public.users FROM authenticated;

-- 第四步：创建只读视图（不含 password）
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT
    id,
    name,
    avatar,
    created_at
FROM public.users;

-- 第五步：撤销对 users 表的直接访问，只允许通过视图
REVOKE ALL ON TABLE public.users FROM anon;
REVOKE ALL ON TABLE public.users FROM authenticated;
GRANT SELECT ON public.user_profiles TO anon, authenticated;

-- 第六步：posts 表 - 仅允许读取（公开帖子）
REVOKE ALL ON TABLE public.posts FROM anon, authenticated;
CREATE POLICY "posts_public_read" ON public.posts
FOR SELECT TO anon, authenticated
USING (true);
GRANT SELECT ON public.posts TO anon, authenticated;

-- 第七步：launches 表 - 仅允许读取
REVOKE ALL ON TABLE public.launches FROM anon, authenticated;
CREATE POLICY "launches_public_read" ON public.launches
FOR SELECT TO anon, authenticated
USING (true);
GRANT SELECT ON public.launches TO anon, authenticated;
