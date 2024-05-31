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
var _msgObservable, _source, _target, _targetOrigin;
import { c as createOperatorSubscriber, i as isFunction, m as map, o as operate, a as mapOneOrManyArgs, _ as __read, O as Observable, f as filter, t as take, W as WindowMsgTarget, P as PortName } from "./log.4885de7a.js";
import { i as innerFrom, a as isArrayLike } from "./innerFrom.5e95570e.js";
import { l as lastValueFrom, P as Port, K as KeepAliveConnection } from "./KeepAliveConnection.0c69c5ea.js";
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
  if (!add) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    };
    add(handler);
    return function() {
      return remove(handler);
    };
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}
class WindowMsgStream {
  constructor(source, target, targetOrigin) {
    __privateAdd(this, _msgObservable, void 0);
    __privateAdd(this, _source, void 0);
    __privateAdd(this, _target, void 0);
    __privateAdd(this, _targetOrigin, void 0);
    if (source === target) {
      throw new Error(
        "[WindowMessageStream] source and target must be different"
      );
    }
    __privateSet(this, _source, source);
    __privateSet(this, _target, target);
    __privateSet(this, _targetOrigin, targetOrigin);
    __privateSet(this, _msgObservable, fromEvent(
      window,
      "message"
    ).pipe(
      filter((message) => {
        return message.origin === __privateGet(this, _targetOrigin) && message.data?.target === __privateGet(this, _source);
      }),
      map((event) => event.data)
    ));
  }
  async post(payload) {
    const msg = {
      target: __privateGet(this, _target),
      payload
    };
    if (typeof __REACT_NATIVE__ !== "undefined" && __REACT_NATIVE__) {
      window.ReactNativeWebView.postMessage(JSON.stringify(msg));
    } else {
      window.postMessage(msg);
    }
    return await lastValueFrom(
      __privateGet(this, _msgObservable).pipe(
        filter((windowMsg) => {
          return windowMsg.payload.id === payload.id;
        }),
        map((windowMsg) => windowMsg.payload),
        take(1)
      )
    );
  }
  subscribe(func) {
    return __privateGet(this, _msgObservable).subscribe(func);
  }
}
_msgObservable = new WeakMap();
_source = new WeakMap();
_target = new WeakMap();
_targetOrigin = new WeakMap();
function getSiteMetadata() {
  return {
    name: getSiteName(window),
    icon: getSiteIcon(window),
    origin: window.origin
  };
}
function getSiteName(windowObject) {
  const { document: document2 } = windowObject;
  const siteName = document2.querySelector(
    'head > meta[property="og:site_name"]'
  );
  if (siteName) {
    return siteName.content;
  }
  const metaTitle = document2.querySelector(
    'head > meta[name="title"]'
  );
  if (metaTitle) {
    return metaTitle.content;
  }
  if (document2.title && document2.title.length > 0) {
    return document2.title;
  }
  return window.location.hostname;
}
function getSiteIcon(windowObject) {
  const { document: document2 } = windowObject;
  const icons = document2.querySelectorAll(
    'head > link[rel~="icon"]'
  );
  for (const icon of icons) {
    if (icon && icon.href) {
      return icon.href;
    }
  }
  return null;
}
function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
const whileList = [
  "dapp.connect",
  "dapp.signTransactionBlock",
  "dapp.signAndExecuteTransactionBlock",
  "dapp.signMessage",
  "dapp.signPersonalMessage",
  "dapp.getAccountsInfo",
  "dapp.getActiveNetwork"
];
function validateExternalWindowMsg(msg) {
  if (!has(msg, "payload") || !has(msg.payload, "id") || !has(msg.payload, "funcName")) {
    throw new Error("invalid msg structure");
  }
  if (!whileList.includes(msg.payload.funcName)) {
    throw new Error(`funcName "${msg.payload.funcName}" is not allowed`);
  }
  return;
}
function setupMessageProxy(siteMetadata) {
  const windowMsgStream = new WindowMsgStream(
    WindowMsgTarget.SUIET_CONTENT,
    WindowMsgTarget.DAPP,
    siteMetadata.origin
  );
  const handlePortConnect = (newPort) => {
    const passMessageToPort = (eventData, port) => {
      try {
        validateExternalWindowMsg(eventData);
      } catch (e) {
        console.warn(
          `[${WindowMsgTarget.SUIET_CONTENT}] rejects an invalid request from window message`
        );
        return;
      }
      const { payload: trueData } = eventData;
      const message = {
        id: trueData.id,
        funcName: trueData.funcName,
        payload: {
          params: trueData.payload,
          context: {
            origin: siteMetadata.origin,
            name: siteMetadata.name,
            favicon: siteMetadata.icon
          }
        }
      };
      port.postMessage(message);
    };
    newPort.onMessage.addListener((msg) => {
      windowMsgStream.post(msg);
    });
    const winMsgSubscription = windowMsgStream.subscribe((eventData) => {
      passMessageToPort(eventData, newPort);
    });
    newPort.onDisconnect.addListener(() => {
      winMsgSubscription.unsubscribe();
    });
  };
  return new Port(
    {
      name: PortName.SUIET_CONTENT_BACKGROUND
    },
    {
      onConnect: handlePortConnect
    }
  );
}
function injectDappInterface() {
  const script = document.createElement("script");
  const url = chrome.runtime.getURL("dapp-api.js");
  script.setAttribute("src", url);
  script.setAttribute("type", "module");
  const container = document.head || document.documentElement;
  container.insertBefore(script, container.firstElementChild);
  container.removeChild(script);
}
(function main() {
  injectDappInterface();
  const keepAlive = new KeepAliveConnection("CONTENT_SCRIPT");
  keepAlive.connect();
  setupMessageProxy(getSiteMetadata());
})();
