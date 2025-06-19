var posts=["2025/06/17/层次分析法/","2025/01/28/布朗运动 copy 2/","2025/01/28/布朗运动 copy 3/","2025/01/28/布朗运动/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"新周刊","link":"https://neweekly.com.cn/","avatar":"https://neweekly.com.cn/img/logo.png","descr":"我高中时期喜欢的一本杂志","siteshot":"https://horse.neweekly.com.cn/neweekly/3cc1930460ed90d6fdffd81dd872d3a9/20250610/a8234cc317eb4e399cc5058647029211.jpg"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg"},{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"新周刊","link":"https://neweekly.com.cn/","avatar":"https://neweekly.com.cn/img/logo.png","descr":"我高中时期喜欢的一本杂志","siteshot":"https://horse.neweekly.com.cn/neweekly/3cc1930460ed90d6fdffd81dd872d3a9/20250610/a8234cc317eb4e399cc5058647029211.jpg"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"萌芽","link":"http://www.mengya.com/","avatar":"http://www.mengya.com/wp-content/uploads/2019/12/cropped-logo_mengya-1@2x.png?v=1728423281","descr":"一个有趣的技术社区","siteshot":"http://www.mengya.com/wp-content/uploads/2025/03/MY202504f-1400x500.jpg","color":"vip","tag":"文学"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg","color":"vip","tag":"机械"},{"name":"萌芽","link":"http://www.mengya.com/","avatar":"http://www.mengya.com/wp-content/uploads/2019/12/cropped-logo_mengya-1@2x.png?v=1728423281","descr":"一个有趣的技术社区","siteshot":"http://www.mengya.com/wp-content/uploads/2025/03/MY202504f-1400x500.jpg","color":"vip","tag":"文学"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg","color":"vip","tag":"机械"},{"name":"新周刊","link":"https://neweekly.com.cn/","avatar":"https://neweekly.com.cn/img/logo.png","descr":"一个有趣的技术社区","siteshot":"https://horse.neweekly.com.cn/neweekly/3cc1930460ed90d6fdffd81dd872d3a9/20250610/a8234cc317eb4e399cc5058647029211.jpg","color":"vip","tag":"文学"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"萌芽","link":"http://www.mengya.com/","avatar":"http://www.mengya.com/wp-content/uploads/2019/12/cropped-logo_mengya-1@2x.png?v=1728423281","descr":"一个有趣的技术社区","siteshot":"http://www.mengya.com/wp-content/uploads/2025/03/MY202504f-1400x500.jpg","color":"vip","tag":"文学"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg","color":"vip","tag":"机械"},{"name":"萌芽","link":"http://www.mengya.com/","avatar":"http://www.mengya.com/wp-content/uploads/2019/12/cropped-logo_mengya-1@2x.png?v=1728423281","descr":"一个有趣的技术社区","siteshot":"http://www.mengya.com/wp-content/uploads/2025/03/MY202504f-1400x500.jpg","color":"vip","tag":"文学"},{"name":"机甲大师","link":"https://bbs.robomaster.com/","avatar":"https://terra-cn-oss-cdn-public-pro.oss-cn-hangzhou.aliyuncs.com/b2a076471c6c4b72b574a977334d3e05/b398c04c-23e1-46ca-b86f-88d078a83a4e","descr":"一个有趣的技术社区","siteshot":"https://hz-rm-bbs-web-prod.oss-cn-hangzhou.aliyuncs.com/bbs-prod/f137c7b669b64ee0941eac73e0b3a810.jpg","color":"vip","tag":"机械"},{"name":"新周刊","link":"https://neweekly.com.cn/","avatar":"https://neweekly.com.cn/img/logo.png","descr":"一个有趣的技术社区","siteshot":"https://horse.neweekly.com.cn/neweekly/3cc1930460ed90d6fdffd81dd872d3a9/20250610/a8234cc317eb4e399cc5058647029211.jpg","color":"vip","tag":"文学"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };