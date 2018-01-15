<template>
  <div class="commit-footer">
    <span class="date">{{posts.dateline}}</span>
    <div class="commit-opration">
      <span :class="['like', posts.id ? 'liked' : '', posts.liked ? 'liked-animate' : '']" @click.prevent.stop="recommendClick">{{!likeTotal ? '点赞' : likeTotal}}</span>
      <span class="reply" @click.prevent.stop="comment">回复</span>
      <span class="more" @click.prevent.stop="showAction" v-if="uid && uid!='0'"></span>
    </div>
  </div>
</template>
<script>
import XHR from '../../api/'
export default {
  props: ['posts', 'index', 'bbsComment'],
  data: () => ({
    uid: '',
  }),
  created () {
    this.uid = window.uid
  },
  computed: {
    likeTotal () {
      return this.posts.recommend_count
    }
  },
  methods: {
    recommendClick () {
      let json = {
        type: 'liked',
        posts: this.posts,
        index: this.index
      }
      this.$emit('footerAction', json)
    },
    showAction () {
      let json = {
        detail: this.posts,
        index: this.index,
        bbs: this.bbsComment
      }
      this.$store.dispatch('Setaction', json)
      let message = {
        type: 'message',
        posts: this.posts
      }
      this.$emit('footerAction', message)
    },
    comment () {
      let data = {
        detail: this.posts,
        index: this.index,
        bbs: this.bbsComment
      }
      this.$store.dispatch('Setaction', data)
      let json = {
        type: 'comment',
        posts: this.posts
      }
      this.$emit('footerAction', json)
    }
  }
}
</script>
<style scoped>
  .commit-footer{
    display: flex;
    flex-direction: row;
    color: #A1A9B3;
    align-items: center;
  }
  .date{
    font-size: 12px;
    opacity: 0.6;
  }
  .commit-opration{
    flex: 1;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    text-align: right;
  }
  .like, .reply, .more{
    display: inline-block;
    padding: 8px 0 12px;
  }
  .like:before, .reply:before, .more:before{
    font-family: "bbs";
    font-size: 12px;
  }
  .like:before{
    content: "\e698";
    margin-right: 4px;
    height: 18px;
    text-align: center;
    display: inline-block;
  }
  .liked, .liked-animate,.liked:before{
    color: #1571E5;
  }
  .liked-animate:before{
    color: #1571E5;
    width: 24px;
    -webkit-animation: liked .7s ease-out;
    animation: liked .7s ease-out;
    background: url('https://s.kcimg.cn/bbs/images/app/like-bg.png') 50% 50%;
    background-size: cover;
  }
  .reply{
    margin-left: 16px;
  }
  .reply:before{
    content: "\e695";
    margin-right: 4px;
  }
  .more{
    text-align: center;
    width: 22px;
    margin-left: 16px;
  }
  .more:before{
    content: "\e699";
  }
  @-webkit-keyframes liked {
    0% { -webkit-transform: scale(1);}
    25% { -webkit-transform:scale(3);}
    50% { -webkit-transform: scale(2);}
    75% { -webkit-transform: scale(1.5);}
    100% { -webkit-transform: scale(1);}
  }
  @keyframes liked {
    0% { transform: scale(1);}
    25% { transform: scale(3);}
    50% { transform: scale(2);}
    75% { transform: scale(1.5);}
    100% { transform:scale(1);}
  }
</style>
