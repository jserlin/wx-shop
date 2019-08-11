<template>
  <div class="container rel">
    <div class="search">
      <!-- <div class="logo">严选</div> -->
      <div class="left" @click="toSearch">
        <input class="input" type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div
      class="index-top-bg abs"
    >
      <image src="http://shop.ahaxkj.com/src/images/slider.png" style="width: 100%;" />
      <!-- <image src="/static/images/mystore_bg.png" style="width: 100%;"/> -->
    </div>
    <scroll-view scroll-y class="goods-wrap" @scrolltolower="getIndexList">
      <swiper
        style="margin: 20rpx 30rpx;"
        :indicator-dots="indicatorDots"
        indicator-color="#fff"
        indicator-active-color="#f60"
        circular
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item v-for="(item,i) in imgUrls" :key="i" class="slide-item">
          <image mode="widthFix" :src="item.imgUrl" class="slide-image" />
        </swiper-item>
      </swiper>
      <div class="cate-wrap">
        <van-row gutter="20">
          <van-col span="6" v-for="(cate, index) in categoryList" :key="index">
            <div class="cate-item" @click="clickCate(cate)">
              <img class="img" mode="widthFix" :src="cate.img" alt />
              <div class="text">{{cate.categoryName}}</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="com-title">企业福利</div>
      <div class="goods-con">
        <div
          class="card-wrap"
          v-for="(subitem, subindex) in goodsList"
          @click="toDetail(subitem.id)"
          :key="subindex"
        >
          <div class="card">
            <div class="img-wrap">
              <img class="img" mode="aspectFill" :src="subitem.picUrl" alt />
              <div class="desc">{{subitem.simpleDesc}}</div>
            </div>
            <p class="p price">￥{{subitem.goodsPrice}}</p>
            <p class="info">{{subitem.goodsName}}</p>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-show="isLoading">
        <div class="load-con">
          <van-loading type="circular" />
          <span style="padding-top:10rpx;">正在加载...</span>
        </div>
      </div>
      <div class="loading-wrap" v-if="noMore">
        <div class="load-con">
          <span style="color:#999">-- 没有更多了 --</span>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import {
  getIndexList,
  getIndexWelfareList,
  getProductDetail,
  getBannerLists
} from "@/api/";
import { setStorage } from "@/utils/wx";

export default {
  mpType: "page",
  data() {
    return {
      categoryList: [],
      goodsList: [],
      imgUrls: [],
      indicatorDots: true,
      autoplay: true,
      isLoading: true,
      noMore: false,
      interval: 5000,
      duration: 1000
    };
  },
  mounted() {
    this._getBannerLists();
    wx.setNavigationBarTitle({
      title: "首页"
    });
    // getProductDetail({id:1})
  },
  onShow(){
    this.pageNum = 0;
    this.goodsList = []
    this.getIndexList();
  },
  methods: {
    async _getBannerLists() {
      const result = await getBannerLists();
      if (result.code === "success") {
        this.imgUrls = result.data.map(item => {
          const _obj = {
            imgUrl: `https://pay.tuixiang.com:8881${item.imgUrl}`
          };
          return _obj;
        });
        this.categoryList = result.categoryList.map(item => {
          const _obj = {
            img: `https://pay.tuixiang.com:8881${item.img}`,
            categoryName: item.categoryName,
            id: item.id,
            categoryPid: item.categoryPid
          };
          return _obj;
        });
      }
    },
    // 商品列表接口
    async getIndexList() {
      if (this.noMore) {
        return;
      }
      this.pageNum += 1;
      this.isLoading = true;
      const params = {
        welfare: 1,
        page: this.pageNum,
        goodsType: 0,
        userToken: this.$store.state.token
      };
      const result = await getIndexWelfareList(params);
      if (result.data) {
        this.isLoading = false;
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
        this.noMore = this.goodsList.length >= result.count;
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
    clickCate(cate) {
      console.log("TCL: clickCate -> cate", cate);
      setStorage("currentCate", cate).then(() => {
        const url = "/pages/category/category";
        this.$router.push({ path: url, isTab: true });
      });
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
  .slide-item {
    overflow: hidden;
    border-radius: 20rpx;
  }
  .slide-image {
    width: 100%;
    // height: 100%;
  }
  .index-top-bg{
    z-index: 0;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
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
    .logo{
      width: 100rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      font-size: 36rpx;
      // background:url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-component/p/20170601/style/img/x1/icon-yxtop-sbc152a7ee5-e7ebdc8b2c.png);
      // background-position: 0 -202px;
    }
    .left {
      position: relative;
      flex: 1;
      .input {
        padding-left: 50rpx;
        width: 100%;
        height: 56rpx;
        border-radius: 28rpx;
        background: #fff;
        box-sizing: border-box;
        font-size: 24rpx;
      }

      .icon {
        position: absolute;
        top: 15rpx;
        left: 14rpx;
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
  .loading-wrap {
    padding: 20rpx 0;
    font-size: 24rpx;
    .load-con {
      text-align: center;
      margin: 0 auto;
    }
  }
  .cate-wrap {
    padding: 20rpx;
    position: relative;
    background: #fff;
    .cate-item {
      padding-bottom: 20rpx;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: auto;
        // height: 150rpx;
        background: #f4f4f4;
        border-radius: 20%;
      }
      .text {
        text-align: center;
        font-size: 26rpx;
      }
    }
  }
  .com-title {
    padding: 20rpx 0 10rpx;
    text-align: center;
    font-size: 28rpx;
  }
  .goods-wrap {
    position: relative;
    height: 100%;
    .goods-con {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #f7f7f7;
      .card-wrap {
        padding: 20rpx;
        box-sizing: border-box;
        width: 50%;
      }
      .card {
        // width: 50%;
        padding-bottom: 10rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 10rpx;
        overflow: hidden;
        .img {
          margin: 0 auto;
          display: block;
          width: 100%;
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
          text-indent: 16rpx;
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
          text-indent: 16rpx;
          line-height: 1;
          color: #999;
        }
      }
    }
  }
}
</style>
