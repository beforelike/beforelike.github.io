document.addEventListener('DOMContentLoaded', function() {
  loadRSSFeed();
});

// 如果是pjax页面，也需要在pjax完成后执行
if (typeof pjax !== 'undefined') {
  document.addEventListener('pjax:complete', function() {
    loadRSSFeed();
  });
}

// 全局变量存储RSS数据
let rssFeeds = [];

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
    // 返回备用数据
    return [
      {
        name: 'Nature',
        url: 'https://www.nature.com/nature.rss',
        articles: [
          {
            title: '暂无文章数据',
            link: '#',
            description: 'RSS数据加载失败，请稍后重试',
            pubDate: new Date().toISOString()
          }
        ]
      }
    ];
  }
}

async function loadRSSFeed() {
  console.log('开始加载RSS Feed...');
  const container = document.getElementById('rss-feed-container');
  
  if (!container) {
    console.log('RSS容器未找到，等待页面加载完成...');
    setTimeout(loadRSSFeed, 500);
    return;
  }
  
  console.log('找到RSS容器，开始加载RSS数据...');
  
  // 显示加载状态
  container.innerHTML = '<div class="rss-loading">正在加载科研期刊最新论文...</div>';
  
  try {
    // 加载RSS数据
    rssFeeds = await loadRSSData();
    console.log('RSS数据加载成功，共', rssFeeds.length, '个源');
    
    // 过滤掉没有文章的源
    rssFeeds = rssFeeds.filter(feed => feed.articles && feed.articles.length > 0);
    console.log('过滤后有效RSS源数量:', rssFeeds.length);
    
    if (rssFeeds.length === 0) {
      container.innerHTML = '<div class="rss-error">暂无可用的RSS数据，请稍后重试</div>';
      return;
    }
    
    console.log('开始生成RSS卡片...'); 
  let html = '<div class="rss-cards-container">';
  
  rssFeeds.forEach((feed, feedIndex) => {
    // 获取最新的文章作为卡片正面显示
    const latestArticle = feed.articles[0];
    const date = new Date(latestArticle.pubDate).toLocaleDateString('zh-CN');
    const feedLink = feed.url || feed.link || '#'; // 兼容不同的字段名
    
    html += `
      <div class="rss-card" data-feed-index="${feedIndex}">
        <div class="rss-card-inner">
          <!-- 卡片正面 -->
          <div class="rss-card-front">
            <div class="rss-card-header">
              <h3 class="rss-feed-name">${feed.name}</h3>
              <div class="rss-feed-link">
                <a href="${feedLink}" target="_blank" title="访问RSS源">
                  <i class="fas fa-rss"></i>
                </a>
              </div>
            </div>
            <div class="rss-latest-article">
              <h4 class="article-title">
                <a href="${latestArticle.link}" target="_blank">${latestArticle.title}</a>
              </h4>
              <div class="article-meta">
                <span class="article-date">${date}</span>
              </div>
              <div class="article-preview">
                ${latestArticle.description.substring(0, 100)}...
              </div>
            </div>
            <div class="rss-card-footer">
              <span class="hover-tip">悬停查看更多文章</span>
            </div>
          </div>
          
          <!-- 卡片背面 -->
          <div class="rss-card-back">
            <div class="rss-card-header">
              <h3 class="rss-feed-name">${feed.name}</h3>
              <span class="articles-count">${feed.articles.length} 篇文章</span>
            </div>
            <div class="rss-articles-list">
    `;
    
    // 显示所有文章列表
    feed.articles.forEach((article, index) => {
      const articleDate = new Date(article.pubDate).toLocaleDateString('zh-CN');
      html += `
        <div class="article-item ${index === 0 ? 'latest' : ''}">
          <div class="article-title-small">
            <a href="${article.link}" target="_blank">${article.title}</a>
          </div>
          <div class="article-date-small">${articleDate}</div>
        </div>
      `;
    });
    
    html += `
            </div>
            <div class="rss-card-footer">
              <a href="/rss-read/?feed=${feedIndex}" class="view-more-btn">
                查看更多 <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  
  console.log('生成的RSS卡片HTML长度:', html.length);
  container.innerHTML = html;
  console.log('RSS卡片内容已加载到页面');
  
  } catch (error) {
    console.error('加载RSS数据时出错:', error);
    container.innerHTML = '<div class="rss-error">加载RSS数据失败，请刷新页面重试</div>';
  }
}