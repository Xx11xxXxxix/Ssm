<template>
	<view class="container">
		<scroll-view 
			v-if="topicList.length > 0" 
			class="topic-list" 
			:scroll-y="true" 
			:scroll-top="scrollTop">
			<view class="top-row" v-if="topicList.length > 0">
				<navigator :url="'../topicDetail/topicDetail?id='+topicList[0].id">
					<view class="item-container">
						<image class="top-img" :src="topicList[0].scenePicUrl"></image>
						<view class="info">
							<text class="title">{{ topicList[0].title }}</text>
							<text class="price">{{ topicList[0].priceInfo }}元起</text>
						</view>
					</view>
				</navigator>
			</view>
			<view class="vertical-row" v-if="topicList.length > 2">
				<view class="vertical-item" v-for="(item, index) in topicList.slice(1, 3)" :key="index">
					<navigator :url="'../topicDetail/topicDetail?id='+item.id">
						<view class="item-container">
							<image class="vertical-img" :src="item.scenePicUrl"></image>
							<view class="info">
								<text class="title">{{ item.title }}</text>
								<text class="price">{{ item.priceInfo }}元起</text>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="horizontal-section" v-if="topicList.length > 3">
				<view class="title-row">
					<text class="official-text">官方严选 超值二手</text>
					<text class="new-tag">99新</text>
				</view>
				<view class="horizontal-items">
					<view class="horizontal-item" v-for="(item, index) in topicList.slice(3)" :key="index">
						<navigator :url="'../topicDetail/topicDetail?id='+item.id">
							<view class="item-container">
								<image class="horizontal-img" :src="item.scenePicUrl"></image>
								<view class="info">
									<text class="title">{{ item.title }}</text>
									<text class="price">{{ item.priceInfo }}元起</text>
								</view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</scroll-view>
		<tui-show-empty v-else text="暂无专题"></tui-show-empty>
	</view>
</template>
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
  
  <style scoped>
  .container {
	  width: 750rpx;
	  height: 100%;
	  overflow: hidden;
  }
  
  .topic-list {
	  width: 750rpx;
	  height: 100%;
	  overflow: hidden;
	  background: transparent;
  }
  
  .top-row,
  .vertical-row,
  .horizontal-section {
	  background: transparent;
	  margin-bottom: 20rpx;
	  padding: 50rpx;
	  box-sizing: border-box;
  }
  
  .item-container {
	  width: 100%;
	  background: transparent;
	  position: relative;
	  border-radius: 15rpx;
	  overflow: hidden;
  }
  
  .top-img,
  .vertical-img,
  .horizontal-img {
	  width: 100%;
	  height: 200rpx;
	  object-fit: cover;
	  border-radius: 15rpx;
  }
  
  .info {
	  width: 100%;
	  text-align: center;
	  padding: 10rpx;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  background: rgba(0, 0, 0, 0.5);
	  color: white;
	  border-bottom-left-radius: 15rpx;
	  border-bottom-right-radius: 15rpx;
  }
  
  .title {
	  display: block;
	  width: 100%;
	  color: #fff;
	  font-size: 28rpx;
	  margin-top: 5rpx;
  }
  
  .desc {
	  display: block;
	  width: 100%;
	  color: #ddd;
	  font-size: 24rpx;
	  margin-top: 5rpx;
  }
  
  .price {
	  display: block;
	  width: 100%;
	  color: #ffcc00;
	  font-size: 24rpx;
	  margin-top: 5rpx;
  }
  
  .title-row {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 20rpx;
  }
  
  .official-text {
	  font-size: 30rpx;
	  color: #333;
  }
  
  .new-tag {
	  font-size: 24rpx;
	  color: #b4282d;
  }
  
  .horizontal-items {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
  }
  
  .horizontal-item {
	  width: 32%; /* 每行显示三个 */
	  background: transparent;
	  padding: 10rpx;
	  box-sizing: border-box;
  }
  </style>
  