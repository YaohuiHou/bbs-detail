<template>
  <div class="hot-comment">
    <header>热门回帖</header>
      <ul>
        <li v-for="(item, index) in hotData">
          <commit :posts="item" :index="index" @toUser="toUser" @toFloor="toFloor" @footerAction="footerAction" :bbsComment="hotData"></commit>
        </li>
      </ul>
  </div>
</template>

<script>
import Commit from './comment/commit.vue'
export default {
  props: ['hotData'],
  components:{
    Commit
  },
  methods: {
    toUser (e) {
      this.$emit('toUser', e)
    },
    footerAction (e) {
      e['likedType'] = 'hot'
      this.$emit('footerAction', e)
    },
    toFloor (e) {
      this.$store.dispatch('SetType', 'hot')
      this.$emit('toFloor', e)
    }
  }
}
</script>
<style scoped>
.hot-comment >header{
  font-size: 20px;
  color: #F88B26;
  letter-spacing: 0;
  line-height: 44px;
  height: 44px;
  background-image: linear-gradient(-180deg, rgba(246,135,36,0.08) 0%, rgba(246,138,34,0.02) 48%, rgba(247,141,31,0.00) 100%);
  margin: 0 -16px;
  padding: 0 16px;
}
.hot-comment ul{
  padding-bottom: 8px;
}
</style>
