/**
 * Flag页面交互功能
 * 实现目标卡片的翻转效果和动画
 */

(function() {
  'use strict';

  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    initFlagPage();
  });

  function initFlagPage() {
    initCardFlip();
    initAnimations();
  }

  // 初始化卡片翻转功能
  function initCardFlip() {
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
      // 鼠标悬停时翻转卡片
      card.addEventListener('mouseenter', function() {
        this.classList.add('flipped');
      });
      
      // 鼠标离开时翻转回正面
      card.addEventListener('mouseleave', function() {
        this.classList.remove('flipped');
      });
      
      // 设置无障碍属性
      card.setAttribute('aria-label', '悬停查看目标详情');
    });
  }



  // 初始化动画效果
  function initAnimations() {
    // 卡片入场动画
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    // 观察所有卡片
    document.querySelectorAll('.goal-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // 工具函数：格式化日期
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // 工具函数：计算剩余天数
  function calculateDaysLeft(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // 导出函数供外部使用
  window.flagPageUtils = {
    formatDate: formatDate,
    calculateDaysLeft: calculateDaysLeft
  };

})();