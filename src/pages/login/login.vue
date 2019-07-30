<template>
  <div class="container">
    <!-- <img src="/static/images/logo.png" alt=""> -->
    <!-- <h1>商城严选</h1>
		<div class="desc">申请获得你的公开信息（昵称、头像等）</div>
		<button
			type="primary"
	    v-if="canIUse"
	    open-type="getUserInfo"
	    @getuserinfo="bindGetUserInfo"
    >微信登陆</button>-->
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
      label="短信验证码"
      placeholder="请输入短信验证码"
    />
    <div style="padding: 20rpx 30rpx;">
      <van-button loading type="danger" block size="normal" loading-text="加载中..." />
    </div>
  </div>
</template>
<script>
import { getValidCode } from "@/api";

export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      code: "",
      username: "18117219026"
    };
  },
  onShow() {
    // wx.login({
    // 	success:(res)=>{
    // 		this.code = res.code
    // 	}
    // })
	},
	mounted(){
    this.getPhoneCode()
	},
  methods: {
    getPhoneCode() {
			if(this.username){
        const data = { username: this.username }
        // console.log(FormData)
        // const data = new FormData()
        data.append('username', this.username)
        getValidCode(data).then(res => {
          console.log(res);
        });
			}
    },
    changeUsername(e) {
			this.username = e.mp.detail
    }
    // bindGetUserInfo(e){
    // 	const { encryptedData, iv, signature} = e.mp.detail
    // 	if (!encryptedData) return
    // 	var fromPage = decodeURIComponent(this.$root.$mp.query.from || '') || 'pages/recommend/recommend'
    // 	const code = this.code
    // }
  }
};
</script>
