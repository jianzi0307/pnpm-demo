const noop = () => null;

class WsClient {
  constructor(options = {}) {
    const {
      wsUrl = "",
      callbackMap = {
        onMessage: () => { },
        onOpen: () => { },
        onError: () => { },
        onClose: () => { },
      },
    } = options;
    this._wsUrl = wsUrl;
    // 心跳间隔
    this._heartbeatCheckTimeout = 5000;
    // 心跳定时器
    this._heartbeatCheckTimerId = null;
    // 回调
    this._callbackMap = callbackMap;
    // 连接中
    this._isConnecting = false;
    // 重连定时器
    this._retryTimerId = null;
    // 消息回调
    this._callbacks = new Map();
    this.init();
  }

  init() {
    this.reset();

    this._socket = new WebSocket(this._wsUrl);
    this._socket.onopen = (evt) => {
      this.handleOpen(evt);
    };
    this._socket.onclose = () => {
      this.handleClose();
    };
    this._socket.onerror = (err) => {
      this.handleError(err);
    };
    this._socket.onmessage = (evt) => {
      this.handleMessage(evt);
    };
  }

  /**
   * 发送消息
   * @param {string} action 消息名称
   * @param {object} data 数据
   */
  sendMessage(action, data) {
    this._socket.send(JSON.stringify({ action, ...data }))
  }

  /**
   * 消息订阅
   * @param {string} action 消息名称
   * @param {Function} callback 回调函数
   */
  subscribe(action, callback = noop) {
    this.unSubscribe(action);
    this._callbacks.set(action, callback);
  }

  /**
   * 取消订阅
   * @param {string} action 消息名称
   */
  unSubscribe(action) {
    if (this._callbacks.has(action)) {
      this._callbacks.delete(action);
    }
  }

  // 重置心跳
  resetHeartbeat() {
    if (this._heartbeatCheckTimeout) {
      clearTimeout(this._heartbeatCheckTimerId);
    }
    this.startHeartbeat();
  }

  // 开启心跳
  startHeartbeat() {
    this._heartbeatCheckTimerId = setTimeout(() => {
      this.sendMessage({ heart: "ping" })
      console.log("heartbeat ping======>");
    }, this._heartbeatCheckTimeout);
  }

  reconnect() {
    if (this._isConnecting) return;
    this._isConnecting = true;
    if (this._retryTimerId) {
      clearTimeout(this._retryTimerId);
    }
    this._retryTimerId = setTimeout(() => {
      this.init();
      this._isConnecting = false;
    }, this._heartbeatCheckTimeout);
  }

  handleOpen(evt) {
    console.log("---websockt open ---", evt);
    this.startHeartbeat();
    const { onOpen } = this._callbackMap;
    typeof onOpen == "function" && onOpen(this._socket);
  }

  handleError(err) {
    console.log("---websockt error ---", err);
    this.reconnect();
    const { onError } = this._callbackMap;
    typeof onError == "function" && onError(err);
  }

  handleMessage(evt) {
    console.log("---websockt message---", evt);
    this.resetHeartbeat();
    const data = JSON.parse(evt.data);
    if (this._callbacks.has(data.action)) {
      const callback = this._callbacks.get(data.action);
      callback(data);
    }
    const { onMessage } = this._callbackMap;
    typeof onMessage == "function" && onMessage(evt.data);
  }

  handleClose() {
    console.log("---websockt close ---");
    this.reconnect();
    const { onClose } = this._callbackMap;
    typeof onClose == "function" && onClose();
  }

  reset() {
    this._heartbeatCheckTimerId && clearTimeout(this._heartbeatCheckTimerId);
    this._retryTimerId && clearTimeout(this._retryTimerId);
    if (this._socket) {
      this._socket.onopen = null;
      this._socket.onclose = null;
      this._socket.onerror = null;
      this._socket.onmessage = null;
      this._socket = null;
    }
  }

  destory() {
    this._callbacks = null;
    this._callbackMap = null;
    this.reset();
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$ws = new WsClient(options);
  }
}

export { WsClient };
