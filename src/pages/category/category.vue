<template>
  <div class="category">
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.categoryName}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true" @scrolltolower="getIndexList">
        <div class="c-title">
          <span>—</span>
          <span>{{currentCateName}}</span>
          <span>—</span>
        </div>
        <!-- 商品项目 -->
        <div v-if="isGoods && detailData.subList.length" class="goods-content" @click="clickDetail(goods)" v-for="(goods, index) in detailData.subList" :key="index">
          <div class="img-wrap">
            <img class="img-item" :src="goods.primaryPicUrl" />
          </div>
          <div class="desc">
            <div class="title">{{goods.goodsName}}</div>
            <div class="type">{{goods.displayString}}</div>
            <div class="price">
              <div class="price-now">￥{{goods.goodsPrice}}</div>
              <div class="price-del">￥{{goods.primaryPrice}} <div class="del"></div> </div>
            </div>
          </div>
          <div class="product-num" @click.stop="clickCart(goods)">
            <van-icon name="cart-o" color="#f60" size="2em" />
          </div>
        </div>
        <!-- 类目项目 -->
        <div class="bottom" v-if="!isGoods && detailData.subList.length">
          <div @click="clickDetail(item)" v-for="(item,index) in detailData.subList" :key="index" class="item">
            <img :src="item.img" alt="">
            <span class="font-28">{{item.name}}</span>
          </div>
        </div>
        <div class="loading-wrap" v-show="isLoading">
          <div class="load-con">
            <van-loading type="circular" />
            <span>正在加载...</span>
          </div>
        </div>
        <div class="loading-wrap" v-if="noMore">
          <div class="load-con">
            <span style="color:#999">-- 没有更多了 --</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getCategoryLists, getIndexList, addShoppingCart } from '@/api/'
import { getStorage } from '@/utils/wx'
// 入参 分类里面类目 各不同
const options = {
  '-1': {
    welfare: 1,
    limit: 20,
    goodsType: 0
  },
  '-2': {
    limit: 20,
    goodsType: 1
  },
  '-3': {
    recommend: 1,
    limit: 20,
    goodsType: 0
  }
}

export default {
  mpType: 'page',
  data () {
    return {
      nowIndex: 0,
      categoryPid: 0,
      listData: [],
      currentCateName: '推荐专区',
      detailData: {
        name: '',
        subList: []
      },
      isLoading: true,
      noMore: false,
      isGoods: true
    }
  },
  watch: {
    categoryPid(nv) {
      // 这三个走获取商品列表接口
      const arr = [-1, -2, -3]
      if (arr.includes(nv)) {
        this.isGoods = true
        this.pageNum = 0
        this.noMore = false
        this.detailData.subList = []
        this.getIndexList()
      } else {
        this.isGoods = false
        this._getCategoryLists()
      }
    }
  },
  onShow() {
    getStorage('currentCate').then(res => {
      console.log("TCL: onShow -> res", res)
    })
  },
  mounted() {
    this.pageNum = 0
    this._getCategoryLists()
  },
  methods: {
    async selectitem(item, index) {
      this.currentCateName = item.categoryName
      this.categoryPid = item.categoryId
      this.nowIndex = index
    },
    async getListData() {
    },
    async clickCart(item) {
      if (this.$store.state.token) {
        const params = {
          goodsId: item.id,
          userToken: this.$store.state.token,
          skuId: item.primarySkuId,
          goodsType: item.goodsType
        };
        const result = await addShoppingCart(params);
        if (result.code === "success") {
          this.$store.dispatch("getShoppingLists");
          wx.showToast({
            icon: "none",
            title: "加入购物车成功"
          });
        }
      } else {
        const url = "/pages/login/login";
        this.$router.push({ path: url, query: { back: 1 } });
      }
    },
    clickDetail(item) {
      if (item.id && this.categoryPid < 1) {
        this.$router.push({
          path: '/pages/product/detail',
          query: {id: item.id}
        })
      }
    },
    getIndexList() {
      const arr = [-1, -2, -3]
      if (!arr.includes(this.categoryPid) || this.noMore) {
        return
      }
      this.isLoading = true
      this.pageNum+=1
      const params = Object.assign({page: this.pageNum}, options[this.categoryPid])
      getIndexList(params).then(result => {
        if (result.code === 'success') {
          this.isLoading = false
          const subList = result.data.map(item => {
            // const obj = {
            //   name: item.goodsName,
            //   id: item.id,
            //   img: item.primaryPicUrl
            // }
            return item
          })
          this.detailData.name = this.currentCateName
          this.detailData.subList = [...this.detailData.subList, ...subList]
          this.noMore = this.detailData.subList.length >= result.count
        }
      })
    },
    _getCategoryLists() {
      const params = {
        categoryPid: this.categoryPid
      }
      this.isLoading = true
      getCategoryLists(params).then(res => {
        if (res.code === 'success') {
          if (this.categoryPid === 0) {
            this.categoryPid = res.data[0].categoryId
            this.currentCateName = res.data[0].categoryName
            this.listData = res.data.map(item => {
              const obj = {
                categoryName: item.categoryName,
                categoryId: item.categoryId
              }
              return obj
            })
          } else {
            this.isLoading = false
            this.detailData = {
              name: this.currentCateName,
              subList: res.data.map(item => {
                const obj = {
                  name: item.categoryName,
                  categoryId: item.categoryId,
                  img: `https://pay.tuixiang.com:8881${item.img}`
                  // img: `https://pay.tuixiang.com:8881/logo/20190530095815_177.jpg`
                }
                return obj
              })
            }
          }
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
.category {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .loading-wrap{
    padding: 6rpx;
    .load-con{
      text-align: center;
      margin: 0 auto;
    }
  }
  .search {
    height: 88rpx;
    // width: 100%;
    padding: 0 30rpx;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #ededed;

    .ser {
      width: 690rpx;
      height: 56rpx;
      background: #ededed;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        display: inline-block;
      }

      .icon {
        background: url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png') center no-repeat;
        background-size: 100%;
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
    }
  }

  .content {
    flex: 1;
    background: #fff;
    display: flex;

    .left {
      width: 160rpx;
      height: 100%;
      text-align: center;

      .iconText {
        text-align: center;
        line-height: 90rpx;
        width: 162rpx;
        height: 90rpx;
        color: #333;
        font-size: 28rpx;
        border-left: 6rpx solid #fff;
      }

      .active {
        color: #ab2b2b;
        font-size: 36rpx;
        border-left: 6rpx solid #ab2b2b;
      }
    }

    .right {
      // flex: 1;
      width: 590rpx;
      border-left: 1rpx solid #fafafa;
      box-sizing: border-box;
      height: 100%;
      padding: 0 30rpx 0 30rpx;
      .banner {
        width: 100%;
        height: 222rpx;
        margin-top: 20rpx;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .c-title {
        text-align: center;
        padding: 10rpx 0;
        span:nth-child(2) {
          font-size: 36rpx;
          color: #333;
          padding: 0 10rpx;
        }

        span:nth-child(2n + 1) {
          color: #999;
        }
      }

      .bottom {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 33.33%;
          text-align: center;
          margin-bottom: 20rpx;

          img {
            height: 144rpx;
            width: 144rpx;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
  }

  // 商品列表
  .goods-content {
    position: relative;
    margin-left: 20rpx;
    padding: 30rpx 10rpx 30rpx 0rpx;
    display: flex;
    align-items: center;
    // border-bottom: 1px solid #d9d9d9;
    &:last-child {
      border: none;
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
        // text-align: center;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // overflow: hidden;
        color: #333;
        font-size: 28rpx;
        margin: 4rpx 0;
      }
      .type {
        padding-right: 1em;
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
      color: #f60;
    }
    .product-num {
      position: absolute;
      right: 0;
      bottom: 30rpx;
      font-size: 28rpx;
      z-index: 1000;
    }
  }
}

</style>
