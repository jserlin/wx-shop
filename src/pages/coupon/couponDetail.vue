<template>
  <div class="container">
    <div>
      <div class="product-banner">
        <div class="swiper">
          <div class="swiper-item">
            <image :src="bannerImgUrl" class="slide-image" />
          </div>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="product-info">
        <div class="cloumn">
          <div class="price">
            <div class="span">￥</div>
            <div class="price-now"> 280</div>
            <div class="price-del">
            <div class="del"></div>￥300</div>
          </div>
        </div>
        <div class="content">
          <div class="desc">
            <div class="title">300元福利券</div>
          </div>
        </div>
      </div>
      <!-- 购买须知 -->
      <div class="notice-card">
        <div class="title">
          <div class="notice-tip"></div>
          购买须知
        </div>
        <div class="notice-con">
          <div class="notice-title">
            <div class="notice-circle"></div>
            有效期
          </div>
          <div class="notice-desc">
            <div class="notice-circle"></div>
            购买日起一个月内有效
          </div>
        </div>
        <div class="notice-con">
          <div class="notice-title">
            <div class="notice-circle"></div>
            有效期
          </div>
          <div class="notice-desc">
            <div class="notice-circle"></div>
            购买日起一个月内有效
          </div>
          <div class="notice-desc">
            <div class="notice-circle"></div>
            购买日起一个月内有效
          </div>
        </div>
      </div>
      <!-- 底部tab -->
      <div class="footer-wrap">
        <div class="flex-wrap">
          <div class="left">实付: ￥280</div>
          <div class="right">
            <div class="button car" @click="toBuy">立即购买</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      active: 1,
      showPopup: false,
      bannerImgUrl: 'https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0',
      currentIndex: 1,
      productDescImg: [
          'http://yanxuan.nosdn.127.net/d6271f89d8fda25b80f35b592514b50d.jpg',
          'http://yanxuan.nosdn.127.net/fa930e294230cc03abcb263b46db4363.jpg'
      ],
      productInfo: {
          tags: []
      }
    }
  },
  // onShareAppMessage: function() {
  //   return {
  //     title: this.productInfo.name || '',
  //     desc: this.productInfo.description || '',
  //     path: `/pages/product/productDetail?id=${this.productInfo.id}`
  //   }
  // }
  methods: {
    onChange(event) {
      console.log("TCL: onChange -> event", event)
    },
    toBuy() {
      const url = '/pages/order/submitOrder'
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  padding-bottom: 104rpx;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  background: #f7f7f7;
  min-height: 100%;
  box-sizing: border-box;
}
.grey{
  line-height: 52rpx;
  color: #999;
  font-size: 28rpx;
}
// banner轮播
.product-banner {
  position: relative;
  .swiper {
      width: 750rpx;
      height: 750rpx;
      .swiper-item {
          width: 100%;
          height: 100%;
          .slide-image {
              width: 100%;
              height: 100%;
          }
      }
  }
}
.select-cell-text{
  margin-left: 30rpx;
}
// 基本信息
.product-info {
  background: #fff;
  padding: 20rpx;
  .content {
    display: flex;
    align-items: center;
    .desc {
      flex: 1;
      .title {
        font-size: 36rpx;
        color: #000;
      }
      .text {
        color: #7f7f7f;
      }
    }
    .content-right {
      padding: 0 20rpx;
      background-image: linear-gradient(to bottom, #919191 33%, rgba(255, 255, 255, 0) 0);
      background-size: 2rpx 24rpx;
      background-repeat: repeat-y;
      .t1 {
        color: #B4282D;
        font-size: 36rpx;
        font-weight: bold;
      }
      .t2 {
        font-size: 24rpx;
      }
    }
  }
  .cloumn {
      display: flex;
      align-items: center;
      .price {
        flex: 1;
        display: inline-flex;
        align-items: center;
        .span {
          font-size: 24rpx;
          font-weight: bold;
          color: #B4282D;
        }
        .price-now {
          font-size: 48rpx;
          font-weight: bold;
          color: #B4282D;
        }
        .price-del {
          margin-left: 16rpx;
          position: relative;
          font-size: 28rpx;
          color: #7f7f7f;
          .del {
            position: absolute;
            left: 0;
            bottom: 18rpx;
            width: 100%;
            height: 2rpx;
            background: #7f7f7f;
          }
        }
      }
      .price-right {
        flex: 1;
        text-align: right;
        font-size: 28rpx;
        color: #7f7f7f;
      }
    }
    .promotion-group {
      display: inline-flex;
      .promotion-item {
        margin-right: 10rpx;
        padding: 0 10rpx;
        line-height: 36rpx;
        height: 36rpx;
        font-size: 24rpx;
        color: #f48f18;
        border: 2rpx solid #f48f18;
        // border-radius: 8rpx;
      }
    }
}
// 购物须知
.notice-card{
  padding: 10rpx 0;
  margin-top: 20rpx;
  box-sizing: border-box;
  background: #fff;
  .title{
    padding-left: 30rpx;
    position: relative;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;
    .notice-tip{
      position: absolute;
      width: 6rpx;
      height: 40rpx;
      left: 0;
      top: 0;
      background: #B4282D;
    }
  }
  .notice-con{
    margin-top: 30rpx;
    padding-left: 30rpx;
    .notice-title{
      position: relative;
      padding-left: 20rpx;
      font-size: 26rpx;
      line-height: 40rpx;
      color: #333;
      .notice-circle{
        position: absolute;
        width: 6rpx;
        height: 6rpx;
        left: 0;
        top: 50%;
        border: 2rpx solid #f60;
        border-radius: 50%;
        transform: translate(-50%, -50%)
      }
    }
    .notice-desc{
      margin-left: 30rpx;
      position: relative;
      padding-left: 10rpx;
      font-size: 26rpx;
      line-height: 40rpx;
      color: #333;
      .notice-circle{
        position: absolute;
        width: 4rpx;
        height: 4rpx;
        left: 0;
        top: 50%;
        background: #f60;
        transform: translate(-50%, -50%)
      }
    }
  }
}

// 底部
.footer-wrap {
  position: fixed;
  padding: 10rpx 0;
  left: 0;
  bottom: 0;
  z-index: 110;
  width: 100vw;
  height: 80rpx;
  background: #fff;
  border-top: 1rpx solid #d9d9d9;
  .flex-wrap{
    display: flex;
    align-items: center;
    .left{
      padding-left: 30rpx;
      flex: 1;
      font-size: 32rpx;
      line-height: 80rpx;
      color: #b4282d;
    }
    .right{
      width: 220rpx;
      margin-right: 20rpx;
    }
  }
  .button{
    line-height: 80rpx;
    height: 80rpx;
    box-sizing: border-box;
    text-align: center;
    font-size: 28rpx;
    border-radius: 10rpx;
  }
  .buy {
    color: #333;
    background: #fff;
    border: 1rpx solid #999;
  }
  .car {
    color: #fff;
    background: #b4282d;
  }
}

// 产品描述图
.productDescImg-wrap {
  .imgDesc {
    width: 100vw;
    // height: auto;
  }
}
</style>
