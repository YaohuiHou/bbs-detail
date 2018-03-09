<template>
  <div class="data-null">
	<img src="https://s.kcimg.cn/bbs/images/app/reply-null.1.2.png" alt="">
	<span>暂无回帖，快来抢沙发哟~</span>
</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.data-null{
	text-align: center;
	width: 100%;
	font-size: 14px;
  overflow: hidden;
  padding-bottom: 16px;
}
.data-null img{
	height: 80px;
	margin: 10px auto;
}
.data-null img:after{
	font-size: 'bbs';
	content: 'sdsd'
}
.data-null span{
	display: block;
	color: #999999;
	line-height: 20px;
}
</style>
