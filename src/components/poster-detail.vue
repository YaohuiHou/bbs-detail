<template>
  <div class="wrapper-content">
    <poster-top :thread="detailData" @toUser="toUser"></poster-top>
    <span class="best" v-if="detailData.digest == '1'"></span>
    <!-- 关联商品 -->
    <div class="goodes-product" @click="gotoLink(goodesProduct.murl)" v-if="goodesProduct.murl">
      <figure>
        <img :src="goodesProduct.img" />
      </figure>
      <div class="goods-detail">
        <p>{{goodesProduct.productname}}</p>
        <!-- 价格 -->
        <span class="goods-price">{{goodesProduct.price}}</span>
        <!-- 按钮 -->
        <em class="buy-goods">去购买</em>
      </div>
    </div>
    <div class="article" v-html="detailData.message"></div>

    <div class="sum-up-comment" v-if="detailData.comment.length">
      <header>总结与点评<span>该功能仅"管理员"、"楼主"可用</span></header>
      <ul class="sum-up-list">
        <li v-for="item in detailData.comment">
          <card-list :comment="item"></card-list>
        </li>
      </ul>
    </div>

    <div class="admin">
      <span class="messge" v-if="uid && uid!='0'" @click="message"></span>
      <span class="reply" @click="comment">回复</span>
    </div>
  </div>
</template>

<script>
import PosterTop from './poster-detail/poster-top.vue'
import CardList from './poster-detail/card-list.vue'
export default {
  props: ['detailData','goodesProduct'],
  data () {
    return {
      uid:''
    }
  },
  computed: {
    action () { return this.$store.state.actionSheet }
  },
  components :{
    PosterTop,
    CardList
  },
  mounted (){
    let wrapper_content = document.querySelector('.wrapper-content')
    this.setupImageWrapSiz(wrapper_content,window.innerWidth-32)
  },
  created () {
    this.uid = window.uid
    console.log(this.goodesProduct)
  },
  methods: {
    toUser (e) {
      this.$emit('toUser', e)
    },
    message () {
      let data = {
        detail: this.detailData
      }
      this.$store.dispatch('Setaction', data)
      let json = {
        type: 'pull',
        pid: this.detailData.pid,
        dataType: this.detailData.threadMessage.dataType
      }
      this.$emit('message', json)
    },
    comment () {
      let json = {
        type: 'pull',
        tid: this.detailData.tid,
        pid: this.detailData.pid
      }
      this.$emit('comment', json)
    },
    // 打开连接
    gotoLink(url){
        if(/360CHE/i.test(navigator.userAgent)){      // 判断是否在app
            this.callNativeMethod('onOpenCommonWeb', {
              url:url,
              title:'配件商城'
            })
        }else{
            window.open(url)
        }

    }
  }
}
</script>
<style scoped>
  .goodes-product{
    padding: 12px;
    background: rgba(245,245,245,0.70);
    border-radius: 2px;
    position: relative;
    display: flex;
    margin-bottom: 8px;
  }
  .goodes-product figure{
    width: 96px;
    vertical-align: top;
  }
  .goodes-product figure img{
    width: 100%;
  }
  .goods-detail{
    padding-left: 8px;
    padding-bottom: 26px;
    position: relative;
  }
  .goodes-product p{
    font-size: 14px;
    line-height: 22px;
    color: #17181A;
  }
  .goods-price{
    position: absolute;
    left: 8px;
    bottom: 0;
    color: #F44336;
    font-size: 16px;
    line-height: 16px;
  }
  .buy-goods{
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(-18deg, rgba(28,124,241,.1), rgba(33,152,239,.1));
    border-radius: 4px;
    width: 70px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #1571E5;
    font-size: 14px;
  }
  .article{
    word-break: break-all;
    color: #17181A;
  }
  .best{
    position: absolute;
    right: -32px;
    top: 0;
    width: 80px;
    height: 80px;
    background: url(data:image/png;base64,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) no-repeat 50% 50%;
    background-size: 80px 80px;
    z-index: 100;
  }
  .admin{
    height: 44px;
    line-height: 44px;
  }
  .admin span{
    text-align: center;
    float: right;
    min-width: 44px;
    color: #A1A9B3;
    font-size: 14px;
  }
  .admin .reply{
    margin-left: 16px;
  }
  .admin .reply:before{
    content: "\E695";
    margin-right: 4px;
    font-family: 'bbs';
    vertical-align: middle;
  }
  .admin .messge{
    margin-right: -16px;
  }
  .admin .messge:before{
    font-family: 'bbs';
    content: '\e699';
    font-size: 12px;
    line-height: 12px;
  }
  .sum-up-comment >header{
    background: #405C80;
    border-radius: 3px 3px 0 0;
    padding: 0 8px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #fff;
    margin-top: 8px;
  }
  .sum-up-comment >header span{
    font-size: 12px;
    float: right;
  }
  .sum-up-list{
    border-top:none;
    border: 1px solid #CFD8E6;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    padding: 0 8px;
  }
  .sum-up-list li{
    position: relative
  }
  .sum-up-list li:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .sum-up-list li:last-child:after{
    border: none;
  }
</style>
