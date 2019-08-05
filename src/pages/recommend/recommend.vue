<template>
  <div class="container rel">
    <div class="search">
      <div class="left" @click="toSearch">
        <input class="input" type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="index-top-bg abs" style="z-index: 0; top: 0; left: 0; display: block; width: 100%; ">
      <image src="/static/images/mystore_bg.png" style="width: 100%;"/>
    </div>
    <scroll-view scroll-y class="goods-wrap" @scrolltolower="getIndexList">
      <swiper
        style="margin: 20rpx 30rpx;"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item v-for="(item,i) in imgUrls" :key="i">
          <image :src="item.imgUrl" class="slide-image" />
        </swiper-item>
      </swiper>
      <div class="goods-con">
        <div
          class="card"
          v-for="(subitem, subindex) in goodsList"
          @click="toDetail(subitem.id)"
          :key="subindex"
        >
          <div class="img-wrap">
            <img class="img" :src="subitem.picUrl" alt />
            <div class="desc">{{subitem.simpleDesc}}</div>
          </div>
          <p class="p price">￥{{subitem.goodsPrice}}</p>
          <p class="info">{{subitem.goodsName}}</p>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from "@/components/card";
import { getIndexList, getProductDetail, getBannerLists } from "@/api/";

export default {
  mpType: "page",
  components: {
    card
  },
  data() {
    return {
      motto: "推荐",
      newCategoryList: 8,
      goodsList: [],
      imgUrls: [],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    };
  },
  mounted() {
    this.pageNum = 0;
    this._getBannerLists()
    this.getIndexList()
    // getProductDetail({id:1})
  },
  methods: {
    async _getBannerLists() {
     const result = await getBannerLists()
     if (result.data) {
       this.imgUrls = result.data.map(item => {
         const _obj = {
           imgUrl: `https://pay.tuixiang.com:8881${item.imgUrl}`
         }
         return _obj
       })
     }
    },
    // 商品列表接口
    async getIndexList() {
      if(this.noMore) {
        return
      }
      this.pageNum+=1
      const params = {
        welfare: 1,
        page: this.pageNum,
        goodsType: 0
      };
      const result = await getIndexList(params);
      if (result.data) {
        const _arr = result.data.map(item => {
          const _obj = {
            id: item.id,
            picUrl: item.picUrl1,
            simpleDesc: item.simpleDesc,
            goodsPrice: item.goodsPrice,
            goodsName: item.goodsName
          };
          return Object.freeze(_obj);
        });
        this.goodsList.push(..._arr);
        this.noMore = this.goodsList.length >= result.count
      }
    },
    toSearch() {
      const url = "/pages/search/search";
      this.$router.push(url);
    },
    toCate() {
      const url = "/pages/category/category";
      this.$router.push(url);
    },
    toDetail(id) {
      const path = "/pages/product/detail";
      this.$router.push({
        path,
        query: { id }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  padding-top: 80rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #f7f7f7;
  .slide-image{
    width: 100%;
    height: 100%;
  }
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
    background: transparent;
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
        background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png")
          center no-repeat;
        background-size: 100%;
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
    }
    .right {
      margin-left: 10rpx;
      text-align: center;
      width: 60rpx;
      .cate {
        // background-image: url('/static/images/classify_icon.png');
        width: 36rpx;
        height: 36rpx;
      }
      .span {
        line-height: 1;
        display: block;
        font-size: 20rpx;
      }
    }
  }
  .goods-wrap {
    position: relative;
    height: 100%;
    .goods-con {
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
        .img {
          margin: 0 auto;
          display: block;
          width: 302rpx;
          height: 302rpx;
        }
        .p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 98%;
        }
        .price {
          margin-bottom: 10rpx;
          font-size: 32rpx;
          line-height: 48rpx;
          color: #b4282d;
          border-bottom: 1rpx solid #d9d9d9;
        }
        .img-wrap {
          position: relative;
          background-color: #f4f4f4;
          overflow: hidden;
          .desc {
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #f1ece2;
            border-radius: 0 0 4rpx 4rpx;
            font-size: 24rpx;
            color: #9f8a60;
            letter-spacing: 0;
            line-height: 36rpx;
            padding: 10rpx 10rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .info {
          font-size: 24rpx;
          line-height: 1;
          color: #999;
        }
      }
    }
  }
}
</style>
