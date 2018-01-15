<template>
  <div class="article-header">
    <figure class="avatar" @click="toUser">
      <img :src="avatar" ref="img">
      <i :class="thread.iconv"></i>
    </figure>
    <div class="content">
      <div class="info">
        <span class="name">{{thread.nickname}}</span>
        <span :class="`big-grade big-grade${thread.score.level}`"></span>
        <div v-for="item in thread.medals" class="">
          <img class="badge" src="https://s.kcimg.cn/m/images/bbs/wechat/user/new-rich.png" v-if="item.medalid ==29">
          <img class="first-rich" src="https://s.kcimg.cn/m/images/bbs/wechat/user/new-rich-first.png" alt="" v-if="item.medalid ==30">
          <div class="old-driver" v-if="item.medalid==31">
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
      <div class="info-footer">{{thread.dateline}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['thread'],
  data: () => ({
    avatar:'https://i.kcimg.cn/data/avatar/noavatar_middle.gif-50x50.jpg'
  }),
  created () {
    this.avatar=this.thread.useravatar
  },
  mounted () {  // 默认图片
    this.$refs.img.onerror = () => {
      this.avatar = 'https://i.kcimg.cn/data/avatar/noavatar_middle.gif-50x50.jpg'
    }
  },
  methods: {
    toUser () {
      this.$emit('toUser', this.thread.authorid)
    }
  }
}
</script>
<style scoped>
.article-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 12px;
}
.avatar{
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.avatar img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #E5E5E5;
  object-fit: cover;
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 32px;
}
.info{
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: #143966;
  letter-spacing: 0;
  line-height: 16px;
}
.name{
  max-width: 140px;
  font-size: 14px;
  line-height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #5981B3;
}
@media screen and (max-width:320px){
  .name{
    max-width: 100px;
    font-size: 14px;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #5981B3;
  }
}
.badge,.first-rich{
  width: 14px;
  height: 14px;
  margin-left: 4px;
  font-size: 0;
  overflow: hidden;
}
.content .info-footer{
  font-size: 12px;
  color: #A1A9B3;
  letter-spacing: 0;
  line-height: 12px;
}
.first-rich{
  width: 18px;
  height: 14px;
}
.old-driver{
  width: 14px;
  height: 14px;
  margin-left: 4px;
  display: inline-block;
  position: relative;
}
.old-driver img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.old-driver:after{
    content: "";
    position: absolute;
    bottom: -1px;
    left: -2px;
    width: 17px;
    height: 5px;
    background: url("https://s.kcimg.cn/m/images/bbs/wechat/user/new-driver.png") 50% 50%;
    background-size: cover;
}
</style>
