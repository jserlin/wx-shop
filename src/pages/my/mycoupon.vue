<template>
  <div class="coupon-list-wrapper">
    <!-- forEach Elem start -->
    <div class="coupon-item flex-box" v-for="el in [1,2,3,4]" :key="el">
      <div class="flex-item flex-box">
        <div class="coupon-img-wrapper rel">
          <p class="abs">
            <span>福利券名称</span>
            <span>福利券价格</span>
          </p>
          <img src="/static/images/my_bg.png" alt="image" />
        </div>
        <div class="coupon-info">
          <p>福利券名称</p>
          <p>福利券价格</p>
        </div>
      </div>

      <div class="flex-item-right coupon-operation">
        <!-- 更改类名切换按钮 btn-normal btn-outline -->
        <span v-if="(el%2)" class="btn btn-normal">已购买</span>
        <span v-else class="btn btn-outline">撤销</span>
      </div>
    </div>
    <!-- end -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.coupon-list-wrapper {
  margin: 20rpx 0;
}
.coupon-list-wrapper .coupon-item {
  margin-bottom: 20rpx;
  padding: 30rpx;
  background: #fff;
}
.coupon-list-wrapper .coupon-img-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  background-color: #f4f4f4;
  overflow: hidden;
  image{
    width: 100%;
    height: 100%;
  }
}
.coupon-list-wrapper .coupon-img-wrapper p {
  top: 50%;
  left: 24rpx;
  transform: translateY(-50%);
  font-size: 18rpx;
}
.coupon-list-wrapper .coupon-img-wrapper p span {
  display: block;
}
.coupon-list-wrapper .coupon-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 80rpx;
  font-size: 26rpx;
}
.coupon-list-wrapper .coupon-operation {
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 160rpx;
}
.coupon-list-wrapper .coupon-operation .btn {
  position: absolute;
  right: 0;
}
.coupon-list-wrapper .coupon-operation .btn-normal {
  color: #ab2b2c;
}
</style>
