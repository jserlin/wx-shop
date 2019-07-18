<template>
  <div class="container">
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
      motto: '分类'
    }
  }
}
</script>

<style scoped>
</style>
