<template>
  <div class="address-list">
    <div v-if="addressList.length">

    <div class="address-item" v-for="el in addressList" :key="el" @click="selectAddress(el)">
      <div class="address-info">
        <p class="flex-box item-space-between">
          <span>{{el.trueName}}</span>
          <span>{{el.addressTel}}</span>
        </p>
        <p>{{el.province+el.city+el.area+el.address}}</p>
      </div>
      <div class="address-operate flex-box item-space-between">
        <div @click.stop="">
          <van-checkbox
            checked-color="#ab2929"
            :value="el.isDefault !== '1'"
            @change="onChange(el, $event)"
          >默认</van-checkbox>
        </div>
        <div class @click.stop="">
          <van-icon
            size="42rpx"
            name="delete"
            @click="delAddressItem(el)"
            style="position: relative; top: 14rpx; margin-right: 40rpx;"
          />
          <van-icon
            size="42rpx"
            name="edit"
            @click="toCreateAddress(el)"
            style="position: relative; top: 14rpx;"
          />
        </div>
      </div>
    </div>
    </div>
    <div v-else>
      <image src="/static/images/img-empty.png" class="img-center"/>
    </div>
    <div class="full-btn fixed" @click="toCreateAddress">新增收货人信息</div>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script>
import {
  getUserAddress,
  setUserAddressDefault,
  deleteUserAddress
} from "@/api";
import Dialog from "vant-weapp/dist/dialog/dialog";
export default {
  data() {
    return {
      checked: true,
      addressList: []
    };
  },
  onShow() {
    this.getUserAddress();
  },
  methods: {
    getUserAddress() {
      getUserAddress({
        userToken: this.$store.state.token
      }).then(res => {
        if (res && res.code === "success") {
          this.addressList = res.data;
        }
      });
    },
    selectAddress(el) {
      if(this.$route.query.back) {
        this.$store.commit('SET_ADDRESS', Object.assign({}, el))
        this.$router.back()
      }
      console.log("TCL: selectAddress -> el", el)
    },
    onChange(el, $event) {
      const isDefault = $event.mp.detail;

      el.isDefault === '1' && setUserAddressDefault({
        userToken: this.$store.state.token,
        id: el.id
      }).then(res => {
        // 成功
        if (res && res.code === "success") {
          const query = this.$route.query

          wx.showToast({
            icon: "none",
            title: "设置成功"
          });

          this.getUserAddress();
          const timer = setTimeout(()=>{
          if(query.back){
            this.$router.back()
            clearTimeout(timer)
          }
          }, 1.5e3)
        }
      });
    },
    toCreateAddress(id) {
      const path = "/pages/my/create-address";
      id && id.id ? this.$router.push({
        path,
        query:{
          id: id.id
        }
      }) : this.$router.push(path);
    },

    delAddressItem(el) {
      Dialog.confirm({
        message: "确认删除收货地址？",
        showCancelButton: true,
        asyncClose: true
      })
        .then(() => {
          deleteUserAddress({
            userToken: this.$store.state.token,
            ids: Number(el.id)
          }).then(res => {
            // 成功
            if (res && res.code === "success") {
              wx.showToast({
                icon: "none",
                title: "删除成功"
              });
              this.getUserAddress();
              Dialog.close();
            }
          });
        })
        .catch(() => {
          Dialog.close();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.address-list {
  padding-bottom: 100rpx;
  font-size: 28rpx;
  .full-btn {
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
.img-center{
  width: 320rpx;
  height: 240rpx;
  display: block;
  margin: 240rpx auto;
  transform: translateX(10%);
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
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 14rpx;
      background: url(http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-1579543565.png)
        repeat;
    }
  }
  .icon-wrap {
    margin: 0 25rpx;
  }
}
</style>
