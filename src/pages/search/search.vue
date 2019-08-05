<template>
	<div class="container">
    <van-search :value="keyWord" placeholder="请输入搜索关键词" use-action-slot @search="_getProduct">
      <div slot="action" @tap="_getProduct">搜索</div>
    </van-search>
		<!-- <div class="shop-search">
			<div class="search-con">
				<i class="qb-icon qb-icon-search"></i>
				<input class="input" @confirm="_getProduct()" confirm-type="search" v-model="keyWord" placeholder="请输入关键词"></input>
			</div>
			<div class="r" @click="_getProduct()">
				<span class="span">搜索</span>
			</div>
		</div> -->
		<!-- 历史记录热门搜索 -->
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
			<!-- <div class="m-searchSuggestions">
				<div class="hd">
					<div class="tit">热门搜索</div>
				</div>
				<div class="list">
					<div class="item highlight">天地一号</div>
					<div class="item highlight">天地两号</div>
					<div class="item ">三号</div>
				</div>
			</div> -->
		</div>
		<scroll-view scroll-y="true" class="scoll-h" :style="{height: winHeight + 'rpx'}" v-if="step == 2">
			<div class="content-no" v-if="contentNone">
				<img src="/static/images/search.png" alt="">
				<div class="description">您寻找的商品还未上架</div>
			</div>
			<div class="product-group"  v-if="!contentNone">
				<a :href="'/pages/product/productDetail?id=' + item.id" class="product-item" v-for="(item, index) in productLists" :key="index">
					<img class="product-img" :src="item.media[0].url" alt="" >
					<div class="promotion-group">
						<div class="promotion-item">满折</div>
					</div>
					<div class="title">{{item.title}}</div>
					<div class="price">￥{{item.price}}</div>
				</a>
			</div>
			<div class="btn" v-if="productLists.length>0&&!noMore"  @click="_getProduct(true)">
				查看更多>
			</div>
		</scroll-view>
	</div>
</template>
<script>

	const SEARCHRESULT = 2
	const SERACHTASK = 1
	const LOCALHISTORY = 'localSearchHistoty'

	export default {
		data() {
			return {
				pageNum: 1,
				keyWord: '',
				step: SERACHTASK,
				productLists: [],
				noMore: false,
				contentNone: false,
				shopId: '',
				winHeight: 0,
				localHistory: wx.getStorageSync(LOCALHISTORY) || []
			}
		},
		mounted() {
			this.setWinHeight()
		},
		watch: {
			keyWord(nv, ov) {
				if (nv.trim() === '') {
					this.step = SERACHTASK
				}
			}
		},
		methods: {
			_getProduct(more) {
				if(!this.keyWord.trim()) {
					wx.showToast({
						title: '请输入搜索关键词',
						icon: 'none',
						duration: 2000
					})
					return
				}

				if (more) {
					this.pageNum++
				}
				this.step = SEARCHRESULT
				let params = {
					nameLike: this.keyWord,
					pageNum: this.pageNum
				}
				this.localHistory = this.localHistory.concat([{name:this.keyWord}])
        wx.setStorageSync(LOCALHISTORY, this.localHistory)
        // 获取商品相关逻辑
			},
			setKeyWord(keyWord) {
				this.keyWord = keyWord
				this._getProduct()
			},
			setStep() {
				this.step = SERACHTASK
			},
			setWinHeight() {
				let that = this;
				//  高度自适应
				wx.getSystemInfo( {
					success: function( res ) {
						let clientHeight = res.windowHeight
						let	clientWidth = res.windowWidth
						let	rpxR= 750 / clientWidth
						let  calc = clientHeight * rpxR - 80
						that.winHeight = calc
					}
				});
			},
		}
	}
</script>
<style lang="less" scoped>
.container{
  font-family: PingFangSC-Light,helvetica,'Heiti SC';
  .product-group{
    display: flex;
    flex-wrap: wrap;
    padding-left: 20rpx;
    .product-item{
      margin-bottom: 30rpx;
      padding-right: 20rpx;
      width: 345rpx;
      .product-img{
        display: block;
        width: 345rpx;
        height: 345rpx;
      }
      .promotion-group{
        display: inline-flex;
        padding-top: 8rpx;
        .promotion-item{
          width: 60rpx;
          font-size: 20rpx;
          text-align: center;
          color: #fff;
          background: #f60;
        }
      }
      .title{
        padding: 8rpx 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price{
        color: #f60;
        font-weight: 400
      }
    }
  }
  .btn{
    margin-bottom: 60rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-top: 2rpx solid #d9d9d9
  }
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
