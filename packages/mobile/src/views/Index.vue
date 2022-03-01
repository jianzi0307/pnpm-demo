<template>
  <div class="index">
    <h1>Home</h1>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Index",
  mounted() {
    // timerMgr.doOnce()
    this.$timerMgr.doOnce(() => {
      console.log("timerMgr.doOnce()");
    }, 1000);

    // storage
    this.$storage.setItem("storageKey", "cookie 过期测试", 5000);
    this.$doTask(
      () => {
        console.log(this.$storage.getItem("storageKey"));
      },
      5000,
      true
    );
    this.$doTask(() => {
      console.log("doTask doTask");
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.index {
  font-size: 18px;
  width: 1920px;
  height: 1080px;
}
</style>
