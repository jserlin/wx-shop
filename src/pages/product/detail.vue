<template>
  <div class="container">
    <div v-if="productInfo">
      <div class="product-banner">
        <swiper class="swiper" circular="true" @change="setCurrentIndex">
          <div v-for="(item, index) in bannerImgUrl" :key="index">
            <swiper-item class="swiper-item">
              <image :src="item" class="slide-image" />
            </swiper-item>
            <!-- <swiper-item class="swiper-item" v-if="productInfo.picUrl2">
              <image :src="productInfo.picUrl2" class="slide-image" />
            </swiper-item>
            <swiper-item class="swiper-item" v-if="productInfo.picUrl3">
              <image :src="productInfo.picUrl3" class="slide-image" />
            </swiper-item>-->
          </div>
        </swiper>
        <!-- <div class="btn-share">
          <button class="button" data-name="shareBtn" open-type="share">分享好物</button>
        </div>-->
        <div class="indicator">{{currentIndex}}/{{bannerImgUrl.length}}</div>
      </div>
      <!-- 基本信息 -->
      <div class="product-info pub">
        <div class="cloumn">
          <div class="price">
            <div class="span">￥</div>
            <div class="price-now">{{productInfo.goodsPrice}}</div>
            <div class="price-del">
              <div class="del"></div>
              {{productInfo.primaryPrice}}
            </div>
          </div>
          <!-- <div class="price-right">购买最高得48积分</div> -->
        </div>
        <div class="content">
          <div class="desc">
            <div class="title">{{productInfo.simpleDesc}}</div>
          </div>
        </div>
        <van-row>
          <van-col span="8">
            <span class="grey">{{productInfo.categoryName}}</span>
          </van-col>
          <van-col span="14">
            <span class="grey">库存: {{currentSkuInfo.inventory || productInfo.inventory}}</span>
          </van-col>
        </van-row>
      </div>
      <div class="select-wrap pub">
        <van-cell is-link @click="showPopup = true">
          <view slot="title">
            <span>规格选择</span>
            <span
              class="select-cell-text"
            >{{currentSkuInfo.displayString ? currentSkuInfo.displayString : '请选择'}}</span>
          </view>
        </van-cell>
      </div>
      <!-- 服务承若 -->
      <div class="service-wraper pub"  >
        <div class="service-content">
          <div class="left">服务：</div>
          <div class="right">
            <div class="right-item">48小时快速退款</div>
            <div class="right-item">满88元免邮费</div>
            <div class="right-item">网易自营品牌</div>
            <div class="right-item">部分偏远地区无法配送</div>
          </div>
          <div class="next"><i class="qb-icon qb-icon-next"></i></div>
				</div>
			</div>
      <!-- 底部tab -->
      <div class="footer-wrap">
        <div class="flex-wrap">
          <div class="cart-wrap" @click="toCart">
            <div v-show="cartNum" class="tag-info">{{cartNum}}</div>
            <img class="img" src="/static/images/icon-shopcar.png" alt />
          </div>
          <div class="flex-col">
            <div class="button buy" @click="addToCart('toCart')">立即购买</div>
          </div>
          <div class="flex-col">
            <div class="button car" @click="addToCart">加入购物车</div>
          </div>
        </div>
      </div>
      <!-- 商品规格选择弹出层 -->
      <van-popup :show="showPopup" position="bottom" @close="showPopup = false">
        <div class="dt-paramselect">
          <div class="info-con">
            <div class="left">
              <img class="img" :src="currentSkuInfo.picUrl || productInfo.primaryPicUrl" alt />
            </div>
            <div class="right">
              <div class="con">
                <div class="price">
                  <span class="span">价格：¥</span>
                  <span class="span">{{currentSkuInfo.goodsPrice || productInfo.goodsPrice}}</span>
                </div>
                <div class="sku">
                  <span
                    class="span"
                    v-show="currentSkuInfo.displayString"
                  >已选择：{{currentSkuInfo.displayString}}</span>
                  <span class="span it" v-show="!currentSkuInfo.displayString">请选择规格数量</span>
                </div>
              </div>
            </div>
          </div>
          <div class="spec-con">
            <div class="u-format">
              <div class="con">
                <div
                  class="tab"
                  v-for="(item, index) in productInfo.skuList"
                  :key="index"
                  @click="setCurrentSku(item)"
                  :class="{'sel': currentSkuInfo.displayString === item.displayString}"
                >
                  <span class="span">{{item.displayString}}</span>
                </div>
              </div>
            </div>
            <div class="u-format">
              <div class="tt">数量</div>
              <div class="con m-selNumRow">
                <div class="m-selnum">
                  <div class="less" @click="less">
                    <span class="span">-</span>
                  </div>
                  <div class="textWrap">
                    <input class="input" type="tel" :value="goodNum" />
                  </div>
                  <div class="more" @click="add">
                    <span class="span">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 商品详情 规则参数 tabs -->
      <!-- <van-tabs :active="active" v-if="productInfo">
        <van-tab title="商品详情"> -->
      <div class="productDescImg-wrap">
        <rich-text class="rich" :nodes="productInfo.detailHtml" bindtap="tap"></rich-text>
      </div>
        <!-- </van-tab> -->
        <!-- <van-tab title="规格参数">
          <div class="productDescImg-wrap">
            <img mode="widthFix" class="imgDesc" :src="productInfo.primaryPicUrl" alt />
          </div>
        </van-tab> -->
      <!-- </van-tabs> -->
    </div>
    <van-toast id="van-toast" />
  </div>
</template>
<script>
import Toast from "vant-weapp/dist/toast/toast";
import { getProductDetail, addShoppingCart, toConfirmOrder } from "@/api/";
import { getStorage, setStorage, removeStorage } from "@/utils/wx";

export default {
  data() {
    return {
      active: 0,
      showPopup: false,
      bannerImgUrl: [],
      currentIndex: 1,
      goodNum: 1,
      currentSkuInfo: {},
      productInfo: {}
    };
  },
  computed: {
    cartNum() {
      if(this.$store.state.shoppingCartLists && this.$store.state.shoppingCartLists.length){
        return this.$store.state.shoppingCartLists.reduce((pre, item) => {
          return pre + +item.num;
        }, 0);
      }
      return 0
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.productInfo.goodsName || "",
      desc: this.productInfo.simpleDesc || "",
      path: `/pages/product/detail?id=${this.productInfo.id}`
    };
  },
  onLoad() {
    this._getProductDetail(this.$route.query.id);
  },
  methods: {
    resetData() {
      this.showPopup = false;
      this.productInfo = null;
      this.bannerImgUrl = [];
      this.goodNum = 1;
      this.currentSkuInfo = {};
    },
    async _getProductDetail(id) {
      this.resetData();
      const result = await getProductDetail({
        id,
        userToken: this.$store.state.token
      });
      if (result.data) {
        // const regex = new RegExp('style=""', "gi");
        const _data = result.data;
        // 通过正则给返回的 html 图片 加上样式
        // _data.detailHtml = _data.detailHtml.replace(
        //   regex,
        //   `style="display:block; width:100%; height: 100%;"`
        // );
        this.productInfo = _data;
      }
      [1, 2, 3, 4, 5].map(item => {
        const key = this.productInfo[`picUrl${item}`];
        if (key) {
          this.bannerImgUrl.push(key);
        }
      });
    },
    add() {
      this.goodNum++;
    },
    less() {
      if (this.goodNum === 1) {
        Toast("不能再少了~");
        return;
      }
      this.goodNum--;
    },
    setCurrentIndex(val) {
      this.currentIndex = val.target.current + 1;
    },
    setCurrentSku(currentSku) {
      this.currentSkuInfo = currentSku;
    },
    async addToCart(type) {
      if (this.$store.state.token) {
        // 没有选择规格 弹出选择规格页面
        if (!this.currentSkuInfo.skuId) {
          this.showPopup = true;
          return;
        }
        const params = {
          goodsId: this.productInfo.id,
          userToken: this.$store.state.token,
          skuId: this.currentSkuInfo.skuId,
          goodsType: this.productInfo.goodsType
        };
        const result = await addShoppingCart(params);
        if (result.code === "success") {
          Toast("加入购物车成功");
          this.$store.dispatch("getShoppingLists").then(() => {
            if(type === 'toCart') {
              this.toCart()
            }
          })
        }
      } else {
        const url = "/pages/login/login";
        this.$router.push({ path: url, query: { back: 1 } });
      }
    },
    toBuy() {
      if (this.$store.state.token) {
        const url = "/pages/order/submitOrder";
        this.$router.push({ path: url, query: { ids: this.productInfo.id } });
      } else {
        const url = "/pages/login/login";
        this.$router.push({ path: url, query: { back: 1 } });
      }
    },
    toCart() {
      const url = "/pages/cart/cart";
      this.$router.push({ path: url, isTab: true });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  padding-bottom: 104rpx;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  background: #f7f7f7;
}

.pub {
  margin-bottom: 28rpx;
  background: #fff;
}
.grey {
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
        border: 0;
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
.select-cell-text {
  margin-left: 30rpx;
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
        font-size: 28rpx;
        color: #000;
      }
      .text {
        color: #7f7f7f;
      }
    }
    .content-right {
      padding: 0 20rpx;
      background-image: linear-gradient(
        to bottom,
        #919191 33%,
        rgba(255, 255, 255, 0) 0
      );
      background-size: 2rpx 24rpx;
      background-repeat: repeat-y;
      .t1 {
        color: #b4282d;
        font-size: 28rpx;
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
        color: #b4282d;
      }
      .price-now {
        font-size: 48rpx;
        font-weight: bold;
        color: #b4282d;
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
  .flex-wrap {
    display: flex;
    align-items: center;
    .cart-wrap {
      position: relative;
      width: 70rpx;
      height: 70rpx;
      margin: 0 26vw 0 40rpx;
      .img {
        width: 100%;
        height: 100%;
      }
      .tag-info {
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
        transform: translate(10rpx, -2rpx);
      }
    }
    .flex-col {
      flex: 1;
      margin-right: 20rpx;
    }
  }
  .button {
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
  .info-con {
    // height: 240rpx;
    display: flex;
    padding-bottom: 42rpx;
    .left {
      overflow: hidden;
      // margin-right: -196rpx;
      width: 196rpx;
      height: 196rpx;
      background-color: #f4f4f4;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: flex-end;
      line-height: 1;
      margin-left: 20rpx;
      .con {
        .price {
          // font-size: 28rpx;
          padding-bottom: 4rpx;
          line-height: 40rpx;
          color: #b4282d;
        }
        .sku {
          overflow: hidden;
          max-width: 400rpx;
          // font-size: 28rpx;
          line-height: 40rpx;
          word-wrap: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
          .span {
            font-size: 28rpx;
            color: #999;
          }
        }
      }
    }
  }
  .spec-con {
    .u-format {
      .tt {
        line-height: 1;
        // font-size: 28rpx;
        padding-bottom: 24rpx;
      }
      .con {
        padding-bottom: 30rpx;
        .tab {
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
        .sel {
          border: 2rpx solid #b4282d;
          color: #b4282d;
        }
      }
      .m-selNumRow {
        position: relative;
        display: flex;
        align-items: center;
        .m-selnum {
          display: inline-flex;
          line-height: 66rpx;
          text-align: center;
          border: 1rpx solid #d9d9d9;
          .less,
          .more {
            position: relative;
            width: 90rpx;
            height: 66rpx;
            text-align: center;
            .span {
              font-size: 32rpx;
              line-height: 66rpx;
            }
          }
          .textWrap {
            width: 130rpx;
            text-align: center;
            border-left: 1rpx solid #d9d9d9;
            border-right: 1rpx solid #d9d9d9;
            .input {
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
