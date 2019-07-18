<template>
  <div class="container">
    <div class="search">
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon"></span>
      </div>
    </div>
    <div class="user-motto">
      <card :text="motto"></card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  mpType: 'page',
  components: {
    card
  },
  data () {
    return {
      motto: '推荐'
    }
  },
  methods: {
    toSearch() {
      const url = '/packageA/logs'
      this.$router.push(url)
    },
  },
}
</script>

<style scoped lang="less">
.container{
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 0 25rpx 0 10rpx;
    position: fixed;
    top: 0;
    z-index: 99;
    height: 80rpx;
    display: flex;
    align-items: center;
    background: #fff;
  }
}
</style>
