import TimerManager from "./src/manager";

import { genUuid } from "@alanojs/tools";

/**
 * Vue插件支持
 * @param {*} Vue
 */
const install = (Vue) => {
  // 注入定时器管理器
  Vue.prototype.$timerMgr = new TimerManager();

  // 添加实例方法，可以创建一个随组件销毁的定时任务，无需手动销毁
  Vue.prototype.$doTask = function (
    callback = () => { },
    interval = 1000,
    immediately = true
  ) {
    const timerKey = `timer-${genUuid()}`;
    this.$timerMgr.addTimer(timerKey, callback, interval, immediately);
    this.$once("hook:beforeDestroy", () => {
      this.$timerMgr.removeTimer(timerKey);
    });
  };
};

export * from "./src/timer";
export { TimerManager };

export default {
  install,
};
