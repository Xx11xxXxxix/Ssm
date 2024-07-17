<template>
	<view class="container">
		<swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
			<swiper-item v-for="(item, index) in banner" :key="index">
				<navigator v-if="item.link" :url="item.link">
					<image :src="require('@/static/images/轮播图1.png')" background-size="cover"></image>
					<image :src="require('@/static/images/轮播图2.png')" background-size="cover"></image>
				</navigator>
				<image v-else :src="require('@/static/images/轮播图2.png')" background-size="cover"></image>
			</swiper-item>
		</swiper>

		<scroll-view scroll-y="true" :scroll-top="scrollTop" :style="{ height: scrollHeight }" @scrolltolower="onReachBottom">
			<view class="a-section a-recommendation" v-if="topics.length > 0">
				<view class="h">
					<text class="title">精选推荐</text>
				</view>
				<view class="b">
					<view class="item" v-for="(item, index) in topics" :key="index">
						<navigator :url="'/pages/topicDetail/topicDetail?id='+item.id">
							<image class="img" :src="item.scenePicUrl" background-size="cover"></image>
							<view class="info">
								<text class="name">{{ item.subtitle }}</text>
								<text class="desc">{{ item.title }}</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>

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

			<view v-if="newGoods.length > 0" class="loadmore">
				<block v-if="nomore">
					<text>{{nomoreText}}</text>
				</block>
				<block v-else>
					<text class="iconfont icon-loading loading" space="nbsp"></text>
					<text> {{loadmoreText}}</text>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
const api = require('@/utils/api.js');
const util = require("@/utils/util.js");

export default {
	data() {
		return {
			newGoods: [],
			hotGoods: [],
			topics: [],
			brands: [],
			floorGoods: [],
			banner: [],
			channel: [],
			page: 1,
			hotGoodsPage: 1,
			pageSize: 4,
			hotGoodsPageSize: 5,
			hasMoreData: true,
			hasMoreHotGoods: true,
			scrollTop: 0,
			scrollHeight: 0,
			loadmoreText: '正在加载更多数据',
			nomoreText: '全部加载完成',
			nomore: false,
			totalPages: 1,
		};
	},
	methods: {
		requestFullUrl: function(url, data = {}, method = 'GET') {
			console.log(`正在请求: ${url}，方法: ${method}`);
			return new Promise((resolve, reject) => {
				uni.request({
					url: url,
					data: data,
					method: method,
					header: {
						'Content-Type': 'application/json',
					},
					success: function(res) {
						if (res.statusCode == 200) {
							console.log(`请求成功: ${url}`, res.data);
							resolve(res.data);
						} else {
							console.log(`请求失败[${res.statusCode}]: ${url}`, res.errMsg);
							reject(res.errMsg);
						}
					},
					fail: function(err) {
						console.log(`请求出错: ${url}`, err);
						reject(err);
					},
				});
			});
		},

		getIndexData: function() {
			console.log('加载数据');
			let that = this;
			if (!this.hasMoreData) {
				console.log('无更多数据');
				return;
			}
			util
				.requestFullUrl(api.IndexUrlNewGoods, { page: this.page, size: this.pageSize })
				.then(function(res) {
					if (res.errno === 0) {
						console.log(`当前是第${that.page}页，加载了${res.data.newGoodsList.length}条数据`);
						console.log('加载的数据列表:', res.data.newGoodsList);
						if (res.data.newGoodsList.length < that.pageSize) {
							that.hasMoreData = false; // No more data available
							that.nomore = true;
						}
						that.newGoods = that.newGoods.concat(res.data.newGoodsList);
						that.page++; // Increment page number for next request
						console.log('加载中', res.data.newGoodsList);
					}
				})
				.catch(function(err) {
					console.error('加载失败', err);
				});

			this.getHotGoodsData();
		},

		getHotGoodsData: function() {
			console.log('加载热门商品数据');
			let that = this;
			if (!this.hasMoreHotGoods) {
				console.log('无更多热门商品数据');
				return;
			}
			util
				.requestFullUrl(api.IndexUrlHotGoods, { page: this.hotGoodsPage, size: this.hotGoodsPageSize })
				.then(function(res) {
					if (res.errno === 0) {
						console.log(`当前是热门商品第${that.hotGoodsPage}页，加载了${res.data.hotGoodsList.length}条数据`);
						console.log('加载的热门商品数据列表:', res.data.hotGoodsList);
						if (res.data.hotGoodsList.length < that.hotGoodsPageSize) {
							that.hasMoreHotGoods = false; // No more data available
						}
						that.hotGoods = that.hotGoods.concat(res.data.hotGoodsList);
						that.hotGoodsPage++; // Increment page number for next request
					}
				})
				.catch(function(err) {
					console.error('加载热门商品数据失败', err);
				});
		},

		onPullDownRefresh() {
			console.log('触发下拉刷新');
			this.page = 1;
			this.hotGoodsPage = 1;
			this.hasMoreData = true;
			this.hasMoreHotGoods = true;
			this.newGoods = [];
			this.hotGoods = [];
			this.nomore = false;
			this.getIndexData();
		},

		onShareAppMessage: function() {
			console.log('触发分享');
			return {
				title: '邦推推',
				path: '/pages/index/index',
		
