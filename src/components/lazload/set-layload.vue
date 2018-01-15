<template>
<div>
  <div class="article-title">
    <h2 class="title"></h2>
    <span class="two-title"></span>  
    <div class="top-look">
      <span class="left"></span>
      <span class="left"></span>
      <span class="right"></span>
      <span class="right"></span>
    </div>
  </div>
  <div class="article-header">
    <figure class="avatar"></figure>
    <div class="content">
      <span class="name"></span>
      <span class="time"></span> 
    </div>
  </div>
  <div class="article">
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
    <span class="line" v-for="i in 6"></span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped>
.article-title{
  position: relative;
  padding-top: 16px;
  padding-bottom: 10px;
}
.title,.two-title{
  width: 100%;
  height: 24px;
  background: #f3f4f5;
}
.two-title{
  width: 50%;
  display: block;
  margin-top: 10px;
}
.top-look{
  padding: 8px 0 12px;
  line-height: 24px;
}
.top-look span{
  background: #f3f4f5;
  display: inline-block;
  margin-right: 5px;
}
.top-look .left{
  height: 16px;
  width: 15%;
  vertical-align: bottom;
}
.top-look .right{
  height: 24px;
  width: 25%;
  float: right;
}
.article-header{
  position: relative;
  display: flex;
  margin:5px 0;
}
.avatar{
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f3f4f5;
  margin-right:10px;
}
.content{
  flex:1
}
.comment h5{
  height: 14px;
  background: #f3f4f5;
  margin:5px 0;
}
.content span{
  height: 14px;
  background: #f3f4f5;
  display: block;
}
.name{
  width: 60%;
  margin-bottom:6px;
}
.article{
  padding: 10px 0;
}
.line{
  display: block;
  height: 14px;
  background: #f3f4f5;
  margin:10px 0;
  width: 100%;
}
.line:nth-of-type(1){
  width: 50%;
}
.line:nth-of-type(2){
  width: 65%;
}
.line:nth-of-type(3){
  width: 80%;
}
.line:nth-of-type(5){
 opacity: 0.5;
}
.line:nth-of-type(6){
 opacity: 0.4;
}
.line:nth-of-type(7){
 opacity: 0.3;
}
.line:nth-of-type(8){
  opacity: 0.2;
}
.line:nth-of-type(9){
  opacity: 0.1;
}
</style>
