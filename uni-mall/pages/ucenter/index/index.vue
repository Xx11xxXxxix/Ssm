<template>
	<view class="container">
		<view class="profile">
			<navigator url="/pages/auth/mobile/mobile">
				<image class="avatar" :src="userInfo.avatar" background-size="cover"></image>
				<text class="nickname">{{ userInfo.nickname }}</text>
				<text class="login-text">新用户注册即可享专享大礼包</text>
			</navigator>
		</view>
		<view class="gap"></view>
		<view class="points">
			<view class="point-item">
				<text class="point-label">**</text>
				<text class="point-text">积分</text>
			</view>
			<view class="point-item">
				<text class="point-label">**</text>
				<text class="point-text">现金红包</text>
			</view>
			<view class="point-item">
				<text class="point-label">**</text>
				<text class="point-text">商品收藏</text>
			</view>
			<view class="point-item">
				<text class="point-label">**</text>
				<text class="point-text">优惠券</text>
			</view>
		</view>
		<view class="gap"></view>
		<view class="order-section">
			<text class="section-title">平台服务</text>
			<view class="order-menu">
				<view class="order-item">
					<navigator url="/pages/ucenter/order/order?status=1">
						<text class="icon order"></text>
						<text class="txt">我的信息</text>
					</navigator>
				</view>
				<view class="order-item">
					<navigator url="/pages/ucenter/order/order?status=2">
						<text class="icon order"></text>
						<text class="txt">商务合作</text>
					</navigator>
				</view>
				<view class="order-item">
					<navigator url="/pages/ucenter/order/order?status=3">
						<text class="icon order"></text>
						<text class="txt">联系我们</text>
					</navigator>
				</view>
				<view class="order-item">
					<navigator url="/pages/ucenter/order/order?status=4">
						<text class="icon order"></text>
						<text class="txt">投诉建议</text>
					</navigator>
				</view>
				<view class="order-item">
					<navigator url="/pages/ucenter/order/order?status=0">
						<text class="icon order"></text>
						<text class="txt">版本信息</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="service-section">
			<text class="section-title">更多功能</text>
			<!-- 可在这里添加其他服务 -->
		</view>
		<view class="gap"></view>
		<!-- 退出登录按钮 -->
		<view class="logout" v-if="userInfo.userName != '点击去登录'" @tap="exitLogin">退出登录</view>
	</view>
</template>


<script>
const util = require("@/utils/util.js")
const api = require('@/utils/api.js');
const app = getApp();
export default {
    data() {
        return {
            canIUseGetUserProfile: false,
            userInfo: {
                userName: '点击去登录',
                avatar: '/static/images/avatar.webp' // 引入webp格式图片
			},
			hasMobile: ''
        }
    },
    methods: {
        exitLogin: function() {
            console.log('触发退出登录');
            uni.showModal({
                title: '',
                confirmColor: '#b4282d',
                content: '退出登录？',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户确认退出');
                        uni.removeStorageSync('token');
                        uni.removeStorageSync('userInfo');
                        app.globalData.userInfo = {
                            nickname: '您好',
                            userName: '点击去登录',
                            avatar: '/static/images/avatar.webp'
                        };
                        console.log('用户信息已清除，已设置为默认游客信息');
                        util.toast('退出成功');
                        uni.switchTab({
                            url: '/pages/index/index'
                        });
                    }
                }
            })
        },
        onShow: function() {
            let that = this;
            let userInfo = uni.getStorageSync('userInfo');
            let token = uni.getStorageSync('token');
            console.log('页面显示，检查用户信息和token');
            if (userInfo && token) {
                console.log('从本地存储获取用户信息和token:', userInfo, token);
                app.globalData.userInfo = userInfo;
                app.globalData.token = token;
                that.userInfo = userInfo;  // 确保userInfo被正确赋值
            } else {
                console.log('本地无用户信息，执行登录');
                uni.login({
                    success: function(res) {
                        if (res.code) {
                            that.code = res.code;
                            console.log('获取登录code:', res.code);
                        }
                    }
                });
            }
            console.log('当前页面的用户信息:', that.userInfo);
            console.log('当前全局的用户信息:', app.globalData.userInfo);
        },
        onLoad: function() {
            console.log('页面加载');
            if (wx.getUserProfile) {
                this.canIUseGetUserProfile = true;
                console.log('可以使用getUserProfile');
            }
        }
    }
}
</script>











<style scoped>
.container {
	padding: 20rpx;
	background: #f4f4f4;
}

.gap {
	height: 20rpx;
}

.profile {
	text-align: center;
	padding: 21rpx 10rpx;
	background: #fff;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	margin: 0 0 0 -250rpx;
}

.nickname {
	font-size: 36rpx;
	color: #333;
}

.login-text {
	font-size: 24rpx;
	color: #f56c6c;
	position: relative;
	left: 102rpx;
    bottom:23rpx;
}

.points {
	display: flex;
	justify-content: space-around;
	background: #fff;
	padding: 20rpx 0;
	margin-top: 10rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.point-item {
	text-align: center;
}

.point-label {
	font-size: 36rpx;
	color: #333;
}

.point-text {
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
}

.order-section {
	background: #fff;
	margin-top: 10rpx;
	padding: 20rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.section-title {
	font-size: 30rpx;
	color: #333;
	margin-bottom: 20rpx;
}

.order-menu {
	display: flex;
	justify-content: space-between;
}

.order-item {
	text-align: center;
}

.icon {
	display: block;
	width: 60rpx;
	height: 60rpx;
	margin: 0 auto 10rpx;
	background-size: cover;
}

.txt {
	font-size: 24rpx;
	color: #333;
}

.service-section {
	background: #fff;
	margin-top: 10rpx;
	padding: 20rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.user-menu {
	width: 100%;
	height: auto;
	overflow: hidden;
	background: #fff;
	margin-top: 10rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}

.user-menu .item {
	float: left;
	width: 33.33333%;
	height: 187.5rpx;
	border-right: 1px solid rgba(0, 0, 0, .15);
	border-bottom: 1px solid rgba(0, 0, 0, .15);
	text-align: center;
}

.user-menu .item .a {
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.user-menu .item.no-border {
	border-right: 0;
}

.user-menu .item.item-bottom {
	border-bottom: none;
}

.user-menu .icon {
	margin: 0 auto;
	display: block;
	height: 52.803rpx;
	width: 52.803rpx;
	margin-bottom: 16rpx;
}

.user-menu .icon.order {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -437.5rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.coupon {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -62.4997rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.gift {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -187.5rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.address {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 0 no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.security {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -500rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.kefu {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -312.5rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.help {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -250rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.feedback {
	background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png) 0 -125rpx no-repeat;
	background-size: 52.803rpx;
}

.user-menu .icon.phone {
	background: url(https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/15011540ebe21.png) no-repeat;
	background-size: 52.803rpx;
}

.user-menu .txt {
	display: block;
	height: 24rpx;
	width: 100%;
	font-size: 24rpx;
	color: #333;
}

.logout {
	margin-top: 20rpx;
	padding: 20rpx 0;
	text-align: center;
	background: #fff;
	color: #333;
	font-size: 30rpx;
	box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
}
</style>
