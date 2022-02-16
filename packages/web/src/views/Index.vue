<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">Login</router-link>
    <div>
      <button @click="handleClick">发请求</button>
    </div>
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
  },
  methods: {
    async handleClick() {
      const [error, res] = await this.$http.get("restaurants");
      if (error) {
        console.log(error);
        return;
      }
      console.log(res, "响应结果");
    },
  },
};
</script>
