<template>
  <div class="category">
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.categoryName}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true" @scrolltolower="getIndexList">
        <div class="title">
          <span>—</span>
          <span>{{detailData.name}}</span>
          <span>—</span>
        </div>
        <div class="bottom">
          <div @click="clickDetail(item)" v-for="(item,index) in detailData.subList" :key="index" class="item">
            <img :src="item.img" alt="">
            <span class="font-28">{{item.name}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getCategoryLists, getIndexList } from '@/api/'
// 入参 分类里面类目 各不同
const options = {
  '-1': {
    welfare: 1,
    goodsType: 0
  },
  '-2': {
    goodsType: 1
  },
  '-3': {
    recommend: 1,
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
      detailData: {
        name: '',
        subList: []
      }
    }
  },
  watch: {
    categoryPid(nv) {
      // 这三个走获取商品列表接口
      const arr = [-1, -2, -3]
      if (arr.includes(nv)) {
        this.pageNum = 0
        this.noMore = false
        this.detailData.subList = []
        this.getIndexList()
      } else {
        this._getCategoryLists()
      }
    }
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
    clickDetail(item) {
      if (item.id && this.categoryPid === -3) {
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
      this.pageNum+=1
      const params = Object.assign({page: this.pageNum}, options[this.categoryPid])
      getIndexList(params).then(result => {
        if (result.code === 'success') {
          const subList = result.data.map(item => {
            const obj = {
              name: item.goodsName,
              id: item.id,
              img: item.primaryPicUrl
            }
            return obj
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
      width: 162rpx;
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
      flex: 1;
      border-left: 1rpx solid #fafafa;
      flex: 1;
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

      .title {
        text-align: center;
        padding: 50rpx 0;

        span:nth-child(2) {
          font-size: 24rpx;
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
}

</style>
