<template>
	<view class="container">
    <view class="custom-nav-bar">
      <view class="nav-left">
        <image class="nav-logo" src="/static/images/logo.png"></image>
       
      </view>
      <view class="nav-right"></view>
    </view>
		<swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<navigator v-if="item.link" :url="item.link">
					<image :src="item.imageUrl" background-size="cover"></image>
				</navigator>
				<image v-else :src="item.imageUrl" background-size="cover"></image>
			</swiper-item>
		</swiper>

    <!-- 中间的导航栏 -->
		<!-- <view class="a-section a-topic" v-if="channel.length > 0">
			<view class="m-menu">
				<navigator class="item" v-for="(item, index) in channel" :key="index" :url="item.url">
					<image :src="item.iconUrl" background-size="cover"></image>
					<text>{{item.name}}</text>
				</navigator>
			</view>
		</view> -->
      
      <!-- 精选推荐 -->
		<view class="a-section a-recommendation" v-if="topics.length > 0">
			<view class="h">
				<text class="title">精选推荐</text>
			</view>

			<view class="b">
				<view class="item" v-for="(item, index) in topics" :key="index">
					<navigator :url="'/pages/topicDetail/topicDetail?id='+item.id">
						<image class="img" :src="item.scenePicUrl" background-size="cover"></image>
						<!-- <image class="img" :src="item.scenePicUrl" background-size="cover"></image> -->
						<view class="info">
							<text class="name">{{ item.subtitle }}</text>
							<text class="desc">{{ item.title }}</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>

    <!-- 平台广告 -->
    <view class="a-section a-popular" v-if="hotGoods.length > 0">
      <view class="h">
        <view>
          <navigator url="../hotGoods/hotGoods">
            <text class="txt">推荐平台</text>
          </navigator>
        </view>
      </view>
      <view class="b">
        <view class="item" v-for="(item, index) in hotGoods" :key="index">
          <navigator :url="'/pages/goods/goods?id='+item.id">
            <view class="item-content">
              <image class="top-label" :src="item.toplabel" />
              <!-- // 推荐左侧 -->
              <view class="left">
                <image class="shop-icon" :src="item.iconUrl" />
                <view class="tags">
                  <view class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{ tag }}</view>
                </view>

     
              </view>
              <view class="name-and-desc">
                  <text class="name">{{item.name}}</text>
                  <text class="desc">{{item.desc}}</text>
                </view>
            </view>
          </navigator>
          <view class="right">
                <button class="apply-button">立即申请</button>
              </view>
        </view>
      </view>
    </view>
    
    <!-- 有需要可另加页面 -->
		<!-- <view class="good-grid" v-for="(item, index) in floorGoods" :key="index">
			<view class="h">
				<view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="b">
				<view class="item" v-for="(iitem, iindex) in item.goodsList" :key="iindex">
					<view :class="'item ' + iindex % 2 == 0 ? '' : 'item-b'">
						<navigator :url="'/pages/goods/goods?id='+item.id">
							<image class="img" :src="iitem.listPicUrl" background-size="cover"></image>
							<text class="name">{{iitem.name}}</text>
							<text class="price">￥{{iitem.retailPrice}}</text>
						</navigator>
					</view>
				</view>
				<view class="item item-b item-more">
					<navigator :url="'/pages/category/category?id='+item.id" class="more-a">
						<view class="txt">{{'更多'+item.name+'好物'}}</view>
						<image class="icon" src="../../static/images/icon_go_more.png" background-size="cover"></image>
					</navigator>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	const api = require('@/utils/api.js');
	const util = require("@/utils/util.js")
	export default {
		data() {
			return {
				newGoods: [],
				hotGoods: [],
				topics: [],
				brands: [],
				floorGoods: [],
				banner: [],
				channel: []
			}
		},
		methods: {


      // TOPIC
      requestFullUrl: function(url, data = {}, method = 'GET') {
      return new Promise((resolve, reject) => {
        uni.request({
          url: url,
          data: data,
          method: method,
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            if (res.statusCode == 200) {
              resolve(res.data);
            } else {
              reject(res.errMsg);
            }
          },
          fail: function(err) {
            reject(err);
          }
        });
      });
    },


			getIndexData: function() {
				let that = this;
				util.requestFullUrl(api.IndexUrlNewGoods).then(function(res) {
					if (res.errno === 0) {
						that.newGoods = res.data.newGoodsList
					}
				});
				util.requestFullUrl(api.IndexUrlHotGoods).then(function(res) {
					if (res.errno === 0) {
						that.hotGoods = res.data.hotGoodsList
					}
				});
				util.requestFullUrl(api.IndexUrlTopic).then(function(res) {
					if (res.errno === 0) {
						that.topics = res.data.topicList
					}
				});
				util.requestFullUrl(api.IndexUrlBrand).then(function(res) {
					if (res.errno === 0) {
						that.brands = res.data.brandList
					}
				});
				util.requestFullUrl(api.IndexUrlCategory).then(function(res) {
					if (res.errno === 0) {
						that.floorGoods = res.data.categoryList
					}
				});
				util.requestFullUrl(api.IndexUrlBanner).then(function(res) {
					if (res.errno === 0) {
						that.banner = res.data.banner
					}
				});
				util.requestFullUrl(api.IndexUrlChannel).then(function(res) {
					if (res.errno === 0) {
						that.channel = res.data.channel
					}
				});

			},
		},
		// 增加下拉刷新数据的功能
		onPullDownRefresh() {
			this.getIndexData();
		},
		onShareAppMessage: function() {
			return {
				title: '邦推推',
				path: '/pages/index/index'
			}
		},
		onLoad: function() {
      uni.login({
        success: (resp) => {
          util.request(api.Code + resp.code, {}, 'GET').then(function (res) {
            if (res.errno === 0) {
              //存储用户信息
              uni.setStorageSync('userInfo', res.data.userInfo);
              uni.setStorageSync('token', res.data.token);
              uni.setStorageSync('userId', res.data.userId);
            } else {
              uni.showModal({
                title: '提示',
                content: res.errmsg,
                showCancel: false
              });
            }
          });
        },
      })
			this.getIndexData();
		}
	}
</script>

<style lang="scss">
.title {
  font-family: 'SimHei'; /* 简黑字体 */
  font-weight: bold; /* 加粗 */
  font-style: italic; /* 斜体 */
  margin-right: 522rpx; /* 左边距20rpx */
  font-size: 32rpx; /* 调整字体大小，可以根据需要调整 */
  color: #333; /* 字体颜色，可以根据需要调整 */
}

.a-recommendation .h {
  padding: 20rpx;
  background-color: #f8f8f8;
}

.a-recommendation .title {
  font-size: 32rpx;
  color: #333;
}

.a-recommendation .b {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  padding: 20rpx;
}

.a-recommendation .item {
  display: flex;
  flex-direction: column;
  width: 300rpx;
  margin-right: 20rpx;
}

.a-recommendation .item {
  width: 24%; /* 使每个项目占一行的四分之一 */
  margin-bottom: 20rpx; /* 每个项目之间的垂直间距 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
}

.a-recommendation .img {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.a-recommendation .info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.a-recommendation .name {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.a-recommendation .desc {
  font-size: 20rpx;
  color: #999;
  text-align: center;
}
.a-recommendation .price {
  font-size: 28rpx;
  color: #b4282d;
}

.banner {
  width: 750rpx;
  height: 417rpx;
}

.banner image {
  width: 100%;
  height: 417rpx;
}

.m-menu {
  display: flex;
  height: 181rpx;
  width: 750rpx;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.m-menu .item {
  flex: 1;
  display: block;
  padding: 20rpx 0;
}

.m-menu image {
  display: block;
  width: 58rpx;
  height: 58rpx;
  margin: 0 auto;
  margin-bottom: 12rpx;
}

.m-menu text {
  display: block;
  font-size: 24rpx;
  text-align: center;
  margin: 0 auto;
  line-height: 1;
  color: #333;
}

.a-section {
    width: 100%;
    margin-top: 20rpx;
  }

.a-section .h {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
}

.a-section .h .txt {
  font-family: 'SimHei'; /* 简黑字体 */
  font-weight: bold; /* 加粗 */
  font-style: italic; /* 斜体 */
  margin-right: 522rpx; /* 左边距20rpx */
  font-size: 32rpx; /* 调整字体大小，可以根据需要调整 */
  color: #333; /* 字体颜色，可以根据需要调整 */
}

.a-brand .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  position: relative;
}

.a-brand .wrap {
  position: relative;
}

.a-brand .img {
  position: absolute;
  left: 0;
  top: 0;
}

.a-brand .mt {
  position: absolute;
  z-index: 2;
  padding: 27rpx 31rpx;
  left: 0;
  top: 0;
}

.a-brand .mt .brand {
  display: block;
  font-size: 33rpx;
  height: 43rpx;
  color: #333;
}

.a-brand .mt .price,
.a-brand .mt .unit {
  font-size: 25rpx;
  color: #999;
}

.a-brand .item-1 {
  float: left;
  width: 375rpx;
  height: 252rpx;
  overflow: hidden;
  border-top: 1rpx solid #fff;
  margin-left: 1rpx;
}

.a-brand .item-1:nth-child(2n+1) {
  margin-left: 0;
  width: 374rpx;
}

.a-brand .item-1 .img {
  width: 375rpx;
  height: 253rpx;
}

.a-new .b {
  width: 750rpx;
  height: auto;
  overflow: hidden;
  padding: 0 31rpx 45rpx 31rpx;
}

.a-new .b .item {
  float: left;
  width: 302rpx;
  margin-top: 10rpx;
  margin-left: 21rpx;
  margin-right: 21rpx;
}

.a-new .b .item-b {
  margin-left: 42rpx;
}

.a-new .b .img {
  width: 302rpx;
  height: 302rpx;
}

.a-new .b .name {
  text-align: center;
  display: block;
  width: 302rpx;
  height: 35rpx;
  margin-bottom: 14rpx;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.a-new .b .price {
  display: block;
  text-align: center;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #b4282d;
}


.a-popular .h {
  padding: 20rpx;
  background-color: #f8f8f8;
}

.a-popular .txt {
  font-size: 32rpx;
  color: #333;
}

.a-popular .b {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 20rpx;
}

.a-popular .item {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 10rpx;
  overflow: hidden;
  background-color: #fff;
  position: relative;
  display: flex;
}

.a-popular .item-content {
  display: flex;
  padding: 20rpx;
  align-items: center; /* 垂直居中 */
  position: relative;
  justify-content: space-between; /* 两端对齐 */
}

.a-popular .top-label {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  width: 60rpx;
  height: 60rpx;
}

.a-popular .left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20rpx;
  position: relative;
}

.a-popular .shop-icon {
  width: 100rpx;
  height: 100rpx;
}

.a-popular .tags {
  display: flex;
  gap: 10rpx;
  margin-top: 10rpx;
}

.a-popular .tag {
  background-color: #e18409de;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
  font-size: 20rpx;
  color: #333;
}

.a-popular .center {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.a-popular .name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.a-popular .desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}
.a-popular .name-and-desc {
  display: flex;
  flex-direction: column;
  margin-left: 10rpx; /* 添加左边距，使文字与图标分开 */
}

.a-popular .right {
  margin:auto; /* 自动左外边距，将其推到最右边 */
  display: flex;
  align-items: center; /* 垂直居中 */
}


.a-popular .apply-button {
  width: 100%; /* 调整按钮宽度 */
  padding: 10rpx 20rpx;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5rpx;
  font-size: 24rpx;
}

.a-topic .b {
  height: 533rpx;
  width: 750rpx;
  padding: 0 0 48rpx 0;
}

.a-topic .b .list {
  height: 533rpx;
  width: 750rpx;
  white-space: nowrap;
}

.a-topic .b .item {
  display: inline-block;
  height: 533rpx;
  width: 680.5rpx;
  margin-left: 30rpx;
  overflow: hidden;
}

.a-topic .b .item:last-child {
  margin-right: 30rpx;
}

.a-topic .b .img {
  height: 387.5rpx;
  width: 680.5rpx;
  margin-bottom: 30rpx;
}

.a-topic .b .np {
  height: 35rpx;
  margin-bottom: 13.5rpx;
  color: #333;
  font-size: 30rpx;
}

.a-topic .b .np .price {
  margin-left: 20.8rpx;
  color: #b4282d;
}

.a-topic .b .desc {
  display: block;
  height: 30rpx;
  color: #999;
  font-size: 24rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.good-grid {
  width: 750rpx;
  height: auto;
  overflow: hidden;
}

.good-grid .h {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 130rpx;
  font-size: 33rpx;
  color: #333;
}

.good-grid .b {
  width: 750rpx;
  padding: 0 6.25rpx;
  height: auto;
  overflow: hidden;
}

.good-grid .b .item {
  float: left;
  background: #fff;
  width: 365rpx;
  margin-bottom: 6.25rpx;
  height: 452rpx;
  overflow: hidden;
  text-align: center;
}

.good-grid .b .item .a {
  height: 452rpx;
  width: 100%;
}

.good-grid .b .item-b {
  margin-left: 6.25rpx;
}

.good-grid .item .img {
  margin-top: 20rpx;
  width: 302rpx;
  height: 302rpx;
}

.good-grid .item .name {
  display: block;
  width: 365.625rpx;
  padding: 0 20rpx;
  overflow: hidden;
  height: 35rpx;
  margin: 11.5rpx 0 22rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #333;
}

.good-grid .item .price {
  display: block;
  width: 365.625rpx;
  height: 30rpx;
  text-align: center;
  font-size: 30rpx;
  color: #b4282d;
}

.good-grid .more-item {
  height: 100%;
  width: 100%;
}

.more-a {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.good-grid .more-a .txt {
  height: 33rpx;
  width: 100%;
  line-height: 33rpx;
  color: #333;
  font-size: 33rpx;
}

.good-grid .more-a .icon {
  margin: 60rpx auto 0 auto;
  width: 70rpx;
  height: 70rpx;
}
/* 自定义导航栏样式 */
.custom-nav-bar {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: #a5a5a5;
  color: #000000;
  border-bottom: 1px solid #e0e0e0;
}

.nav-left {
  font-size: 42rpx;
  font-weight: bold; 
  color: #0000ff; 
  font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif; 
}

.nav-right {
  font-size: 42rpx;
  color: #000000;
  font-family: "Comic Sans MS", "Comic Sans", cursive; 
}
.nav-logo {
  width:74rpx; 
  height: 74rpx;
  margin: 8rpx  1rpx -10rpx 311rpx;
}

</style>
