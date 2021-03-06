# EventDispatcher ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@danehansen/event-dispatcher.svg) ![npm](https://img.shields.io/npm/dt/@danehansen/event-dispatcher.svg)

**Class** : public class [EventDispatcher](https://github.com/danehansen/EventDispatcher)  
**Inheritance** : [EventDispatcher](https://github.com/danehansen/EventDispatcher) > Object  
**Subclasses** : [Preloader](https://github.com/danehansen/Preloader), [Sprite](https://github.com/danehansen/Sprite), [Timer](https://github.com/danehansen/Timer)

The EventDispatcher class is the base class for all classes that dispatch events. It is totally ripped off from the AS3 EventDispatcher, but simplified. EventDispatcher can also be used without creating an instance like singleton emitter.

## Installation

`npm install --save @danehansen/event-dispatcher`

## Usage

As a module:

    import EventDispatcher from '@danehansen/event-dispatcher';
    var eventDispatcher = new EventDispatcher();
    eventDispatcher.addEventListener('event', onEvent);
    eventDispatcher.dispatchEvent('event');

    function onEvent(evt) {
      console.log('hi!');
    }

In your browser:

    <script src='danehansen-EventDispatcher.min.js'></script>
    <script>
      var EventDispatcher = window.danehansen.EventDispatcher;
      var eventDispatcher = new EventDispatcher();
      eventDispatcher.addEventListener('event', onEvent);
      eventDispatcher.dispatchEvent('event');

      function onEvent(evt) {
        console.log('hi!');
      }
    </script>

## Public Static Methods

- **addEventListener**(type:String, listener:Function)  
  [static] Registers an event listener object with EventDispatcher so that it will dispatch notification of an event.
- **dispatchEvent**(type:String, ...args:\*)  
  [static] Emits an event, and passes along any extra arguments to the registered listeners.
- **removeEventListener** (type:String, listener:Function)  
  [static] Removes a listener from EventDispatcher.

## Public Methods

- **EventDispatcher**(target:Object)  
  Aggregates an instance of the EventDispatcher class.
- **addEventListener**(type:String, listener:Function)  
  Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
- **clearEventListeners**()  
  Clears all event listeners of the instance.
- **dispatchEvent**(type:String)  
  Dispatches an event into the event flow.
- **removeEventListener** (type:String, listener:Function)  
  Removes a listener from the EventDispatcher object.
