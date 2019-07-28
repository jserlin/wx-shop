<template>
  <div class="address-list">
    <div class="address-item" v-for="el in [1,2,3,5,4,6,7]" :key="el">
      <div class="address-info">
        <p class="flex-box item-space-between">
          <span>公司地址</span>
          <span>18118121910</span>
        </p>
        <p>江苏省南京市南京理工大学地址101</p>
      </div>
      <div class="address-operate flex-box item-space-between">
        <div>
          <van-checkbox checked-color="#ab2929" :value="checked" @change="onChange">复选框</van-checkbox>
        </div>
        <div class="">
          <van-icon size="42rpx" name="delete" style="position: relative; top: 14rpx; margin-right: 40rpx;"/>
          <van-icon size="42rpx" name="edit" @click="toCreateAddress(el)" style="position: relative; top: 14rpx;"/>
        </div>
      </div>
    </div>
    <div class="full-btn fixed" @click="toCreateAddress">新增收货人信息</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true
    };
  },
  methods: {
    onChange() {},
    toCreateAddress(id){
      const url = id ? `/pages/my/create-address?id=${id}` : '/pages/my/create-address'
      this.$router.push(url)
    }
  }
};
</script>
<style lang="less" scoped>
.address-list{
  padding-bottom: 100rpx;
  font-size: 28rpx;
  .full-btn{
    bottom: 0;
    width: 100%;
    height: 100rpx;
    font-size: 40rpx;
    line-height: 100rpx;
    color: #fff;
    text-align: center;
    background-color: #ab2929;
  }
}
.address-item {
  background: #fff;
  .address-info,
  .address-operate {
    padding: 20rpx 30rpx;
    line-height: 70rpx;
  }
  .address-operate {
    padding-bottom: 30rpx;
    position: relative;
    border-top: 1px solid #f6f6f6;
    &::after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 14rpx;
      background: url(http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-1579543565.png) repeat;
    }
  }
  .icon-wrap {
    margin: 0 25rpx;
  }
}
</style>
