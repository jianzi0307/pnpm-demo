import {
  setRequestInterval,
  setRequestTimeout,
  clearRequestInterval,
  clearRequestTimeout,
} from "./timer";

class TimerManager {
  constructor() {
    this._intervalIds = new Map();
  }

  /**
   * 创建一个分组
   * @param {string} groupId 分组ID
   * @param {number} delay 延时
   */
  createTimerGroup(groupId, delay) {
    const groupKey = `${groupId}-group`;
    const timerId = setRequestInterval(() => {
      const hasCallbacks = this._callbacks.has(groupKey);
      if (!hasCallbacks) {
        this._callbacks.set(groupKey, []);
      }
      const callbacks = this._callbacks.get(groupKey);
      callbacks.forEach((cb) => {
        cb();
      });
    }, delay);
    this._intervalIds.set(groupId, timerId);
  }

  /**
   * 将回调函数添加到组
   * @param {*} groupId
   * @param {*} callback
   * @returns
   */
  addToGroup(groupId, callback) {
    const groupKey = `${groupId}-group`;
    if (!this._callbacks.has(groupKey)) {
      return;
    }
    const callbacks = this._callbacks.get(groupKey);
    callbacks.push(callback);
  }

  /**
   * 添加timer
   * @param {string} key
   * @param {Function} callback 回调
   * @param {number} delay 延迟时间（毫秒）
   * @param {boolean} immediately 是否先执行，默认false
   */
  addTimer(key, callback, delay, immediately = false) {
    if (this._intervalIds.has(key)) {
      clearRequestInterval(this._intervalIds.get(key));
      this._intervalIds.delete(key);
    }
    const imInvokeFunc = () => {
      callback();
      return imInvokeFunc;
    };
    const func = immediately ? imInvokeFunc() : callback;
    const timerId = setRequestInterval(func, delay);
    this._intervalIds.set(key, timerId);

    console.log("[timerManager] addTimer -> ", key);
  }

  /**
   * 移除timer
   * @param {string} key
   */
  removeTimer(key) {
    if (!this._intervalIds.has(key)) return;
    const timerId = this._intervalIds.get(key);

    console.log("[timerManager] removeTimer -> ", key);

    clearRequestInterval(timerId);
    this._intervalIds.delete(key);
  }

  /**
   * 延迟执行一次，相当于setTimeout
   * @param {Function} callback 回调
   * @param {number} delay 延迟时间，毫秒
   */
  doOnce(callback, delay) {
    const timerId = setRequestTimeout(() => {
      clearRequestTimeout(timerId);
      callback();
    }, delay);
  }

  /**
   * 获取所有的timer
   */
  getAllTimers() {
    return this._intervalIds;
  }

  /**
   * 清除所有的timer
   */
  clear() {
    this._intervalIds.forEach((value, key, map) => {
      console.log(map, "<<<<<<");
      this.removeTimer(key);
    });
  }
}

export default TimerManager;
