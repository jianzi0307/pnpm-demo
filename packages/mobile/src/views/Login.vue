<template>
  <div class="login">
    <div class="login-box">
      <h1>Login</h1>

      <div>appendParams</div>
      <div>{{ msg }}</div>

      <div>
        <router-link to="/">Home</router-link>
      </div>

      <div>
        <div @click="handleClick">gif打点测试</div>
      </div>
    </div>
  </div>
</template>

<script>
import { appendParams } from "@alanojs/tools";

export default {
  name: "Login",
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    this.msg = appendParams("http://localhost:7003/beacon", {
      a: 1,
      b: "hi",
      c: ["bbb", "ddd"],
    });

    // console.log(UriUtil.getQueryString("a"), "<<< getQueryString");

    // console.log(
    //   UriUtil.getUrlParams("http://www.google.com/go/go/?a=293&b=name", "b"),
    //   "<<<<<<<<<<<<<<<<<< getUrlParams"
    // );

    this.$doTask(() => {
      console.log("loginTimerloginTimerloginTimerloginTimerloginTimer");
    }, 1000);
  },
  methods: {
    reportData1(url, data) {
      let img = document.createElement("img");
      const params = [];
      Object.keys(data).forEach((key) => {
        params.push(`${key}=${encodeURIComponent(data[key])}`);
      });
      img.onload = () => (img = null);
      img.src = `${url}?${params.join("&")}`;
    },
    reportData(url, data) {
      // const formData = new FormData();
      // Object.keys(data).forEach((key) => {
      //   let value = data[key];
      //   if (typeof value !== "string") {
      //     // formData只能append string 或 Blob
      //     value = JSON.stringify(value);
      //   }
      //   formData.append(key, value);
      // });
      navigator.sendBeacon(url, JSON.stringify(data));
    },
    handleClick(e) {
      console.log(e, "<<<<e");
      const url = "http://localhost:7003/beacon";
      const data = {
        test: 100,
        t: new Date().getTime(),
        na: "asfasfd",
        r: Math.random(),
      };
      this.reportData(url, data);
      // navigator.sendBeacon(url, JSON.stringify(data))
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0;
  overflow: hidden;
  background-color: black;
  color: white;
  height: 100%;
  
  display:flex;
  justify-content: center;
  align-items: center;
  &-box {
    background-color: #121212;
    padding: 20px;
    height: 200px;
    width: 400px;
    font-size: 18px !important;
  }
}
</style>
