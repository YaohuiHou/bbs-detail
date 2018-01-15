<template>
  <div class="wrapper">
    <div class="wrapper-box">
      <transition name="fade">
        <set-layload v-if="firstDetail == '' && page=='1'" class="layeload"></set-layload>
      </transition>
      <null v-if="status == 'err'"></null>
      <div v-if="firstDetail== 'ok' && page=='1'">
        <poster-header :headerData="postheaderdata" @postHeader="postHeader"></poster-header>
        <poster-detail 
          :detailData="postdetaildata" 
          @toUser="toUser" 
          @comment="comment" 
          @message="message" 
          v-if="postdetaildata.comment"
          :goodesProduct="goodesProduct"
        ></poster-detail>
        <comment-hot :hotData="commentHot" @toUser="toUser" @footerAction="footerAction" @toFloor="toFloor" v-if="commentHot.length"></comment-hot>
      </div>
    </div>
    <!-- 评论区 -->
    <comment-all 
      :page="page"
      :allData='commentAlldata' 
      :post='posts' 
      @toUser="toUser" 
      @toFloor="toFloor" 
      @footerAction="footerAction" 
      v-if="status=='ok'"></comment-all>
  </div>
</template>

<script>
import XHR from './api'
import SetLayload from './components/lazload/set-layload.vue'
import PosterHeader from './components/poster-header.vue'
import PosterDetail from './components/poster-detail.vue'
import CommentHot from './components/comment-hot.vue'
import CommentAll from './components/comment-all.vue'
import Null from './components/null.vue'
export default {
  components: {
    PosterHeader,
    PosterDetail,
    CommentHot,
    CommentAll,
    SetLayload,
    Null
  },
  data () {
    return {
      uid: window.uid,
      tid: location.search.match(/tid=(\d+)/)[1],
      page: location.href.match(/page=(\d+)/) ? location.href.match(/page=(\d+)/)[1] : '1',
      postheaderdata:{}, // 头部信息
      headersKeys: ['subject','views', 'replies','isfav'],     // header需要的参数
      detailKeys:['digest', 'message', 'useravatar', 'iconv', 'nickname', 'score', 'medals', 'dateline', 'pid', 'threadMessage', 'tid','authorid'], // 帖子内容
      postdetaildata: {},   // 帖子内容
      commentHot:[],       // 热门回帖
      commentAlldata:{},       //全部回帖
      allKeys:['advert','islast','page'], //全部回帖参数
      scrollId: '',
      status:'',
      posts: [],
      threads: null, // 主贴信息
      dateline: '',  // 发帖时间
      firstDetail:'',
      GaDate:'',   // 统计帖子信息
      // 关联商品
      goodesProduct: {},
      // 百分点值
      bfdObj: null,
      // 百分点数据变化
      nextUpId:0,
      thisUpId:0
    }
  },
  computed: {
    action () { return this.$store.state.actionSheet },
    floorType () { return this.$store.state.floorType }
  },
  created () {
    this.scrollId = this.matchLocation('topid')
    // 获取uid
    this.getUseridFun()
    
    // a链接调取APP跳转
    var timer = setTimeout(() => {
      var links = document.querySelectorAll('.wrapper-content a');
      links.forEach((item,index) =>{
        item.style.display = 'inline-block'
        item.addEventListener('click',e=>{
          e.preventDefault();
          this.callNativeMethod('onOpenCommonWeb', {
            url:item.href,
            title:'卡车之家'
          })
        })
      })
      clearTimeout(timer)
    }, 2e3);
  },
  mounted () {
    this.connectWebViewJavascriptBridge((bridge) => {
      bridge.init(function (message, responseCallback) {
      })
      bridge.registerHandler('onDeleteConfirm', (data, responseCallback)=> {
        let res = data
        if (typeof data =='string') {
          res = JSON.parse(data)
        }
        if (res.type=='1'&&res.action=='comments') {
          this.detelecomment(res)
        }else if (res.type=='2'&&res.action=='comments') {
          location.href="/m/report.php?uid="+window.uid+"&pid="+res.pid;
        }
        if (res.type=='1'&&res.action=='pull') {
          this.pull(res)
        }else if (res.type=='2'&&res.action=='pull') {
          location.href="/m/report.php?uid="+window.uid+"&pid="+res.pid;
        }
      })
      bridge.registerHandler('pullreplay', (data, responseCallback) => {
        let res = JSON.parse(data)
        this.pullreplay(res)
      })
      bridge.registerHandler('onReplyForumFloorSuccess', (data, responseCallback) => {
        let res = data
        if (typeof data =='string') {
          res = JSON.parse(data)
        }
        this.pullreplay(res)
      })
    })
  },
  watch:{
    nextUpId(){
      if(this.thisUpId != 10000){
        var timer = setTimeout(() => {
            this.uploadBFDData()
            clearTimeout(timer)
          }, 300);
      }else{
        return;
      }
    }
  },
  methods: {
    getUseridFun(){ // 获取uid
      var me = this;
      // 获取加密uid
      window.uid = this.getQueryString('uid');
      window.first = Number( this.getQueryString('first') );

      XHR.getUserId(window.host + '/interface/viewthreadnewapi.php?getDecodeUid=1&uid=' + window.uid).then(res=>{
        window.uid = me.uid = res.data
        if (this.page==='1') {
          // 请求数据
          me.getfirstDetail()
        }
        me.sendPV()  // pv
        me.getData()
        Truckhome_pv({"fid":window.fid});    //根据业务需要传参数
        Truckhome_duration();

      })
      
    },
    getQueryString(name){  // 截取加密串
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        console.log(r)
        if(r!=null)return  unescape(r[2]); return null;
    },
    pullreplay (r) {                       // 更新楼层子回复
      let json = {
        tid: r.data.tid,
        uid: window.uid,
        pid: r.data.threadpid,
        ajaxComment:1
      }
      XHR.updatePull(json).then((res) => {
        if (this.floorType=='hot'){
          this.commentHot[this.action.index].childrencount = res.data.info.childrencount
          this.commentHot[this.action.index].children  = res.data.info.children
        }else{
          this.posts[this.action.index].childrencount = res.data.info.childrencount
          this.posts[this.action.index].children  = res.data.info.children
        }
      })
    },
    sendPV(){
      var UA = navigator.userAgent;
      let pvs = {}
      if ((UA.match(/iphone/gi)) && UA.match(/360che/gi)) {
        pvs.vt = 2
        pvs.channel=12
        pvs.channelpage = 104
      }else if((UA.match(/android/gi)) && UA.match(/360che/gi)){
        pvs.vt = 3
        pvs.channel=13
        pvs.channelpage = 105
      }else{
        pvs.vt = 1
        pvs.channel=6
        pvs.channelpage = 99
      }
      var pvTrack = new PvTrack();
      pvTrack.channel = pvs.channel;
      pvTrack.channelpage = pvs.channelpage;
      pvTrack.vt = pvs.vt
      pvTrack.track();
    },
    postHeader(type){
      if (type == 'onlyFloor') {          // 只看楼主
        if (window.first === 1) {
          this.sendAnalytics('帖子-只看楼主', '帖子-只看楼主', '')
          window.first = 0
        } else {
          window.first = 1
        }
        this.callNativeMethod('onPosterScreenTid', {'first':window.first})
      } else if(type == 'collect'){        // 收藏
        this.callNativeMethod('onColleatScreenTid', {'fav':this.dataInfo.isfav ? 0 : 1})
        if (window.uid === '0' ) return
        if (this.postheaderdata.isfav) {
          this.$set(this.postheaderdata, 'isfav', false)
        }else{
          this.$set(this.postheaderdata, 'isfav', true)
        }
        this.sendAnalytics('收藏帖子', this.GaDate, this.thread.authorid)
      }
    },
    toUser(uid){                // 跳转个人中心
      this.callNativeMethod('memberinfo', {'uid': uid})
    },
    toFloor (json) {              // 跳转到楼中楼
      if (this.floorType=='hot') return
      this.callNativeMethod('onToForumFloor', {
        'url': window.location.origin + json.doubledeckurl,
        'floorName': json.floor
      })
    },
    matchLocation (name) {
      let reg = new RegExp(`${name}=\\d+`, 'g');
      let result = location.href.match(reg);

      if (!result) return;
      let final = result[0].match(/\d+/);

      return result ? final[0] : false;
    },
    message (json) {           // 帖子管理
    let type = json.dataType.toString()
     this.callNativeMethod('onShowDeleteDialog', {
        'type': type, // 1删除，2举报
        'pid': json.pid, // 举报用
        'action': json.type
      })
    },
    comment (json) {             // 帖子回复
      if (json.type=='pull') {
        this.callNativeMethod('reply', {'param': `${json.tid}:${json.pid}:123`})
      }
    },
    footerAction(json){                // 评论 点赞 回复 管理功能
      if (json.type=="comment") {
        this.savaGaAction()
        var UA = navigator.userAgent;
        if (Number(UA.match(/360CHE\/(.+)\s/)[1].replace(/\./g, '').substr(0, 3)) >= 616) {
          this.callNativeMethod('onReplyForumFloor', {  // 评论回复不跳转楼中楼
            'replypid': json.posts.pid,
            'pid': json.posts.pid,
            'author': json.posts.author,
            'tid': json.posts.tid
          })
        } else {
          this.callNativeMethod('onToForumFloor', {
            'url': window.location.origin + json.posts.doubledeckurl+'&source=replay',
            'floorName': json.posts.floor
          })
        }
        this.sendAnalytics('点击回复帖子', this.GaDate, '回复楼层')
      }else if (json.type == "message"){
        let types = json.posts.postMessage.dataType.toString()
        this.callNativeMethod('onShowDeleteDialog', {
          'type': types, // 1删除，2举报
          'pid': json.posts.pid, // 举报用
          'action': 'comments'
        })
      }else if(json.type == "liked"){
        this.savaGaAction()
        if (json.posts.id) {
          this.callNativeMethod('onToast', {message: '您已赞过'})
        } else {
          let recommendData = {
            action: 'recommend',
            uid: window.uid ? window.uid : '',
            tid: json.posts.tid,
            pid: json.posts.pid,
            operation: 'add'
          }
          XHR.recommendAction(recommendData).then((res) => {
            if (res.data.status === 0) {
              json.posts.recommend_count =  res.data.data.recommend_add
              if (json.likedType=='hot') {
                this.$set(this.commentHot[json.index], 'liked', true)
                this.$set(this.commentHot[json.index], 'recommend_count', res.data.data.recommend_add)
              }else if(json.likedType=='all'){
                this.$set(this.posts[json.index], 'liked', true)
                this.$set(this.posts[json.index], 'recommend_count', res.data.data.recommend_add)
              }
            } else {
              this.callNativeMethod('onToast', {message: res.data.data})
            }
          })
        }
        this.sendAnalytics('帖子-回帖点赞', this.GaDate, '楼层点赞')
      }
    },
    savaGaAction () {                // ga统计变量
      let time = this.dateline               // 设置发帖日期
      let post_data = time.substring(0, 10);      // 获取发帖日期
      let post_time = time.substring(11, 16);      // 获取发帖日期
      let tid = location.href.match(/tid=(\d+)/)[1]
      this.GaDate = post_data+'|'+post_time+'|'+document.title+'|'+tid
      if (localStorage.getItem('GaAction')) {
        localStorage.removeItem('GaAction')
      }
      localStorage.setItem('GaAction', this.GaDate)
    },
    pull (re) {                      // 删除帖子
      let json = {
        action:'member',
        method:'deletePost',
        tid:this.action.detail.tid,
        pid:re.pid,
        uid:window.uid,
        token:this.action.detail.threadMessage.token
      }
      XHR.deleteComment(json).then((res) => {
        if (res.data.status===0) {
          this.callNativeMethod('onDeletePullSuccess', {})
          this.callNativeMethod('back2list', {})
        } else {
          this.callNativeMethod('onToast', {message: res.data.data})
        }
      })
    },
    detelecomment (re) {                 // 删除回复
      let detail = this.action.detail
      let json = {
        action: 'member',
        method: 'deletePost',
        tid: detail.tid,
        pid: re.pid,
        uid: window.uid,
        token: detail.postMessage.token
      }
      XHR.deleteComment(json).then((res) => {
        if (res.data.status===0) {
          this.callNativeMethod('onDeleteCommentSuccess', {status:"1"})
          this.action.bbs.splice(this.action.index, 1)
          if (this.action.bbs.length === 0) {
            this.$set(this.commentAlldata, 'islast', false)
          }
        } else {
          this.callNativeMethod('onToast', {message: res.data.data})
        }
      }).catch((res) => {
        console.log(res, 'error')
      })
    },
    getData () {        // 请求全部评论
      let json = {
        uid: this.uid,
        tid: this.tid,
        page: this.page,
        first: window.first
      }
      XHR.getRequest(json).then(res=> {
        this.status = res.data.status
        if(res.data.status === 'err') return
        this.dataInfo = res.data.info
        this.postdetaildata['comment'] = this.dataInfo.comment
        this.commentHot = this.dataInfo.hotposts
        this.commentAlldata = this.transformJson(this.allKeys,this.dataInfo)
        if ( this.page==='1' ) {
          this.commentAlldata['page'] = true
        }
        if (this.page !=='1') {
          this.commentAlldata['advert'] = false
        }
        this.posts = res.data.info.posts
        this.$nextTick(() => {

          let link = document.getElementById('link_url')
          link && link.addEventListener('click', () => {
            this.callNativeMethod('gourl', {'param': this.threads.linkinfo.linkurl})
          })
          this.adView()
          if (document.querySelector('.all-comment')) {
            this.setupImageWrapSiz(document.querySelector('.all-comment'),window.innerWidth-72)
          }
          setTimeout(()=>{
            let Scroll = this.$children[0].$refs[`pid${this.scrollId}`]
            if (!Scroll) return window.scroll(0, 0)
            let Height = Scroll[0].offsetTop
            this.scrollId ? window.scroll(0, Height) : window.scroll(0, 0)
          }, 500)
        })
      }).catch((res) => {
        console.log(res, 'error')
      })
    },
    getfirstDetail () {     // 请求第一页帖子内容
      let json = {
          uid: this.uid,
          tid: this.tid,
          mainthread: 1
      }
      XHR.getDetail(json).then((res) => {
          this.firstDetail = res.data.status
          if(res.data.status === 'err') return

          this.threads = res.data.info.thread
          this.dateline = this.threads.dateline ? this.threads.dateline : ''
          this.postheaderdata = this.transformJson(this.headersKeys,res.data.info.thread)
          this.postdetaildata = this.transformJson(this.detailKeys,res.data.info.thread,this.postdetaildata)

          // this.postheaderdata = res.data.info.thread
          // this.postdetaildata = res.data.info.thread

          this.postheaderdata['isfav']=res.data.info.isfav

          // 百分点传值
          this.bfdObj = res.data.info.bfd
          this.$nextTick(() => {
            if(/360CHE/i.test(navigator.userAgent)){ 
                var timer = setTimeout(() => {
                this.nextUpId = 1
                this.callNativeMethod('onUploadBFDData',res.data.info.bfd)
                this.thisUpId = 10000
                clearTimeout(timer)
              }, 300);
            }
          })
          
          // 获取商品信息
          if(res.data.info.thread.productid){
            this.getProduct(res.data.info.thread.productid)
          }

      }).catch((res) => {
        alert('error')
        console.log(res, 'error')
      })
    },
    // 百分点
    uploadBFDData(){
      this.nextUpId += 1;
      this.callNativeMethod('onUploadBFDData',this.bfdObj)
      this.thisUpId = 10000
    },
    // 关联商品
    getProduct(id){
      XHR.getProduct( {productid:id} ).then((res)=>{
        if(res.data.status == 0){
          this.goodesProduct = res.data
          // this.$set(this,'goodesProduct',res)
        }
      }).catch((res) => {
      })
    }
  }
}
</script>

<style scoped>
@import "./public/reset.css";
@import "./public/common.css";
@font-face {
  font-family: 'bbs';  /* project id 384510 */
  src: url('//at.alicdn.com/t/font_384510_9keoew88bjjg7gb9.eot');
  src: url('//at.alicdn.com/t/font_384510_9keoew88bjjg7gb9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_384510_9keoew88bjjg7gb9.woff') format('woff'),
  url('//at.alicdn.com/t/font_384510_9keoew88bjjg7gb9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_384510_9keoew88bjjg7gb9.svg#iconfont') format('svg');
}

  .wrapper{
    overflow: hidden;
  }
  .wrapper-box{
    padding: 0 16px;
  }
  .wrapper-content{
    position: relative;
  }
  .article p{
    font-size: 16px;
    color: #17181A;
    letter-spacing: 0;
    line-height: 24px;
  }
  .sum-up-list li:last-child:after{
    border: none;
  }

  .all-comment li:last-child .commit:after,.hot-comment li:last-child .commit:after{
    border: none;
  }

</style>
<style>
  /*插入的广告*/
  .page-ads{
    position: relative;
    padding: 12px 0px 12px 40px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .page-ads:after{
    content: " ";
    position: absolute;
    left: 40px;
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
  .page-ads .header{
    display: flex;
    flex-direction: row;
  }
  .page-ads .header figure{
    position: absolute;
    left: 0px;
    top: 12px;
    width: 32px;
    height: 32px;
  }
  .page-ads .header figure img, .content figure img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .page-ads .header .ad-img{
    position: absolute;
    width: 28px;
    height: 12px;
    top: 12px;
    right: 0;
  }
  .page-ads .title{
    flex: 1;
    font-size: 14px;
    color: #5981B3;
    line-height: 14px;
  }
  .page-ads .content{
    margin-top: 8px;
    display: flex;
    flex-direction: column;
  }
  .page-ads .content h4{
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
  }
  .page-ads .content h4 .look-detail{
    display: inline-block;
    font-size: 16px;
    color: #1571E5;
  }
  .page-ads .content h4 .look-detail:before{
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 11px;
    margin-left: 6px;
    margin-right: 4px;
    content: "";
    background: url('https://s.kcimg.cn/app/images/link_2x.png') 50% 50% no-repeat;
    background-size: cover;
  }
  .page-ads .content figure{
    margin-top: 8px;
    width: 100%;
  }
  /*视频*/
  .video{
    width: 100%;
    min-height:initial;
  }
  .video video{
    width: 100%;
  }
  /*链接地址*/
  .to-url{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
    margin: 8px auto;
    background: #F7F7F7;
  }
  .to-url p{
    flex: 1;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 47px;
    -webkit-box-pack: center;
    word-break: break-all;
    font-size: 14px;
  }
  .to-url figure{
    width: 52px;
    height: 47px;
    margin-right: 8px;
  }
  .to-url figure img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
.layeload{
  position:fixed;
  left:0px;
  right:0px;
  top:0;
  z-index:101;
  height:100%;
  padding: 0 16px;
  background:#fff;
  box-sizing: border-box;
}
.fade-enter-active, .fade-leave-active {
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
</style>
