import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    nav: {
      home: "首页",
      gallery: "相册",
      blog: "文章",
      journal: "随记",
      archive: "归档"
    },
    home: {
      title: "我的个人空间",
      subtitle: "记录日常，分享生活点滴"
    },
    journal: {
      title: "那些浅浅的叙述",
      subtitle: "希望能留有痕迹",
      newJournal: "写新随记",
      emptyJournal: "选择一篇随记来阅读",
      emptyJournalSub: "或者创建一篇新的随记"
    },
    archive: {
      title: "回忆与归档",
      subtitle: "岁月绵长，山高路远，葱茏回首，我们也曾在这里留下过足迹。"
    },
    common: {
      readMore: "阅读更多",
      noData: "暂无数据"
    },
    article: {
      author: "作者",
      views: "浏览量",
      readingTime: "预计阅读时长",
      minutes: "分钟",
      updateAt: "更新于",
      aiSummary: "AI 摘要",
      poweredBy: "由 DeepSeek-中文提供支持",
      showMore: "显示更多",
      showLess: "显示较少",
      prevArticle: "上一篇",
      nextArticle: "下一篇",
      relatedArticles: "相关文章",
      comments: "评论区",
      noComments: "暂无评论",
      postComment: "发表评论",
      commentNote: "评论需要管理员审核后才会显示",
      nickname: "您的昵称 (可选)",
      commentContent: "评论内容",
      submit: "提交评论",
      notFound: "文章未找到",
      notFoundDesc: "您访问的文章可能已被删除或移动到其他位置。",
      backToHome: "返回首页"
    },
    gallery: {
      cameraInfo: "相机信息",
      cameraModel: "相机型号",
      lens: "镜头",
      aperture: "光圈",
      shutterSpeed: "快门速度",
      focalLength: "焦距",
      photoTime: "拍摄时间",
      photoDesc: "照片描述",
      location: "拍摄地点"
    }
  },
  en: {
    nav: {
      home: "Home",
      gallery: "Gallery",
      blog: "Blog",
      journal: "Journal",
      archive: "Archive"
    },
    home: {
      title: "My Personal Space",
      subtitle: "Record daily life, share moments"
    },
    journal: {
      title: "Those Gentle Narratives",
      subtitle: "Hope to leave traces",
      newJournal: "Write New Journal",
      emptyJournal: "Select a journal to read",
      emptyJournalSub: "Or create a new one"
    },
    archive: {
      title: "Memories & Archives",
      subtitle: "Time is long, the road is far. Looking back at the lush years, we have left our footprints here."
    },
    common: {
      readMore: "Read More",
      noData: "No Data"
    },
    article: {
      author: "Author",
      views: "Views",
      readingTime: "Est. reading time",
      minutes: "minutes",
      updateAt: "Updated on",
      aiSummary: "AI Summary",
      poweredBy: "Powered By DeepSeek-中文",
      showMore: "Show More",
      showLess: "Show Less",
      prevArticle: "Previous",
      nextArticle: "Next",
      relatedArticles: "Related Articles",
      comments: "Comments",
      noComments: "No comments yet",
      postComment: "Post a Comment",
      commentNote: "Comments will be displayed after admin approval",
      nickname: "Your nickname (optional)",
      commentContent: "Comment content",
      submit: "Submit",
      notFound: "Article Not Found",
      notFoundDesc: "The article you're looking for may have been deleted or moved to another location.",
      backToHome: "Back to Home"
    },
    gallery: {
      cameraInfo: "Camera Info",
      cameraModel: "Camera Model",
      lens: "Lens",
      aperture: "Aperture",
      shutterSpeed: "Shutter Speed",
      focalLength: "Focal Length",
      photoTime: "Photo Time",
      photoDesc: "Photo Description",
      location: "Location"
    }
  }
}

const i18n = createI18n({
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages,
  legacy: false, // 使用Composition API
  globalInjection: true // 全局注入$t方法
})

export default i18n 