<template>
	<view class="container">
		<view class="search">
			<navigator url="/pages/search/search" class="input">
				<image class="icon"></image>
				<text class="txt">机型搜索, 共{{goodsCount}}款机型</text>
			</navigator>
		</view>
		<view class="catalog">
			<scroll-view class="nav" :scroll-y="true">
				<view :class="'item ' + (currentCategory.id == item.id ? 'active' : '')" v-for="(item, index) in navList" :key="index"
					:data-id="item.id" :data-index="index" @tap="switchCate" style="font-size: 24rpx">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="cate" :scroll-y="true">
				<navigator url="url" class="banner">
					<image class="image" :src="currentCategory.wapBannerUrl"></image>
					<view class="txt">{{currentCategory.frontName}}</view>
				</navigator>
				<view class="hd">
					<text class="line"></text>
					<text class="txt">{{currentCategory.name || ''}}分类</text>
				</view>
				<view class="bd">
					<view class="item" v-for="(item, index) in currentCategory.subCategoryList" :key="index">
						<image class="icon" :src="item.wapBannerUrl"></image>
						<text class="txt">{{item.name}}</text>
						<text class="market-price">市场价：￥{{item.marketPrice}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
const util = require("@/utils/util.js");
const api = require('@/utils/api.js');
export default {
    data() {
        return {
            navList: [],
            categoryList: [],
            currentCategory: {},
            scrollLeft: 0,
            scrollTop: 0,
            goodsCount: 0,
            scrollHeight: 0
        }
    },
    methods: {
        requestFullUrl: function(url, data = {}, method = "GET") {
            console.log(`发起请求: ${url}，参数:`, data);
            return new Promise((resolve, reject) => {
                uni.request({
                    url: url,
                    data: data,
                    method: method,
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(`请求成功: ${url}，响应:`, res.data);
                        if (res.statusCode == 200) {
                            resolve(res.data);
                        } else {
                            reject(res.errMsg);
                        }
                    },
                    fail: function(err) {
                        console.log(`请求失败: ${url}，错误:`, err);
                        reject(err);
                    }
                });
            });
        },
        getCatalog: function() {
            console.log('加载分类目录...');
            let that = this;
            uni.showLoading({
                title: '加载中...',
            });
            this.requestFullUrl('http://localhost:3000/platform-framework/api/catalog/index').then(function(res) {
                console.log('目录数据加载完成', res);
                that.navList = res.data.categoryList;
                that.currentCategory = res.data.currentCategory;
                uni.hideLoading();
            }).catch(error => {
                console.log('加载目录数据失败', error);
                uni.hideLoading();
            });
            util.request(api.GoodsCount).then(function(res) {
                console.log('商品总数加载完成', res);
                that.goodsCount = res.data.goodsCount;
            }).catch(error => {
                console.log('加载商品总数失败', error);
            });
        },
        getCurrentCategory: function(id) {
            console.log(`切换到分类ID: ${id}`);
            let that = this;
            this.requestFullUrl('http://localhost:3000/platform-framework/api/catalog/current', {
                id: id
            }).then(function(res) {
                console.log('当前分类数据加载完成', res);
                that.currentCategory = res.data.currentCategory;
            }).catch(error => {
                console.log('加载当前分类数据失败', error);
            });
        },
        getList: function() {
            var that = this;
            console.log('加载分类列表...', that.currentCategory.id);
            this.requestFullUrl(`http://localhost:3000/platform-framework/api/catalog/${that.currentCategory.id}`)
                .then(function(res) {
                    console.log('分类列表数据加载完成', res);
                    that.categoryList = res.data;
                }).catch(error => {
                    console.log('加载分类列表数据失败', error);
                });
        },
        switchCate: function(event) {
            var currentTarget = event.currentTarget;
            console.log(`尝试切换分类，目标ID: ${currentTarget.dataset.id}`);
            if (this.currentCategory.id == currentTarget.dataset.id) {
                console.log('已在当前分类，无需切换');
                return false;
            }
            this.getCurrentCategory(currentTarget.dataset.id);
        }
    },
    onLoad: function() {
        console.log('页面加载，初始化分类数据');
        this.getCatalog();
    }
}
</script>


<style lang="scss">
	page {
		height: 100%;
	}

	.container {
		background: #f9f9f9;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.search {
		height: 88rpx;
		width: 100%;
		padding: 0 30rpx;
		background: #fff;
		display: flex;
		align-items: center;
	}

	.search .input {
		width: 690rpx;
		height: 56rpx;
		background: #ededed;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search .icon {
		background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png) center no-repeat;
		background-size: 100%;
		width: 28rpx;
		height: 28rpx;
	}

	.search .txt {
		height: 42rpx;
		line-height: 42rpx;
		color: #666;
		padding-left: 10rpx;
		font-size: 30rpx;
	}

	.catalog {
		flex: 1;
		width: 100%;
		background: #fff;
		display: flex;
		border-top: 1px solid #fafafa;
	}

	.catalog .nav {
		width: 142rpx;
		height: 100%;
		font-family: "Microsoft YaHei", sans-serif;
		font-weight: bold;
		background-color: #97959554;
	}

	.catalog .nav .item {
		text-align: center;
		line-height: 90rpx;
		height: 90rpx;
		color: #333;
		font-size: 28rpx;
		// border-left: 6rpx solid #ffffffdb;、//侧栏左边空隙
	}

	.catalog .nav .item.active {
		color: #b42727;
		font-size: 36rpx;
		border-left: 6rpx solid #000000;
		background-color: #d9d9d9; 
		position: relative;
	}

	.catalog .cate {
		border-left: 1px solid #fafafa;
		flex: 1;
		height: 100%;
		padding: 0 30rpx 0 30rpx;
	}

	.banner {
		display: block;
		height: 222rpx;
		width: 100%;
		position: relative;
	}

	.banner .image {
		position: absolute;
		top: 30rpx;
		left: 0;
		border-radius: 4rpx;
		height: 192rpx;
		width: 100%;
	}

	.banner .txt {
		position: absolute;
		top: 30rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		left: 0;
		height: 192rpx;
		line-height: 192rpx;
		width: 100%;
	}

	.catalog .hd {
		height: 98rpx;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.catalog .hd .txt {
		font-size: 24rpx;
		text-align: center;
		color: #333;
		padding: 0 10rpx;
		width: auto;
		font-family: "Microsoft YaHei", sans-serif;
		font-weight: bold;
	}

	.catalog .hd .line {
		width: 40rpx;
		height: 1px;
		background: #d9d9d9;
	}

	.catalog .bd {
		height: auto;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between; // 会导致最后一行的元素不对齐
	}

	.catalog .bd .item {
		display: flex;
		flex-direction: column;
		float: left;
		align-items: center;
		height: auto;
		width: calc(33.333% - 10px);
		margin-bottom: 20rpx; 
		font-size: 24rpx;
		
	}

	.catalog .bd .item.last {
		margin-right: 0;
	}

	.catalog .bd .item .icon {
		height: 144rpx;
		width: 144rpx;
		object-fit: cover;
	}

	.catalog .bd .item .txt {
		display: block;
		text-align: center;
		font-size: 19rpx;
		color: #333;
		height: 21rpx;
		width: 144rpx;
	}
	.catalog .bd .item .price {
    display: block;
    text-align: center;
    font-size: 21rpx;
    color: #f60;
    margin-top: 5rpx;
}

.catalog .bd .item .market-price {
    display: block;
    text-align: center;
    font-size: 21rpx;
    color: #999;
    text-decoration: line-through;
    margin-top: 5px;
}
</style>
