<template>
	<view class="container">
	  <view class="header">
		<view class="top-image-placeholder">
		  <image :src="require('@/static/images/logo.png')" class="top-image" />
		</view>
	  </view>
  
	  <view class="title-container">
		<text class="title">登录</text>
	  </view>
	  <view class="form-container">
		<form @submit="bindLoginMobilecode">
		  <view class="input-container">
			<image :src="require('@/static/images/手机.png')" class="top-image-phone" />
			<input type="digit" name="mobile" @input="bindInputMobile" placeholder="输入手机号" v-model="mobile" auto-focus />
		  </view>
		  <!-- 输入框短信 -->
		  <view class="input-container">
			<image :src="require('@/static/images/短信.png')" class="top-image-sms" />
			<input type="digit" name="code" placeholder="四位验证码" />
			<button type="button" class="get-code-button" @click="countDownPassCode" :disabled="disableGetMobileCode">{{ getCodeButtonText }}</button>
		  </view>
		  <view class="login-button-container">
			<button class="login-button" formType="submit" :disabled="disableSubmitMobileCode">提交</button>
		  </view>
		</form>
		<view class="policy">
		  <checkbox v-model="agree" color="#FFC800" class="checkbox"></checkbox>
		  <view class="policy-text">
			<text>我已阅读并同意</text>
			<text @tap="openUserAgreement" class="link">《用户协议》</text>
			<text>及</text>
			<text @tap="openPrivacyPolicy" class="link">《隐私协议》</text>
		  </view>
		</view>
	  </view>
	</view>	
  </template>
  
  
  <script>
  const util = require("@/utils/util.js");
  const api = require('@/utils/api.js');
  const app = getApp();
  export default {
	  data() {
		  return {
			  mobile: '',
			  disableGetMobileCode: false,
			  disableSubmitMobileCode: true,
			  getCodeButtonText: '获取验证码',
			  agree: false
		  }
	  },
	  methods: {
		  // 检查手机号格式
		  bindCheckMobile(mobile) {
			  if (!mobile) {
				  util.toast('请输入手机号码');
				  console.log('请输入手机号码');
				  return false;
			  }
			  if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
				  util.toast('手机号格式不正确，仅支持国内手机号码');
				  console.log('手机号格式不正确，仅支持国内手机号码');
				  return false;
			  }
			  console.log('手机号格式正确');
			  return true;
		  },
		  // 绑定输入的手机号
		  bindInputMobile(e) {
			  this.mobile = e.detail.value;
			  console.log('输入的手机号:', this.mobile);
		  },
		  // 发送验证码并开始倒计时
		  countDownPassCode() {
			  const that = this;
			  if (!that.bindCheckMobile(that.mobile)) {
				  return;
			  }
			  console.log('开始请求发送验证码');
			  util.requestFullUrl('http://localhost:3000/platform-framework/api/smscode', {
				  phone: that.mobile
			  }, 'POST', 'application/json').then((res) => {
				  if (res.errno == 0) {
					  util.toast('发送成功');
					  that.disableSubmitMobileCode = false;
					  let i = 60;
					  that.disableGetMobileCode = true;
					  const intervalId = setInterval(() => {
						  i--;
						  if (i <= 0) {
							  that.disableGetMobileCode = false;
							  that.getCodeButtonText = '获取验证码';
							  clearInterval(intervalId);
							  console.log('验证码倒计时结束');
						  } else {
							  that.getCodeButtonText = `${i}秒`;
							  console.log(`倒计时 ${i} 秒`);
						  }
					  }, 1000);
				  } else {
					  util.toast('发送失败');
					  console.log('发送验证码失败');
				  }
			  });
		  },
		  // 提交登录
		  bindLoginMobilecode(e) {
			  const mobile = this.mobile;
			  if (!this.bindCheckMobile(mobile)) {
				  return;
			  }
			  if (!(e.detail.value.code && e.detail.value.code.length === 4)) {
				  util.toast('请输入四位验证码');
				  console.log('验证码输入错误');
				  return;
			  }
			  console.log('开始登录操作');
			  util.requestFullUrl('http://localhost:3000/platform-framework/api/auth/login', {
				  code: e.detail.value.code,
				  mobile: mobile
			  }, "POST").then((res) => {
				  if (res.errno === 0) {
					  util.toast('操作成功');
					  util.setUserInfo(mobile, res.data.token);
					  uni.switchTab({
						  url: '/pages/ucenter/index/index'
					  });
					  console.log('登录成功，跳转到用户中心');
				  } else {
					  util.toast('验证码错误');
					  console.log('验证码错误');
				  }
			  });
		  },
		  // 打开用户协议
		  openUserAgreement() {
			  uni.navigateTo({
				  url: '/pages/agreement/user-agreement'
			  });
			  console.log('打开用户协议页面');
		  },
		  // 打开隐私政策
		  openPrivacyPolicy() {
			  uni.navigateTo({
				  url: '/pages/agreement/privacy-policy'
			  });
			  console.log('打开隐私政策页面');
		  }
	  }
  }
  </script>
  
  
  <style lang="scss">
  .container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx;
	background-color: #ffffff;
	height: 100vh;
	box-sizing: border-box;
	justify-content: center;
  }
  
  .header {
	width: 100%;
	margin: 269rpx;
	display: flex;
	justify-content: center;
	margin-bottom: 20rpx;
  }
  
  .top-image-placeholder {
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  .top-image {
	width: 150rpx;
	height: 150rpx;
	object-fit: contain;
	image-rendering: crisp-edges;
  }
  
  .top-image-phone,
  .top-image-sms {
	width: 40rpx;
	height: 40rpx;
  }
  
  .title-container {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 20rpx;
  }
  
  .title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
  }
  
  .form-container {
	position: relative;
	bottom: 202rpx;
	width: 100%;
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: auto;
	margin-bottom: auto;
  }
  
  .input-container {
	height: 73rpx;
	display: flex;
	align-items: center;
	border: 1rpx solid #805698;
	border-radius: 50rpx;
	margin: 0 0 50rpx;
	padding: 20rpx;
	background-color: #f9f9f9;
	width: 100%;
	position: relative;
  }
  
  .input-container input {
	flex: 1;
	border: none;
	outline: none;
	font-size: 28rpx;
	background: none;
	padding-left: 40rpx;
  }
  
  .input-icon {
	position: absolute;
	left: 20rpx;
	font-size: 28rpx;
	color: #999999;
  }
  
  .get-code-button {
	font-size: 28rpx;
	color: #ffc800;
	border: none;
	background: none;
	cursor: pointer;
	padding-right: 10rpx;
  }
  
  .notice {
	font-size: 24rpx;
	color: #999999;
	margin-bottom: 20rpx;
	text-align: center;
  }
  
  .login-button-container {
	display: flex;
	justify-content: center;
	width: 100%;
  }
  
  .login-button {
	width: 100%;
	height: 80rpx;
	font-size: 32rpx;
	background-color: #805698;
	border: none;
	border-radius: 40rpx;
	color: #fcf6ff;
	cursor: pointer;
  }
  
  .login-button:disabled {
	background-color: #ddd;
	cursor: not-allowed;
  }
  
  .policy {
	margin-top: 10rpx;
	text-align: center;
	font-size: 24rpx;
	color: #888888;
	display: flex;
	align-items: center;
	justify-content: center;
  }
  
  .policy-text {
	font-size: 22rpx;
	display: flex;
	align-items: center;
  }
  
  .policy text {
	font-size: 19rpx;
	margin: 0 2rpx;
  }
  
  .policy .link {
	color: #ffc800;
	text-decoration: underline;
	cursor: pointer;
  }
  
  .checkbox {
	margin-right: 10rpx;
	transform: scale(0.8);
	transform-origin: left;
  }
  </style>
  