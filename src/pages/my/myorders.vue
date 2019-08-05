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
    <scroll-view scroll-y class="order-list-wrap" @scrolltolower="getMoreOrderList">
      <div class="order-item mb20rpx" v-for="el in orderList" :key="el.orderCode">
        <div class="flex-box order-title item-space-between">
          <span class="order-name">
            {{el.payType == 0 ? '企业余额支付' :
            el.payType == 1 ? '饭卡支付' :
            el.payType == 2 ? '福利劵支付' :
            el.payType == 3 ? '微信支付' : ''}}
          </span>
          <span class="order-status font-red">
            {{el.orderStatus === '0' ? '已下单未付款' :
            el.orderStatus === '1' ? '已取消订单' :
            el.orderStatus === '2' ? '已付款，未发货' :
            el.orderStatus === '3' ? '发货，未收货' :
            el.orderStatus === '4' ? '已收货' :
            el.orderStatus === '5' ? '退货申请中' :
            el.orderStatus === '6' ? '已退货退款' : '取消审核中'}}
          </span>
        </div>
        <div class="order-id">
          <p>
            <span class="font-gray fl">订单号：</span>
            {{el.orderCode}}
          </p>
          <p class="font-gray">下单时间：{{el.createtime}}</p>
        </div>
        <div class="goods-list flex-box item-space-between">
          <div class="order-goods">
            <div
              class="order-goods-item flex-box"
              v-for="(item, j) in el.detailList"
              :key="j"
              @click="goGoodsInfo(item)"
            >
              <span class="goods-img">
                <img :src="item.goodsImage" alt />
              </span>
              <span class="goods-name">{{item.goodsName}}</span>
            </div>
          </div>
          <span>共{{el.num}}款</span>
        </div>
        <div class="goods-count">
          <span>共计{{el.num}}款商品</span>&nbsp;
          <span>合计：</span>
          <span class="font-red">¥ {{el.orderPrice}}</span>&nbsp;
          <span>含邮费 ({{el.expFee}})</span>
        </div>
        <div class="order-button">
          <span class="btn btn-outline mr20rpx" @click="toOrderDetail(el)">查看订单</span>
          <span
            class="btn btn-outline mr20rpx"
            @click="toLogistics(el)"
            v-if="el.orderStatus == 3 || el.orderStatus == 4"
          >查看物流</span>
          <span class="btn btn-outline" v-if="el.orderStatus == 3" @click="toSureOrder(el)">确认收货</span>
          <span class="btn btn-outline" v-if="el.orderStatus == 2" @click="toCancelOrder(el)">取消订单</span>
        </div>
      </div>
    </scroll-view>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { getMyCenterOrder, cancelOrderByOrders, confirmOrder } from "@/api";
import Dialog from "vant-weapp/dist/dialog/dialog";

export default {
  data() {
    return {
      active: "0",
      tabs: [
        {
          name: "全部订单",
          index: "0"
        },
        {
          name: "已取消",
          index: "1"
        },
        {
          name: "待发货",
          index: "2"
        },
        {
          name: "待收货",
          index: "3"
        }
      ],
      orderList: [],
      page: 1
    };
  },
  methods: {
    onChange(i) {
      this.active = i;
      this.getOrderList();
    },
    toSureOrder(item) {
      Dialog.confirm({
        message: "确认收货吗？",
        showCancelButton: true,
        asyncClose: true
      }).then(() => {
        confirmOrder({
          userToken: this.$store.state.token,
          orderCode: item.orderCode,
          packageId: ''
        }).then(res=>{
          if(res && res.code === "success"){
            Dialog.close();
            this.getOrderList()
          }
        })
      }).catch(() => {
        Dialog.close();
      });
    },
    toCancelOrder(item) {
      Dialog.confirm({
        message: "确认删除订单？",
        showCancelButton: true,
        asyncClose: true
      }).then(() => {
        cancelOrderByOrders({
          userToken: this.$store.state.token,
          orderCode: item.orderCode
        }).then(res=>{
          if(res && res.code === "success"){
            Dialog.close();
            this.getOrderList()
          }
        })
      }).catch(() => {
        Dialog.close();
      });
    },
    toLogistics(item) {
      const path = "/pages/order/logisticsDetail";
      this.$router.push({
        path,
        query: {
          id: item.orderCode
        }
      });
    },
    toOrderDetail(item) {
      const path = "/pages/order/orderDetail";
      this.$router.push({
        path,
        query: { id: item.orderCode }
      });
    },
    getOrderList() {
      getMyCenterOrder({
        userToken: this.$store.state.token,
        orderStatus: this.active === "0" ? "" : this.active,
        page: 1
      }).then(res => {
        if (res.code === "success") {
          this.orderList = res.data;
        }
      });
    },
    getMoreOrderList() {
      getMyCenterOrder({
        userToken: this.$store.state.token,
        orderStatus: this.active === "0" ? "" : this.active,
        page: ++this.page
      }).then(res => {
        if (res.code === "success") {
          this.orderList = this.orderList.concat(res.data);
        }
      });
    },
    goGoodsInfo(item) {
      const path = "/pages/product/detail";
      this.$router.push({
        path,
        query: { id: item.goodsId }
      });
    }
  },
  mounted() {
    const { query } = this.$route;
    if (query.a) {
      this.active = query.a;
      this.getOrderList();
      return;
    }
    this.getOrderList();
  },
  onUnload(){
    console.log('unload')
    wx.switchTab({
      url: '/pages/my/my'
    })
  }
};
</script>
<style lang="less" scoped>
.my-orders-wrap {
  font-size: 28rpx;
  .orders-tab {
    padding: 20rpx 0;
    background: #fff;
  }
  .flex-item {
    text-align: center;
    border-right: 1rpx solid #eee;
    &:last-child {
      border-right: 0 none;
    }
  }
  .order-list-wrap {
    position: relative;
    height: 100%;
  }
  .order-item {
    background-color: #fff;
    .order-title {
      padding: 20rpx 30rpx;
      border-bottom: #eee 1rpx solid;
    }
    .order-name {
      flex: 1;
    }
    .order-status {
      flex: 1;
      text-align: right;
    }
    .order-id {
      padding: 20rpx 30rpx;
      line-height: 54rpx;
    }
    .order-goods {
      flex: 1;
    }
    .goods-list {
      padding: 20rpx 30rpx;
      background-color: #eee;
    }
    .order-goods-item {
      margin-bottom: 20rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .goods-img {
      width: 200rpx;
      height: 200rpx;
      overflow: hidden;
      margin-right: 20rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-name {
      flex: 1;
      line-height: 72rpx;
    }
    .goods-count {
      padding: 20rpx 30rpx;
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

