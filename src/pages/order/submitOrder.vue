<template>
  <div class="container">
    <!-- 收货地址 -->
    <div class="line-bg"></div>
    <div class="address-wraper mb20" @click="goAddress">
      <div v-if="!address.trueName" class="address-content" style="justify-content: center">
        <van-button size="small">添加收获地址</van-button>
      </div>
      <div class="address-content" v-if="address.trueName">
        <div class="left">
          <div class="name">{{address.trueName}}</div>
          <div class="default" v-show="address.isDefault === '0'">默认</div>
        </div>
        <div class="right">
          <div class="right-item">{{address.addressTel}}</div>
          <div
            class="right-item"
          >{{address.province}}{{address.city}}{{address.area}}{{address.address}}</div>
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
    <van-cell v-if="needPostage" title="邮费" value="10元" />
    <van-cell title="支付方式" :value="payType" @click="selectPayType" />
    <!-- 选择原因 弹出层 -->
    <van-popup position="bottom" :show="showPayType" @close="showPayType = false">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPayType = false"
        @confirm="onPickerChange"
      />
    </van-popup>
    <!-- 余额验证码 弹出层 -->
    <van-popup :show="showPayCode" @close="cancelPay" z-index="110">
      <div style="width: 100vw">
        <van-cell-group>
          <van-field
            :value="payCode"
            @input="setPayCode"
            center
            clearable
            label="短信支付码"
            placeholder="请输入短信支付码"
            :border="false"
            use-button-slot
          >
            <van-button slot="button" size="small" @click="toPayCode" type="primary">确认</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 底部tab -->
    <div class="footer-wrap flex-box">
      <span
        class="flex-item"
        style="padding-right: 20rpx; color: #b4282d; text-align: right;"
      >¥ {{totalPrice || 0.00}}</span>
      <span
        style="background: #b4282d;color: #fff; padding: 0 20rpx; width: 160rpx;"
        class="text-center"
        @click="onSubmit"
      >立即购买</span>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import { toConfirmOrder, toWxPay, getPayCode, toPayCode } from "@/api/";
import { wxPay } from "@/utils/wx";
import Dialog from "vant-weapp/dist/dialog/dialog";

export default {
  data() {
    return {
      goodsLists: [],
      price: 0,
      needPostage: false,
      totalPrice: 0,
      payType: "余额支付",
      payCode: "",
      columns: ["余额支付", "微信支付"],
      showPayType: false,
      showPayCode: false
    };
  },
  computed: {
    address() {
      return this.$store.state.address;
    }
  },

  onShow() {
    this.payType = this.columns[0];
    this.getConfirmOrder();
  },

  methods: {
    cancelPay() {
      this.showPayCode = false;

      wx.showToast({
        icon: "none",
        title: "支付失败"
      });

      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.$router.back();
      }, 1.5e3);
    },
    onSubmit(event) {
      const commonOption = {
        userToken: this.$store.state.token,
        cartIds: this.$route.query.ids,
        addressId: this.address.id
      };

      // test pay
      // if (true) {
      //   getPayCode({
      //     userToken: this.$store.state.token
      //   }).then(res => {
      //     if (res.code === "success") {
      //       this.showPayCode = true;
      //     }
      //   });
      //   return;
      // }

      // 网易商品订单
      if (this.orderType === 0) {
        if (this.payType === "微信支付") {
          const params = Object.assign(
            {
              openid: this.$store.state.openId,
              // 当余额不足时发起的微信支付传1 当不选余额直接发起微信支付传0
              isSelectBalance: 0
            },
            commonOption
          );
          this._wxPay(params);
        }
        if (this.payType === "余额支付") {
          // 余额不足提示微信支付
          if (this.totalPrice / 100 > this.balance) {
            Dialog.confirm({
              message: "账户余额不足 是否微信支付"
            })
              .then(() => {
                const params = Object.assign(
                  {
                    openid: this.$store.state.openId,
                    // 当余额不足时发起的微信支付传1 当不选余额直接发起微信支付传0
                    isSelectBalance: 1
                  },
                  commonOption
                );
                this._wxPay(params);
              })
              .catch(() => {
                // on cancel
              });
          } else {
            // 余额支付先获取 支付码  支付
            getPayCode({
              userToken: this.$store.state.token
            }).then(res => {
              if (res.code === "success") {
                this.showPayCode = true;
              }
            });
          }
        }
      }

      // 堂食订单 只可以余额支付
      if (this.orderType === 1) {
        if (this.totalPrice / 100 > this.balance) {
          wx.showToast({
            icon: "none",
            title: "账户余额不足"
          });
        } else {
          // 余额支付先获取 支付码  支付
          getPayCode({
            userToken: this.$store.state.token
          }).then(res => {
            if (res.code === "success") {
              this.showPayCode = true;
            }
          });
        }
      }
    },

    _wxPay(params) {
      toWxPay(params).then(res => {
        if (res.appId) {
          // 支付api参数链接 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html
          // 将返回红的参数赋值的params里面
          const params = {
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.sign
          };

          wxPay(params).then(res => {
            // 支付成功跳转订单
            this.showPayCode = false;
            wx.showToast({
              icon: "none",
              title: "支付成功"
            });

            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.goMyOrder();
            }, 1.5e3);
          });
        }
      });
    },

    toPayCode() {
      if (!this.payCode.trim()) {
        wx.showToast({
          icon: "none",
          title: "请输入短信支付码"
        });
        return;
      }

      const params = {
        userToken: this.$store.state.token,
        cartIds: this.$route.query.ids,
        addressId: this.address.id,
        payCode: this.payCode
      };

      toPayCode(params).then(res => {
        // 支付成功跳转到我的订单
        if (res.code === "success") {
          this.showPayCode = false;
          wx.showToast({
            icon: "none",
            title: "支付成功"
          });
          // 余额支付成功后 刷新用户信息
          this.$store.dispatch('getInfo', this.$store.state.token)
          const timer = setTimeout(() => {
            clearTimeout(timer);
            this.goMyOrder();
          }, 1.5e3);
        }
      });
    },

    goMyOrder() {
      const url = "/pages/my/myorders";
      this.$router.push({ path: url, redirectTo: true });
    },

    setPayCode(event) {
      this.payCode = event.mp.detail;
    },

    onPickerChange(ev) {
      this.payType = ev.target.value;
      this.showPayType = false;
    },

    selectPayType() {
      // 堂食订单 只可以余额支付
      if (this.orderType === 1) {
        wx.showToast({
          icon: "none",
          title: "当前商品只可用余额支付"
        });
        return;
      }
      this.showPayType = true;
    },

    goAddress() {
      const url = "/pages/my/address";
      this.$router.push({ path: url, query: { back: 1 } });
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
            // 1、orderType=0；此订单为网易商品订单，可使用余额支付、微信支付、余额和微信混合支付
            this.orderType = res.orderType;
            this.balance = res.balance;
            if (res.address) {
              this.$store.commit("SET_ADDRESS", Object.assign({}, res.address));
            }
            this.price = this.goodsLists.reduce((total, item) => {
              total += +item.totalPrice;
              return total;
            }, 0);
            // 当确定界面需要支付的订单金额 <88元则需要在界面加一个10元邮费的栏目，订单总金额也需加上这10元，
            this.needPostage = this.price < 88;
            this.totalPrice = this.needPostage ? this.price + 10 : this.price;
            this.totalPrice = this.totalPrice.toFixed
              ? this.totalPrice.toFixed(2)
              : this.totalPrice;
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
  height: 100rpx;
  line-height: 100rpx;
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
