<template>
  <a :href="posts.doubledeckurl" class="commit" @click.prevent="toFloor">
    <commit-header @toUser="toUser" :posts="bbsComment[index]"></commit-header>
    <commit-content @toUser="toUser" :posts="bbsComment[index]"></commit-content>
    <commit-footer @footerAction="footerAction" :posts="bbsComment[index]" :index="index" :bbsComment="bbsComment"></commit-footer>
  </a>
</template>

<script>
import XHR from '../../api/'
import CommitHeader from './commit-header.vue'
import CommitContent from './commit-content'
import CommitFooter from './commit-footer'
export default {
  props: ['posts', 'index', 'bbsComment'],
  components: {
    CommitHeader,
    CommitContent,
    CommitFooter
  },
  data () {
    return {}
  },
  computed: {
    floorNmuer () { return this.$store.state.floorNmuer }
  },
  mounted () {
  },
  methods: {
    toUser (e) {
      this.$emit('toUser', e)
    },
    toFloor () {
      let json = {
        detail: this.posts,
        index: this.index,
        bbs: this.bbsComment
      }
      this.$store.dispatch('Setaction', json)
      this.$emit('toFloor', this.posts)
    },
    footerAction (e) {
      this.$emit('footerAction', e)
    }
  }
}
</script>
<style scoped>
  .commit{
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 40px;
    padding-top: 12px;
  }
  .commit:after{
    content: " ";
    position: absolute;
    left: 40px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid rgba(23, 24, 26, 0.08);
    color: rgba(23, 24, 26, 0.08);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .commit-header{
    display: flex;
    flex-direction: row;
  }
</style>
