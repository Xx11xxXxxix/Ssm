<script>
const util = require("@/utils/util.js");
const api = require('@/utils/api.js');

export default {
  data() {
    return {
      topicList: [],
      scrollTop: 0,
      showPage: false
    };
  },
  methods: {
    getTopic: function() {
      console.log("开始获取话题数据");
      this.scrollTop = 0;
      this.showPage = false;
      uni.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 2000
      });

      util.request(api.TopicList, {
        page: 1, // 获取第一页
        size: 100 // 设置一个足够大的值，确保一次性加载所有数据
      }).then(res => {
        if (res.errno === 0) {
          this.topicList = res.data.data;
          this.showPage = true;
          console.log("话题数据加载成功：", res.data);
        } else {
          console.log("获取话题数据失败：", res.errmsg);
        }
        uni.hideToast();
      }).catch(err => {
        console.log("请求话题数据出错：", err);
        uni.hideToast();
      });
    }
  },
  onLoad(options) {
    console.log("页面加载，初始化话题列表");
    this.getTopic();
  }
};
</script>
