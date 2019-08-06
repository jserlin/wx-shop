<template>
  <div class="loading-wrap" v-show="isLoading">
    <div class="load-con">
      <van-loading type="circular" />
      <span style="padding-top:10rpx;">正在加载...</span>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.loading-wrap {
  padding: 6rpx;
  .load-con {
    text-align: center;
    margin: 0 auto;
  }
}
</style>
