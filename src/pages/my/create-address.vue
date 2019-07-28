<template>
  <div class="address-create">
    <van-field :value="username" required clearable label="收货人名" placeholder="请输入收货人姓名" />

    <van-field :value="tel" required label="手机号码" placeholder="请输入收货人手机号码" />

    <van-field :value="address" required label="所在地区" />

    <van-field type="textarea" autosize :value="address" required label="详细信息" placeholder="详细信息" />

    <van-popup :show="true" position="bottom" :overlay="true" @close="onChange">
      <van-area :area-list="areaList" title="地址选择" />
    </van-popup>

    <div class="full-btn" @click="toCreateAddress">保存</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      tel: "",
      username: "",
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
          // ....
        }
      }
    };
  },
  methods: {
    onChange() {}
  }
};
</script>
<style lang="less" scoped>
.full-btn{
  margin: 20rpx 30rpx;
  font-size: 40rpx;
  color: #fff;
  text-align: center;
  line-height: 100rpx;
  background-color: #ab2929;
  border-radius: 4rpx;
}
</style>
