<template>
	<view class="container">
		<view class="profile">
			<navigator url="/pages/auth/mobile/mobile">
				<image class="avatar" :src="userInfo.avatar" background-size="cover"></image>
				<text class="nickname">{{ userInfo.nickname }}</text>
				<text class="login-text">新用户注册即可享专享大礼包</text>
			</navigator>
		</view>

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

		<view class="order-section">
			<text class="section-title">租赁订单 平台组保</text>
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
						<text class="txt">退出登录</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="service-section">
			<text class="section-title">我的服务</text>
			<!-- 可在这里添加其他服务 -->
		</view>

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
            userInfo: {},
            hasMobile: ''
        }
    },
    methods: {
        loginByWeixin: function(userInfo) {
            console.log('\微信登录');
            let code = null;
            return new Promise(function(resolve, reject) {
                util.login().then((res) => {
                    code = res.code;
                    console.log('微信登录成功，code:', code);
                    return userInfo;
                }).then((userInfo) => {
                    console.log('登录远程服务器，提交用户信息:', userInfo);
                    util.request(api.AuthLoginByWeixin, {
                        code: code,
                        userInfo: userInfo
                    }, 'POST', 'application/json').then(res => {
                        if (res.errno === 0) {
                            console.log('远程登录成功，用户信息已保存:', res.data.userInfo, 'Token:', res.data.token);
                            uni.setStorageSync('userInfo', res.data.userInfo);
                            uni.setStorageSync('token', res.data.token);
                            console.log('当前页面用户信息:', res.data.userInfo);
                            console.log('当前全局用户信息:', app.globalData.userInfo);
                            resolve(res);
                        } else {
                            console.log('登录失败:', res.errmsg);
                            util.toast(res.errmsg);
                            reject(res);
                        }
                    }).catch((err) => {
                        console.log('请求登录接口失败:', err);
                        reject(err);
                    });
                }).catch((err) => {
                    console.log('登录过程中出现错误:', err);
                    reject(err);
                })
            });
        },
        getUserProfile() {
            let that = this;
            console.log('调用 getUserProfile 获取用户信息');
            wx.getUserProfile({
                desc: '用于完善会员资料',
                success: (resp) => {
                    console.log('获取用户信息成功:', resp);
                    that.loginByWeixin(resp).then(res => {
                        that.userInfo = res.data.userInfo;
                        app.globalData.userInfo = res.data.userInfo;
                        app.globalData.token = res.data.token;
                        console.log('用户信息和token已更新到全局:', app.globalData.userInfo, app.globalData.token);
                    }).catch((err) => {
                        console.log('登录或更新用户信息失败:', err);
                    });
                }
            })
        },
        bindGetUserInfo(e) {
            let that = this;
            console.log('按钮触发获取用户信息');
            that.loginByWeixin(e.detail).then(res => {
                that.userInfo = res.data.userInfo;
                app.globalData.userInfo = res.data.userInfo;
                app.globalData.token = res.data.token;
                console.log('用户信息和token已绑定:', that.userInfo, app.globalData.token);
            }).catch((err) => {
                console.log('绑定用户信息时出错:', err);
            });
        },
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
                            nickname: 'Hi,游客',
                            userName: '点击去登录',
                            avatar: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
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
            that.userInfo = app.globalData.userInfo;
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

.profile {
	text-align: center;
	padding: 40rpx 0;
	background: #fff;
}

.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	margin-bottom: 20rpx;
}

.nickname {
	font-size: 36rpx;
	color: #333;
}

.login-text {
	font-size: 24rpx;
	color: #f56c6c;
	margin-top: 10rpx;
}

.points {
	display: flex;
	justify-content: space-around;
	background: #fff;
	padding: 20rpx 0;
	margin-top: 10rpx;
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
}

.logout {
	margin-top: 20rpx;
	padding: 20rpx 0;
	text-align: center;
	background: #fff;
	color: #333;
	font-size: 30rpx;
}
</style>
