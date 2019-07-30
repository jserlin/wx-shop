<template>
  <div class="container">
    <div>
      <div class="product-banner">
        <swiper class="swiper" circular="true" @change="setCurrentIndex">
          <div v-for="(item, index) in bannerImgUrl" :key="index">
            <swiper-item class="swiper-item">
              <image :src="item" class="slide-image" />
            </swiper-item>
          </div>
        </swiper>
        <!-- <div class="btn-share">
          <button class="button" data-name="shareBtn" open-type="share">分享好物</button>
        </div> -->
        <div class="indicator">{{currentIndex}}/{{bannerImgUrl.length}}</div>
      </div>
      <!-- 基本信息 -->
      <div class="product-info pub">
        <div class="cloumn">
          <div class="price">
            <div class="span">￥</div>
            <div class="price-now"> 280</div>
            <div class="price-del">
            <div class="del"></div>360</div>
          </div>
            <!-- <div class="price-right">购买最高得48积分</div> -->
        </div>
        <div class="content">
          <div class="desc">
            <div class="title">小种红茶饮料 450毫升*12瓶</div>
          </div>
        </div>
        <van-row>
          <van-col span="8"><span class="grey">中国品牌</span></van-col>
          <van-col span="14"><span class="grey">库存: 9527</span></van-col>
        </van-row>
      </div>
      <div class="select-wrap">
        <van-cell is-link @click="showPopup = true">
          <view slot="title">
            <span>规格选择</span>
            <span class="select-cell-text">请选择</span>
          </view>
        </van-cell>
      </div>
      <!-- 底部tab -->
      <div class="footer-wrap">
        <div class="flex-wrap">
          <div class="cart-wrap">
            <div class="tag-info">3</div>
            <img class="img" src="/static/images/shopping_default.png" alt="">
          </div>
          <div class="flex-col">
            <div class="button buy" @click="toBuy">立即购买</div>
          </div>
          <div class="flex-col">
            <div class="button car">加入购物车</div>
          </div>
        </div>
      </div>
      <!-- 商品规格选择弹出层 -->
      <van-popup :show="showPopup" position="bottom" @close="showPopup = false">
        <div class="dt-paramselect">
          <div class="info-con">
            <div class="left">
              <img class="img" src="http://yanxuan.nosdn.127.net/5cc861b114573015c81013c02f189b91.png?quality=90&thumbnail=200x200&imageView" alt="">
            </div>
            <div class="right">
              <div class="con">
                <div class="price">
                  <span class="span">价格：¥</span>
                  <span class="span">239</span>
                </div>
                <div class="sku">
                  <span class="span">已选择：</span>
                  <span class="span it">请选择规格数量</span>
                </div>
              </div>
            </div>
          </div>
          <div class="spec-con">
            <div class="u-format">
              <div class="tt">颜色</div>
              <div class="con">
                <div class="tab sel">
                  <span class="span">象牙白</span>
                </div>
                <div class="tab">
                  <span class="span">替换复合滤芯 3片装</span>
                </div>
              </div>
            </div>
            <div class="u-format">
              <div class="tt">数量</div>
              <div class="con m-selNumRow">
                <div class="m-selnum">
                  <div class="less">
                    <span class="span">-</span>
                    <!-- <img class="img" src="/static/images/my_icon_position.png" alt=""> -->
                  </div>
                  <div class="textWrap">
                    <input class="input" type="tel" value="1">
                  </div>
                  <div class="more">
                    <span class="span">+</span>
                    <!-- <img class="img" src="/static/images/my_icon_position.png" alt=""> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 商品详情 规则参数 tabs -->
      <van-tabs :active="active" @change="onChange">
        <van-tab title="商品详情">
          <div class="">商品详情</div>
          <div class="productDescImg-wrap">
            <img v-for="(item, index) in productDescImg" :key="index" mode="widthFix" class="imgDesc" :src="item" alt="">
          </div>
        </van-tab>
        <van-tab title="规格参数">
          <div class="">规格参数</div>
          <div class="productDescImg-wrap">
            <img v-for="(item, index) in productDescImg" :key="index" mode="widthFix" class="imgDesc" :src="item" alt="">
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getProductDetail } from '@/api/'

export default {
  data() {
    return {
      active: 1,
      showPopup: false,
      bannerImgUrl: [
        'https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0',
        'https://yanxuan.nosdn.127.net/0a053f1407b976b4b9523b837b15c247.png?imageView&quality=75&thumbnail=750x0'
      ],
      currentIndex: 1,
      productDescImg: [
          'http://yanxuan.nosdn.127.net/d6271f89d8fda25b80f35b592514b50d.jpg',
          'http://yanxuan.nosdn.127.net/fa930e294230cc03abcb263b46db4363.jpg'
      ],
      productInfo: {
          tags: []
      }
    }
  },
  // onShareAppMessage: function() {
  //   return {
  //     title: this.productInfo.name || '',
  //     desc: this.productInfo.description || '',
  //     path: `/pages/product/productDetail?id=${this.productInfo.id}`
  //   }
  // }
  mounted() {
    this._getProductDetail(this.$route.query.id)
  },
  methods: {
    async _getProductDetail(id) {
      const result = await getProductDetail({id})
      console.log("TCL: _getProductDetail -> result", result)
    },
    onChange(event) {
      console.log("TCL: onChange -> event", event)
    },
    toBuy() {
      const url = '/pages/order/submitOrder'
      this.$router.push(url)
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
}

.pub {
    margin-bottom: 28rpx;
    background: #fff;
}
.grey{
  line-height: 52rpx;
  color: #999;
  font-size: 28rpx;
}
// banner轮播
.product-banner {
  position: relative;
  .swiper {
      width: 750rpx;
      height: 750rpx;
      .swiper-item {
          width: 100%;
          height: 100%;
          .slide-image {
              width: 100%;
              height: 100%;
          }
      }
  }
  .btn-share {
    position: absolute;
    top: 80rpx;
    right: 0;
    padding: 0 8rpx;
    width: 100rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    border-radius: 20rpx 0 0 20rpx;
    background: #f60;
    .button {
      padding: 0;
      border: 0;
      height: 40rpx;
      line-height: 40rpx;
      font-size: 20rpx;
      color: #fff;
      background: #f60;
      &::after {
        border: 0
      }
    }
  }
  .indicator {
    position: absolute;
    right: 30rpx;
    bottom: 30rpx;
    width: 50rpx;
    font-size: 20rpx;
    line-height: 30rpx;
    text-align: center;
    background: #fff;
  }
}
.select-cell-text{
  margin-left: 30rpx;
}
.select-wrap{
  padding: 20rpx 0;
  background: #f7f7f7;
}
// 基本信息
.product-info {
  padding: 20rpx;
  .content {
    display: flex;
    align-items: center;
    .desc {
      flex: 1;
      .title {
        font-size: 36rpx;
        color: #000;
      }
      .text {
        color: #7f7f7f;
      }
    }
    .content-right {
      padding: 0 20rpx;
      background-image: linear-gradient(to bottom, #919191 33%, rgba(255, 255, 255, 0) 0);
      background-size: 2rpx 24rpx;
      background-repeat: repeat-y;
      .t1 {
        color: #B4282D;
        font-size: 36rpx;
        font-weight: bold;
      }
      .t2 {
        font-size: 24rpx;
      }
    }
  }
  .cloumn {
      display: flex;
      align-items: center;
      .price {
        flex: 1;
        display: inline-flex;
        align-items: center;
        .span {
          font-size: 24rpx;
          font-weight: bold;
          color: #B4282D;
        }
        .price-now {
          font-size: 48rpx;
          font-weight: bold;
          color: #B4282D;
        }
        .price-del {
          margin-left: 16rpx;
          position: relative;
          font-size: 28rpx;
          color: #7f7f7f;
          .del {
            position: absolute;
            left: 0;
            bottom: 18rpx;
            width: 100%;
            height: 2rpx;
            background: #7f7f7f;
          }
        }
      }
      .price-right {
        flex: 1;
        text-align: right;
        font-size: 28rpx;
        color: #7f7f7f;
      }
    }
    .promotion-group {
      display: inline-flex;
      .promotion-item {
        margin-right: 10rpx;
        padding: 0 10rpx;
        line-height: 36rpx;
        height: 36rpx;
        font-size: 24rpx;
        color: #f48f18;
        border: 2rpx solid #f48f18;
        // border-radius: 8rpx;
      }
    }
}


// 服务说明
.service-wraper {
  padding: 24rpx 0 8rpx;
  background: #fff;
  .service-content {
    position: relative;
    padding-left: 30rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .left {
      margin-right: 20rpx;
      align-self: flex-start;
      line-height: 1;
      color: #333;
    }
    .right {
      flex: 1;
      .right-item {
        position: relative;
        margin-right: 40rpx;
        margin-bottom: 16rpx;
        padding-left: 16rpx;
        float: left;
        line-height: 1;
        color: #7f7f7f;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 8rpx;
          width: 8rpx;
          height: 8rpx;
          background: #b4282d;
          border-radius: 100%;
        }
      }
    }
    .next {
      padding: 0 20rpx;
    }
  }
}

// 底部
.footer-wrap {
  position: fixed;
  padding: 10rpx 0;
  left: 0;
  bottom: 0;
  z-index: 110;
  width: 100vw;
  height: 80rpx;
  background: #fff;
  border-top: 1rpx solid #d9d9d9;
  .flex-wrap{
    display: flex;
    align-items: center;
    .cart-wrap{
      position: relative;
      width: 70rpx;
      height: 70rpx;
      margin: 0 26vw 0 40rpx;
      .img{
        width: 100%;
        height: 100%;
      }
      .tag-info{
        position: absolute;
        right: 0;
        top: 0;
        width: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        font-size: 24rpx;
        background: #b4282d;
        z-index: 100;
        transform: translate(10rpx, -2rpx)
      }
    }
    .flex-col{
      flex: 1;
      margin-right: 20rpx;
    }
  }
  .button{
    line-height: 80rpx;
    height: 80rpx;
    box-sizing: border-box;
    text-align: center;
    font-size: 28rpx;
    border-radius: 10rpx;
  }
  .buy {
    color: #333;
    background: #fff;
    border: 1rpx solid #999;
  }
  .car {
    color: #fff;
    background: #b4282d;
  }
}

// 产品描述图
.productDescImg-wrap {
  .imgDesc {
    width: 100vw;
    // height: auto;
  }
}
// 规格选择
.dt-paramselect {
	padding: 36rpx 30rpx 130rpx 30rpx;
	.info-con{
		// height: 240rpx;
		display: flex;
		padding-bottom: 42rpx;
		.left{
			overflow: hidden;
			// margin-right: -196rpx;
			width: 196rpx;
			height: 196rpx;
			    background-color: #f4f4f4;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex: 1;
			display: flex;
			align-items: flex-end;
			line-height: 1;
			margin-left: 20rpx;
			.con{
				.price{
					// font-size: 28rpx;
					padding-bottom: 4rpx;
					line-height: 40rpx;
					color: #b4282d;
				}
				.sku{
					overflow: hidden;
					max-width: 400rpx;
					// font-size: 28rpx;
					line-height: 40rpx;
					word-wrap: normal;
					white-space: nowrap;
          text-overflow: ellipsis;
          .span{
            font-size: 28rpx;
            color: #999;
          }
				}
			}
		}
	}
	.spec-con{
		.u-format{
			.tt{
				line-height: 1;
				// font-size: 28rpx;
				padding-bottom: 24rpx;
			}
			.con{
				padding-bottom: 30rpx;
				.tab{
					display: inline-block;
					position: relative;
					vertical-align: middle;
					border-radius: 6rpx;
					padding: 0 34rpx;
					font-size: 24rpx;
					line-height: 64rpx;
					margin-right: 24rpx;
					margin-bottom: 16rpx;
					border: 2rpx solid #333;
				}
				.sel{
					border: 2rpx solid #b4282d;
					color: #b4282d;
				}
			}
			.m-selNumRow{
				position: relative;
				display: flex;
				align-items: center;
				.m-selnum{
					display: inline-flex;
					line-height: 66rpx;
					text-align: center;
					border: 1rpx solid #d9d9d9;
					.less,.more{
						position: relative;
						width: 90rpx;
            height: 66rpx;
            text-align: center;
            .span{
              font-size: 40rpx;
              line-height: 66rpx;
            }
					}
					.textWrap{
						width: 130rpx;
						text-align: center;
						border-left: 1rpx solid #d9d9d9;
						border-right: 1rpx solid #d9d9d9;
						.input{
							height: 100%;
							width: 100%;
							box-sizing: border-box;
							margin: 0;
							text-align: center;
							color: #333;
							border: none;
							background-color: transparent;
						}
					}
				}
			}
		}
	}
}
</style>
