<template>
	<view class="container">
		<scroll-view v-if="topicList.length >0" class="topic-list" :scroll-y="true" :scroll-top="scrollTop">
			<view class="row" v-for="(chunk, chunkIndex) in chunkedTopicList" :key="chunkIndex">
				<navigator class="item" v-for="(item, index) in chunk" :key="index" :url="'../topicDetail/topicDetail?id='+item.id">
					<image class="img" :src="item.scenePicUrl"></image>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.subtitle}}</text>
						<text class="price">{{item.priceInfo}}元起</text>
					</view>
				</navigator>
			</view>
			<view class="page" v-if="showPage">
				<view :class="'prev ' + (page <= 1 ? 'disabled' : '')" @tap="prevPage">上一页</view>
				<view :class="'next ' + ((count / size) < page +1 ? 'disabled' : '')" @tap="nextPage">下一页</view>
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
.page,
.container {
	width: 750rpx;
	height: 100%;
	overflow: hidden;
	background:  #100b0b;
}

.topic-list {
	width: 750rpx;
	height: 100%;
	overflow: hidden;
	background: #fff7ec;
}

.row {
	display: flex;
	width: 100%;
}

.topic-list .item {
	width: 33.33%;
	height: auto;
	overflow: hidden;
	background: #fff;
	margin-bottom: 20rpx;
	padding: 10rpx;
	box-sizing: border-box;
}

.topic-list .img {
	width: 100%;
	height: 200rpx;
}

.topic-list .info {
	width: 100%;
	height: auto;
	overflow: hidden;
	text-align: center;
	padding: 10rpx;
}

.topic-list .title {
	display: block;
	width: 100%;
	color: #333;
	overflow: hidden;
	font-size: 28rpx;
	margin-top: 5rpx;
}

.topic-list .desc {
	display: block;
	width: 100%;
	overflow: hidden;
	color: #999;
	font-size: 24rpx;
	margin-top: 5rpx;
}

.topic-list .price {
	display: block;
	width: 100%;
	color: #b4282d;
	font-size: 24rpx;
	margin-top: 5rpx;
}

.page {
	width: 750rpx;
	height: 108rpx;
	background: #fff;
	margin-bottom: 20rpx;
}

.page view {
	height: 108rpx;
	width: 50%;
	float: left;
	font-size: 29rpx;
	color: #333;
	text-align: center;
	line-height: 108rpx;
}

.page .prev {
	border-right: 1px solid #D9D9D9;
}

.page .disabled {
	color: #ccc;
}
</style>
