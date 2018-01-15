<template>
  <div class="article-title">
    <h2 class="title" v-html="headerData.subject"></h2>
    <div class="top-look">
      <span class="look-number">{{headerData.views}}</span>
      <span class="replay-number">{{headerData.replies}}</span>
      <span :class="[first == 1 ? 'onlyed':'','only']" @click="onlyFloor">只看楼主</span>
      <span :class="[headerData.isfav ? 'collected':'','collect']" @click="collect">收藏</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['headerData'],
  data () {
    return {
      first: 0,
      GaDate: ''
    }
  },
  created () {
    this.first = window.first
  },
  methods: {
    collect () {
      this.$emit('postHeader', 'collect')
    },
    onlyFloor () {
      this.$emit('postHeader', 'onlyFloor')
    }
  }
}
</script>
<style scoped>
.article-title{
  position: relative;
}
.article-title:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #EEEEEE;
  color: #EEEEEE;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.title{
  font-size: 20px;
  color: #17181A;
  letter-spacing: 0;
  line-height: 28px;
  padding-top: 16px;
  font-weight: bold;
  word-break: break-all
}
.top-look{
  padding: 8px 0 12px;
  font-size: 12px;
  color: #8A9199;
  height: 24px;
  line-height: 24px;
}
.top-look .look-number{
  margin-right: 10px;
}
.top-look .look-number:before{
  background: url('https://s.kcimg.cn/app/images/bbs/detail/look.png');
  background-size:111px 20px;
  margin-right: 4px;
  display:inline-block;
  background-position: -15px -3px;
  content: '';
  width: 16px;
  height: 12px;
}
.top-look .replay-number:before{
  margin-right: 4px;
  background: url('https://s.kcimg.cn/app/images/bbs/detail/look.png');
  background-size:111px 20px;
  display:inline-block;
  background-position: -85px -5px;
  content: '';
  width: 16px;
  height: 12px;
  vertical-align: middle;
}
.collect{
  display: inline-block;
  float: right;
  width: 63px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border: 1px solid #A1A9B3;
  border-radius: 2px;
  font-size: 12px;
  margin-right: 16px;
}
.collect:before{
  content: '\e69b';
  font-family: 'bbs';
  margin-right: 5px;
}
.collected:before{
  content: '\e697';
}
.collected,.onlyed{
  background: #1571E5;
  color: #fff;
  border: none;
  height: 24px;
  line-height: 24px;
}
.only{
  width: 75px;
  float: right;
  display: inline-block;
  height: 22px;
  line-height: 22px;
  border: 1px solid #A1A9B3;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
}
.only:before{
  content: '\e69c';
  font-family: 'bbs';
  margin-right: 5px;
}
</style>
