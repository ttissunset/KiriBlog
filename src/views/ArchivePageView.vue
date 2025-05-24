<template>
  <div class="archive-page">
    <!-- 归档内容 -->
    <div class="archive-content">
      <!-- 年份区块 -->
      <div class="year-block">
        <h2 class="year-title">2025</h2>

        <div class="article-timeline">
          <!-- 文章条目 -->
          <div class="article-item">
            <div class="article-date">03-16</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >记一次 Linux 服务器迁移与抢救历程</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag note">记录 / 生活记录</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">03-07</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >Redux 数据仓库的数据持久化和 Next.js 中使用流程 | JustPure
                  起始页的构建历程</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag tech">文章 / 技术学习</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">03-02</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >零成本手把手带你建一个学习笔记网站（AriaDocs
                  项目的使用简记）</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag tech">文章 / 折腾不止</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">02-27</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >最近的坎坷故事_多项目并行、偶遇传染病、DeepSeek
                  本地化部署，及记一次开源 WAF 尝试</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag note">记录 / 生活感悟</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">02-19</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >动手部署 Grtblog 前后端，即刻拥有自己的博客网站</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag tech">文章 / 技术学习</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">02-16</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >刷机半生，归来仍是 MIUI | HyperOS2 初体验及亿些吐槽</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag tech">文章 / 折腾不止</div>
              </div>
            </div>
          </div>

          <div class="article-item">
            <div class="article-date">02-11</div>
            <div class="article-dot"></div>
            <div class="article-content">
              <div class="article-left">
                <a href="#" class="article-title"
                  >扩展编辑器，整合搜索...问题解决清单控！</a
                >
              </div>
              <div class="article-right">
                <div class="article-tag note">记录 / 简单记录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const archiveContent = document.querySelector('.archive-content');
  if (!archiveContent) return;
  // 只处理纯文本节点
  function typeText(node) {
    if (node.nodeType === 3) {
      const text = node.nodeValue;
      node.nodeValue = '';
      let i = 0;
      function typeChar() {
        if (i <= text.length) {
          node.nodeValue = text.slice(0, i);
          i++;
          setTimeout(typeChar, 18);
        }
      }
      typeChar();
    } else if (node.nodeType === 1) {
      // 递归处理子节点
      node.childNodes.forEach(typeText);
    }
  }
  archiveContent.childNodes.forEach(typeText);
});
</script>

<style scoped>
:root {
  --purplr-crayola: #b39ddb;
}

.archive-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.archive-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.year-block {
  margin-bottom: 50px;
}

.year-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 30px;
}

.article-timeline {
  position: relative;
  margin-left: 15px;
}

.article-timeline::before {
  content: "";
  position: absolute;
  left: 85px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--purplr-crayola);
  opacity: 0.5;
  z-index: 0;
}

.article-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  position: relative;
}

.article-date {
  width: 60px;
  font-size: 0.9rem;
  color: var(--dark-variant);
  opacity: 0.7;
  padding-top: 5px;
  flex-shrink: 0;
}

.article-dot {
  position: absolute;
  left: 80px;
  top: 14px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--purplr-crayola);
  box-shadow: 0 0 0 2px #ede7f6;
  z-index: 2;
}

.article-content {
  padding-left: 60px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.article-left {
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-width: 0; /* 确保flex子元素可以缩小 */
  margin-right: 15px;
}

.article-right {
  flex-shrink: 0;
  margin-top: 3px;
}

.article-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  flex-shrink: 0;
  position: relative;
  top: 6px;
}

.article-icon.note::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 2px solid #4ca782;
  border-radius: 50%;
}

.article-icon.doc::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 2px solid #4f86f7;
  border-radius: 50%;
}

.article-title {
  font-size: 1rem;
  color: var(--dark);
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  word-wrap: break-word;
}

.article-title:hover {
  color: var(--blue-crayola);
  text-decoration: underline;
}

.article-tag {
  display: inline-block;
  white-space: nowrap;
  padding: 2px 10px;
  font-size: 0.75rem;
  border-radius: 12px;
}

.article-tag.note {
  background-color: rgba(76, 167, 130, 0.1);
  color: #4ca782;
}

.article-tag.tech {
  background-color: rgba(79, 134, 247, 0.1);
  color: #4f86f7;
}

@media (max-width: 768px) {
  .archive-page {
    padding: 20px;
  }

  .archive-title {
    font-size: 2rem;
  }

  .article-timeline::before {
    left: 35px;
  }

  .article-dot {
    left: 35px;
  }

  .article-date {
    width: 30px;
    font-size: 0.8rem;
  }

  .article-content {
    padding-left: 25px;
    flex-direction: column;
  }

  .article-right {
    margin-top: 8px;
    align-self: flex-start;
  }

  .article-left {
    margin-right: 0;
  }

  .article-title {
    font-size: 1rem;
  }
}
</style>
