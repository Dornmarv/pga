var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _port, _connected, _portName, _onConnectCallback, _createPort, createPort_fn, _port2, _timer, _origin, _reportHeartBeats, reportHeartBeats_fn, _sendHeartBeatPackets, sendHeartBeatPackets_fn;
import { E as EmptyError, l as log, P as PortName } from "./log.4885de7a.js";
function lastValueFrom(source, config) {
  var hasConfig = typeof config === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}
class Port {
  constructor(connectInfo, opts) {
    __privateAdd(this, _createPort);
    __privateAdd(this, _port, void 0);
    __privateAdd(this, _connected, void 0);
    __privateAdd(this, _portName, void 0);
    __privateAdd(this, _onConnectCallback, void 0);
    if (!connectInfo.name) {
      throw new Error("port name is required");
    }
    __privateSet(this, _portName, connectInfo.name);
    __privateSet(this, _onConnectCallback, opts?.onConnect ?? (() => {
    }));
    __privateSet(this, _port, __privateMethod(this, _createPort, createPort_fn).call(this));
  }
  postMessage(message) {
    if (!__privateGet(this, _connected)) {
      __privateSet(this, _port, __privateMethod(this, _createPort, createPort_fn).call(this));
    }
    __privateGet(this, _port).postMessage(message);
  }
  get connected() {
    return __privateGet(this, _connected);
  }
  get sender() {
    return __privateGet(this, _port).sender;
  }
  get disconnect() {
    return __privateGet(this, _port).disconnect;
  }
  get onDisconnect() {
    return __privateGet(this, _port).onDisconnect;
  }
  get onMessage() {
    return __privateGet(this, _port).onMessage;
  }
  get name() {
    return __privateGet(this, _port).name;
  }
}
_port = new WeakMap();
_connected = new WeakMap();
_portName = new WeakMap();
_onConnectCallback = new WeakMap();
_createPort = new WeakSet();
createPort_fn = function() {
  const newPort = chrome.runtime.connect({
    name: __privateGet(this, _portName)
  });
  __privateSet(this, _connected, true);
  log(`chrome port ${__privateGet(this, _portName)} connected`);
  newPort.onDisconnect.addListener(() => {
    __privateSet(this, _connected, false);
    log(`chrome port ${__privateGet(this, _portName)} connected`);
  });
  __privateGet(this, _onConnectCallback).call(this, newPort);
  return newPort;
};
const _KeepAliveConnection = class {
  constructor(origin) {
    __privateAdd(this, _reportHeartBeats);
    __privateAdd(this, _sendHeartBeatPackets);
    __privateAdd(this, _port2, null);
    __privateAdd(this, _timer, null);
    __privateAdd(this, _origin, "UNKNOWN");
    __privateSet(this, _origin, origin);
  }
  connect() {
    const newPort = new Port({ name: PortName.SUIET_KEEP_ALIVE });
    newPort.onDisconnect.addListener(() => {
      this.connect();
    });
    __privateSet(this, _port2, newPort);
    __privateMethod(this, _reportHeartBeats, reportHeartBeats_fn).call(this);
  }
};
let KeepAliveConnection = _KeepAliveConnection;
_port2 = new WeakMap();
_timer = new WeakMap();
_origin = new WeakMap();
_reportHeartBeats = new WeakSet();
reportHeartBeats_fn = function() {
  if (__privateGet(this, _timer)) {
    clearInterval(__privateGet(this, _timer));
  }
  __privateMethod(this, _sendHeartBeatPackets, sendHeartBeatPackets_fn).call(this);
  __privateSet(this, _timer, setInterval(() => {
    __privateMethod(this, _sendHeartBeatPackets, sendHeartBeatPackets_fn).call(this);
  }, _KeepAliveConnection.KEEP_ALIVE_INTERVAL));
};
_sendHeartBeatPackets = new WeakSet();
sendHeartBeatPackets_fn = function() {
  if (!__privateGet(this, _port2)) {
    return;
  }
  try {
    __privateGet(this, _port2).postMessage({
      type: "KEEP_ALIVE",
      origin: __privateGet(this, _origin),
      payload: "PING"
    });
  } catch (e) {
    console.error("failed to report heart beats", e);
  }
};
__publicField(KeepAliveConnection, "KEEP_ALIVE_INTERVAL", 3e3);
export {
  KeepAliveConnection as K,
  Port as P,
  lastValueFrom as l
};
