<template>
  <div class="container">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0"
      />
      <!-- 底部tab -->
      <div class="footer-wrap">
        <van-submit-bar
          :price="price"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      price: 1188,
    }
  },
  methods: {
    onSubmit(event) {
      console.log("TCL: onChange -> event", event)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
    position: relative;
    padding-bottom: 104rpx;
    font-family: PingFangSC-Light, helvetica, 'Heiti SC';
    background: #fff;
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
</style>
