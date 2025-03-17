import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    nav: {
      home: "首页",
      gallery: "相册",
      blog: "文章",
      journal: "随记",
      comments: "留言",
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
    }
  },
  en: {
    nav: {
      home: "Home",
      gallery: "Gallery",
      blog: "Blog",
      journal: "Journal",
      comments: "Comments",
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