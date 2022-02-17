# 安装

- 使用 npm:

```
npm i @alanojs/net
```

- 使用 pnpm:

```
pnpm i @alanojs/net
```

- 使用 yarn:

```
yarn add @alanojs/net
```

# Http 使用示例

- 插件方式

```javascript
import Http from "@alanojs/net";
import { Message } from "element-ui";
import router from "../router";

Vue.use(Http, {
  gateWay: "http://localhost:8080",
  timeout: 5000,
  withCredentials: false,
  // 路由跳转
  router,
  // 提示组件
  toast: Message,
  // 持久化类型：可选localStorage、cookie、sessionStorage
  storageType: "localStorage",
});
```

- 可通过继承方式扩展

```javascript
import { HttpClient } from "@alanojs/net";
import { Message } from "element-ui";
import router from "../router";

class Request extends HttpClient {
  // 覆写配置项
  getOptions() {
    return {
      gateWay: "http://localhost:8080",
      timeout: 5000,
      withCredentials: false,
      // 路由跳转
      router,
      // 提示组件
      toast: Message,
      // 持久化类型：可选localStorage、cookie、sessionStorage
      storageType: "localStorage",
    };
  }

  // 覆写请求拦截器
  requestInterceptor(config) {
    // ...

    if (this._storage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + this._storage.getItem("token");
    }

    // ...

    return config;
  }

  // 覆写响应拦截器
  responseInterceptor(response) {
    const res = response.data;

    // ...

    if (res.code === 200) {
      return res.data;
    }
    if (res.code === 401 && this._toast) {
      this._toast.error("Token失效，请重新登录");
      this._router.push({ name: "login" });
      return;
    }

    // ...

    return Promise.reject(res.msg);
  }
}

Vue.prototype.$http = new Request();
```

# Http 接口

- get(url, params, options)

```javascript
this.$http
  .get("/login", { usename: "xxx", password: "xxxxx" })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- post(url, params, config = null, serialize = true)

> content-type: application/x-www-form-urlencoded

```javascript
this.$http
  .post("/user", { nickname: "张三", gender: "male", age: 24 })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- postJson(url, params, options = null)

> content-type: application/json

```javascript
this.$http
  .postJson("/user", { nickname: "张三", gender: "male", age: 24 })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- postFile(url, params, options = null)

> content-type: multipart/form-data

```javascript
this.$http
  .postFile("/upload", { file: file, businessType: "userAvatar" })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- put(url, params, config = null, serialize = true)

> content-type: application/x-www-form-urlencoded

```javascript
this.$http
  .put("/user/4567320", { age: 18 })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- putJson(url, params, options = null)

> content-type: application/json

```javascript
this.$http
  .putJson("/user/4567320", { age: 18 })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

- del(url, config = null)

```javascript
this.$http
  .del("/file?id=R6AhD4Jw")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```
