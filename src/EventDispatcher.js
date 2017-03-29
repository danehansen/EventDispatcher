const CALLBACKS = {}

function addEventListener(callbackHolder, type, listener) {
  let callbacks = callbackHolder[type]
  if (!callbacks) {
    callbacks = []
    callbackHolder[type] = callbacks
  }
  if (callbacks.indexOf(listener) < 0) {
    callbacks.push(listener)
  }
}

function removeEventListener(callbackHolder, type, listener) {
  const callbacks = callbackHolder[type]
  if (callbacks) {
    const index = callbacks.indexOf(listener)
    if (index >= 0) {
      callbacks.splice(index, 1)
    }
  }
}

export default class EventDispatcher {
  static addEventListener(type, listener) {
    addEventListener(CALLBACKS, type, listener)
  }

  static removeEventListener(type, listener) {
    removeEventListener(CALLBACKS, type, listener)
  }

  static dispatchEvent(type, ...args) {
    const callbacks = CALLBACKS[type]
    if (callbacks) {
      for (let callback of callbacks) {
        callback(...args)
      }
    }
  }

  constructor(target) {
    this._target = target || this
    this.clearEventListeners()
  }

  addEventListener = (type, listener) => {
    addEventListener(this._callbacks, type, listener)
  }

  removeEventListener = (type, listener) => {
    removeEventListener(this._callbacks, type, listener)
  }

  clearEventListeners = () => {
    this._callbacks = {}
  }

  dispatchEvent = (type, ...args) => {
    const callbacks = this._callbacks[type]
    if (callbacks) {
      const obj = { target: this._target, type }
      for (let callback of callbacks) {
        callback(obj, ...args)
      }
    }
  }
}
