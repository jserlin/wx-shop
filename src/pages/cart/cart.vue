<template>
  <div class="cart">
    <div class="top" v-if="isLogin">
      <div class="tip-item">30天无忧退货</div>
      <div class="tip-item">48小时快速退款</div>
      <div class="tip-item">满88元免邮费</div>
    </div>
    <div class="cartlist" v-if="isLogin">
      <div class="item" v-for="(goods, index) in cartList" :key="index">
        <van-swipe-cell :right-width="65">
          <div class="con">
            <div class="icon" @click="toggleCheck(goods, index)" :class="{active: goods.checked}"></div>
            <div class="img-wrap" @click="goGoodsInfo(goods)">
              <img class="img" :src="goods.goodsImage" alt />
            </div>
            <div class="info">
              <div class="name">{{goods.goodsName}}</div>
              <div class="desc">
                <span class="span">{{goods.displayString}}</span>
              </div>
              <div class="price">￥{{goods.price}}</div>
            </div>
          </div>
          <div class="m-selNumRow">
            <div class="m-selnum">
              <div class="less" @click="updateGoods(goods)">
                <div class="span">-</div>
              </div>
              <div class="textWrap">
                <div class="modal"></div>
                <input class="input" disable type="tel" :value="goods.num" />
              </div>
              <div class="more" @click="updateGoods(goods, 'add')">
                <div class="span">+</div>
              </div>
            </div>
          </div>
          <div slot="right" class="del-wrap" @click="delShoppingCart(goods)">
            <div class="del-btn">删除</div>
          </div>
        </van-swipe-cell>
      </div>
    </div>
    <!-- 没商品时展示 -->
    <div class="nogoods" v-show="!cartList.length">
      <img
        src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
        alt
      />
      <div class="p" v-if="!isLogin">未登录</div>
      <div class="login" @click="goLogin">
        <van-button block v-if="!isLogin" type="primary">登录</van-button>
      </div>
    </div>
    <div class="foot-fixed" v-if="isLogin">
      <div class="left allcheck" :class="{active: checkAll}" @click="checkAllGoods">{{selectText}}</div>
      <div class="right">
        <div>￥{{totalPrice}}</div>
        <div @click="toConfirmOrder">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkShoppingCartLists,
  updateShoppingCart,
  delShoppingCart
} from "@/api/";

export default {
  data() {
    return {
      cartList: [],
      checkAll: false,
      checkedList: [],
      selectText: "全选"
    };
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token
    },
    shoppingCartLists() {
      return this.$store.state.shoppingCartLists;
    },
    totalPrice() {
      return this.cartList.reduce((total, item) => {
        if (item.checked) {
          total += +item.totalPrice;
        }
        return total;
      }, 0);
    }
  },
  watch: {
    shoppingCartLists(nv) {
      this.cartList = nv.map(item => {
        const _obj = Object.assign({}, item);
        if (this.checkedList.includes(item.id)) {
          _obj.checked = true;
        } else {
          _obj.checked = false;
        }
        return _obj;
      });
    },
    checkedList(nv) {
      this.checkAll = this.checkedList.length === this.cartList.length;
      if (this.checkAll) {
        this.selectText = "全选";
      }
      // else {
      //   this.selectText = nv.length ? `已选${nv.length}` : "全选";
      // }
    }
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "购物车"
    });
    if(!this.$store.state.token){
      this.goLogin()
    }
  },
  methods: {
    toggleCheck(goods, index) {
      // console.log("TCL: toggleCheck -> goods", goods)
      goods.checked = !goods.checked;
      if (goods.checked) {
        if (!this.checkedList.includes(goods.id)) {
          this.checkedList.push(goods.id);
        }
      } else {
        this.checkedList.splice(this.checkedList.indexOf(goods.id), 1);
      }
      // this.$set(this.cartList[index], 'checked', !this.cartList[index].checked)
    },
    goGoodsInfo(item) {
      const path = "/pages/product/detail";
      this.$router.push({
        path,
        query: { id: item.goodsId }
      });
    },
    checkAllGoods() {
      this.checkAll = !this.checkAll;
      if(!this.cartList.length){
        return
      }

      if (this.checkAll) {
        this.cartList.forEach(item => {
          item.checked = true;
        });
        this.checkedList = this.cartList.reduce((pre, item) => {
          pre.push(item.id);
          return pre;
        }, []);
      } else {
        this.cartList.forEach(item => {
          item.checked = false;
        });
        this.checkedList = [];
      }
    },
    updateGoods(goods, type) {
      if (type === "add") {
        goods.num++;
      } else {
        if (goods.num <= 1) {
          wx.showToast({
            icon: "none",
            title: "不能再少了~"
          });
          return;
        }
        goods.num--;
      }
      const params = {
        id: goods.id,
        userToken: this.$store.state.token,
        num: goods.num
      };
      updateShoppingCart(params).then(result => {
        if (result.code === "success") {
          this.$store.dispatch("getShoppingLists");
          wx.showToast({
            icon: "none",
            title: "修改成功"
          });
        }
      });
    },
    delShoppingCart(goods) {
      const params = {
        ids: goods.id,
        userToken: this.$store.state.token
      };
      delShoppingCart(params).then(result => {
        if (result.code === "success") {
          this.$store.dispatch("getShoppingLists");
          wx.showToast({
            icon: "none",
            title: "删除成功"
          });
        }
      });
    },
    async toConfirmOrder() {
      if (!this.checkedList.length) {
        wx.showToast({
          icon: "none",
          title: "请选择商品"
        });
        return;
      }
      const ids = this.checkedList.join(",");
      // 下单前需要校验下所选商品 是够可以一单
      const result = await checkShoppingCartLists({
        ids,
        userToken: this.$store.state.token
      });
      if (result.code === "success") {
        const url = "/pages/order/submitOrder";
        // router.push({ path: '/pages/news/list', redirectTo: true })
        this.$router.push({ path: url, redirectTo: true, query: { ids } });
      }
    },
    goLogin() {
      if (!this.$store.state.token) {
        const url = "/pages/login/login";
        this.$router.push({
          path: url,
          query: {back: 1}
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.w100{
  width: 100%;
}
.cart {
  position: relative;
  padding-bottom: 104rpx;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  background: #fff;
  background: #fafafa;
  color: #333;
  min-height: 100vh;
  box-sizing: border-box;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 20rpx;
    .tip-item {
      background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png)
        0 center no-repeat;
      background-size: 10rpx;
      padding-left: 15rpx;
      display: flex;
      align-items: center;
      font-size: 25rpx;
      color: #666;
    }
  }
  .cartlist {
    background: #fff;
    margin-bottom: 110rpx;
    .del-wrap {
      width: 130rpx;
      height: 100%;
      margin-left: 24rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #b4282d;
      .del-btn {
        padding: 6rpx 10rpx;
      }
    }
    .item {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f4f4f4;
      position: relative;
      .con {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 300ms ease;
        .icon {
          height: 125rpx;
          width: 40rpx;
          background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png)
            no-repeat center center;
          background-size: 40rpx 40rpx;
          margin: 0 30rpx;
        }
        .icon.active {
          background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png)
            no-repeat center center;
          background-size: 40rpx 40rpx;
        }
        .img-wrap {
          width: 170rpx;
          height: 170rpx;
          position: relative;
          margin-right: 20rpx;
          border-radius: 8rpx;
          overflow: hidden;
          background-color: #eee;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          flex: 1;
          padding: 20rpx;
          .name {
            line-height: 36rpx;
            font-size: 28rpx;
          }
          .desc {
            color: #7f7f7f;
            margin-top: 10rpx;
            font-size: 24rpx;
            line-height: 36rpx;
            .span {
              display: inline-block;
              padding: 0 10rpx;
              border: 1rpx solid #efefef;
              border-radius: 0.02667rem;
              background: #fafafa;
            }
          }
          .price {
            padding-top: 30rpx;
            font-size: 32rpx;
          }
        }
      }
      .delete {
        position: absolute;
        width: 100rpx;
        top: 0;
        right: -100rpx;
        text-align: center;
        height: 100%;
        background: #b4282d;
        color: #fff;
        transition: all 200ms ease;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          color: #fff;
        }
      }
    }
  }
  .foot-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100rpx;
    line-height: 100rpx;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png)
        no-repeat;
      background-size: 34rpx 34rpx;
      background-position: 20rpx;
      padding-left: 70rpx;
    }
    .active {
      background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png)
        no-repeat;
      background-size: 34rpx 34rpx;
      background-position: 20rpx;
    }
    .right {
      display: flex;
      div:nth-child(1) {
        color: #b4282d;
        padding-right: 40rpx;
      }
      div:nth-child(2) {
        width: 200rpx;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 29rpx;
        background: #b4282d;
        color: #fff;
      }
    }
  }
  .nogoods {
    padding-top: 200rpx;
    img {
      margin: 0 auto;
      display: block;
      width: 258rpx;
      height: 258rpx;
    }
    .p{
      text-align: center;
      font-size: 28rpx;
    }
    .login{
      margin: 40rpx;
      text-align: center;
    }
  }
}
// 数量加减 样式
.m-selNumRow {
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
  display: flex;
  align-items: center;
  .m-selnum {
    display: inline-flex;
    line-height: 66rpx;
    text-align: center;
    border: 1rpx solid #d9d9d9;
    .less,
    .more {
      position: relative;
      width: 60rpx;
      height: 50rpx;
      text-align: center;
      .span {
        font-size: 30rpx;
        line-height: 50rpx;
      }
    }
    .textWrap {
      position: relative;
      width: 58rpx;
      text-align: center;
      border-left: 1rpx solid #d9d9d9;
      border-right: 1rpx solid #d9d9d9;
      .modal {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
      .input {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        text-align: center;
        color: #333;
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
