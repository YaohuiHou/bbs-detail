<template>
  <ul :class="childrencount > 3 ? 'reply' : 'reply-less'">
    <li class="content" v-for="(item, index) in replies">
      <span class="reply-name" @click.prevent.stop="jumpToOwnCenter(item.authorid)">
        {{item.nickname}}
      </span>
      <i class="parentiduser" v-if="item.parentiduser">
        回复
      </i>
      <span v-if="item.parentiduser" class="reply-name" @click.prevent.stop="jumpToOtherCenter(item.parentiduser.authorid)">
        {{item.parentiduser['nickname']}}
      </span>:
      <span class="reply-content" v-html="item.message"></span>
    </li>
    <div class="total" v-if="childrencount > 3">
      共{{childrencount}}条回复&nbsp>
    </div>
  </ul>
</template>
<script>
export default {
  props: ['replies', 'childrencount'],
  data: () => ({

  }),
  methods: {
    jumpToOwnCenter (id) {
      this.$emit('toUser', id)
    },
    jumpToOtherCenter (id) {
      this.$emit('toUser', id)
    },
  }
}
</script>
<style scoped>
  .reply-less{
    position: relative;
    margin-top: 8px;
    padding: 12px 12px 6px;
    background: #F3F4F5;
    border-radius: 2px;
    margin-bottom: 4px;
  }
  .reply{
    position: relative;
    margin-top: 11px;
    padding: 8px 16px 6px;
    background: #F3F4F5;
    border-radius: 2px;
    margin-bottom: 4px;
  }
  .reply:before, .reply-less:before{
    content:'';
    position:absolute;
    left: 10px;
    top:-2px;
    width:4px;
    height:4px;
    background-color:#F3F4F5;
    border-bottom:solid 1px #F3F4F5;
    border-right:solid 1px #F3F4F5;
    transform:rotate(135deg);
  }
  .content{
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .content span{
    vertical-align: middle;
    color: #5C6066;
  }
  .content span.reply-name{
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    color: #5981B3;
  }
  .parentiduser{
    vertical-align: middle;
    color: #5C6066;
  }
  .total{
    font-size: 14px;
    color: #1571E5;
    height: 30px;
    line-height: 30px;
    margin-bottom: 2px;
  }
</style>
