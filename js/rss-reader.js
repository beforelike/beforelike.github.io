// RSS阅读器功能
document.addEventListener('DOMContentLoaded', function() {
    loadRSSReader();
});

document.addEventListener('pjax:complete', function() {
    loadRSSReader();
});

// 加载RSS数据
async function loadRSSData() {
    try {
        const response = await fetch('/json/rss-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取RSS数据失败:', error);
        throw error;
    }
}

// 初始化RSS阅读器
function initializeRSSReader(rssFeeds) {

function loadRSSReader() {
    const rssReadPage = document.getElementById('rss-read-page');
    if (!rssReadPage) return;

    // 从JSON文件加载RSS数据
    loadRSSData().then(rssFeeds => {
        initializeRSSReader(rssFeeds);
    }).catch(error => {
        console.error('加载RSS数据失败:', error);
        // 使用备用数据
        const fallbackFeeds = [
        {
            name: '美团技术团队',
            url: 'https://tech.meituan.com/feed',
            articles: [
                {
                    title: '美团外卖广告智能投放技术实践',
                    link: 'https://tech.meituan.com/2024/12/26/meituan-waimai-ad-intelligent-delivery.html',
                    pubDate: '2024-12-26',
                    description: '本文介绍了美团外卖在广告智能投放方面的技术实践，包括算法优化、数据处理等方面的创新。'
                },
                {
                    title: '基于机器学习的用户画像构建实践',
                    link: 'https://tech.meituan.com/2024/12/20/user-profile-ml.html',
                    pubDate: '2024-12-20',
                    description: '详细介绍了美团如何利用机器学习技术构建精准的用户画像系统，提升个性化推荐效果。'
                },
                {
                    title: '分布式系统中的一致性保证机制',
                    link: 'https://tech.meituan.com/2024/12/15/distributed-consistency.html',
                    pubDate: '2024-12-15',
                    description: '探讨了在大规模分布式系统中如何保证数据一致性，包括各种一致性算法的应用场景。'
                },
                {
                    title: '高并发场景下的缓存设计与优化',
                    link: 'https://tech.meituan.com/2024/12/10/cache-optimization.html',
                    pubDate: '2024-12-10',
                    description: '深入分析高并发场景下缓存系统的设计原则，包括缓存穿透、缓存雪崩等问题的解决方案。'
                },
                {
                    title: '微服务架构下的服务治理实践',
                    link: 'https://tech.meituan.com/2024/12/05/microservice-governance.html',
                    pubDate: '2024-12-05',
                    description: '分享美团在微服务架构演进过程中的服务治理经验，包括服务发现、负载均衡、熔断降级等。'
                },
                {
                    title: 'AI在推荐系统中的应用与实践',
                    link: 'https://tech.meituan.com/2024/11/30/ai-recommendation.html',
                    pubDate: '2024-11-30',
                    description: '介绍人工智能技术在推荐系统中的具体应用，包括深度学习模型的设计和优化策略。'
                },
                {
                    title: '大数据平台架构设计与演进',
                    link: 'https://tech.meituan.com/2024/11/25/bigdata-platform.html',
                    pubDate: '2024-11-25',
                    description: '详述美团大数据平台的架构设计思路和技术演进历程，为同行提供参考。'
                },
                {
                    title: '容器化部署的最佳实践',
                    link: 'https://tech.meituan.com/2024/11/20/container-deployment.html',
                    pubDate: '2024-11-20',
                    description: '总结容器化部署过程中的经验教训，包括Docker优化、Kubernetes集群管理等实用技巧。'
                },
                {
                    title: '前端性能优化的系统性方法',
                    link: 'https://tech.meituan.com/2024/11/15/frontend-performance.html',
                    pubDate: '2024-11-15',
                    description: '从多个维度分析前端性能优化策略，包括代码分割、资源压缩、CDN部署等技术手段。'
                }
            ]
        },
        {
            name: '丁香医生',
            url: 'https://plink.anyfeeder.com/weixin/DingXiangYiSheng',
            articles: [
                {
                    title: '冬季养生指南：如何科学保暖',
                    link: 'https://dxy.com/article/winter-health-guide',
                    pubDate: '2024-12-25',
                    description: '专业医生为您详解冬季养生的科学方法，包括饮食调理、运动保健等实用建议。'
                },
                {
                    title: '疫苗接种常见问题解答',
                    link: 'https://dxy.com/article/vaccine-qa',
                    pubDate: '2024-12-22',
                    description: '针对疫苗接种过程中的常见疑问，提供权威、专业的医学解答。'
                },
                {
                    title: '儿童营养搭配的科学原则',
                    link: 'https://dxy.com/article/child-nutrition',
                    pubDate: '2024-12-18',
                    description: '儿科专家分享儿童营养搭配的科学原则，帮助家长为孩子制定健康饮食计划。'
                },
                {
                    title: '糖尿病患者的饮食管理指南',
                    link: 'https://dxy.com/article/diabetes-diet',
                    pubDate: '2024-12-15',
                    description: '内分泌科医生详细解读糖尿病患者的饮食注意事项，提供实用的血糖控制方法。'
                },
                {
                    title: '心理健康：如何应对工作压力',
                    link: 'https://dxy.com/article/work-stress-management',
                    pubDate: '2024-12-12',
                    description: '心理专家分享缓解工作压力的有效方法，帮助职场人士维护心理健康。'
                },
                {
                    title: '老年人健康体检的重要项目',
                    link: 'https://dxy.com/article/elderly-health-checkup',
                    pubDate: '2024-12-08',
                    description: '老年医学专家推荐适合老年人的健康体检项目，早发现早预防常见疾病。'
                },
                {
                    title: '运动损伤的预防与处理',
                    link: 'https://dxy.com/article/sports-injury-prevention',
                    pubDate: '2024-12-05',
                    description: '运动医学专家介绍常见运动损伤的预防措施和应急处理方法。'
                },
                {
                    title: '女性健康：妇科检查的重要性',
                    link: 'https://dxy.com/article/gynecological-examination',
                    pubDate: '2024-12-01',
                    description: '妇科专家强调定期妇科检查的重要性，介绍各项检查的意义和注意事项。'
                },
                {
                    title: '睡眠质量与健康的关系',
                    link: 'https://dxy.com/article/sleep-quality-health',
                    pubDate: '2024-11-28',
                    description: '睡眠医学专家解析睡眠质量对身体健康的影响，提供改善睡眠的科学方法。'
                },
                {
                    title: '常见皮肤病的识别与护理',
                    link: 'https://dxy.com/article/skin-disease-care',
                    pubDate: '2024-11-25',
                    description: '皮肤科医生介绍常见皮肤病的症状特点和日常护理要点。'
                }
            ]
        },
        {
            name: '阮一峰的网络日志',
            url: 'https://www.ruanyifeng.com/blog/atom.xml',
            articles: [
                {
                    title: '科技爱好者周刊（第 285 期）',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/weekly-issue-285.html',
                    pubDate: '2024-12-20',
                    description: '本期介绍了最新的前端开发工具、人工智能应用案例，以及一些有趣的开源项目。'
                },
                {
                    title: 'JavaScript 的新特性：装饰器语法',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/javascript-decorators.html',
                    pubDate: '2024-12-18',
                    description: '详细介绍 JavaScript 装饰器语法的使用方法和实际应用场景。'
                },
                {
                    title: 'Web Components 实战指南',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/web-components-guide.html',
                    pubDate: '2024-12-15',
                    description: '从零开始学习 Web Components，包括自定义元素、Shadow DOM 等核心概念。'
                },
                {
                    title: 'CSS Grid 布局完全指南',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/css-grid-complete-guide.html',
                    pubDate: '2024-12-12',
                    description: '全面解析 CSS Grid 布局系统，从基础语法到高级应用技巧。'
                },
                {
                    title: 'Node.js 性能优化实践',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/nodejs-performance.html',
                    pubDate: '2024-12-08',
                    description: '分享 Node.js 应用性能优化的实用技巧和最佳实践。'
                },
                {
                    title: 'TypeScript 5.0 新特性解析',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/typescript-5-features.html',
                    pubDate: '2024-12-05',
                    description: '深入了解 TypeScript 5.0 版本的新增功能和改进。'
                },
                {
                    title: 'React 18 并发特性详解',
                    link: 'https://www.ruanyifeng.com/blog/2024/12/react-18-concurrent.html',
                    pubDate: '2024-12-01',
                    description: '解释 React 18 中的并发渲染机制和 Suspense 的使用方法。'
                },
                {
                    title: 'Webpack 5 模块联邦实战',
                    link: 'https://www.ruanyifeng.com/blog/2024/11/webpack-module-federation.html',
                    pubDate: '2024-11-28',
                    description: '通过实际案例学习 Webpack 5 模块联邦的配置和应用。'
                },
                {
                    title: 'PWA 开发完整教程',
                    link: 'https://www.ruanyifeng.com/blog/2024/11/pwa-development-tutorial.html',
                    pubDate: '2024-11-25',
                    description: '从零开始构建渐进式 Web 应用，包括 Service Worker、缓存策略等。'
                }
            ]
        },
        {
            name: '小众软件',
            url: 'https://plink.anyfeeder.com/appinn',
            articles: [
                {
                    title: '2024年度最佳开源软件推荐',
                    link: 'https://appinn.com/best-opensource-2024',
                    pubDate: '2024-12-28',
                    description: '盘点2024年最值得关注的开源软件，涵盖开发工具、办公软件、娱乐应用等多个领域。'
                },
                {
                    title: 'Windows 11 隐藏功能大揭秘',
                    link: 'https://appinn.com/windows11-hidden-features',
                    pubDate: '2024-12-24',
                    description: '发现Windows 11中那些鲜为人知但非常实用的隐藏功能，提升您的使用体验。'
                },
                {
                    title: '跨平台文件同步工具对比评测',
                    link: 'https://appinn.com/file-sync-tools-comparison',
                    pubDate: '2024-12-21',
                    description: '详细对比多款跨平台文件同步工具的功能特点、性能表现和使用体验。'
                },
                {
                    title: '安卓手机必备的实用工具推荐',
                    link: 'https://appinn.com/android-essential-tools',
                    pubDate: '2024-12-18',
                    description: '精选安卓平台上最实用的工具应用，涵盖系统优化、文件管理、效率提升等方面。'
                },
                {
                    title: 'macOS 系统清理与优化指南',
                    link: 'https://appinn.com/macos-cleanup-optimization',
                    pubDate: '2024-12-15',
                    description: '详细介绍 macOS 系统的清理方法和性能优化技巧，让你的 Mac 运行更流畅。'
                },
                {
                    title: '免费在线工具集合推荐',
                    link: 'https://appinn.com/free-online-tools-collection',
                    pubDate: '2024-12-12',
                    description: '收集整理各类免费在线工具，包括图片处理、文档转换、代码编辑等实用功能。'
                },
                {
                    title: 'Chrome 浏览器扩展精选',
                    link: 'https://appinn.com/chrome-extensions-selection',
                    pubDate: '2024-12-08',
                    description: '推荐一些提升浏览体验的 Chrome 扩展，涵盖广告拦截、密码管理、开发工具等。'
                },
                {
                    title: 'Linux 桌面环境对比评测',
                    link: 'https://appinn.com/linux-desktop-environments',
                    pubDate: '2024-12-05',
                    description: '深入对比主流 Linux 桌面环境的特点和使用体验，帮助用户选择合适的桌面。'
                },
                {
                    title: '开源替代软件推荐指南',
                    link: 'https://appinn.com/opensource-alternatives-guide',
                    pubDate: '2024-12-01',
                    description: '为常用商业软件推荐优秀的开源替代方案，既省钱又安全。'
                },
                {
                    title: '移动端办公应用横向评测',
                    link: 'https://appinn.com/mobile-office-apps-review',
                    pubDate: '2024-11-28',
                    description: '全面评测各大移动办公应用的功能特点和使用体验。'
                },
                {
                    title: '数据备份方案完全指南',
                    link: 'https://appinn.com/data-backup-complete-guide',
                    pubDate: '2024-11-25',
                    description: '详细介绍个人和企业数据备份的最佳实践和工具推荐。'
                }
            ]
        }
    ];
        initializeRSSReader(fallbackFeeds);
    });
}

// 初始化RSS阅读器的主要逻辑
function initializeRSSReader(rssFeeds) {
    // 初始化RSS源选择器
    const feedSelect = document.getElementById('rss-feed-select');
    const articlesList = document.getElementById('rss-articles-list');

    // 填充RSS源选项
    rssFeeds.forEach((feed, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = feed.name;
        feedSelect.appendChild(option);
    });

    // 检查URL参数，自动选择RSS源
    const urlParams = new URLSearchParams(window.location.search);
    const feedParam = urlParams.get('feed');
    if (feedParam !== null && feedParam !== '' && feedParam < rssFeeds.length) {
        feedSelect.value = feedParam;
        const selectedFeed = rssFeeds[feedParam];
        displayArticles(selectedFeed);
    }

    // 监听RSS源选择变化
    feedSelect.addEventListener('change', function() {
        const selectedIndex = this.value;
        if (selectedIndex === '') {
            articlesList.innerHTML = '<div class="rss-loading">请先选择RSS源</div>';
            return;
        }

        const selectedFeed = rssFeeds[selectedIndex];
        displayArticles(selectedFeed);
        
        // 更新URL参数
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('feed', selectedIndex);
        window.history.replaceState({}, '', newUrl);
    });

    function displayArticles(feed) {
        articlesList.innerHTML = '';
        
        // 创建RSS源标题
        const feedHeader = document.createElement('div');
        feedHeader.className = 'rss-feed-header';
        feedHeader.innerHTML = `
            <h2>${feed.name}</h2>
            <p class="rss-feed-url">来源：${feed.url}</p>
        `;
        articlesList.appendChild(feedHeader);

        // 创建文章列表
        const articlesContainer = document.createElement('div');
        articlesContainer.className = 'rss-articles';

        feed.articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'rss-article';
            articleElement.innerHTML = `
                <div class="rss-article-header">
                    <h3 class="rss-article-title">
                        <a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>
                    </h3>
                    <time class="rss-article-date">${article.pubDate}</time>
                </div>
                <div class="rss-article-content">
                    <p class="rss-article-description">${article.description}</p>
                </div>
            `;
            articlesContainer.appendChild(articleElement);
        });

        articlesList.appendChild(articlesContainer);
    }
}