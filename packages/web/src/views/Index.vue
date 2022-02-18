<template>
  <div>
    <h1>Home</h1>
    <router-link to="/login">Login</router-link>
    <div>
      <button @click="handleGet">GET</button>
      <button @click="handlePost">POST</button>
      <button @click="handlePut">PUT</button>
      <button @click="handleDelete">DELETE</button>
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
      5000,
      true
    )
    this.$doTask(() => {
      console.log('doTask doTask')
    }, 1000)
  }
}
</script>
