<template>
  <div class="container">
    <div class="product-wrap mb20" v-if="returnOrderInfo">
      <div class="content">
        <div class="img-wrap">
          <img
            class="img-item"
            :src="returnOrderInfo.goodsImage"
          />
        </div>
        <div class="desc">
          <div class="title">{{returnOrderInfo.goodsName}}</div>
          <div class="price">
            <div class="price-now">￥{{returnOrderInfo.price}}</div>
          </div>
          <div class="type">{{returnOrderInfo.displayString}}</div>
        </div>
        <div class="product-num">x{{returnOrderInfo.num}}</div>
      </div>
    </div>
    <div class="mb20" v-if="returnOrderInfo">
      <van-cell title="退款金额">
        <span class="red" slot="right-icon">￥{{returnOrderInfo.totalPrice}}</span>
      </van-cell>
    </div>
    <div class="group" v-if="returnOrderInfo">
      <van-cell>
        <span class="grey" slot="title">订单编号</span>
        <span slot="right-icon">{{returnOrderInfo.orderCode}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退单编号</span>
        <span slot="right-icon">{{returnOrderInfo.returnApplyId}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货时间</span>
        <span slot="right-icon">{{returnOrderInfo.returnTime}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货状态</span>
        <span slot="right-icon">{{returnOrderInfo.returnStatus == 0 ? '正常' :
            returnOrderInfo.returnStatus == 1 ? '退货申请中' :
            returnOrderInfo.returnStatus == 2 ? '渠道取消退货' :
            returnOrderInfo.returnStatus == 3 ? '已返回退货地址' :
            returnOrderInfo.returnStatus == 4 ? '已收到退货包裹' :
            returnOrderInfo.returnStatus == 5 ? '拒绝退货' :
            returnOrderInfo.returnStatus == 6 ? '超时取消退货' : '已退货退款'}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货原因</span>
        <span slot="right-icon">{{returnOrderInfo.reason}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货详细原因</span>
        <span slot="right-icon">{{returnOrderInfo.reasonDesc || '未填写'}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货收件人姓名</span>
        <span slot="right-icon">{{returnOrderInfo.returnName || '未填写'}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货收件人手机</span>
        <span slot="right-icon">{{returnOrderInfo.returnMobile || '未填写'}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货地址</span>
        <span slot="right-icon" style="fdisplay: inline-block; max-width:70%;">{{returnOrderInfo.returnFullAddress || '未填写'}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货物流单号</span>
        <span slot="right-icon">{{returnOrderInfo.trackingNum}}</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货物流公司</span>
        <span slot="right-icon">{{returnOrderInfo.trackingCompany}}</span>
      </van-cell>
    </div>
  </div>
</template>
<script>
import { getReturnofGoodInfo } from "@/api";
export default {
  data() {
    return {
      infoId: null,
      returnOrderInfo: null
    };
  },
  onLoad() {
    const { query } = this.$route;
    if (query.returnApplyId) {
      this.infoId = query;
      this.getReturnGoodsInfo();
    }
  },
  methods: {
    getReturnGoodsInfo() {
      getReturnofGoodInfo({
        returnApplyId: this.infoId.returnApplyId,
        userToken: this.$store.state.token
      }).then(res => {
        if (res.code === "success") {
          this.returnOrderInfo = res.data;
        }
      });
    },
    toRetunGoods() {
      const url = "/pages/order/applyReturnGoods";
      this.$router.push(url);
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
      align-self: flex-start;
      margin-right: 30rpx;
    }
  }
}
</style>
