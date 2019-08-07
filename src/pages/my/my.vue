<template>
  <div class="container">
    <div class="user-center-section user-info rel">
      <image src="/static/images/my_bg.png" alt />
      <div class="user-info-content row-padding abs flex-box" @click="goLogin">
        <div class="img-avatar">
          <open-data v-if="userShow" type="userAvatarUrl"></open-data>
          <image v-if="!userShow"  :src="'/static/images/avatar.jpg'" alt="头像" />
          <!-- <image :src="userShow ? '/static/images/avatar-login.png' : '/static/images/avatar.jpg'" alt="头像" /> -->
        </div>
        <div class="user-name">
          <p class="font-30">{{userShow ? userInfo.truename : '未登录'}}</p>
          <p class="font-28">
            {{userShow ? '账户余额：' : '点击登录账号'}}
            <span class="font-red" v-if="userShow">¥ {{userInfo.money}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="user-center-row por" style="padding: 24rpx 20rpx 24rpx 30rpx;" @click="toOrders('0')">
      <div class="flex-box item-space-between">
        <span>订单</span>
        <span class="icon-back">
          <image src="/static/images/icon_back.png" />
        </span>
      </div>
      <div v-if="!userShow" class="login-modal" @click="goLogin"></div>
    </div>

    <div
      class="flex-box item-space-between text-center mb20rpx por"
      style="background: #fff; padding: 18rpx 0;"
    >
      <div v-if="!userShow" class="login-modal" @click="goLogin"></div>
      <div class="flex-item" @click="toOrders('1')">
        <div class="img-wrap">
          <image src="/static/images/my_icon_cancel.png" alt />
        </div>
        <p>已取消</p>
      </div>
      <div class="flex-item" @click="toOrders('2')">
        <div class="img-wrap rel">
          <image src="/static/images/my_icon_send.png" alt />
        </div>
        <p>待发货</p>
      </div>
      <div class="flex-item" @click="toOrders('3')">
        <div class="img-wrap rel">
          <image src="/static/images/my_icon_Receive.png" alt />
        </div>
        <p>待收货</p>
      </div>
      <div class="flex-item" @click="toSaleAfter">
        <div class="img-wrap">
          <image src="/static/images/my_icon_aftersale.png" alt />
        </div>
        <p>售后</p>
      </div>
    </div>

    <div class="row-padding por" style="background: #fff;">
      <div v-if="!userShow" class="login-modal" @click="goLogin"></div>
      <div class="user-center-row rel" @click="toAddress">
        <div class="img-wrap abs" style="margin: 0;">
          <image src="/static/images/my_icon_position.png" alt />
        </div>
        <div class="flex-box item-space-between user-operate">
          <span>收货地址</span>
          <span class="icon-back">
            <image src="/static/images/icon_back.png" />
          </span>
        </div>
      </div>
      <!-- 暂无
      <div class="user-center-row rel" @click="toMycoupon">
        <div class="img-wrap abs" style="margin: 0;">
          <image src="/static/images/coupon_default.png" alt />
        </div>
        <div class="flex-box item-space-between user-operate">
          <span>我的福利券</span>
          <span class="icon-back">
            <image src="/static/images/icon_back.png" />
          </span>
        </div>
      </div> -->
      <div class="user-center-row rel" @click="toBillDetail">
        <div class="img-wrap abs" style="margin: 0;">
          <image src="/static/images/my_icon_bill.png" alt />
        </div>
        <div class="flex-box item-space-between user-operate">
          <span>账单明细</span>
          <span class="icon-back">
            <image src="/static/images/icon_back.png" />
          </span>
        </div>
      </div>
    </div>
    <div class="login-wrap" v-if="userShow" @click="loginOut">
      退出账号
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // userShow: false,
      // userInfo: {}
    };
  },
  computed: {
     userShow() {
       return !!this.$store.state.token
     },
     userInfo() {
       return this.$store.state.userInfo
     }
  },
  mounted() {
    if(!this.$store.state.token){
      this.goLogin()
    }
  },

  methods: {
    toOrders(to) {
      const url = to ? `/pages/my/myorders?a=${to}` : "/pages/my/myorders";
      this.$router.push(url);
    },
    toMycoupon() {
      const url = "/pages/my/mycoupon";
      this.$router.push(url);
    },
    toSaleAfter() {
      const url = "/pages/my/saleafter";
      this.$router.push(url);
    },
    toBillDetail() {
      const url = "/pages/my/billdetail";
      this.$router.push(url);
    },
    toAddress() {
      const url = "/pages/my/address";
      this.$router.push(url);
    },
    goLogin() {
      if (!this.userInfo.truename) {
        const url = "/pages/login/login";
        this.$router.push(url);
      }
    },
    loginOut() {
      this.$store.dispatch('logout').then(() => {
        wx.showToast({
          icon: "none",
          title: "退出成功"
        });
      })
    }
  }
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 28rpx;
  background: #eee;
  .login-wrap{
    margin-top: 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #fff;
    color: #333;
    font-size: 28rpx;
  }
  .img-wrap {
    width: 40rpx;
    height: 40rpx;
    margin: 13rpx auto;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .row-padding {
    padding: 0 20rpx 0 30rpx;
  }
  .user-center-section {
    margin-bottom: 20rpx;
    &.user-info {
      width: 100%;
      height: 270rpx;
      background: #e2ce9c;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .user-info-content {
      height: 140rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    .img-avatar {
      width: 140rpx;
      height: 140rpx;
      margin-right: 20rpx;
      border-radius: 50%;
      border: 2px solid transparent;
      overflow: hidden;
    }
    .user-name {
      padding: 10rpx 0;
      line-height: 60rpx;
    }
  }
  .user-center-row {
    background: #fff;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border-bottom: 0;
    }
  }
  .user-operate {
    margin-left: 50rpx;
  }
  .por{
    position: relative;
  }
  .login-modal{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 110;
  }
}
</style>
