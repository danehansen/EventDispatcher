import { expect } from 'chai'
import EventDispatcher from '../src/EventDispatcher'
import { spy } from 'sinon'

describe('addEventListener', function() {
  const ed = new EventDispatcher()
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()

  it('adds callbacks', function() {
    ed.addEventListener(eventA, callbackA)
    ed.addEventListener(eventB, callbackB)
    ed.addEventListener(eventA, callbackC)
    ed.addEventListener(eventB, callbackC)

    expect(ed._callbacks).to.deep.equal({
      [eventA]: [callbackA, callbackC],
      [eventB]: [callbackB, callbackC],
    })
  })

  it('doesn‘t add duplicate callbacks', function() {
    ed.addEventListener(eventA, callbackA)
    ed.addEventListener(eventA, callbackA)
    ed.addEventListener(eventB, callbackB)
    ed.addEventListener(eventB, callbackB)

    expect(ed._callbacks).to.deep.equal({
      [eventA]: [callbackA, callbackC],
      [eventB]: [callbackB, callbackC],
    })
  })
})

describe('removeEventListener', function() {
  const ed = new EventDispatcher()
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()
  ed.addEventListener(eventA, callbackA)
  ed.addEventListener(eventB, callbackB)
  ed.addEventListener(eventA, callbackC)
  ed.addEventListener(eventB, callbackC)

  it('removes callbacks', function() {
    ed.removeEventListener(eventA, callbackA)

    expect(ed._callbacks).to.deep.equal({
      [eventA]: [callbackC],
      [eventB]: [callbackB, callbackC],
    })
  })

  it('handles removal of nonexistant callbacks', function() {
    ed.removeEventListener(eventA, callbackA)

    expect(ed._callbacks).to.deep.equal({
      [eventA]: [callbackC],
      [eventB]: [callbackB, callbackC],
    })
  })
})

describe('clearEventListeners', function() {
  const ed = new EventDispatcher()
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()
  ed.addEventListener(eventA, callbackA)
  ed.addEventListener(eventB, callbackB)
  ed.addEventListener(eventA, callbackC)
  ed.addEventListener(eventB, callbackC)

  it('removes all listeners', function() {
    ed.clearEventListeners()

    expect(ed._callbacks).to.deep.equal({})
  })
})

describe('dispatchEvent', function() {
  const ed = new EventDispatcher()
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()
  const extraParamA = 'aa'
  const extraParamB = 'bb'
  ed.addEventListener(eventA, callbackA)
  ed.addEventListener(eventB, callbackB)
  ed.addEventListener(eventA, callbackC)
  ed.addEventListener(eventB, callbackC)

  it('calls proper callback', function() {
    ed.dispatchEvent(eventA, extraParamA, extraParamB)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('doesnt’t call after removal', function() {
    ed.clearEventListeners()
    ed.dispatchEvent(eventA)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('calls with proper arguments', function() {
    expect(callbackA.calledWith({
      target: ed,
      type: eventA,
    }, extraParamA, extraParamB)).to.equal(true)
  })

  it('calls with another target when specified', function() {
    const obj = {}
    const ed2 = new EventDispatcher(obj)
    ed2.addEventListener(eventB, callbackB)
    ed2.dispatchEvent(eventB, extraParamA, extraParamB)

    expect(callbackB.calledWith({
      target: obj,
      type: eventB,
    }, extraParamA, extraParamB)).to.equal(true)
  })
})

describe('static addEventListener', function() {
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()

  it('adds callbacks', function() {
    EventDispatcher.addEventListener(eventA, callbackA)
    EventDispatcher.addEventListener(eventB, callbackB)
    EventDispatcher.addEventListener(eventA, callbackC)
    EventDispatcher.addEventListener(eventB, callbackC)
    EventDispatcher.dispatchEvent(eventA)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('doesn‘t add duplicate callbacks', function() {
    EventDispatcher.addEventListener(eventA, callbackA)
    EventDispatcher.addEventListener(eventA, callbackA)
    EventDispatcher.dispatchEvent(eventA)

    expect(callbackA.callCount).to.equal(2)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(2)
  })
})

describe('static removeEventListener', function() {
  const eventA = 'a'
  const eventB = 'b'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()

  it('removes callbacks', function() {
    EventDispatcher.addEventListener(eventA, callbackA)
    EventDispatcher.addEventListener(eventB, callbackB)
    EventDispatcher.addEventListener(eventA, callbackC)
    EventDispatcher.addEventListener(eventB, callbackC)
    EventDispatcher.dispatchEvent(eventA)
    EventDispatcher.removeEventListener(eventA, callbackA)
    EventDispatcher.removeEventListener(eventA, callbackC)
    EventDispatcher.dispatchEvent(eventA)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('handles removal of nonexistant callbacks', function() {
    EventDispatcher.removeEventListener(eventA, callbackA)
    EventDispatcher.removeEventListener('x', ()=>{})
    EventDispatcher.dispatchEvent(eventA)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })
})

describe('static dispatchEvent', function() {
  const eventA = 'aaa'
  const eventB = 'bbb'
  const callbackA = spy()
  const callbackB = spy()
  const callbackC = spy()
  const extraParamA = 'aa'
  const extraParamB = 'bb'
  EventDispatcher.addEventListener(eventA, callbackA)
  EventDispatcher.addEventListener(eventB, callbackB)
  EventDispatcher.addEventListener(eventA, callbackC)
  EventDispatcher.addEventListener(eventB, callbackC)

  it('calls proper callback', function() {
    EventDispatcher.dispatchEvent(eventA, extraParamA, extraParamB)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('doesnt’t call after removal', function() {
    EventDispatcher.removeEventListener(eventA, callbackA)
    EventDispatcher.removeEventListener(eventA, callbackC)
    EventDispatcher.dispatchEvent(eventA, extraParamA, extraParamB)
    EventDispatcher.dispatchEvent('y', extraParamA, extraParamB)

    expect(callbackA.callCount).to.equal(1)
    expect(callbackB.callCount).to.equal(0)
    expect(callbackC.callCount).to.equal(1)
  })

  it('calls with proper arguments', function() {
    expect(callbackA.calledWith(extraParamA, extraParamB)).to.equal(true)
  })
})
