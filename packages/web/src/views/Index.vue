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
    // timerMgr.doOnce()
    this.$timerMgr.doOnce(() => {
      console.log("timerMgr.doOnce()");
    }, 1000);

    // storage
    this.$storage.setItem("storageKey", "cookie 过期测试", 5000);
    this.$createTimer(
      "testTimer",
      () => {
        console.log(this.$storage.getItem("storageKey"));
      },
      1000,
      true
    );

    // net
    this.$http
      .get("login")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
};
</script>
