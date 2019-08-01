<template>
  <div class="container">
    <van-field
      :value="username"
      @input="changeUsername"
      border
      center
      clearable
      label="手机号码"
      placeholder="请输入手机号码"
      use-button-slot
    >
      <van-button slot="button" size="small" type="primary" @click="getPhoneCode">发送验证码</van-button>
    </van-field>

    <van-field
      :value="code"
      :border="false"
      @input="changeDataModule"
      label="短信验证码"
      placeholder="请输入短信验证码"
    />

    <div style="padding: 20rpx 30rpx;">
      <van-button :loading="false" type="danger" block size="normal" loading-text="登录中..." @click="goMyCenter">登 录</van-button>
    </div>
  </div>
</template>
<script>
import { getValidCode, userLogin } from "@/api";

export default {
  data() {
    return {
      code: "",
      username: "18117219026"
    };
  },
  onShow() { },
	mounted() { },
  methods: {
    getPhoneCode() {
			if(this.username){
        const data = { username: this.username }
        getValidCode(data).then(res => {
          // 验证码
          console.log(res);
        });
			}
    },

    changeUsername(e) {
			this.username = e.mp.detail
    },

    changeDataModule(e) {
			this.code = e.mp.detail
    },

    goMyCenter(){
      this.$store.dispatch('login', {
        username: this.username,
        valid_code: this.code
      }).then(res=>{
        // 用户信息
        this.$router.back();
      })
      // userLogin({
      //   username: this.username,
      //   valid_code: this.code
      // }).then(res=>{
      //   // 用户信息
      //   this.$router.back();
      // })
    }
  }
};
</script>
