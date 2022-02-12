<template>
  <div>
    <h1>Login</h1>

    <div>appendParams</div>
    <div>{{ msg }}</div>

    <div>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
import { appendParams } from '@alanojs/tools'

export default {
  name: 'Login',
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    this.msg = appendParams('http://www.baidu.com:8080/', {
      a: 1,
      b: 'hi',
      c: ['bbb', 'ddd']
    })

    // console.log(UriUtil.getQueryString("a"), "<<< getQueryString");

    // console.log(
    //   UriUtil.getUrlParams("http://www.google.com/go/go/?a=293&b=name", "b"),
    //   "<<<<<<<<<<<<<<<<<< getUrlParams"
    // );

    this.$createTimer(
      'loginTimer',
      () => {
        console.log('loginTimerloginTimerloginTimerloginTimerloginTimer')
      },
      1000
    )
  }
}
</script>
