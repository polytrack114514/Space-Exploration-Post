// ==================== Supabase 配置 ====================

        const SUPABASE_URL = 'https://tktfrrvaqwbtdhiqwnna.supabase.co';

        const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdGZycnZhcXdidGRoaXF3bm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3MzcyMjYsImV4cCI6MjEwMTMxMzIyNn0.CYNPqmQUrnkMFUq-Bkd_09q7CjQ8rZlNX5brb5-UrbQ';

        const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // ==================== 数据 ====================

        let posts = [];

        let currentTab = 'hot';

        let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};

        let isLoading = false;

        // ==================== 官方机构账号配置 ====================

        const OFFICIAL_USERS = {

            'NASA': { avatar: 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg', badge: 'NASA官方' },

            'CNSA': { avatar: 'https://picx.zhimg.com/v2-264f1e06887851be0703902fb9f106ca_r.jpg?source=2c26e567', badge: '国家航天局' },

            'SpaceX': { avatar: 'https://i.imglt.com/20260802/f61b49848b4eda0e49a759683af30679.jpg', badge: 'SpaceX官方' },

            '其他火箭发射': { avatar: 'https://i0.hdslb.com/bfs/new_dyn/43b61571f1e9a172c5ef0e1bc70d709f3461574224251726.jpg', badge: '火箭发射' }

        };

        function isOfficialUser(name) {

            return !!OFFICIAL_USERS[name];

        }

        // ==================== 从云端加载帖子 ====================

        async function loadPosts() {

            isLoading = true;

            try {

                const { data: postData, error: postErr } = await sb.from('posts').select('*').order('time', { ascending: false });

                if (postErr) throw postErr;

                posts = postData || [];

                renderPosts();

                // 加载发射数据

                await loadLaunches();

            } catch (err) {

                console.error('加载失败:', err);

                document.getElementById('postsList').innerHTML = '<div class="empty-state"><div class="emoji">⚠️</div><p>加载失败，请检查网络连接</p></div>';

            }

            isLoading = false;

        }

        // ==================== 加载发射数据 ====================

        async function loadLaunches() {

            try {

                const { data, error } = await sb.from('launches').select('*').order('date', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {

                    launches = data;

                    renderLaunches();

                } else {

                    // 首次运行，插入默认数据

                    for (const l of launches) {

                        await sb.from('launches').insert({

                            rocket: l.rocket, agency: l.agency, date: l.date,

                            location: l.location, mission: l.mission,

                            image: l.image || '', description: l.description, status: l.status || 'tentative'

                        });

                    }

                }

            } catch (err) {

                console.error('加载发射数据失败:', err);

            }

        }

        // ==================== 更新单个帖子到 Supabase ====================

        async function updatePostDB(postId) {

            const post = posts.find(p => String(p.id) === String(postId));

            if (!post) return;

            try {

                const { error } = await sb.from('posts').update({

                    likes: post.likes || 0,

                    comments: post.comments || [],

                    pinned: post.pinned || false,

                    source_url: post.source_url || ''

                }).eq('id', postId);

                if (error) console.error('更新帖子失败:', error);

            } catch (err) {

                console.error('更新帖子失败:', err);

            }

        }

        // ==================== saveLaunches 兼容占位 ====================

        async function saveLaunches() {}

        // ==================== 自动刷新（每1分钟同步一次） ====================

        setInterval(() => {

            if (!isLoading) loadPosts();

        }, 60000);

        // ==================== 模态框 ====================

        function openModal() {

            document.getElementById('modalOverlay').classList.add('show');

            setTimeout(() => {

                document.getElementById('modalName').focus();

            }, 100);

        }

        function closeModal() {

            document.getElementById('modalOverlay').classList.remove('show');

            document.getElementById('modalName').value = '';

            document.getElementById('modalTitle').value = '';

            document.getElementById('modalContent').value = '';

            document.getElementById('modalImage').value = '';

            document.getElementById('modalSourceUrl').value = '';

            document.getElementById('modalName').readOnly = false;

            document.getElementById('modalName').style.opacity = '1';

        }

        document.getElementById('modalOverlay').addEventListener('click', function(e) {

            if (e.target === this) closeModal();

        });

        document.addEventListener('keydown', function(e) {

            if (e.key === 'Escape') { closeModal(); closeLaunchEditor(); }

        });

        // ==================== 发帖 ====================

        async function submitPost() {

            const name = document.getElementById('modalName').value.trim();

            const title = document.getElementById('modalTitle').value.trim();

            const content = document.getElementById('modalContent').value.trim();

            const sourceUrl = document.getElementById('modalSourceUrl') ? (document.getElementById('modalSourceUrl').value.trim() || '') : '';

            if (!name) {

                document.getElementById('modalName').focus();

                return;

            }

            if (!title && !content) {

                document.getElementById('modalTitle').focus();

                return;

            }

            const btn = document.getElementById('submitBtn');

            btn.disabled = true;

            btn.textContent = '发布中...';

            const newPost = {

                id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),

                title: title,

                content: content,

                author: name,

                avatar: getAvatar(name),

                image: document.getElementById('modalImage') ? (document.getElementById('modalImage').value.trim() || '') : '',

                source_url: sourceUrl,

                time: Date.now(),

                likes: 0,

                comments: []

            };

            // 插入到 Supabase

            try {

                const { error } = await sb.from('posts').insert({

                    id: newPost.id,

                    title: newPost.title,

                    content: newPost.content,

                    author: newPost.author,

                    avatar: newPost.avatar,

                    image: newPost.image,

                    source_url: newPost.source_url || '',

                    time: newPost.time,

                    likes: 0,

                    comments: [],

                    pinned: false

                });

                if (error) throw error;

                posts.unshift(newPost);

                closeModal();

                currentTab = 'new';

                updateTabs();

                renderPosts();

            } catch (err) {

                alert('发布失败: ' + err.message);

            }

            btn.disabled = false;

            btn.textContent = '发布';

        }

        // ==================== 点赞 ====================

        async function toggleLike(id) {

            const isLiked = likedPosts[id] || false;

            // 在本地找到帖子并修改

            const post = posts.find(p => p.id === id);

            if (post) {

                post.likes = isLiked ? Math.max(0, (post.likes || 0) - 1) : (post.likes || 0) + 1;

            }

            likedPosts[id] = !isLiked;

            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

            renderPosts();

            // 同步到 Supabase

            updatePostDB(id);

        }

        // ==================== 渲染 ====================

        let searchKeyword = '';

        function handleSearch(val) {

            searchKeyword = val.trim().toLowerCase();

            document.getElementById('searchClear').style.display = searchKeyword ? 'block' : 'none';

            renderPosts();

        }

        function clearSearch() {

            document.getElementById('searchInput').value = '';

            searchKeyword = '';

            document.getElementById('searchClear').style.display = 'none';

            renderPosts();

        }

        function renderPosts() {

            const list = document.getElementById('postsList');

            let displayPosts = [...posts];

            // 搜索过滤

            if (searchKeyword) {

                displayPosts = displayPosts.filter(p => {

                    const title = (p.title || '').toLowerCase();

                    const content = (p.content || '').toLowerCase();

                    const author = (p.author || '').toLowerCase();

                    const source = (p.source_url || '').toLowerCase();

                    return title.includes(searchKeyword) || content.includes(searchKeyword) || author.includes(searchKeyword) || source.includes(searchKeyword);

                });

            }

            if (currentTab === 'hot') {

                displayPosts.sort((a, b) => {

                    if (a.pinned && !b.pinned) return -1;

                    if (!a.pinned && b.pinned) return 1;

                    return (b.likes || 0) - (a.likes || 0);

                });

            } else {

                displayPosts.sort((a, b) => {

                    if (a.pinned && !b.pinned) return -1;

                    if (!a.pinned && b.pinned) return 1;

                    return (b.time || 0) - (a.time || 0);

                });

            }

            if (displayPosts.length === 0) {

                list.innerHTML = `

                    <div class="empty-state">

                        <div class="emoji">${searchKeyword ? '🔍' : '🚀'}</div>

                        <p>${searchKeyword ? '没有找到匹配的帖子，换个关键词试试吧' : '还没有帖子，点击右上角发布第一条宇宙探索动态吧'}</p>

                    </div>

                `;

                return;

            }

            list.innerHTML = displayPosts.map(post => {

                const isLiked = likedPosts[post.id] || false;

                return `

                    <div class="post-card" data-id="${post.id}">

                        <div class="post-header">

                            <div class="post-author">

                                <div class="avatar">${post.avatar.startsWith('http') ? `<img src="${post.avatar}" alt="avatar">` : post.avatar}</div>

                                <div class="author-info">

                                    <span class="author-name">

                                        ${escapeHtml(post.author)}

                                        ${OFFICIAL_USERS[post.author] ? `<span class="badge-official">${OFFICIAL_USERS[post.author].badge}</span>` : ''}

                                    </span>

                                    <span class="post-time">${formatTime(post.time)}</span>

                                </div>

                            </div>

                            <div style="display: flex; flex-shrink: 0; gap: 4px;">

                                <button class="pin-btn" onclick="togglePin('${post.id}')" title="置顶/取消置顶">${post.pinned ? '📌 取消置顶' : '📌 置顶'}</button>

                                <button class="delete-btn" onclick="deletePost('${post.id}')" title="删除帖子">🗑 删除</button>

                            </div>

                        </div>

                        ${post.title ? `<div class="post-title">${post.pinned ? '📌 ' : ''}${escapeHtml(post.title)}</div>` : ''}

                        ${post.image ? `<div class='post-images'><img src='${escapeHtml(post.image)}' class='post-image' alt='图片' onerror="this.style.display='none'"></div>` : ''}

                        <div class="post-content">${escapeHtml(post.content)}</div>

                        ${post.source_url ? `<div class="post-source"><span class="source-label">📄 内容来源：</span><a href="${escapeHtml(post.source_url)}" target="_blank" rel="noopener noreferrer" class="source-link">${escapeHtml(post.source_url.length > 60 ? post.source_url.substring(0, 60) + '...' : post.source_url)}</a></div>` : ''}

                        <div class="post-footer">

                            <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">

                                <span>${isLiked ? '❤️' : '🤍'}</span>

                                <span>${post.likes || 0}</span>

                            </button>

                            <button class="comments-toggle-btn" onclick="toggleComments('${post.id}')">

                                <span>💬</span>

                                <span>${(post.comments && post.comments.length) || 0}</span>

                            </button>

                        </div>

                        <div class="comments-section" id="comments-${post.id}">

                            <div class="comments-list" id="comments-list-${post.id}">

                                ${(post.comments && post.comments.length > 0) ? post.comments.map(c => `

                                    <div class="comment-item">

                                        <div class="comment-avatar">🌟</div>

                                        <div class="comment-body">

                                            <div class="comment-author">${escapeHtml(c.author)}</div>

                                            <div class="comment-text">${escapeHtml(c.content)}</div>

                                            <div class="comment-time">${formatTime(c.time)}</div>

                                        </div>

                                        <button class="action-btn" style="color:#ff5555;font-size:12px;" onclick="deleteComment('${post.id}', '${c.id}')">🗑️</button>

                                    </div>

                                `).join('') : '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 8px 0;">暂无评论，来做第一个评论的人吧</div>'}

                            </div>

                            <div class="comment-input-area">

                                <div class="comment-input-row">

                                    <input type="text" class="comment-input" id="comment-name-${post.id}" placeholder="你的名字" maxlength="20">

                                </div>

                                <textarea class="comment-textarea" id="comment-text-${post.id}" placeholder="写下你的评论..." maxlength="300"></textarea>

                                <button class="comment-submit" onclick="submitComment('${post.id}')">发送评论</button>

                            </div>

                        </div>

                    </div>

                `;

            }).join('');

        }

        async function togglePin(postId) {

            const password = prompt('请输入管理员密码：');

            if (password === null) return;

            if (password !== '1028') {

                alert('密码错误！');

                return;

            }

            const post = posts.find(p => String(p.id) === String(postId));

            if (post) {

                post.pinned = !post.pinned;

                await updatePostDB(postId);

                renderPosts();

                alert(post.pinned ? '📌 已置顶' : '📌 已取消置顶');

            }

        }

        async function deletePost(postId) {

            const password = prompt('请输入删除密码:');

            if (password === null) return;

            if (password !== '1028') {

                alert('密码错误，无法删除！');

                return;

            }

            if (!confirm('确定要删除这条帖子吗？')) return;

            try {

                const { error } = await sb.from('posts').delete().eq('id', postId);

                if (error) throw error;

                posts = posts.filter(p => String(p.id) !== String(postId));

                renderPosts();

                alert('🗑 帖子已删除');

            } catch (err) {

                alert('删除失败: ' + err.message);

            }

        }

        // ==================== 评论功能 ====================

        function toggleComments(postId) {

            const section = document.getElementById('comments-' + postId);

            if (section) {

                section.classList.toggle('show');

            }

        }

        async function submitComment(postId) {

            const nameInput = document.getElementById('comment-name-' + postId);

            const textInput = document.getElementById('comment-text-' + postId);

            const name = nameInput.value.trim();

            const content = textInput.value.trim();

            if (!name) {

                nameInput.focus();

                return;

            }

            if (!content) {

                textInput.focus();

                return;

            }

            const post = posts.find(p => String(p.id) === String(postId));

            if (!post) return;

            if (!post.comments) post.comments = [];

            post.comments.push({

                id: Date.now() + '_' + Math.random().toString(36).substr(2, 6),

                author: name,

                content: content,

                time: Date.now()

            });

            nameInput.value = '';

            textInput.value = '';

            await updatePostDB(postId);

            renderPosts();

            // 重新展开评论区

            setTimeout(() => {

                const section = document.getElementById('comments-' + postId);

                if (section) section.classList.add('show');

            }, 50);

        }

        async function deleteComment(postId, commentId) {

            const pwd = prompt('请输入删除密码：');

            if (pwd !== '1028') {

                alert('密码错误');

                return;

            }

            const post = posts.find(p => String(p.id) === String(postId));

            if (!post || !post.comments) return;

            post.comments = post.comments.filter(c => String(c.id) !== String(commentId));

            await updatePostDB(postId);

            renderPosts();

            setTimeout(() => {

                const section = document.getElementById('comments-' + postId);

                if (section) section.classList.add('show');

            }, 50);

        }

        // ==================== 工具函数 ====================

        function formatTime(timestamp) {

            const now = Date.now();

            const diff = now - timestamp;

            const minute = 60 * 1000;

            const hour = 60 * minute;

            const day = 24 * hour;

            if (diff < minute) return '刚刚';

            if (diff < hour) return Math.floor(diff / minute) + '分钟前';

            if (diff < day) return Math.floor(diff / hour) + '小时前';

            if (diff < 7 * day) return Math.floor(diff / day) + '天前';

            return new Date(timestamp).toLocaleDateString('zh-CN');

        }

        function getAvatar(name) {

            if (OFFICIAL_USERS[name]) return OFFICIAL_USERS[name].avatar;

            return '🚀';

        }

        function escapeHtml(text) {

            const div = document.createElement('div');

            div.textContent = text;

            return div.innerHTML;

        }

        function updateTabs() {

            document.querySelectorAll('.tab').forEach(tab => {

                tab.classList.toggle('active', tab.dataset.tab === currentTab);

            });

        }

        document.querySelectorAll('.tab').forEach(tab => {

            tab.addEventListener('click', () => {

                currentTab = tab.dataset.tab;

                updateTabs();

                renderPosts();

            });

        });

        // ==================== Supabase 无需心跳保活 ====================

        // ==================== 用户账号系统 ====================

        let currentUser = JSON.parse(localStorage.getItem('space_user')) || null;

        let authMode = 'login';

        let allUsers = [];

        async function loadUsers() {

            try {

                const { data, error } = await sb.from('users').select('*');

                if (error) throw error;

                allUsers = data || [];

            } catch (e) {

                console.error('加载用户失败:', e);

            }

        }

        async function saveUser(user) {

            try {

                const { error } = await sb.from('users').insert({

                    name: user.name,

                    password: user.password,

                    avatar: user.avatar

                });

                if (error) throw error;

            } catch (e) {

                console.error('保存用户失败:', e);

            }

        }

        function renderAuthArea() {

            const area = document.getElementById('authArea');

            if (!area) return;

            if (currentUser) {

                const av = getAvatar(currentUser.name);

                const avHtml = av.startsWith('http') ? `<img src="${av}" alt="avatar">` : av;

                const badge = OFFICIAL_USERS[currentUser.name] ? `<span class="auth-user-badge">${OFFICIAL_USERS[currentUser.name].badge}</span>` : '';

                area.innerHTML = `

                    <div class="auth-user">

                        <div class="auth-avatar-small">${avHtml}</div>

                        <span class="auth-name">${escapeHtml(currentUser.name)}</span>

                        ${badge}

                        <button class="btn-logout" onclick="handleLogout()">退出</button>

                    </div>

                `;

                renderLaunchControls();

            } else {

                area.innerHTML = `<button class="btn-auth" onclick="openAuthModal()">登录 / 注册</button>`;

            }

        }

        function openAuthModal() {

            authMode = 'login';

            updateAuthUI();

            document.getElementById('authUsername').value = '';

            document.getElementById('authPassword').value = '';

            document.getElementById('authConfirm').value = '';

            document.getElementById('authError').classList.remove('show');

            document.getElementById('authSuccess').classList.remove('show');

            document.getElementById('authModal').classList.add('show');

            setTimeout(() => document.getElementById('authUsername').focus(), 100);

        }

        function closeAuthModal() {

            document.getElementById('authModal').classList.remove('show');

        }

        function toggleAuthMode() {

            authMode = authMode === 'login' ? 'signup' : 'login';

            updateAuthUI();

            document.getElementById('authError').classList.remove('show');

            document.getElementById('authSuccess').classList.remove('show');

        }

        function updateAuthUI() {

            if (authMode === 'signup') {

                document.getElementById('authTitle').textContent = '注册';

                document.getElementById('authSubmitBtn').textContent = '注册';

                document.getElementById('authSwitchText').textContent = '已有账号？';

                document.getElementById('authSwitchLink').textContent = '登录';

                document.getElementById('authConfirmField').style.display = 'block';

            } else {

                document.getElementById('authTitle').textContent = '登录';

                document.getElementById('authSubmitBtn').textContent = '登录';

                document.getElementById('authSwitchText').textContent = '还没有账号？';

                document.getElementById('authSwitchLink').textContent = '注册';

                document.getElementById('authConfirmField').style.display = 'none';

            }

        }

        async function handleAuth() {

            const username = document.getElementById('authUsername').value.trim();

            const password = document.getElementById('authPassword').value;

            const confirm = document.getElementById('authConfirm').value;

            const errEl = document.getElementById('authError');

            const sucEl = document.getElementById('authSuccess');

            const btn = document.getElementById('authSubmitBtn');

            errEl.classList.remove('show');

            sucEl.classList.remove('show');

            if (!username) { showAuthErr('请输入用户名'); return; }

            if (!password || password.length < 6) { showAuthErr('密码至少6位'); return; }

            btn.disabled = true;

            btn.textContent = '请稍候...';

            await loadUsers();

            if (authMode === 'signup') {

                if (password !== confirm) { showAuthErr('两次密码不一致'); btn.disabled = false; btn.textContent = '注册'; return; }

                const exists = allUsers.find(u => u.name.toLowerCase() === username.toLowerCase());

                if (exists) { showAuthErr('该用户名已被注册'); btn.disabled = false; btn.textContent = '注册'; return; }

                const newUser = { name: username, password: password, avatar: getAvatar(username) };

                allUsers.push(newUser);

                await saveUser(newUser);

                showAuthSuc('注册成功！请登录');

                authMode = 'login';

                updateAuthUI();

                document.getElementById('authPassword').value = '';

                document.getElementById('authConfirm').value = '';

            } else {

                const user = allUsers.find(u => u.name.toLowerCase() === username.toLowerCase());

                if (!user || user.password !== password) { showAuthErr('用户名或密码错误'); btn.disabled = false; btn.textContent = '登录'; return; }

                currentUser = { name: user.name, avatar: user.avatar };

                localStorage.setItem('space_user', JSON.stringify(currentUser));

                closeAuthModal();

                renderAuthArea();

            }

            btn.disabled = false;

            btn.textContent = authMode === 'login' ? '登录' : '注册';

        }

        function showAuthErr(msg) {

            const el = document.getElementById('authError');

            el.textContent = msg; el.classList.add('show');

            document.getElementById('authSuccess').classList.remove('show');

        }

        function showAuthSuc(msg) {

            const el = document.getElementById('authSuccess');

            el.textContent = msg; el.classList.add('show');

            document.getElementById('authError').classList.remove('show');

        }

        function handleLogout() {

            currentUser = null;

            localStorage.removeItem('space_user');

            renderAuthArea();

            renderLaunchControls();

        }

        // Override openModal to require login

        const _origOpenModal = openModal;

        openModal = function() {

            if (!currentUser) {

                openAuthModal();

                return;

            }

            _origOpenModal();

            document.getElementById('modalName').value = currentUser.name;

            document.getElementById('modalName').readOnly = true;

            document.getElementById('modalName').style.opacity = '0.6';

            document.getElementById('modalTitle').focus();

        };

        // ==================== 火箭发射时间表 ====================

        let launches = [];

        let currentLaunchTab = 'upcoming';

        function renderLaunches() {

            const list = document.getElementById('launchList');

            const launchedList = document.getElementById('launchedList');

            if (!list) return;

            const now = Date.now();

            // 分离即将发射和已发射

            const upcoming = [];

            const launched = [];

            launches.forEach((l, i) => {

                if (l.status === 'tbd') {

                    // TBD 发射始终留在"近期发射"

                    upcoming.push({ data: l, origIndex: i });

                } else if (l.date - now <= 0) {

                    launched.push({ data: l, origIndex: i });

                } else {

                    upcoming.push({ data: l, origIndex: i });

                }

            });

            // 已发射按时间倒序，只保留前20个

            launched.sort((a, b) => b.data.date - a.data.date);

            if (launched.length > 20) {

                const toRemove = launched.slice(20);

                for (const item of toRemove) {

                    if (item.data.id) {

                        sb.from('launches').delete().eq('id', item.data.id).then(() => {}).catch(e => console.error('删除旧发射记录失败:', e));

                    }

                    const idx = launches.indexOf(item.data);

                    if (idx !== -1) launches.splice(idx, 1);

                }

                launched.length = 20;

            }

            // 渲染即将发射

            list.innerHTML = upcoming.length > 0 ? upcoming.map((item) => {

                const l = item.data;

                const i = item.origIndex;

                const diff = l.date - now;

                const isTBD = l.status === 'tbd';

                let badgeClass = 'badge-upcoming';

                let badgeText = '即将发射';

                if (isTBD) {

                    badgeClass = 'badge-tentative';

                    badgeText = '日期待定';

                } else {

                    if (l.status === 'tentative') {

                        badgeClass = 'badge-tentative';

                        badgeText = '待定';

                    }

                    if (diff > 0 && diff < 3 * 24 * 60 * 60 * 1000) {

                        badgeClass = 'badge-soon';

                        badgeText = '发射在即';

                    }

                }

                const dateStr = isTBD ? '发射日期待确定' : new Date(l.date).toLocaleString('zh-CN', {

                    month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'

                });

                let countdownHtml;

                if (isTBD) {

                    countdownHtml = `<div class="launch-countdown"><div class="launch-tbd-message">⏳ 发射日期待确定</div></div>`;

                } else {

                    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

                    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

                    const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

                    const secs = Math.floor((diff % (60 * 1000)) / 1000);

                    countdownHtml = `

                        <div class="launch-countdown">

                            <div class="countdown-box">

                                <div class="countdown-num" id="cd-days-${i}">${days}</div>

                                <div class="countdown-label">天</div>

                            </div>

                            <div class="countdown-box">

                                <div class="countdown-num" id="cd-hours-${i}">${String(hours).padStart(2,'0')}</div>

                                <div class="countdown-label">时</div>

                            </div>

                            <div class="countdown-box">

                                <div class="countdown-num" id="cd-mins-${i}">${String(mins).padStart(2,'0')}</div>

                                <div class="countdown-label">分</div>

                            </div>

                            <div class="countdown-box">

                                <div class="countdown-num" id="cd-secs-${i}">${String(secs).padStart(2,'0')}</div>

                                <div class="countdown-label">秒</div>

                            </div>

                        </div>

                    `;

                }

                return `

                    <div class="launch-card ${!isTBD && diff > 0 && diff < 3 * 24 * 60 * 60 * 1000 ? 'launching-soon' : ''}">

                        <div class="launch-card-top">

                            <div class="launch-info">

                                <div class="launch-rocket">${l.rocket}</div>

                                <div class="launch-agency">${l.agency}</div>

                                <div class="launch-meta">

                                    <span>📅 ${dateStr}</span>

                                    <span>📍 ${l.location}</span>

                                    <span>🎯 ${l.mission}</span>

                                </div>

                            </div>

                            <span class="launch-badge ${badgeClass}">${badgeText}</span>

                        </div>

                        ${countdownHtml}

                        ${l.image ? `<img src="${escapeHtml(l.image)}" class="launch-image" alt="发射图片" onerror="this.style.display='none'">` : ''}

                        <div class="launch-desc">${escapeHtml(l.description)}</div>

                        ${currentUser && isOfficialUser(currentUser.name) ? `

                        <div class="launch-card-actions">

                            <button class="launch-edit-btn" onclick="editLaunch(${i})">✏️ 编辑</button>

                            <button class="launch-delete-btn" onclick="deleteLaunch(${i})">🗑 删除</button>

                        </div>

                        ` : ''}

                    </div>

                `;

            }).join('') : '<div class="empty-state"><div class="emoji">🚀</div><p>暂无即将发射的火箭</p></div>';

            // 渲染已发射

            if (launchedList) {

                launchedList.innerHTML = launched.length > 0 ? launched.map((item) => {

                    const l = item.data;

                    const i = item.origIndex;

                    const dateStr = new Date(l.date).toLocaleString('zh-CN', {

                        month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'

                    });

                    const ago = Date.now() - l.date;

                    const agoDays = Math.floor(ago / (24 * 60 * 60 * 1000));

                    const agoHours = Math.floor((ago % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

                    const agoMins = Math.floor((ago % (60 * 60 * 1000)) / (60 * 1000));

                    let agoStr = '';

                    if (agoDays > 0) agoStr = `${agoDays}天${agoHours}小时前`;

                    else if (agoHours > 0) agoStr = `${agoHours}小时${agoMins}分钟前`;

                    else agoStr = `${agoMins}分钟前`;

                    return `

                        <div class="launch-card launched-card">

                            <div class="launch-card-top">

                                <div class="launch-info">

                                    <div class="launch-rocket">${l.rocket}</div>

                                    <div class="launch-agency">${l.agency}</div>

                                    <div class="launch-meta">

                                        <span>📅 ${dateStr}</span>

                                        <span>📍 ${l.location}</span>

                                        <span>🎯 ${l.mission}</span>

                                    </div>

                                </div>

                                <span class="launch-badge badge-launched">已发射</span>

                            </div>

                            <div class="launched-time">🚀 发射于 <strong>${agoStr}</strong></div>

                            ${l.image ? `<img src="${escapeHtml(l.image)}" class="launch-image" alt="发射图片" onerror="this.style.display='none'">` : ''}

                            <div class="launch-desc">${escapeHtml(l.description)}</div>

                            ${currentUser && isOfficialUser(currentUser.name) ? `

                            <div class="launch-card-actions">

                                <button class="launch-edit-btn" onclick="editLaunch(${i})">✏️ 编辑</button>

                                <button class="launch-delete-btn" onclick="deleteLaunch(${i})">🗑 删除</button>

                            </div>

                            ` : ''}

                        </div>

                    `;

                }).join('') : '<div class="empty-state"><div class="emoji">🏁</div><p>暂无已发射的火箭</p></div>';

            }

        }

        // Tab 切换

        function updateLaunchTabs() {

            document.querySelectorAll('.launch-tab').forEach(tab => {

                tab.classList.toggle('active', tab.dataset.launchTab === currentLaunchTab);

            });

            const list = document.getElementById('launchList');

            const launchedList = document.getElementById('launchedList');

            if (list) list.style.display = currentLaunchTab === 'upcoming' ? '' : 'none';

            if (launchedList) launchedList.style.display = currentLaunchTab === 'launched' ? '' : 'none';

        }

        document.querySelectorAll('.launch-tab').forEach(tab => {

            tab.addEventListener('click', () => {

                currentLaunchTab = tab.dataset.launchTab;

                updateLaunchTabs();

            });

        });

        function updateCountdowns() {

            const now = Date.now();

            let needRerender = false;

            launches.forEach((l, i) => {

                if (l.status === 'tbd') return; // 跳过TBD发射

                const diff = l.date - now;

                if (diff <= 0) {

                    needRerender = true;

                    return;

                }

                const days = Math.floor(diff / (24 * 60 * 60 * 1000));

                const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

                const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

                const secs = Math.floor((diff % (60 * 1000)) / 1000);

                const dEl = document.getElementById('cd-days-' + i);

                const hEl = document.getElementById('cd-hours-' + i);

                const mEl = document.getElementById('cd-mins-' + i);

                const sEl = document.getElementById('cd-secs-' + i);

                if (dEl) dEl.textContent = days;

                if (hEl) hEl.textContent = String(hours).padStart(2, '0');

                if (mEl) mEl.textContent = String(mins).padStart(2, '0');

                if (sEl) sEl.textContent = String(secs).padStart(2, '0');

            });

            if (needRerender) renderLaunches();

        }

        // ==================== 发射管理控件 ====================

        function renderLaunchControls() {

            const wrap = document.getElementById('launchControlsWrap');

            if (!wrap) return;

            wrap.innerHTML = '';

            if (currentUser && isOfficialUser(currentUser.name)) {

                wrap.innerHTML = '<button class="btn-add-launch" onclick="openLaunchEditor()">+ 添加发射</button>';

            }

        }

        // ==================== 发射编辑器 ====================

        let editingLaunchId = null;

        // ==================== 发射日期待确定开关 ====================

        function toggleLaunchDateTBD(checked) {

            const dateInput = document.getElementById('launchDate');

            dateInput.disabled = checked;

            if (checked) {

                dateInput.value = '';

            }

        }

        function openLaunchEditor() {

            editingLaunchId = null;

            document.getElementById('launchRocket').value = '';

            document.getElementById('launchAgency').value = '';

            document.getElementById('launchDate').value = '';

            document.getElementById('launchDateTBD').checked = false;

            document.getElementById('launchDate').disabled = false;

            document.getElementById('launchLocation').value = '';

            document.getElementById('launchMission').value = '';

            document.getElementById('launchImage').value = '';

            document.getElementById('launchDesc').value = '';

            document.getElementById('launchModalTitle').textContent = '添加火箭发射';

            document.getElementById('launchModalOverlay').classList.add('show');

            setTimeout(() => document.getElementById('launchRocket').focus(), 100);

        }

        function closeLaunchEditor() {

            document.getElementById('launchModalOverlay').classList.remove('show');

            editingLaunchId = null;

        }

        function editLaunch(index) {

            const l = launches[index];

            if (!l) return;

            editingLaunchId = index;

            // 检查是否为TBD（发射日期待确定）

            const isEditTBD = l.status === 'tbd';

            document.getElementById('launchDateTBD').checked = isEditTBD;

            document.getElementById('launchDate').disabled = isEditTBD;



            // 转换时间为 datetime-local 格式

            if (isEditTBD) {

                document.getElementById('launchDate').value = '';

            } else {

                const d = new Date(l.date);

                const localISO = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

                document.getElementById('launchDate').value = localISO;

            }



            document.getElementById('launchRocket').value = l.rocket || '';

            document.getElementById('launchAgency').value = l.agency || '';

            document.getElementById('launchLocation').value = l.location || '';

            document.getElementById('launchMission').value = l.mission || '';

            document.getElementById('launchImage').value = l.image || '';

            document.getElementById('launchDesc').value = l.description || '';

            document.getElementById('launchModalTitle').textContent = '编辑火箭发射';

            document.getElementById('launchModalOverlay').classList.add('show');

        }

        async function submitLaunch() {

            if (!currentUser || !isOfficialUser(currentUser.name)) {

                alert('只有官方机构账号才能管理发射时间表');

                return;

            }

            const rocket = document.getElementById('launchRocket').value.trim();

            const agency = document.getElementById('launchAgency').value.trim();

            const dateStr = document.getElementById('launchDate').value;

            const location = document.getElementById('launchLocation').value.trim();

            const mission = document.getElementById('launchMission').value.trim();

            const image = document.getElementById('launchImage').value.trim();

            const desc = document.getElementById('launchDesc').value.trim();

            const isTBD = document.getElementById('launchDateTBD').checked;

            if (!rocket) { document.getElementById('launchRocket').focus(); return; }

            if (!isTBD && !dateStr) { document.getElementById('launchDate').focus(); return; }

            const btn = document.getElementById('launchSubmitBtn');

            btn.disabled = true;

            btn.textContent = '保存中...';

            const launchData = {

                rocket: rocket,

                agency: agency,

                date: isTBD ? null : new Date(dateStr).getTime(),

                location: location,

                mission: mission,

                image: image,

                description: desc,

                status: isTBD ? 'tbd' : 'tentative'

            };

            if (editingLaunchId !== null) {

                // 更新现有发射记录

                const existing = launches[editingLaunchId];

                const dbId = existing.id;

                const { error } = await sb.from('launches').update({

                    rocket: rocket, agency: agency, date: isTBD ? null : launchData.date,

                    location: location, mission: mission, image: image,

                    description: desc, status: isTBD ? 'tbd' : 'tentative'

                }).eq('id', dbId);

                if (error) { alert('保存失败: ' + error.message); btn.disabled = false; btn.textContent = '保存'; return; }

                launches[editingLaunchId] = { ...launchData, id: dbId };

            } else {

                // 新增发射记录

                const { data: inserted, error } = await sb.from('launches').insert({

                    rocket: rocket, agency: agency, date: isTBD ? null : launchData.date,

                    location: location, mission: mission, image: image,

                    description: desc, status: isTBD ? 'tbd' : 'tentative'

                }).select();

                if (error) { alert('保存失败: ' + error.message); btn.disabled = false; btn.textContent = '保存'; return; }

                if (inserted && inserted[0]) launches.push(inserted[0]);

            }

            // 按日期排序（TBD排到最后）

            launches.sort((a, b) => {

                if (a.status === 'tbd' && b.status !== 'tbd') return 1;

                if (a.status !== 'tbd' && b.status === 'tbd') return -1;

                return (a.date || 0) - (b.date || 0);

            });

            renderLaunches();

            btn.disabled = false;

            btn.textContent = '保存';

            closeLaunchEditor();

        }

        async function deleteLaunch(index) {

            if (!currentUser || !isOfficialUser(currentUser.name)) return;

            if (!confirm('确定要删除这条发射信息吗？')) return;

            const launch = launches[index];

            if (launch && launch.id) {

                const { error } = await sb.from('launches').delete().eq('id', launch.id);

                if (error) { alert('删除失败: ' + error.message); return; }

            }

            launches.splice(index, 1);

            renderLaunches();

        }

        renderLaunches();

        renderLaunchControls();

        setInterval(updateCountdowns, 1000);

// ==================== 初始化 ====================

        // launchModalOverlay 在 script 之后渲染，这里绑定事件

        var lmo = document.getElementById('launchModalOverlay');

        if (lmo) lmo.addEventListener('click', function(e) {

            if (e.target === this) closeLaunchEditor();

        });

        renderAuthArea();

        loadUsers();

        loadPosts();