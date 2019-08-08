<template>
  <div class="bill-detail-wrap">
    <div class="bill-detail-status">
      <p class="text-center font-30">
        <van-icon name="bill" size="32rpx" color="#ab2929"/>账单
      </p>
      <div class="bill-detail-info flex-box">
        <div class="flex-item text-center">
          <p class="font-32">-{{outCount}}</p>
          <p>支出</p>
        </div>
        <div class="flex-item text-center">
          <p class="font-32">{{inCount}}</p>
          <p>收入</p>
        </div>
      </div>
    </div>
    <div class="scroll-wrap" v-if="list.length">
      <scroll-view scroll-y class="scroll-view-wrap" @scrolltolower="getMoreBillList">
        <div v-for="el in list" :key="el.orderCode">
          <div class="bill-list">
            <p>
              <van-icon color="#ab2929" name="cash-back-record" size="30rpx" />&nbsp;
              账单{{el.rechargeType === '0' ? '充值' : el.rechargeType === '1' ? '消费' : '退款'}}&nbsp;(退单号: {{el.orderCode}})
            </p>
            <p class="clearfix">
              <span class="fl font-gray">{{el.createTime}}</span>
              <span
                class="fr font-red"
              >{{el.rechargeType === '0' ? '+' : el.rechargeType === '1' ? '-' : '+'}}&nbsp;{{el.money}}</span>
            </p>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import { billList } from "@/api";
export default {
  data() {
    return {
      page: 1,
      list: [],
      outCount: 0,
      inCount: 0
    };
  },
  onShow() {
    this.page = 1;
    this.list = [];
    this.getBillList();
  },
  methods: {
    getMoreBillList() {
      billList({
        userToken: this.$store.state.token,
        page: ++this.page
      }).then(res => {
        if (res.code === "success") {
          this.list = this.list.concat(res.data);
        }
      });
    },

    getBillList() {
      billList({
        userToken: this.$store.state.token,
        page: this.page
      }).then(res => {
        if (res.code === "success") {
          this.list = res.data;
          this.outCount = res.outCount;
          this.inCount = res.inCount;
          console.log(this.list);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-wrap {
  height: 100vh;
  .scroll-view-wrap {
    position: relative;
    height: 100%;
  }
}
.font-32 {
  font-size: 32rpx;
  font-weight: 700;
}
.bill-detail-status {
  padding: 30rpx 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  font-size: 24rpx;
}
.bill-list {
  padding: 20rpx 40rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
  p {
    font-size: 28rpx;
    line-height: 40rpx;
  }
}
</style>