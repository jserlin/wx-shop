<template>
	<div class="container">
		<!-- <img src="/static/images/logo.png" alt=""> -->
		<h1>商城严选</h1>
		<div class="desc">申请获得你的公开信息（昵称、头像等）</div>
		<button
		type="primary"
	    v-if="canIUse"
	    open-type="getUserInfo"
	    @getuserinfo="bindGetUserInfo"
		>微信登陆</button>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				canIUse:wx.canIUse('button.open-type.getUserInfo'),
				code:'',
			}
		},
		onShow(){
			wx.login({
				success:(res)=>{
					this.code = res.code
				}
			})
		},
		methods:{
			bindGetUserInfo(e){
				const { encryptedData, iv, signature} = e.mp.detail
				if (!encryptedData) return
				var fromPage = decodeURIComponent(this.$root.$mp.query.from || '') || 'pages/recommend/recommend'
				const code = this.code
			}
		}
	}
</script>
<style scoped lang=less>
	.container {
		background: #fff;
		text-align: center;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		padding: 0 80rpx;
		img {
			width: 100rpx;
			height: 100rpx;
			margin-top: 150rpx;
		}
		h1 {
			font-size: 36rpx;
			margin-top: 20rpx;
		}
		.desc {
			color: #999;
			margin-bottom: 40rpx;
			margin-top: 100rpx;
		}

		button {
			display: block;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 36rpx;
			&:before{
				display:none;
			}
		}
	}
</style>
