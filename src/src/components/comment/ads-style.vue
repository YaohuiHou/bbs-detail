<template>
  <div class="ads">
    <div class="header">
      <figure>
        <img src="https://s.kcimg.cn/bbs/images/app/tau.png" alt="">
      </figure>
      <div class="title">卡车之家</div>
    </div>
    <a :href="advert.url" class="content" @click.prevent="jumpToAd">
      <figure>
        <img :src="advert.img" alt="">
      </figure>
      <div class="details">
        <span class="info">{{info}}</span>
        <div class="inquiry-back">
          <span class="price">{{advert.pirce}}</span>
          <span class="inquiry">询底价</span>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ['advert'],
  data: () => ({
    info: ''
  }),
  created () {
    let str = this.advert.name
    this.info = str.substr(0,30) + '...'
  },
  methods: {
    jumpToAd () {
      this.callNativeMethod('adClick2', {'url': this.advert.url})
    }
  }
}
</script>
<style scoped>
  .ads{
    position: relative;
    padding: 12px 30px 12px 40px;
    display: flex;
    flex-direction: column;
  }
  .header{
    display: flex;
    flex-direction: row;
  }
  .header figure{
    position: absolute;
    left: 0px;
    top: 12px;
    width: 32px;
    height: 32px;
  }
  .content figure{
    position: relative;
    overflow: hidden;
    z-index: 1;
    width: 60px;
    height: 60px;
  }
  .content figure:before{
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: #efefef url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAApBAMAAAD0eAtEAAAAFVBMVEXv7+/R0dHX19fc3Nzp6eng4ODk5OQNpKnjAAACnElEQVRIx9WWTW/bMAyGPVvRuVQan2M16NnOx85O4u2cbPXdHrD8/5+wl6IVWcpQFOipLKCUlB69JSkGzT5nubUvUUBZazfeWRDREPa+Ea0iz0ToEafbj6LUi70pXuEb5w4/+v4XvAM72oWufq8V9G7rkeb2c+4UFNkQo0ZHu8/jR1DrrD5hqe5ut7XeBDW7yQRNy6QQLrPEjoIuvZ+i4dS+6+Ju0aRqJ0vQcMqk3Tpx4lE969DX6NTfBFWVNFrfKsaWt9utTVE5VS4SNHeisILoj6tE1wmrcctcdEjRyqfW0HPOaCGv7bwLdsAmOrD1bbiIqK/5mei7U21o48oSDIG4720keiKxsiDDO8fkhTTz1xSJchkkVxFFwh1o051JOq4QOCNwgwXRi+yMVObYE9FQ4SZ0a1YmVXMKq3vPh1z+nAgtRDZBcxOu1I2UkFJVkU3RisKN46yeMVqQPNLZ7LzmREFUNkhkIxSyqQ1zUTmBChuWjdEiJVcSWXsSLle4HEU2ecNxrg3Ayg/+C0gaGNV83/son32GI1Y33JUT0Ixl30NFtPXvbamh3KqKq6bxvgd3efoVrqdAB5s+3JT5s1/YXEbKpSM5LVAFhTkvdlnf/97hMUnMLa1GhZQEcx4qmWcto1m53q1RWzVNscTcoU1BS+w8ZfINU2HwD/1bNpr+Su2CNl3r0VK+kjXHeGkMur0noGLNKue7gaLJbcHv3aNPvtVrLNi4Aq3I3NEK6OUB7UZRbVN0jx9Br0RAiUyMvhJJrg9ofVaCKuQK9GVL6whd9Q3QFUrwgGYqzhXu/3P9DIo1QTNB8dh5tLDWR7KVcV+4ZtbXNV/AMd6gckLD/ysNxoohvv1kba1sjU9lYVmG38+WA/AGzfOG1/QP24+i/flJ+D4AAAAASUVORK5CYII=) no-repeat 50% 50%;
    -webkit-background-size: 58px 20px;
    background-size: 58px 20px;
    z-index: -1;
  }
  .header figure img, .content figure img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
    object-fit: cover;
  }
  .title{
    flex: 1;
    font-size: 12px;
    color: #143966;
    line-height: 12px;
  }
  .content{
    height: 60px;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .details{
    flex: 1;
    padding: 4px 8px;
    background: #f7f7f7;
  }
  .info{
    display: block;
    height: 32px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 12px;
    color: #17181A;
    line-height: 16px;
  }
  .inquiry-back{
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    height: 16px;
  }
  .price{
    flex: 1;
    font-size: 12px;
    color: #F44336;
    line-height: 15px;
  }
  .inquiry{
    width: 38px;
    height: 14px;
    padding: 0 3px;
    border: 1px solid #FF6600;
    border-radius: 2px;
    font-size: 12px;
    color: #FF6600;
    line-height: 14px;
  }
</style>
