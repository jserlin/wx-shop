<template>
  <div class="container">
    <!-- 收货地址 -->
    <div class="line-bg"></div>
    <div class="address-wraper mb20" @click="goAddress">
      <div class="address-content">
        <div class="left">
          <div class="name">{{address.trueName}}</div>
          <div class="default" v-show="address.isDefault === '0'">默认</div>
        </div>
        <div class="right">
          <div class="right-item">{{address.addressTel}}</div>
          <div class="right-item">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</div>
        </div>
        <div class="next">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="product-wrap mb20">
      <div class="head-title">已选商品</div>
      <div class="content" v-for="(goods, index) in goodsLists" :key="index">
        <div class="img-wrap">
          <img class="img-item" :src="goods.goodsImage" />
        </div>
        <div class="desc">
          <div class="title">{{goods.goodsName}}</div>
          <div class="type">{{goods.displayString}}</div>
          <div class="price">
            <div class="price-now">￥{{goods.price}}</div>
          </div>
        </div>
        <div class="product-num">x{{goods.num}}</div>
      </div>
      <div class="foot">
        <span class="span">应付金额</span>
        <span class="span money">￥{{price}}</span>
      </div>
    </div>
    <van-cell title="支付方式" :value="payType" @click="showPayType = true"/>
    <!-- 选择原因 弹出层 -->
    <van-popup position="bottom" :show="showPayType" @close="showPayType = false" >
      <van-picker show-toolbar :columns="columns" @confirm="onPickerChange" />
    </van-popup>
    <!-- 底部tab -->
    <div class="footer-wrap">
      <van-submit-bar :price="totalPrice" button-text="立即购买" @submit="onSubmit" />
    </div>
  </div>
</template>
<script>
import { toConfirmOrder, toWxPay, toPayCode} from "@/api/";

export default {
  data() {
    return {
      goodsLists: [],
      price: 0,
      totalPrice: 0,
      payType: '微信支付',
      columns: ['微信支付', '余额支付'],
      showPayType: false
    }
  },
  computed: {
    address() {
      return this.$store.state.address
    }
  },
  mounted() {
    this.getConfirmOrder();
  },
  methods: {
    onSubmit(event) {
      const params = {
        userToken: this.$store.state.token,
        cartIds: this.$route.query.ids,
        addressId: this.address.id,
        openid: this.$store.state.openId
      }
      toWxPay(params)
    },
    onPickerChange(ev){
      this.payType = ev.target.value;
    },
    goAddress() {
      const url = "/pages/my/address"
      this.$router.push({ path: url, query: { back: 1 } })
    },
    getConfirmOrder() {
      if (this.$store.state.token) {
        const params = {
          ids: this.$route.query.ids,
          userToken: this.$store.state.token,
          addressId: ""
        };
        toConfirmOrder(params).then(res => {
          if (res.code === "success") {
            this.goodsLists = res.data;
            if(res.address) {
              this.$store.commit('SET_ADDRESS', Object.assign({}, res.address))
            }
            this.price = this.goodsLists.reduce((total, item) => {
              total += +item.totalPrice;
              return total;
            }, 0);
            this.totalPrice = this.price * 100;
          }
        });
      } else {
        const url = "/pages/login/login";
        this.$router.push({ path: url, query: { back: 1 } });
      }
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
}
.img {
  width: 100%;
  height: 100%;
}
// 底部
.footer-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100vw;
  height: 104rpx;
  background: #fff;
  border-top: 1rpx solid #d9d9d9;
}
.mb20 {
  margin-bottom: 20rpx;
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
  background: #fff8d8;
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
