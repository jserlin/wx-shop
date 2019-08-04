<template>
  <div class="container">
    <div class="product-wrap mb20" v-if="goodsInfo">
      <div class="content">
        <div class="img-wrap">
          <img
            class="img-item"
            :src="goodsInfo.goodsImage"
          />
        </div>
        <div class="desc">
          <div class="title">{{goodsInfo.goodsName}}</div>
          <div class="price">
            <div class="price-now">￥{{goodsInfo.price}}</div>
          </div>
        </div>
        <div class="product-num">x{{goodsInfo.num}}</div>
      </div>
    </div>

    <div @click="showReason = true" v-if="goodsInfo">
      <van-cell title="退换货原因" :value="reason" is-link @click="showReason = true" />
    </div>

    <div class="reason-wrap mb20" v-if="goodsInfo">
      <div class="left">退换货详细原因</div>
      <div class="right">
        <van-field :value="reasonDetail" placeholder="必填" @change="onChange" />
      </div>
    </div>

    <van-cell title="商品价格" v-if="goodsInfo">
      <span class="red" slot="right-icon">￥{{goodsInfo.totalPrice}}</span>
    </van-cell>

    <!-- 选择原因 弹出层 -->
    <van-popup position="bottom" :show="showReason" @close="showReason = false" v-if="goodsInfo">
      <van-picker show-toolbar :columns="columns" @confirm="onPickerChange" />
    </van-popup>

    <!-- 底部tab -->
    <div class="footer-wrap" v-if="goodsInfo">
      <van-submit-bar label="退款金额: " :price="price" button-text="立即退换" @submit="onSubmit" />
    </div>
  </div>
</template>
<script>
import { getReturnofGoods, postReturnOfGoods } from "@/api";
export default {
  data() {
    return {
      orderCode: null,
      skuId: null,
      goodsInfo: null,
      orderInfo: null,
      showReason: false,
      reason: undefined,
      reasonDesc: undefined,
      columns: ["必选", "无理由退货", "质量问题"]
    };
  },
  onLoad() {
    const { query } = this.$route;
    if (query.orderCode) {
      this.orderCode = query.orderCode;
      this.skuId = query.skuId;
      this.reason = this.columns[0]
      this.getReturnofGoods();
    }
  },
  methods: {
    onSubmit(event) {
      this.reason && this.reason !== '必选' && this.reasonDesc && postReturnOfGoods({
        reason: this.reason,
        reasonDesc: this.reasonDesc,
        userToken: this.$store.state.token,
        skuId: this.skuId,
        orderCode: this.orderCode
      }).then(res=>{
        if(res && res.code === 'success'){
          const url = "/pages/my/my";
          this.$router.push({ path: url, isTab: true });
        }
      })
    },
    onChange(val) {
      this.reasonDesc = val.mp.detail;
    },
    onPickerChange(val) {
      this.showReason = !this.showReason
      this.reason = val.target.value
    },
    getReturnofGoods() {
      getReturnofGoods({
        userToken: this.$store.state.token,
        orderCode: this.orderCode,
        skuId: this.skuId
      }).then(res => {
        if (res && res.code === "success") {
          this.goodsInfo = res.data;
          this.orderInfo = res.order;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  padding-bottom: 104rpx;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  background: #fff;
  background: #fafafa;
  color: #333;
  min-height: 100vh;
  box-sizing: border-box;
  // 退换货原因
  .reason-wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 15rpx 10px 15px;
    font-size: 14px;
    line-height: 24px;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
    .left {
      flex: 2;
    }
    .right {
      flex: 3;
      box-sizing: border-box;
    }
  }
}
.img {
  width: 100%;
  height: 100%;
}
.red {
  color: #f60;
}
// 底部
.footer-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 80;
  width: 100vw;
  height: 104rpx;
  background: #fff;
  border-top: 1rpx solid #d9d9d9;
}
.mb20 {
  margin-bottom: 20rpx;
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
    justify-content: center;
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
    }
    .red {
      color: #b4282d;
    }
    .product-num {
      font-size: 28rpx;
      margin-right: 30rpx;
    }
  }
}
</style>
