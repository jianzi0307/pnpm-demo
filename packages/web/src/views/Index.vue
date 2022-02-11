<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Index",
  mounted() {
    this.$timerMgr.doOnce(() => {
      console.log("测试111");
    }, 1000);
  },
};
</script>
