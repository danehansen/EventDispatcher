#EventDispatcher

__Class__ : public class [EventDispatcher](https://github.com/danehansen/EventDispatcher)  
__Inheritance__ : [EventDispatcher](https://github.com/danehansen/EventDispatcher) > Object  
__Subclasses__ : [Preloader](https://github.com/danehansen/Preloader), [Sprite](https://github.com/danehansen/Sprite), [Timer](https://github.com/danehansen/Timer)

The EventDispatcher class is the base class for all classes that dispatch events. It is totally ripped off from the AS3 EventDispatcher, but simplified. EventDispatcher can also be used without creating an instance like singleton emitter.

##Installation

`npm install --save @danehansen/event-dispatcher`

##Usage

As a module:

    import EventDispatcher from '@danehansen/event-dispatcher';

In your browser:

    <script src='danehansen-EventDispatcher.min.js'></script>
    <script>
      var EventDispatcher = window.danehansen.EventDispatcher;
    </script>

##Public Static Methods

* __addEventListener__(type:String, listener:Function)  
[static] Registers an event listener object with EventDispatcher so that it will dispatch notification of an event.
* __dispatchEvent__(type:String, ...args:*)  
[static] Emits an event, and passes along any extra arguments to the registered listeners.
* __removeEventListener__ (type:String, listener:Function)  
[static] Removes a listener from EventDispatcher.

##Public Methods

* __EventDispatcher__(target:Object)  
Aggregates an instance of the EventDispatcher class.
* __addEventListener__(type:String, listener:Function)  
Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
* __dispatchEvent__(type:String)  
Dispatches an event into the event flow.
* __removeEventListener__ (type:String, listener:Function)  
Removes a listener from the EventDispatcher object.
