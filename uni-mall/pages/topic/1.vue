<template>
	<view class="container">
		<view class="top-section">
			<navigator url="/pages/topicDetail/topicDetail?id=topItem.id">
				<image class="top-img" :src="topItem.scenePicUrl"></image>
				<view class="info">
					<text class="title">{{topItem.title}}</text>
					<text class="desc">{{topItem.subtitle}}</text>
					<text class="price">{{topItem.priceInfo}}元起</text>
				</view>
			</navigator>
		</view>
		<view class="vertical-section">
			<view class="vertical-item" v-for="(item, index) in verticalItems" :key="index">
				<navigator :url="'../topicDetail/topicDetail?id='+item.id">
					<image class="vertical-img" :src="item.scenePicUrl"></image>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<text class="desc">{{item.subtitle}}</text>
						<text class="price">{{item.priceInfo}}元起</text>
					</view>
				</navigator>
			</view>
		</view>
		<view class="horizontal-section">
			<view class="title-row">
				<text class="official-text">官方严选 超值二手</text>
				<text class="new-tag">99新</text>
			</view>
			<view class="horizontal-items">
				<view class="horizontal-item" v-for="(item, index) in horizontalItems" :key="index">
					<navigator :url="'../topicDetail/topicDetail?id='+item.id">
						<image class="horizontal-img" :src="item.scenePicUrl"></image>
						<view class="info">
							<text class="title">{{item.title}}</text>
							<text class="desc">{{item.subtitle}}</text>
							<text class="price">{{item.priceInfo}}元起</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<tui-show-empty v-else text="暂无专题"></tui-show-empty>
	</view>
</template>

<style lang="scss">
.container {
	width: 750rpx;
	height: 100%;
	overflow: hidden;
	background: #100b0b;
}

.top-section {
	width: 100%;
	background: #fff7ec;
	margin-bottom: 20rpx;
	padding: 10rpx;
	box-sizing: border-box;
}

.top-img {
	width: 100%;
	height: 400rpx;
	object-fit: cover;
}

.vertical-section {
	width: 100%;
	background: #fff;
	padding: 10rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.vertical-item {
	width: 100%;
	margin-bottom: 20rpx;
}

.vertical-img {
	width: 100%;
	height: 200rpx;
	object-fit: cover;
}

.horizontal-section {
	width: 100%;
	background: #fff;
	padding: 10rpx;
	box-sizing: border-box;
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
	margin-bottom: 20rpx;
	padding: 10rpx;
	box-sizing: border-box;
}

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
</style>
