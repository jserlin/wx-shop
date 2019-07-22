<template>
	<div class="container">
		<div class="user_wrap" @click="login">
			<div class="left">
				<img v-if="isLogin" :src="user.avatar" alt="" class="avatar">
				<img v-if="!isLogin" src=" https://oss.qianbaocard.org/20180628/fd5d6a847d6243f0aba924d893d42dca.png" alt="" class="avatar">
			</div>
			<div class="right">
				<div class="title">{{user.nickName}}</div>
				<div class="desc">微信用户</div>
			</div>
		</div>
    <div class="item-group">
      <div class="item">
        <div class="left">订单</div>
        <div class="right">
          <img class="img" src="/static/images/icon_back.png" alt="">
        </div>
      </div>
    </div>
    <div class="item-group">
      <div class="item">
        <div class="left">
          <img class="img" src="/static/images/my_icon_position.png" alt="">
          <span class="span">收货地址</span>
        </div>
        <div class="right">
          <img class="img" src="/static/images/icon_back.png" alt="">
        </div>
      </div>
    </div>
	</div>
</template>
<script>
export default {
  data(){
    return {
      user:{
        nickName:"阿凡提",
        avatar:"http://yanxuan.nosdn.127.net/d6a7b9a2eb6af92d709429798a4ca3ea.png",
        id:"1"
      },
      path: 'pages/tabbar/togetherPay'
    }
  },
  computed:{
    isLogin(){
      // return !!this.user.wx
      return !!this.true
    },
    sessionFrom(){
      var { nickName, avatar, id } = this.user
      return JSON.stringify({
        userId:id,
        nickName,
        avatar: avatar || 'https://oss.qianbaocard.org/20180628/fd5d6a847d6243f0aba924d893d42dca.png'
      })
    }
  },
  mounted(){
    var task = decodeURIComponent(this.$root.$mp.query.task || '')
    if (task) {
      wx.navigateTo({
        url:task
      })
    }
  },
  onHide(){
    wx.stopAccelerometer()
  },
  methods:{
    loginFirst(url){
      let task = encodeURIComponent(url)
      let fromPage = encodeURIComponent(`pages/tabbar/mine?task=${task}`)
      wx.navigateTo({
        url:`/pages/login?from=${fromPage}`
      })
    },
    login(){
      if (this.user.wx) return //已登陆
      let fromPage = encodeURIComponent(`pages/tabbar/mine`)
      wx.navigateTo({
        url:`/pages/login?from=${fromPage}`
      })
    },
    nullFun(){
      wx.showModal({
        title: '提示',
        content: '小程序暂未开放此功能，请联系客服处理',
        showCancel:false,
      })
    },
    clearStorage(){
      wx.clearStorage()
    }
  }
}
</script>
<style scoped lang="less">
	.container {
    width: 100%;
		background: #f7f7f7;
		.user_wrap {
      width: 100%;
			background-color: #1e1e1e;
			display: flex;
			align-items: center;
			padding: 65rpx 30rpx;
			border-radius: 10rpx;
			.left {
				width: 150rpx;
				height: 150rpx;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.right {
				flex:1;
				padding-left: 30rpx;
				.title {
					color: #fff;
					font-size: 36rpx;
				}
				.desc {
					margin-top: 10rpx;
					color: #999;
					font-size: 32rpx
				}
			}
    }
    .item-group{
      margin-top: 20rpx;
      background: #fff;
      width: 100%;
      color: #666;
      .item{
        display: flex;
        padding: 20rpx;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        border-bottom: 1px solid #d9d9d9;
        .left{
          flex: 1;
          .img{
            width: 40rpx;
            height: 40rpx;
          }
          .span {
            margin-left: 30rpx;
          }
        }
        .right{
          width: 40rpx;
          height: 40rpx;
          .img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
		.channel {
			.item {
				padding: 0 30rpx;
				height: 105rpx;
				display: flex;
				align-items: center;
				position: relative;
				color: #333;
				.stop {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					z-index: 10;
				}
				button {
					width: 100%;
					height: 100%;
					margin: 0;
					border:none;
					display: flex;
					align-items: center;
					padding: 0;
					text-align: left;
					font-size: inherit;
				}
				.channel-icon {
					font-size: 40rpx;
					margin-right: 20rpx;
				}
				.title {
					flex: 1;
				}
				.qb-icon-arrow {
					transform: rotate(90deg);
					font-size: 40rpx;
				}
				&:nth-last-child(n+2):after {
					content: "";
					position: absolute;
					left: 30rpx;
					right: 30rpx;
					bottom: 0;
					height: 2rpx;
					background: #c3c3c3;
				}
			}
		}
	}
</style>
