<template>
  <div v-if="allData" class="comment-view">
    <div class="all-comment">
      <header class="title" v-if="allData.page">全部回帖</header>
      <ul>
        <li v-for="(item, index) in post" :ref="`pid${item.pid}`">
          <commit :posts="item" :index="index" :bbsComment="post" @toUser="toUser" @toFloor="toFloor" @footerAction="footerAction"></commit>
          <!-- 插入广告 id="PAGE_AD_127738924" -->
          <div id="PAGE_AD_127738924" @click.prevent="adClick" v-if='allData.page && index==1'></div>
        </li>
        <!-- 询底价广告 -->
        <li v-if="allData.advert">
          <ads-style :advert="allData.advert"></ads-style>
        </li>
      </ul>
    </div>
    <div v-if="!post.length && !allData.advert"><comment-null></comment-null></div>
    <div class="data-end" v-if="allData.islast">已经看完啦，大人赏个回帖吧~</div>
    <p v-if="post.length>0 && !allData.islast" class="footer-text">上翻至第{{ parseInt(page)+1}}页</p>
  </div>
</template>

<script>
import Commit from './comment/commit.vue'
import AdsStyle from './comment/ads-style.vue'
import CommentNull from './comment/comment-null.vue'
export default {
  props: ['allData','post','page'],
  components:{
    Commit,
    AdsStyle,
    CommentNull
  },
  created () {
    if (!this.allData.advert && !this.post.length) {
      this.allData.islast = false
    }
  },
  methods: {
    toUser (e) {
      this.$emit('toUser', e)
    },
    footerAction (e) {
      e['likedType'] = 'all'
      this.$emit('footerAction', e)
    },
    toFloor (e) {
      this.$store.dispatch('SetType', 'all')
      this.$emit('toFloor', e)
    },
    adClick (e) {
      let url = document.querySelector('#PAGE_AD_127738924 a').href
      let title = document.querySelector('#PAGE_AD_127738924 h4').textContent
      this.callNativeMethod('adClick', {'url': url,'title':title,'place':'1'})
    }
  }
}
</script>
<style scoped>
  .all-comment{
    padding: 8px 16px 0;
    position: relative;
  }
  .all-comment:before{
    content: "";
    position: absolute;
    left: -16px;
    top: -8px;
    background: #f3f4f5;
    width: calc(100% + 32px);
    height: 8px;
  }
  .all-comment > .title{
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    color: #17181A;
    letter-spacing: 0;
    font-weight: bold;
  }
  .data-end{
    margin: 0 -16px;
    height: 33px;
    background: #F5F5F5;
    line-height: 33px;
    font-size: 12px;
    color: #8A9199;
    text-align: center;
  }
  .footer-text{
    height: 33px;
    line-height: 33px;
    background-color: #F5F5F5;
    color: #8A9199;
    font-size: 12px;
    text-align: center;
  }
</style>
