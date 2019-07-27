<template>
  <div class="container">
    <scroll-view scroll-y class="goods-wrap">
        <div class="goods-con">
          <div class="card" v-for="(subitem, subindex) in goodsList" @click="toDetail" :key="subindex">
            <div class="img-wrap">
              <img class="img" src="http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png" alt="">
              <!-- <div class="desc">三峡水牛头层皮，高端夏凉必备</div> -->
            </div>
            <div class="head">
              <div class="title">福利券</div>
              <div class="price">￥599</div>
            </div>

            <p class="info">员工自己的福利描述</p>
          </div>
        </div>
    </scroll-view >
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  mpType: 'page',
  components: {
    card
  },
  data () {
    return {
      motto: '推荐',
      newCategoryList: 8,
      goodsList: 6,
    }
  },
  methods: {
    toDetail() {
      const url = '/pages/coupon/couponDetail'
      this.$router.push(url)
    }
  },
}
</script>

<style scoped lang="less">
.container{
  height: 100vh;
  box-sizing: border-box;
  background: #f7f7f7;
  .goods-wrap{
    position: relative;
    height: 100%;
    .goods-con{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .head{
        display: flex;
        margin-bottom: 10rpx;
        border-bottom: 1rpx solid #d9d9d9;
        .title{
          flex: 1;
          text-align: left;
          color: #999;
          line-height: 80rpx;
          height: 80rpx;
        }
        .price {
          flex: 1;
          text-align: right;
          font-size: 32rpx;
          line-height: 80rpx;
          height: 80rpx;
          color: #b4282d;
          border-bottom: 1rpx solid #d9d9d9;
        }
      }
      .card {
        width: 367rpx;
        border-radius: 16rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 16rpx;
        &:nth-child(2n) {
          margin-left: 16rpx;
        }
        .img{
          margin:0 auto;
          display: block;
          width: 302rpx;
          height: 302rpx;
        }
        .img-wrap{
          position: relative;
          background-color: #f4f4f4;
          overflow: hidden;
          .desc{
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #F1ECE2;
            border-radius: 0 0 4rpx 4rpx;
            font-size: 24rpx;
            color: #9F8A60;
            letter-spacing: 0;
            line-height: 36rpx;
            padding: 10rpx 10rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .info{
          font-size: 24rpx;
          line-height: 1;
          color: #999;
        }
      }
    }
  }
}
</style>
