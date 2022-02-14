<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.$timerMgr.doOnce(() => {
      console.log('测试111')
    }, 1000)
    console.log(this.$storage, '<<<<<')
    this.$storage.setItem('cccccc', 'cookie expire test', 5000)

    this.$timerMgr.addTimer(
      'testTimer',
      () => {
        console.log(this.$storage.getItem('cccccc'))
      },
      1000,
      true
    )
  }
}
</script>
