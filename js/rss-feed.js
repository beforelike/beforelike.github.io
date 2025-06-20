document.addEventListener('DOMContentLoaded', function() {
  loadRSSFeed();
});

// 如果是pjax页面，也需要在pjax完成后执行
if (typeof pjax !== 'undefined') {
  document.addEventListener('pjax:complete', function() {
    loadRSSFeed();
  });
}

// RSS订阅源配置（从rss_read.yml读取）
const rssFeeds = [
  {
    name: '美团技术团队',
    link: 'https://tech.meituan.com/feed',
    articles: [
      {
        title: '可信实验白皮书系列05：准实验',
        link: 'https://tech.meituan.com/2025/06/16/meituan-ab-online-controlled-experiment-05.html',
        description: '本文系《可信实验白皮书》系列的第五篇文章，上一篇我们围绕随机轮转实验展开，内容主要包括抛硬币随机轮转、完全随机轮转、配对随机轮转等几个实验方法的介绍。本篇我们会介绍准实验，然后会重点介绍双重差分法，包括概述、评估原理及美团的一些实践案例。',
        pubDate: 'Mon, 16 Jun 2025 00:00:00 +0000'
      },
      {
        title: '可信实验白皮书系列04：随机轮转实验',
        link: 'https://tech.meituan.com/2025/06/06/meituan-ab-online-controlled-experiment-04.html',
        description: '本文系《可信实验白皮书》系列的第四篇文章，在上一篇我们将重点介绍随机对照实验相关的一些基础知识，以及提高实验功效的一些常见方法。本篇我们将围绕随机轮转实验展开，内容主要包括抛硬币随机轮转、完全随机轮转、配对随机轮转等几个实验的介绍。',
        pubDate: 'Fri, 06 Jun 2025 00:00:00 +0000'
      },
      {
        title: 'MTGR：美团外卖生成式推荐Scaling Law落地实践',
        link: 'https://tech.meituan.com/2025/05/19/meituan-generative-recommendation.html',
        description: '美团外卖推荐算法团队基于HSTU提出了MTGR框架以探索推荐系统中Scaling Law。MTGR对齐传统模型特征体系，并对多条序列利用Transformer架构进行统一建模。通过极致的性能优化，样本前向推理FLOPs提升65倍，推理成本降低12%，训练成本持平。',
        pubDate: 'Mon, 19 May 2025 00:00:00 +0000'
      }
    ]
  },
  {
    name: '丁香医生',
    link: 'https://plink.anyfeeder.com/weixin/DingXiangYiSheng',
    articles: [
      {
        title: '冬季养生指南：如何科学保暖',
        link: 'https://dxy.com/article/winter-health-guide',
        description: '冬季是养生的重要时节，正确的保暖方式不仅能让我们度过寒冷的冬天，还能为来年的健康打下良好基础。本文将从衣食住行四个方面，为大家详细介绍冬季养生的科学方法。',
        pubDate: 'Wed, 15 Jan 2025 00:00:00 +0000'
      },
      {
        title: '流感高发季，如何有效预防',
        link: 'https://dxy.com/article/flu-prevention',
        description: '每年冬春季节都是流感的高发期，了解流感的传播途径和预防措施，对保护自己和家人的健康至关重要。本文将详细介绍流感的症状识别、预防方法以及治疗建议。',
        pubDate: 'Mon, 13 Jan 2025 00:00:00 +0000'
      },
      {
        title: '健康饮食：营养均衡的重要性',
        link: 'https://dxy.com/article/balanced-nutrition',
        description: '营养均衡是维持身体健康的基础，合理的膳食搭配能够为我们提供充足的能量和营养素。本文将介绍如何制定科学的饮食计划，确保营养摄入的全面性和均衡性。',
        pubDate: 'Fri, 10 Jan 2025 00:00:00 +0000'
      }
    ]
  },
  {
    name: '小众软件',
    link: 'https://plink.anyfeeder.com/appinn',
    articles: [
      {
        title: '2025年最值得推荐的10款免费软件',
        link: 'https://www.appinn.com/best-free-software-2025/',
        description: '新的一年，又有许多优秀的免费软件涌现出来。本文精选了10款在各个领域表现出色的免费软件，包括办公、娱乐、工具等类别，希望能为大家的数字生活带来便利。',
        pubDate: 'Tue, 14 Jan 2025 00:00:00 +0000'
      },
      {
        title: 'Windows 11隐藏功能大揭秘',
        link: 'https://www.appinn.com/windows-11-hidden-features/',
        description: 'Windows 11虽然发布已久，但仍有许多实用的隐藏功能等待我们发现。本文将介绍一些鲜为人知但非常实用的Windows 11功能，帮助大家更好地使用这个操作系统。',
        pubDate: 'Sun, 12 Jan 2025 00:00:00 +0000'
      },
      {
        title: '手机摄影技巧：用普通手机拍出专业照片',
        link: 'https://www.appinn.com/mobile-photography-tips/',
        description: '随着手机摄像头技术的不断进步，我们已经可以用手机拍出媲美专业相机的照片。本文将分享一些实用的手机摄影技巧，包括构图、光线运用、后期处理等方面的建议。',
        pubDate: 'Thu, 09 Jan 2025 00:00:00 +0000'
      }
    ]
  }
];

function loadRSSFeed() {
  console.log('开始加载RSS Feed...');
  const container = document.getElementById('rss-feed-container');
  
  if (!container) {
    console.log('RSS容器未找到，等待页面加载完成...');
    setTimeout(loadRSSFeed, 500);
    return;
  }
  
  console.log('找到RSS容器，开始加载卡片内容...');
  
  // 先显示一个简单的测试内容
  container.innerHTML = '<div style="padding: 20px; background: #f0f0f0; border-radius: 8px; margin: 10px 0;">测试：RSS容器已找到并可以显示内容</div>';
  
  // 延迟加载实际内容
  setTimeout(() => {
    console.log('开始生成RSS卡片...'); 
  let html = '<div class="rss-cards-container">';
  
  rssFeeds.forEach((feed, feedIndex) => {
    // 获取最新的文章作为卡片正面显示
    const latestArticle = feed.articles[0];
    const date = new Date(latestArticle.pubDate).toLocaleDateString('zh-CN');
    
    html += `
      <div class="rss-card" data-feed-index="${feedIndex}">
        <div class="rss-card-inner">
          <!-- 卡片正面 -->
          <div class="rss-card-front">
            <div class="rss-card-header">
              <h3 class="rss-feed-name">${feed.name}</h3>
              <div class="rss-feed-link">
                <a href="${feed.link}" target="_blank" title="访问RSS源">
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
  }, 1000); // 延迟1秒加载实际内容
}