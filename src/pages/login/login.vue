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
      <van-button
        slot="button"
        size="small"
        :disabled="!canTestCode"
        type="primary"
        @click="getPhoneCode"
      >{{testCode}}</van-button>
    </van-field>

    <van-field
      :value="code"
      :border="false"
      @input="changeDataModule"
      label="短信验证码"
      placeholder="请输入短信验证码"
    />

    <div style="padding: 20rpx 30rpx;">
      <van-button
        :loading="false"
        type="danger"
        block
        size="normal"
        loading-text="登录中..."
        @click="goMyCenter"
      >登 录</van-button>
    </div>
  </div>
</template>
<script>
import { getValidCode, userLogin } from "@/api";

export default {
  data() {
    return {
      code: "",
      username: "",
      canTestCode: true,
      testCode: "发送验证码"
    };
  },
  mounted() {},
  methods: {
    getPhoneCode() {
      if (this.username && this.canTestCode) {
        const data = { username: this.username };
        getValidCode(data).then(res => {
          if (res && res.code === "success") {
            wx.showToast({
              icon: "none",
              title: "验证码已发送"
            });
            this.testCodeTimer();
          }
        });
      }
    },

    testCodeTimer() {
      let count = 61;
      this.canTestCode = false;
      this.testCode = `已发送(${count})`;
      const timer = setInterval(() => {
        count--;
        if (count < 1) {
          this.testCode = "发送验证码";
          this.canTestCode = true;
          clearInterval(timer);
        } else {
          this.testCode = `已发送(${count})`;
        }
      }, 1e3);
    },

    changeUsername(e) {
      this.username = e.mp.detail;
    },

    changeDataModule(e) {
      this.code = e.mp.detail;
    },

    goMyCenter() {
      this.$store
        .dispatch("login", {
          username: this.username,
          valid_code: this.code
        })
        .then(res => {
          wx.showToast({
            icon: "none",
            title: "登录成功！"
          });

          const query = this.$route.query;
          const url = "/pages/my/my";
          const timer = setTimeout(() => {
            if (query.back) {
              this.$router.back();
            } else {
              this.$router.push({ path: url, isTab: true });
            }

            clearTimeout(timer);
          }, 1.5e3);
        });
    }
  }
};
</script>
