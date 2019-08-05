<template>
  <div class="address-create">
    <van-field
      :value="trueName"
      @change="onChangetrueName"
      required
      clearable
      label="收货人名"
      placeholder="请输入收货人姓名"
    />

    <van-field
      :value="addressTel"
      required
      @change="onChangeaddressTel"
      label="手机号码"
      placeholder="请输入收货人手机号码"
    />

    <van-field
      :value="areaArrStr"
      type="textarea"
      autosize
      disabled
      @click="showArea=true"
      required
      label="所在地区"
    />

    <van-field
      type="textarea"
      @input="onChangeaddress"
      autosize
      :value="address"
      required
      label="详细信息"
      placeholder="详细信息"
    />

    <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
      <van-area :area-list="areaList" title="地址选择" :value="chooseArea" @confirm="sureArea" />
    </van-popup>

    <div class="full-btn" @click="toCreateAddress">保存</div>
  </div>
</template>
<script>
import {
  getAddressAll,
  addNewAddress,
  singleAddressInfo,
  editNewAddress
} from "@/api";
export default {
  data() {
    return {
      checked: true,
      addressTel: "",
      trueName: "",
      areaArrStr: "",
      chooseArea: "",
      address: "",
      showArea: false,
      areaList: {},
      areaArr: [],
      editData: null,
      id: ""
    };
  },
  onShow() {
    const query = this.$route.query;
    this.getAddressAll();
    if (query.id) {
      this.id = query.id;
      this.getAddressById(query.id);
      return;
    }
    this.addressTel = this.trueName = this.areaArrStr = this.id = this.address =
      "";
  },
  methods: {
    onChangeaddress(val) {
      this.address = val.mp.detail;
    },
    onChangetrueName(val) {
      this.trueName = val.mp.detail;
    },
    onChangeaddressTel(val) {
      this.addressTel = val.mp.detail;
    },
    getAddressById(id) {
      singleAddressInfo({
        id,
        userToken: this.$store.state.token
      }).then(result => {
        if (result && result.code === "success") {
          const res = result.data;

          this.editData = res;
          this.chooseArea = res.areaId;
          this.address = res.address;
          this.addressTel = res.addressTel;
          this.trueName = res.trueName;
          this.areaArrStr = `${res.province + res.city + res.area}`;
        }
      });
    },
    sureArea(ev) {
      this.areaArr = ev.target.values;
      this.areaArrStr =
        this.areaArr.length &&
        this.areaArr.reduce((total, el) => {
          if (el.name) {
            return (total += el.name);
          }
          return total;
        }, "");
      this.chooseArea = this.areaArr[this.areaArr.length - 1].code;
      this.showArea = false;
    },
    getAddressAll() {
      getAddressAll().then(res => {
        if (res) {
          this.areaList = res.areaList;
        }
      });
    },
    toCreateAddress() {
      const { areaArrStr, addressTel, trueName, address, areaArr } = this;
      if (areaArrStr && addressTel && trueName && address) {
        const params = {
          areaArrStr,
          addressTel,
          trueName,
          address,
          userToken: this.$store.state.token,
          provinceId: this.editData ? this.editData.provinceId : areaArr[0].code,
          province: this.editData ? this.editData.province : areaArr[0].name,
          cityId: this.editData ? this.editData.cityId : areaArr[1].code,
          city: this.editData ? this.editData.city : areaArr[1].name,
          areaId: this.editData ? this.editData.areaId : areaArr[2].code,
          area: this.editData ? this.editData.area : areaArr[2].name,
          isDefault: 1
        };
        if (this.id) {
          params.id = this.id;
          editNewAddress(params).then(res => {
            if (res && res.code === "success") {
              this.onSaveCallback()
            }
          });
        } else {
          addNewAddress(params).then(res => {
            if (res && res.code === "success") {
              this.onSaveCallback()
            }
          });
        }
      }
    },
    onSaveCallback() {
      wx.showToast({
        icon: "none",
        title: this.id ? "修改成功" : "保存成功"
      });

      this.editData = null
      const timer = setTimeout(()=>{
        const url = "/pages/my/my";
        this.$router.push({ path: url, isTab: true });
        clearTimeout(timer)
      }, 1.5e3)
    }
  }
};
</script>
<style lang="less" scoped>
.full-btn {
  margin: 20rpx 30rpx;
  font-size: 40rpx;
  color: #fff;
  text-align: center;
  line-height: 100rpx;
  background-color: #ab2929;
  border-radius: 4rpx;
}
</style>
