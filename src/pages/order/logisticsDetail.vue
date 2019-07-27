<template>
  <div class="container">
    <div class="head">
      <div class="img-wrap">
        <van-icon name="logistics" size="80rpx" />
      </div>
      <div class="right">
        <div class="line">
          <span class="span grey">物流公司:</span>
          <span class="span">顺丰</span>
        </div>
        <div class="line">
          <span class="span grey">物流单号:</span>
          <span class="span">1212321312312312111</span>
        </div>
      </div>
    </div>
    <div class="step-wrap">
      <div class="head-title">订单跟踪</div>
      <van-steps
        :steps="steps"
        :active="active"
        direction="vertical"
        active-color="#f44"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        {
          text: '步骤一',
          desc: '描述信息'
        },
        {
          text: '步骤二',
          desc: '描述信息'
        },
        {
          text: '步骤三',
          desc: '描述信息'
        },
        {
          text: '步骤四',
          desc: '描述信息'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  position: relative;
  font-family: PingFangSC-Light, helvetica, 'Heiti SC';
  background: #f7f7f7;
  min-height: 100%;
  box-sizing: border-box;
  .head{
    display: flex;
    width: 100vw;
    margin-bottom: 30rpx;
    padding: 30rpx;
    background: #fff;
    box-sizing: border-box;
    .img-wrap{
      margin-right: 40rpx;
    }
    .line{
      .span{
        margin-right: 10rpx;
      }
      .grey{
        color: #999;
      }
    }
  }
  .step-wrap{
    background: #fff;
  }
  .head-title{
    padding-top: 20rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    height: 40rpx;
    color: #000;
  }
}
</style>
