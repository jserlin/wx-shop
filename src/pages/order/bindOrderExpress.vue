<template>
  <div class="bind-order-express">
    <van-cell title="请选择物流公司" is-link :value="trackingCompany" @click="showPopup = true" />
    <van-field
      :value="trackingNum"
      label="快递单号"
      placeholder="请输入快递单号"
      required
      :border="true"
      @change="onChange"
    />
    <div class="footer-btn fixed" @click="onSubmit">保 存</div>
    <van-popup position="bottom" :show="showPopup" @close="showPopup = false">
      <van-picker show-toolbar :columns="expressList" @confirm="onPickerChange" />
    </van-popup>
  </div>
</template>
<script>
import {
  bindReturnOfGoodExpress
} from '@/api'
export default {
  data() {
    return {
      returnApplyId: null,
      showPopup: false,
      trackingNum: null,
      trackingCompany: null,
      expressList: [
        "EMS",
        "顺丰",
        "德邦",
        "京东快递",
        "韵达",
        "中通",
        "百世汇通",
        "圆通",
        "申通",
        "天天",
        "中国邮政",
        "全峰",
        "国通",
        "速尔",
        "中通国际",
        "能达",
        "优速",
        "快捷",
        "其他"
      ]
    };
  },
  onShow() {
    const { query } = this.$route;
    if (query.returnApplyId) {
      this.returnApplyId = query.returnApplyId;
    }
  },
  methods: {
    onSubmit() {
      this.trackingNum && this.trackingCompany && bindReturnOfGoodExpress({
        trackingNum: this.trackingNum,
        trackingCompany: this.trackingCompany,
        returnApplyId: this.returnApplyId,
        userToken: this.$store.state.token,
      }).then(res=>{
        if(res && res.code === 'success'){
          this.$router.back()
        }
      })
    },
    onChange(val) {
      this.trackingNum = val.mp.detail;
    },
    onPickerChange(ev) {
      this.showPopup = !this.showPopup;
      this.trackingCompany = ev.target.value;
    }
  }
};
</script>
<style lang="less" scoped>
.footer-btn {
  bottom: 0;
  width: 100%;
  height: 100rpx;
  font-size: 31rpx;
  line-height: 100rpx;
  color: #fff;
  text-align: center;
  background-color: #ab2929;
  font-weight: 400;
}
</style>
