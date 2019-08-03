<template>
  <div class="container">
    <div class="product-wrap mb20">
      <div class="head-title">退货商品</div>
      <div class="content">
          <div class="img-wrap">
            <img class="img-item" src="https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0">
          </div>
          <div class="desc">
              <div class="title">商品标题</div>
              <div class="price">
              <div class="price-now">￥11</div>
              <!-- <div class="price-del">
                <div class="del"></div>
                ￥111
              </div> -->
              </div>
              <div class="type">星空灰</div>
          </div>
          <div class="product-num">
            x11
          </div>
      </div>
    </div>
    <div class="mb20">
      <van-cell title="退款金额">
        <span class="red" slot="right-icon">￥18.50</span>
      </van-cell>
    </div>
    <div class="group">
      <van-cell>
        <span class="grey" slot="title">订单编号</span>
        <span slot="right-icon">9527</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退单编号</span>
        <span slot="right-icon">9527</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货时间</span>
        <span slot="right-icon">1111-11-11</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货状态</span>
        <span slot="right-icon">1111-11-11</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货原因</span>
        <span slot="right-icon">无理由</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货详细原因</span>
        <span slot="right-icon">aaaa</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货收件人姓名</span>
        <span slot="right-icon">网易严选</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退换货收件人手机</span>
        <span slot="right-icon">18811114444</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货地址</span>
        <span slot="right-icon">北京市北京市东城区复兴道</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货物流单号</span>
        <span slot="right-icon">1119527</span>
      </van-cell>
      <van-cell>
        <span class="grey" slot="title">退货物流公司</span>
        <span slot="right-icon">顺丰</span>
      </van-cell>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      infoId: null
    }
  },
  onShow(){
    const { query } = this.$route;
    if (query.id) {
      this.infoId = query;
      this.getReturnGoodsInfo();
    }
  },
  methods: {
    getReturnGoodsInfo(){
      console.log(this.infoId)
    },
    toRetunGoods() {
      const url = '/pages/order/applyReturnGoods'
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
    position: relative;
    font-family: PingFangSC-Light, helvetica, 'Heiti SC';
    background: #fff;
    background: #fafafa;
    color: #333;
    min-height: 100vh;
    box-sizing: border-box;
}
.img{
  width: 100%;
  height: 100%;
}
.mb20{
  margin-bottom: 20rpx;
}
.grey {
  color: #999;
}

.product-wrap{
  background: #fff;
  .head-title{
    padding-top: 20rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    height: 40rpx;
    color: #333;
  }
  .foot{
    padding: 20rpx 0;
    margin-right: 30rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    height: 40rpx;
    text-align: right;
    .span{
      color: #333;
    }
    .money{
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
      border: none
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
      .tuihuo{
        padding: 0 20rpx;
        width: 100rpx;
        border-radius: 8rp;
        border: 1rpx solid #d9d9d9;
        font-size: 24rpx;
        line-height: 36rpx;
      }
    }
    .red {
      color: #f60
    }
    .product-num {
      font-size: 28rpx;
      align-self: flex-start;
      margin-right: 30rpx;
    }
  }
}
</style>
