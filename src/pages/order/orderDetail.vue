<template>
  <div class="container">
    <!-- 收货地址 -->
    <div class="address-wraper" v-if="orderInfo">
      <div class="address-content">
        <div class="left">
          <van-icon name="location-o" />
        </div>
        <div class="right">
          <div class="right-item">{{orderInfo.userName + ' ' + orderInfo.userTel}}</div>
          <div class="right-item">{{orderInfo.address}}</div>
        </div>
      </div>
    </div>
    <div class="line-bg mb20"></div>
    <div class="product-wrap mb20" v-if="orderInfo">
      <div class="head-title">商品明细</div>
      <div class="list-item content" v-for="(el, i) in orderInfo.detailList" :key="i">
        <div class="flex-box">
          <div class="img-wrap">
            <img class="img-item" :src="el.goodsImage" />
          </div>
          <div class="desc">
            <div class="title">{{goodsName}}</div>
            <div class="price">
              <div class="price-now">￥{{el.price}}</div>
              <div class="type">{{el.displayString}}</div>
            </div>
            <!-- orderInfo.orderStatus === '4' && el.returnStatus === '0' -->
            <div class="tuihuo" v-if="el.returnStatus === '0'" @click="toRetunGoods(el)">申请退货</div>
            <div class="type" v-else>
              {{el.returnStatus == 0 ? '正常' :
            el.returnStatus == 1 ? '退货申请中' :
            el.returnStatus == 2 ? '渠道取消退货' :
            el.returnStatus == 3 ? '已返回退货地址' :
            el.returnStatus == 4 ? '已收到退货包裹' :
            el.returnStatus == 5 ? '拒绝退货' :
            el.returnStatus == 6 ? '超时取消退货' : '已退货退款'}}
            </div>
          </div>
        </div>
        <div class="product-num">x{{el.num}}</div>
      </div>
    </div>
    <div class="mb20">
      <van-cell title="商品总计">
        <span slot="right-icon">￥{{orderInfo.orderPrice}}(含邮费：{{orderInfo.expFee}})</span>
      </van-cell>
    </div>
    <div class="mb20">
      <van-cell>
        <span class="grey" slot="title">支付方式</span>
        <span slot="right-icon">
          {{orderInfo.payType == 0 ? '企业余额支付' :
          orderInfo.payType == 1 ? '饭卡支付' :
          orderInfo.payType == 2 ? '福利劵支付' :
          orderInfo.payType == 3 ? '微信支付' : ''}}
        </span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">订单编号</span>
        <span slot="right-icon">{{orderInfo.orderCode}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">下单时间</span>
        <span slot="right-icon">{{orderInfo.createtime}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">支付时间</span>
        <span slot="right-icon">{{orderInfo.payTime}}</span>
      </van-cell>
    </div>
  </div>
</template>
<script>
import { getOrderInfo } from "@/api";
export default {
  data() {
    return {
      orderInfo: {},
      id: null
    };
  },
  onLoad() {
    const { query } = this.$route;
    if (query.id) {
      this.id = query.id;
      this.getOrderDetail();
    }
  },
  methods: {
    toRetunGoods(item) {
      const path = "/pages/order/applyReturnGoods";

      this.$router.push({
        path,
        query: {
          orderCode: item.orderCode,
          skuId: item.skuId
        }
      });
    },
    getOrderDetail() {
      getOrderInfo({
        userToken: this.$store.state.token,
        orderCode: this.id
      }).then(res => {
        if (res && res.code === "success") {
          this.orderInfo = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  background: #fff;
  background: #fafafa;
  color: #333;
  min-height: 100vh;
  box-sizing: border-box;
}
.img {
  width: 100%;
  height: 100%;
}
.mb20 {
  margin-bottom: 20rpx;
}
.grey {
  color: #999;
}
// 地址
.line-bg {
  display: block;
  width: 100%;
  height: 10rpx;
  background: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-1579543565.png)
    repeat-x;
  background-size: 60rpx 10rpx;
}
.address-wraper {
  padding: 24rpx 0 8rpx;
  background: #fff;
  .address-content {
    position: relative;
    padding-left: 30rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .left {
      margin-right: 20rpx;
      align-self: flex-start;
      line-height: 1;
      color: #333;
      .name {
        margin-bottom: 16rpx;
      }
      .default {
        padding: 0 5rpx;
        font-size: 20rpx;
        line-height: 28rpx;
        text-align: center;
        color: #b4282d;
        border-radius: 6rpx;
        border: 1rpx solid #b4282d;
      }
    }
    .right {
      flex: 1;
      .right-item {
        position: relative;
        margin-right: 40rpx;
        margin-bottom: 16rpx;
        padding-left: 16rpx;
        line-height: 1;
        color: #7f7f7f;
      }
    }
    .next {
      padding: 0 20rpx;
    }
  }
}
.product-wrap {
  background: #fff;
  .head-title {
    padding-top: 20rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    height: 40rpx;
    color: #333;
  }
  .foot {
    padding: 20rpx 0;
    margin-right: 30rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    height: 40rpx;
    text-align: right;
    .span {
      color: #333;
    }
    .money {
      color: #b4282d;
    }
  }
  // 商品列表
  .content {
    margin-left: 20rpx;
    padding: 30rpx 10rpx 30rpx 0rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border: none;
    }
    .img-wrap {
      margin-right: 40rpx;
      width: 120rpx;
      height: 120rpx;
      background: #f4f4f4;
      .img-item {
        width: 120rpx;
        height: 120rpx;
      }
    }
    .desc {
      flex: 1;
      .title {
        color: #333;
        font-size: 28rpx;
        margin: 4rpx 0;
      }
      .type {
        font-size: 24rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #999;
      }
      .price {
        display: inline-flex;
        padding-top: 6rpx;
        .price-now {
          padding-right: 10rpx;
          font-size: 28rpx;
        }
        .price-del {
          position: relative;
          color: #ccc;
          font-size: 28rpx;
          .del {
            position: absolute;
            left: 0;
            bottom: 20rpx;
            width: 100%;
            height: 2rpx;
            background: #ccc;
          }
        }
      }
      .tuihuo {
        padding: 0 20rpx;
        width: 100rpx;
        border-radius: 8rp;
        border: 1rpx solid #d9d9d9;
        font-size: 24rpx;
        line-height: 36rpx;
      }
    }
    .red {
      color: #f60;
    }
    .product-num {
      font-size: 28rpx;
      margin-right: 30rpx;
    }
  }
}
</style>
