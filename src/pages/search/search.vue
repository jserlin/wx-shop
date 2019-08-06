<template>
	<div class="container">
    <div class="search">
      <van-search :value="keyWord" @change="changeWord" placeholder="请输入搜索关键词" use-action-slot @search="getProduct">
        <div slot="action" @tap="getProduct">搜索</div>
      </van-search>
    </div>
    <!-- 历史记录 -->
		<div class="m-searchSuggestionsViews" v-if="step == 1">
			<div class="m-searchSuggestions" v-if="localHistory.length">
				<div class="hd">
					<div class="tit">历史记录</div>
					<i class="qb-icon qb-icon-del" @click="localHistory = []"></i>
				</div>
				<div class="list">
					<div class="item"
					 v-for="(nav, index) in localHistory"
					 :key="index"
					 @click="setKeyWord(nav.name)"
					 >{{nav.name}}</div>
				</div>
			</div>
		</div>
    <!-- 搜索结果 -->
		<scroll-view scroll-y="true" class="scoll-h" v-if="step == 2"  @scrolltolower="getProduct">
			<div class="content-no" v-if="contentNone">
				<img src="/static/images/search.png" alt="">
				<div class="description">您寻找的商品还未上架</div>
			</div>
			<div class="goods-con" v-if="!contentNone">
        <div class="card-wrap"
          v-for="(subitem, subindex) in goodsList"
          @click="toDetail(subitem.id)"
          :key="subindex">
          <div class="card">
            <div class="img-wrap">
              <img class="img" mode='aspectFill' :src="subitem.picUrl" alt />
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
          <span>正在加载...</span>
        </div>
      </div>
      <div class="loading-wrap" v-if="noMore && !contentNone">
        <div class="load-con">
          <span style="color:#999">-- 没有更多了 --</span>
        </div>
      </div>
		</scroll-view>
	</div>
</template>
<script>
import { getIndexList } from "@/api/";
import { setStorage } from '@/utils/wx'
const SEARCHRESULT = 2
const SERACHTASK = 1
const LOCALHISTORY = 'localSearchHistoty'

export default {
  data() {
    return {
      pageNum: 0,
      keyWord: '',
      step: SERACHTASK,
      goodsList: [],
      isLoading: true,
      noMore: false,
      contentNone: false,
      localHistory: wx.getStorageSync(LOCALHISTORY) || []
    }
  },
  watch: {
    keyWord(nv, ov) {
      if (!this.$route.query.id &&nv.trim() === '') {
        this.step = SERACHTASK
      }
    }
  },
  onShow() {
    if (this.$route.query.id) {
      this.getProduct()
    }
  },
  // mounted() {
  //   if (this.$route.query.id) {
  //     this.getProduct()
  //   }
  // },
  methods: {
    getProduct() {
      // if(!this.keyWord.trim()) {
      //   wx.showToast({
      //     title: '请输入搜索关键词',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return
      // }
      if (this.$route.query.id && this.cateId !== this.$route.query.id) {
        this.keyWord = ''
        this.pageNum = 0
        this.goodsList = []
        this.noMore = false
        this.contentNone = false
      }
      if (this.keyWord !== this._keyWord) {
        this.pageNum = 0
        this.goodsList = []
        this.noMore = false
        this.contentNone = false
      }
      if (this.noMore) {
        return
      }
      this.step = SEARCHRESULT
      // 获取商品相关逻辑
      this.pageNum+=1
      this.isLoading = true
      this._keyWord = this.keyWord
      this.cateId = this.$route.query.id
      const params = {
        welfare: 1,
        page: this.pageNum,
        goodsType: 0,
        goodsName: this.keyWord,
        categoryId: this.$route.query.id
      };
      getIndexList(params).then(result => {
        if (result.code === 'success') {
          this.isLoading = false
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
          this.contentNone = !this.goodsList.length
          this.noMore = this.goodsList.length >= result.count
        }
      })
      if (!this.$route.query.id) {
        // 存储搜哦记录
        this.localHistory = this.localHistory.concat([{name:this.keyWord}])
        setStorage(LOCALHISTORY, this.localHistory)
      }
    },
    setKeyWord(keyWord) {
      this.keyWord = keyWord
      this.getProduct()
    },
    changeWord(event) {
      this.keyWord = event.mp.detail
    },
    toDetail(id) {
      const path = "/pages/product/detail";
      this.$router.push({
        path,
        query: { id }
      });
    },
    setStep() {
      this.step = SERACHTASK
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  position: relative;
  padding-top: 108rpx;
  height: 100vh;
  font-family: PingFangSC-Light,helvetica,'Heiti SC';
  .search{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 110;
  }
  .goods-con {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #f7f7f7;
    .card-wrap{
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
.scoll-h{
  position: relative;
  height: 100%;
}
.shop-search{
  padding: 20rpx 0 20rpx 20rpx;
  display: flex;
  align-items: center;
  background: #fff;
  .search-con{
    flex: 1;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20rpx;
    line-height: 60rpx;
    color: #999;
    background-color: #f4f4f4;
    .input{
      margin-left: 10rpx;
      width: 100%;
      &::-webkit-input-placeholder{
        color: #999
      }
    }
  }
  .r{
    padding: 0 20rpx;
    .span{
      color: #f60
    }
  }
  .qb-icon{
    font-size: 48rpx;
  }
}
.loading-wrap{
  padding: 20rpx 0;
  font-size: 24rpx;
  .load-con{
    text-align: center;
    margin: 0 auto;
  }
}
.content-no{
  padding-top: 200rpx;
  text-align: center;
  img{
    width: 248rpx;
    height: 248rpx;
  }
  .description{
    margin-top:30rpx;
    color:#999;
    font-size:28rpx;
  }
}
.m-searchSuggestionsViews{
  margin-top: 20rpx;
  background-color: #f4f4f4;
  position: relative;
  .m-searchSuggestions{
      margin-bottom: 20rpx;
        padding: 0 30rpx 30rpx;
      background-color: #fff;
      overflow: hidden;
      color: #999;
    .hd{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      height: 90rpx;
    }
    .list{
      .item{
        float: left;
        padding: 0 15rpx;
        margin: 0 32rpx 32rpx 0;
        line-height: 46rpx;
        font-size: 24rpx;
        border: 1rpx solid #999;
        border-radius: 4rpx;
        color: #333;
        &.highlight{
          border-color: #b4282d;
          color: #b4282d;
        }
      }
    }
  }
}
</style>
