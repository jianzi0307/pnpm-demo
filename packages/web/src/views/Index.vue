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
      1000,
      true
    );
  },
  methods: {
    async handleGet() {
      const [error, res] = await this.$http.get("geoJson");
      if (error) {
        console.log(error);
        return;
      }
      console.log(res, "<<<get响应结果");
    },
    async handlePost() {
      const [error, res] = await this.$http.post("geoJson", { a: 2 });
      if (error) {
        console.log(error);
        return;
      }
      console.log(res, "<<<post响应结果");
    },
    async handlePut() {
      const [error, res] = await this.$http.put("geoJson", { a: 1 });
      if (error) {
        console.log(error);
        return;
      }
      console.log(res, "<<<put响应结果");
    },
    async handleDelete() {
      const [error, res] = await this.$http.del("geoJson");
      if (error) {
        console.log(error);
        return;
      }
      console.log(res, "<<<delete响应结果");
    },
  },
};
</script>
