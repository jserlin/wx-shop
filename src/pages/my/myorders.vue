<template>
  <div class="my-orders-wrap">
    <div class="orders-tab flex-box mb20rpx">
      <span
        class="flex-item"
        v-for="el in tabs"
        :key="el.index"
        :class="{active: active === el.index}"
        @click="onChange(el.index)"
      >{{el.name}}</span>
    </div>
    <!-- 订单列表 -->
    <div class="order-list-wrap">
      <div class="order-item mb20rpx" v-for="el in [1,2]" :key="el">
        <div class="flex-box order-title item-space-between">
          <span class="order-name">饭卡支付</span>
          <span class="order-status font-red">已支付</span>
        </div>
        <div class="order-id">
          <p>
            <span class="font-gray fl">订单号：</span> 2019073011223344
          </p>
          <p class="font-gray">下单时间：2019-07-30 12:30:19</p>
        </div>
        <div class="goods-list flex-box item-space-between">
          <div class="order-goods flex-box">
            <span class="goods-img">
              <img src="/static/images/my_bg.png" alt />
            </span>
            <span class="goods-name">openapi矿泉水</span>
          </div>
          <span>共1款</span>
        </div>
        <div class="goods-count">
          <span>共计1款商品</span>&nbsp;
          <span>合计：</span>
          <span class="font-red">¥ 18.90</span>
          <span>（含邮费 0.00）</span>
        </div>
        <div class="order-button">
          <span class="btn btn-outline mr20rpx">查看订单</span>
          <span class="btn btn-outline">查看物流</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
      tabs: [
        {
          name: "全部订单",
          index: "1"
        },
        {
          name: "已取消",
          index: "2"
        },
        {
          name: "待发货",
          index: "3"
        },
        {
          name: "待收货",
          index: "4"
        }
      ]
    };
  },
  methods: {
    onChange(i) {
      this.active = i;
    }
  },
  mounted() {
    const { query } = this.$route;
    if (query.a) {
      this.active = query.a;
    }
  }
};
</script>
<style lang="less" scoped>
.my-orders-wrap {
  .orders-tab {
    padding: 32rpx 0;
    background: #fff;
  }
  .flex-item {
    text-align: center;
    border-right: 1rpx solid #eee;
    &:last-child {
      border-right: 0 none;
    }
  }
  .order-item {
    background-color: #fff;
    .order-title {
      padding: 0 30rpx;
      line-height: 116rpx;
      border-bottom: #eee 1rpx solid;
    }
    .order-name {
      flex: 1;
    }
    .order-status {
      width: 150rpx;
      text-align: right;
    }
    .order-id {
      padding: 16rpx 30rpx;
      line-height: 54rpx;
    }
    .order-goods {
      flex: 1;
    }
    .goods-list {
      padding: 30rpx;
      background-color: #eee;
    }
    .goods-img {
      width: 200rpx;
      height: 200rpx;
      overflow: hidden;
      margin-right: 20rpx;
      img {
        width: 100%;
      }
    }
    .goods-name {
      flex: 1;
      line-height: 72rpx;
    }
    .goods-count {
      padding: 30rpx;
      text-align: right;
      border-top: 1rpx solid #efefef;
      border-bottom: 1rpx solid #efefef;
    }
    .order-button {
      padding: 20rpx 30rpx;
      text-align: right;
    }
  }
}
</style>

