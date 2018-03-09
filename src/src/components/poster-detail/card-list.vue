<template>
  <div class="article">
    <div class="user-info">
      <figure class="avatar"><img :src="comment.avatar" ref="img"></figure>
      <div class="name">{{comment.author}}</div>
      <span class="time">{{comment.dateline}}</span>
    </div>
    <p v-html="comment.comment"></p>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.posts.useravatar = `https://i.kcimg.cn/data/avatar/noavatar_middle.gif-50x50.jpg`
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.article{
   padding: 8px 0;
}
.user-info{
  display: flex;
  align-items: center;
}
.avatar{
  width: 32px;
  height: 32px;
  position: relative
}
.avatar img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name{
  flex: 1;
  font-size: 14px;
  color: #143966;
  letter-spacing: 0;
  line-height: 14px;
  margin-left: 8px;
}
.time{
  font-size: 12px;
  color: #A1A9B3;
  letter-spacing: 0;
}
.article p{
  font-size: 14px;
  color: #17181A;
  letter-spacing: 0;
  line-height: 18px;
  margin-top: 8px;
  word-break: break-all;
  min-height: 18px;
}
</style>
