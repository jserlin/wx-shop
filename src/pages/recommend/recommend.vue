<template>
  <div class="container">
    <div class="search">
      <div class="left" @click="toSearch">
        <input class="input" type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
      <div class="right" @click="toCate">
        <img class="cate" src="/static/images/classify_icon.png" alt="">
        <span class="span">分类</span>
      </div>
    </div>
    <scroll-view scroll-y class="goods-wrap">
        <div class="goods-con">
          <div class="card" @click="" v-for="(subitem, subindex) in goodsList" @click="toDetail" :key="subindex">
            <div class="img-wrap">
              <img class="img" src="http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png" alt="">
              <div class="desc">三峡水牛头层皮，高端夏凉必备</div>
            </div>
            <p class="p price">￥599</p>
            <p class="info">三峡水牛头层皮，高端夏凉必备</p>
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
    toSearch() {
      const url = '/packageA/logs'
      this.$router.push(url)
    },
    toCate() {
      const url = '/pages/category/category'
      this.$router.push(url)
    },
    toDetail() {
      const url = '/pages/product/detail'
      this.$router.push(url)
    }
  },
}
</script>

<style scoped lang="less">
.container{
  padding-top: 80rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #f7f7f7;
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25rpx 0 20rpx;
    position: fixed;
    top: 0;
    z-index: 99;
    height: 80rpx;
    display: flex;
    align-items: center;
    background: #f7f7f7;
    .left {
      position: relative;
      flex: 1;
      .input {
        padding-left: 50rpx;
        width: 100%;
        height: 56rpx;
        border-radius: 8rpx;
        background: #fff;
        box-sizing: border-box;
        font-size: 24rpx;
      }

      .icon {
        position: absolute;
        top: 15rpx;
        left: 10rpx;
        background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
        background-size: 100%;
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
    }
    .right{
      margin-left: 10rpx;
      text-align: center;
      width: 60rpx;
      .cate{
        // background-image: url('/static/images/classify_icon.png');
        width: 36rpx;
        height: 36rpx;
      }
      .span{
        line-height: 1;
        display: block;
        font-size: 20rpx;
      }
    }
  }
  .goods-wrap{
    position: relative;
    height: 100%;
    .goods-con{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .card {
        width: 370rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 10rpx;
        &:nth-child(2n) {
          margin-left: 10rpx;
        }
        .img{
          margin:0 auto;
          display: block;
          width: 302rpx;
          height: 302rpx;
        }
        .p{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 98%
        }
        .price {
          margin-bottom: 10rpx;
          font-size: 32rpx;
          line-height: 48rpx;
          color: #b4282d;
          border-bottom: 1rpx solid #d9d9d9;
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
