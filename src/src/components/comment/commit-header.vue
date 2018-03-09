<template>
  <div class="commit-header">
    <figure class="avatar" @click.prevent.stop="toUser">
      <img class="commit-header-img"  :src="posts.useravatar" ref="img">
      <i :class="posts.iconv" v-if="posts.iconv != ''"></i>
    </figure>
    <div class="commit-title">
      <span class="user-name">{{posts.nickname}}</span>
      <span :class="['grade', `grade${posts.score.level}`]"></span>
      <img class="owner-floor" :src="ownerImg" v-if="posts.islouzhu">
    </div>
    <span class="commit-floor">{{posts.floor}}</span>
  </div>
</template>
<script>
export default {
  props: ['posts'],
  data: () => ({
    ownerImg: 'https://s.kcimg.cn/bbs/images/app/new-floor.png'
  }),
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.posts.useravatar = `https://i.kcimg.cn/data/avatar/noavatar_middle.gif-50x50.jpg`
    }
  },
  computed: {
    ownerUid () {
      return window.uid
    }
  },
  methods: {
    toUser () {
      this.$emit('toUser', this.posts.authorid)
    }
  }
}
</script>
<style scoped>
  .commit-header .avatar{
    position: absolute;
    left: 0px;
    top: 12px;
    width: 32px;
    height: 32px;
  }
  .commit-header .commit-header-img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
  }
  .commit-title{
    flex: 1;
    margin-right: 10px;
    color: #143966;
    display: flex;
    flex-direction: row;
    line-height: 16px;
  }
  .user-name{
    max-width: 140px;
    font-size: 14px;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #5981B3;
  }
  @media screen and (max-width:320px){
    .user-name{
	    max-width: 100px;
      font-size: 14px;
      line-height: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #5981B3;
	  }
  }
  .owner-floor{
    width: 28px;
    height: 14px;
    vertical-align: middle;
    margin-left: 4px;
    font-size: 0;
    overflow: hidden;
  }
  .commit-floor{
    width: 50px;
    text-align: right;
    font-size: 12px;
    color: #A1A9B3;
    line-height: 12px;
    opacity: 0.6;
  }
</style>
