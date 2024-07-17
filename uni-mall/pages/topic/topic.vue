<template>
	<view class="container">
		<scroll-view v-if="topicList.length > 0" class="topic-list" :scroll-y="true" :scroll-top="scrollTop">
			<view class="top-row" v-if="topicList.length > 0">
				<navigator :url="'../topicDetail/topicDetail?id='+topicList[0].id">
					<image class="top-img" :src="topicList[0].scenePicUrl"></image>
					<view class="info">
						<text class="title">{{ topicList[0].title }}</text>
						<text class="desc">{{ topicList[0].subtitle }}</text>
						<text class="price">{{ topicList[0].priceInfo }}元起</text>
					</view>
				</navigator>
			</view>top-img
			<view class="vertical-row" v-if="topicList.length > 2">
				<view class="vertical-item" v-for="(item, index) in topicList.slice(1, 3)" :key="index">
					<navigator :url="'../topicDetail/topicDetail?id='+item.id">
						<image class="vertical-img" :src="item.scenePicUrl"></image>
						<view class="info">
							<text class="title">{{ item.title }}</text>
							<text class="desc">{{ item.subtitle }}</text>
							<text class="price">{{ item.priceInfo }}元起</text>
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
					<view class="horizontal-item" v-for="(item, index) in topicList.slice(3, 6)" :key="index">
						<navigator :url="'../topicDetail/topicDetail?id='+item.id">
							<image class="horizontal-img" :src="item.scenePicUrl"></image>
							<view class="info">
								<text class="title">{{ item.title }}</text>
								<text class="desc">{{ item.subtitle }}</text>
								<text class="price">{{ item.priceInfo }}元起</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
			<view class="page" v-if="showPage">
				<view :class="'prev ' + (page <= 1 ? 'disabled' : '')" @tap="prevPage">上一页</view>
				<view :class="'next ' + ((count / size) < page + 1 ? 'disabled' : '')" @tap="nextPage">下一页</view>
			</view>
		</scroll-view>
		<tui-show-empty v-else text="暂无专题"></tui-show-empty>
	</view>
</template>

<script>
const util = require("@/utils/util.js")
const api = require('@/utils/api.js');

export default {
    data() {
        return {
            topicList: [],
            page: 1,
            size: 10,
            count: 0,
            scrollTop: 0,
            showPage: false
        }
    },
    computed: {
        chunkedTopicList() {
            const chunkSize = 3;
            const chunks = [];
            for (let i = 0; i < this.topicList.length; i += chunkSize) {
                chunks.push(this.topicList.slice(i, i + chunkSize));
            }
            return chunks;
        }
    },
    methods: {
        nextPage: function(event) {
            if (this.page + 1 > Math.ceil(this.count / this.size)) {
                console.log("已到达最后一页");
                return true;
            }
            this.page++;
            console.log("加载下一页：", this.page);
            this.getTopic();
        },
        getTopic: function() {
            console.log("开始获取话题数据，页码：", this.page);
            this.scrollTop = 0;
            this.showPage = false;
            this.topicList = [];
            uni.showToast({
                title: '加载中...',
                icon: 'loading',
                duration: 2000
            });

            util.request(api.TopicList, {
                page: this.page,
                size: this.size
            }).then(res => {
                if (res.errno === 0) {
                    this.topicList = res.data.data;
                    this.count = res.data.count;
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
        },
        prevPage: function(event) {
            if (this.page <= 1) {
                console.log("已是第一页");
                return false;
            }

            this.page--;
            console.log("加载上一页：", this.page);
            this.getTopic();
        }
    },
    onLoad: function(options) {
        console.log("页面加载，初始化话题列表");
        this.getTopic();
    }
}
</script>

<style lang="scss">
.container {
	width: 750rpx;
	height: 100%;
	overflow: hidden;
	background: #100b0b;
}

.topic-list {
	width: 750rpx;
	height: 100%;
	overflow: hidden;
	background: linear-gradient(to bottom, url('@/static/images/bg.png') 0% 25%, #fff 25% 50%, url('@/static/images/bg1.png') 50% 75%, #fff 75% 100%), #fff;
	background-size: 100% 25%;
}

.top-row,
.vertical-row,
.horizontal-section {
	background: #fff;
	margin-bottom: 20rpx;
	padding: 10rpx;
	box-sizing: border-box;
}

.top-img {
	width: 50%;
	height: 400rpx;
	object-fit: cover;
}

.vertical-img,
.horizontal-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
}

.info {
	width: 100%;
	text-align: center;
	padding: 10rpx;
}

.title {
	display: block;
	width: 100%;
	color: #333;
	font-size: 28rpx;
	margin-top: 5rpx;
}

.desc {
	display: block;
	width: 100%;
	color: #999;
	font-size: 24rpx;
	margin-top: 5rpx;
}

.price {
	display: block;
	width: 100%;
	color: #b4282d;
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
	justify-content: space-between;
}

.horizontal-item {
	width: 32%;
	background: #fff;
	padding: 10rpx;
	box-sizing: border-box;
}

.page {
	width: 750rpx;
	height: 108rpx;
	background: #fff;
	margin-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
}

.page .prev,
.page .next {
	width: 50%;
	height: 108rpx;
	font-size: 29rpx;
	color: #333;
	text-align: center;
	line-height: 108rpx;
	cursor: pointer;
}

.page .disabled {
	color: #ccc;
	cursor: not-allowed;
}
</style>