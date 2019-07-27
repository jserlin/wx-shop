<template>
  <div class="container">
    <div class="product-wrap mb20">
      <div class="content">
          <div class="img-wrap">
            <img class="img-item" src="https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0">
          </div>
          <div class="desc">
              <div class="title">商品标题</div>
              <!-- <div class="type">星空灰</div> -->
              <div class="price">
              <div class="price-now">￥11</div>
              <!-- <div class="price-del">
                <div class="del"></div>
                ￥111
              </div> -->
              </div>
          </div>
          <div class="product-num">
            x1
          </div>
      </div>
    </div>
    <div @click="showReason = true">
      <van-cell title="退换货原因" is-link  @click="showReason = true" />
    </div>
    <div class="reason-wrap mb20">
      <div class="left">退换货详细原因</div>
      <div class="right">
        <van-field
          :value="reasonDetail"
          placeholder="必填"
          @change="onChange"
        />
      </div>
      <!-- <van-cell title="退换货详细原因">
        <div class="input-wrap" slot="right-icon">
          <van-field
            :value="reasonDetail"
            placeholder="请输入用户名"
            border
            @change="onChange"
          />
        </div>
      </van-cell> -->
    </div>

    <van-cell title="商品价格">
      <span class="red" slot="right-icon">￥188</span>
    </van-cell>

    <!-- 选择原因 弹出层 -->
    <van-popup position="bottom" :show="showReason" @close="showReason = false">
      <van-picker show-toolbar :columns="columns" @change="onPickerChange" />
    </van-popup>

    <!-- 底部tab -->
    <div class="footer-wrap">
      <van-submit-bar
        label="退款金额: "
        :price="price"
        button-text="立即退换"
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
      reason: '',
      reasonDetail: '',
      showReason: false,
      columns: ['无理由退货', '质量问题']
    }
  },
  methods: {
    onSubmit(event) {
      console.log("TCL: onChange -> event", event)
    },
    onChange(val) {
      console.log("TCL: onChange -> val", val)
    },
    onPickerChange(val) {
      console.log("TCL: onPickerChange -> val", val)
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
  background: #fafafa;
  color: #333;
  min-height: 100vh;
  box-sizing: border-box;
  // 退换货原因
  .reason-wrap{
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
    .left{
      flex: 2;
    }
    .right{
      flex: 3;
      box-sizing: border-box;
    }
  }
}
.img{
  width: 100%;
  height: 100%;
}
.red{
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
.mb20{
  margin-bottom: 20rpx;
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
    }
    .red {
      color: #B4282D
    }
    .product-num {
      font-size: 28rpx;
      align-self: flex-start;
      margin-right: 30rpx;
    }
  }
}
</style>
