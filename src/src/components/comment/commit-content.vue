<template>
  <div class="commit-content">
    <div v-html="posts.message" class="mes"></div>
    <commit-reply @toUser="toUser" v-if="posts.children.length" :replies="posts.children" :childrencount="posts.childrencount"></commit-reply>
  </div>
</template>
<script>
import CommitReply from './commit-reply'
export default {
  props: ['posts'],
  components: {
    CommitReply
  },
  methods: {
    toUser (e) {
      this.$emit('toUser', e)
    }
  }
}
</script>
<style scoped>
  .commit-content{
    padding-top: 6px;
    margin-left: 0;
    font-size: 16px;
    color: #17181A;
    line-height: 24px;
  }
  .mes{
    word-wrap:break-word;
  }
</style>
