<template>
  <div class="container">
    <div class="user-center-section user-info rel">
      <image src="/static/images/my_bg.png" alt />
      <div class="user-info-content row-padding abs flex-box">
        <div class="img-avatar">
          <image src="/static/images/my_bg.png" alt />
        </div>
        <div class="user-name">
          <p class="font-30">范晓萱</p>
          <p class="font-28">
            福利券金额：
            <span class="font-red">¥ 500.00</span>
          </p>
        </div>
      </div>
    </div>

    <div class="user-center-row" style="padding: 24rpx 20rpx 24rpx 30rpx;" @click="toOrders(1)">
      <div class="flex-box item-space-between" >
        <span>订单</span>
        <span class="icon-back">
          <image src="/static/images/icon_back.png" />
        </span>
      </div>
    </div>
    <div
      class="flex-box item-space-between text-center mb20rpx"
      style="background: #fff; padding: 18rpx 0;">
      <div class="flex-item" @click="toOrders(2)">
        <div class="img-wrap">
          <image src="/static/images/my_icon_cancel.png" alt />
        </div>
        <p>已取消</p>
      </div>
      <div class="flex-item" @click="toOrders(3)">
        <div class="img-wrap rel">
          <image src="/static/images/my_icon_send.png" alt />
        </div>
        <p>待发货</p>
      </div>
      <div class="flex-item" @click="toOrders(4)">
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

    <div class="row-padding" style="background: #fff;">
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
      </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        nickName: "阿凡提",
        avatar: "",
        id: "1"
      }
    };
  },

  computed: {},

  mounted() {},

  onHide() {
    wx.stopAccelerometer();
  },

  methods: {
    toOrders(to) {
      const url = to ? `/pages/my/myorders?a=${to}` : '/pages/my/myorders'
      this.$router.push(url)
    },
    toMycoupon(){
      const url = '/pages/my/mycoupon'
      this.$router.push(url)
    },
    toSaleAfter(){
      const url = '/pages/my/saleafter'
      this.$router.push(url)
    },
    toBillDetail(){
      const url = '/pages/my/billdetail'
      this.$router.push(url)
    },
    toAddress(){
      const url = '/pages/my/address'
      this.$router.push(url)
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
        height: 270rpx;
      }
    }
    .user-info-content {
      width: 100%;
      height: 140rpx;
      top: 50%;
      transform: translateY(-50%);
    }
    .img-avatar {
      width: 140rpx;
      height: 140rpx;
      margin-right: 20rpx;
      border-radius: 50%;
      border: 2px solid #e9d9b5;
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
	.user-operate{
		margin-left: 50rpx;
	}
}
</style>
