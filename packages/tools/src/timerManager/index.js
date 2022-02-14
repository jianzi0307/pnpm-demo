import { default as TimerManager } from "./manager";

const install = (Vue) => {
  // 注入定时器管理器
  Vue.prototype.$timerMgr = new TimerManager();

  // 添加实例方法，可以创建一个随组件销毁的定时器
  Vue.prototype.$createTimer = function (
    key,
    callback = () => { },
    interval = 1000,
    immediately = true
  ) {
    this.$timerMgr.addTimer(key, callback, interval, immediately);
    this.$once("hook:beforeDestroy", () => {
      this.$timerMgr.removeTimer(key);
    });
  };
};

export default {
  install,
};
