timer 管理器，在项目中更好的使用 setInterval 和 setTimeout

# 安装

- 使用 npm:

```
npm i @alanojs/timer
```

- 使用 pnpm:

```
pnpm i @alanojs/timer
```

- 使用 yarn:

```
yarn add @alanojs/timer
```

# 使用示例

**单独使用**

```javascript
import { TimerManager } from "@alanojs/timer";

const timerMgr = new TimerManager();

// 每秒执行一次
timerMgr.addTimer(
  "timer1",
  () => {
    console.log("每秒执行1次");
  },
  1000
);

// 每秒执行一次，立即执行
timerMgr.addTimer(
  "timer1",
  () => {
    console.log("每秒执行1次");
  },
  1000,
  true
);

// 销毁定时器
timerMgr.removeTimer("timer1");

// 延时执行一次
timerMgr.doOnce(() => {
  console.log("延时1秒执行");
}, 1000);

// 分组任务，例如有多个定时任务，均是5秒钟执行一次，它们会使用同一个timer
timerMgr.createTimerGroup("group1", 5000);
timerMgr.addToGroup("group1", () => {
  console.log("任务1");
});
timerMgr.addToGroup("group1", () => {
  console.log("任务2");
});
```

**作为插件在 Vue 组件中使用**

- 常规用法

```javascript
import { default as TimerManager } from "@alanojs/timer";
Vue.use(TimerManager);
```

```javascript
<template>
  <div>...</div>
</template>

<script>
export default {
  name: 'Demo',
  mounted() {
    // 执行一次
    this.$timerMgr.doOnce(() => {
      console.log('执行一次')
    }, 1000)

    // 每秒执行一次，立即执行
    this.$timerMgr.addTimer(
      'testTimer',
      () => {
       console.log('每秒执行一次，立即执行')
      },
      1000,
      true
    )
  },
  beforeDestory() {
    // 销毁定时器
    this.$timerMgr.removeTimer('testTimer');
  }
}
</script>

```

- 可随组件自动销毁的定时任务

```javascript
import { default as TimerManager } from "@alanojs/timer";
Vue.use(TimerManager);
```

```javascript
<template>
  <div>...</div>
</template>

<script>
export default {
  name: 'Demo',
  mounted() {
    // 创建一个定时任务，随组件销毁，无需手动销毁
    this.$doTask(
      () => {
       console.log('每秒执行一次，立即执行')
      },
      1000,
      true
    )
  }
}
</script>

```
