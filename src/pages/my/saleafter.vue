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
      <div class="order-item mb20rpx" v-for="el in orderList" :key="el.orderCode">
        <div class="flex-box order-title item-space-between">
          <span class="order-name">{{el.refundType == 1 ? '无理由(普通退货)' : '质量问题(顺丰到付)'}}</span>
          <!-- 0正常 1退货申请中 2渠道取消退货 3已返回退货地址 4已收到退货包裹 5拒绝退货 6超时取消退货 7已退货退款 -->
          <span class="order-status font-red">
            {{el.returnStatus == 0 ? '正常' :
            el.returnStatus == 1 ? '退货申请中' :
            el.returnStatus == 2 ? '渠道取消退货' :
            el.returnStatus == 3 ? '已返回退货地址' :
            el.returnStatus == 4 ? '已收到退货包裹' :
            el.returnStatus == 5 ? '拒绝退货' :
            el.returnStatus == 6 ? '超时取消退货' : '已退货退款'
            }}
          </span>
        </div>
        <div class="order-id">
          <p>
            <span class="font-gray fl">订单编号：</span>
            {{el.orderCode}}
          </p>
          <p>
            <span class="font-gray fl">退单编号：</span>
            {{el.skuId}}
          </p>
          <p class="font-gray">退单时间：{{el.returnTime}}</p>
        </div>
        <div class="goods-list flex-box item-space-between">
          <div class="order-goods flex-box" @click="goGoodsInfo(el)">
            <span class="goods-img">
              <img :src="el.goodsImage" alt />
            </span>
            <span class="goods-name">{{el.goodsName}}</span>
          </div>
          <span>x1</span>
        </div>
        <div class="goods-count">
          <span class="font-gray">退款金额：</span>
          <span class="font-red">¥ {{el.totalPrice}}</span>
        </div>
        <div class="order-button">
          <span
            class="btn btn-outline mr20rpx"
            @click="cancelReturnOrder(el)"
            v-if="el.returnStatus === '1'"
          >取消退货</span>
          <span class="btn btn-outline mr20rpx" @click="goBindExpress(el)" v-if="!el.trackingNum && el.returnStatus === '3'">绑定寄回物流</span>
          <span class="btn btn-outline" @click="goDetail(el)">查看详情</span>
        </div>
      </div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { getReturnofGoodList, cancelReturnOfGoods } from "@/api";
import Dialog from "vant-weapp/dist/dialog/dialog";
export default {
  data() {
    return {
      active: "0",
      tabs: [
        {
          name: "全部",
          index: "0"
        },
        {
          name: "待退货",
          index: "3"
        },
        {
          name: "已取消",
          index: "2"
        },
        {
          name: "已拒绝",
          index: "5"
        },
        {
          name: "已完成",
          index: "7"
        }
      ],
      orderList: []
    };
  },
  onShow() {
    this.getSaleafterOrder();
  },
  methods: {
    onChange(i) {
      this.active = i;
      this.getSaleafterOrder();
    },
    goDetail(info) {
      const path = "/pages/order/returnGoodsDetail";
      this.$router.push({
        path,
        query: info
      });
    },
    getSaleafterOrder() {
      getReturnofGoodList({
        userToken: this.$store.state.token,
        returnStatus: this.active,
        page: 1
      }).then(res => {
        if (res && res.code === "success") {
          this.orderList = res.data;
        }
      });
    },
    cancelReturnOrder(el) {
      Dialog.confirm({
        message: "确认取消退货订单？",
        showCancelButton: true,
        asyncClose: true
      })
        .then(() => {
          cancelReturnOfGoods({
            userToken: this.$store.state.token,
            returnApplyId: el.returnApplyId
          }).then(res => {
            if(res && res.code === 'success'){
              Dialog.close();
            }
          });
        })
        .catch(() => {
          Dialog.close();
        });
    },
    goBindExpress(el){
      const path = '/pages/order/bindOrderExpress'
      this.$router.push({
        path,
        query: {
          returnApplyId: el.returnApplyId
        }
      })
    },

    goGoodsInfo(item) {
      const path = "/pages/product/detail";
      this.$router.push({
        path,
        query: { id: item.goodsId }
      });
    },
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

