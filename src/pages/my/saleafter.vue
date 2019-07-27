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
          <span class="order-name"></span>
          <span class="order-status font-red">已退款退货</span>
        </div>
        <div class="order-id">
          <p>
            <span class="font-gray fl">订单编号：</span>2019073011223344
          </p>
          <p>
            <span class="font-gray fl">退单编号：</span>2019073011223344
          </p>
          <p class="font-gray">退单时间：2019-07-30 12:30:19</p>
        </div>
        <div class="goods-list flex-box item-space-between">
          <div class="order-goods flex-box">
            <span class="goods-img">
              <img src="/static/images/my_bg.png" alt />
            </span>
            <span class="goods-name">openapi矿泉水</span>
          </div>
          <span>x1</span>
        </div>
        <div class="goods-count">
          <span class="font-gray">退款金额：</span>
          <span class="font-red">¥ 18.90</span>
        </div>
        <div class="order-button">
          <span class="btn btn-outline">查看详情</span>
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
          name: "全部",
          index: "1"
        },
        {
          name: "待退货",
          index: "2"
        },
        {
          name: "已取消",
          index: "3"
        },
        {
          name: "已拒绝",
          index: "4"
        },
        {
          name: "已完成",
          index: "5"
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
      width: 200rpx;
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

