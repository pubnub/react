# PubNub React

---

**Beta Version Available**

A **beta release** of the PubNub React framework, version 2.0 is now available.
You can access it in the [v2.0 branch](https://github.com/pubnub/react/tree/v2.0) of this repository.

---

Welcome! We're here to get you started quickly with your integration between PubNub and React\React Native.
PubNub makes it easy to integrate real-time bidirectional communication into your app.

**Pubnub React** is a wrapper of **PubNub JavaScript SDK** [version 4](https://www.pubnub.com/docs/javascript/pubnub-javascript-sdk-v4)
that adds a few of extra features to simplify the integration with React\React Native:

You can still use the native PubNub JavaScript SDK if you feel this will be more suitable for your situation.

## Communication

- If you **need help** or have a **general question**, contact <support@pubnub.com>
- If you **want to contribute**, please open a pull request against the `develop` branch.

## Install PubNub React SDK

```shell
npm install pubnub-react
```

## Hello World Example

```
import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({ publishKey: 'YOUR PUBLISH KEY', subscribeKey: 'YOUR SUBSCRIBE KEY' });
    this.pubnub.init(this);
  }
  
  componentWillMount() {
    this.pubnub.subscribe({ channels: ['channel1'], withPresence: true });
    
    this.pubnub.getMessage('channel1', (msg) => {
      console.log(msg);
    });
    
    this.pubnub.getStatus((st) => {
      console.log(st);
      this.pubnub.publish({ message: 'hello world from react', channel: 'channel1' });
    });
  }
  
  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['channel1'] });
  }
  
  render() {
    ...
  }
}
```

## How to use PubNubReact

In order to get the integration between your React's Component and PubNub, PubNubReact will be the way to get this without 
any kind of difficulty or extra job when you need render data in your UI.

- An instance of **PubNubReact** can be associated to only a Component.
- Create and initialize your **PubNubReact** from the constructor.
- If you want to subscribe a channel automatically as soon as the component will be displayed on the screen, you will have to 
  subscribe it from the mounting point with the usage of `componentWillMount()` provided by React.
- SDK will have created three states which are handled by the instance directly and these are **pn_messages**, **pn_presence** and 
  **pn_status** please only use them in reading mode if you want to use them for any reason. In addition the trigger events will 
  give you some extra features to manage the data allocated in theses states.

```
import PubNubReact from 'pubnub-react';
```

```
constructor(props) {
  super(props);
  this.pubnub = new PubNubReact({ publishKey: 'YOUR PUBLISH KEY', subscribeKey: 'YOUR SUBSCRIBE KEY' });
  this.pubnub.init(this);
}
```

```
componentWillMount() {
  this.pubnub.subscribe({
    channels: ['channel1']
  });
   
  this.pubnub.getMessage('channel1', (msg) => {
    console.log(msg);
  });
}
```

## Trigger Events

With the trigger events you can find a way to get real time apps with PubNub React very fast because it will be resolved 
the synchronization between the data received and the user interface through of updating of the states, invoking the render 
of the React's Component.

The trigger events are methods which encapsulate the events (message, presence and status) with extra functionality to offer 
integration and get the process of development faster because will be resolved different scenarios which you can find when 
you are working with React\React Native.

To execute the trigger events you have to execute first the method `init`, in this way `getMessage`, `getPresence` and 
`getStatus` will be available; these trigger events have the responsibility to register a channel or a channelGroup 
in order to capture any real time message as soon as this is received and the Component renders automatically the user interface.

The `getStatus` will only say to the Component that this has to render again if there is an update in the global state of the network.

**Registering a channel to be handled by the trigger event**

```
...

componentWillMount() {  
  this.pubnub.getStatus();
  
  this.pubnub.getMessage('channel1');
  this.pubnub.getMessage('channel2');
  this.pubnub.getMessage('channelGroup1');
  
  this.pubnub.getPresence('channel1');
  this.pubnub.getPresence('channel2');
  
  ...
}

...
```

### getMessage

**Rendering real time messages from React**
```
...

componentWillMount() {
  this.pubnub.getMessage('channel1');
  
  ...
}

render() {
  const messages = this.pubnub.getMessage('channel1');
  return (
    <div>
      <ul>
        {messages.map((m, index) => <li key={'message' + index}>{m.message}</li>)}
      </ul>
    </div>
  );
}

...
```

**Rendering real time messages from React Native**
```
...

componentWillMount() {
  this.pubnub.getMessage('channel1');
  
  ...
}

render() {
  const messages = this.pubnub.getMessage('channel1');
  return (
    <View>
      {messages.map((m) => <Text>{m.message}</Text>)}
    </View>
  );
}

...
```

In addition to be used to register channels or channelGroups you can also catch each message if you want to give it some kind
of procedure.

```
...

componentWillMount() {
  this.pubnub.getMessage('channel1', (msg) => {
    console.log(msg);
  });
  
  ...
}

...
```

When you are using `getMessage` this is going to keep the latest 100 messages received by default. But you can change this
value when you attach the channel for first time with `getMesage`.

```
...

// the stack for the channel1 will always have the latest 20 messages.
componentWillMount() {
  this.pubnub.getMessage('channel1', (msg) => {
    console.log(msg);
  }, 20);
  
  ...
}

...
```
or

```
...

// the stack for the channel1 will always have the latest 20 messages.
componentWillMount() {
  this.pubnub.getMessage('channel1', 20);
  
  ...
}

...
```

### getPresence

**Rendering presence object from react**

```
...

componentWillMount() {
  this.pubnub.getPresence('channel1', (presence) => {
    console.log(presence);
  });
  
  ...
}

render() {
  const presence = this.pubnub.getPresence('channel1');
  return (
    <div>
      <p>{presence.action}</p>
    </div>
  );
}

...
```

**Rendering presence object from React Native**

```
...

componentWillMount() {
  this.pubnub.getPresence('channel1', (presence) => {
    console.log(presence);
  });
  
  ...
}

render() {
  const presence = this.pubnub.getPresence('channel1');
  return (
    <View>
       <Text>{presence.action}</Text>
    </View>
  );
}

...
```

**Rendering the global status from React**

```
...

componentWillMount() {
  this.pubnub.getStatus((status) => {
    console.log(status);
  });
  
  ...
}

render() {
  const status = this.pubnub.getStatus();
  return (
    <div>
      <p>{status.category}</p>
    </div>
  );
}

...
```

**Rendering the global status from React Native**

```
...

componentWillMount() {
  this.pubnub.getStatus((status) => {
    console.log(status);
  });
  
  ...
}

render() {
  const status = this.pubnub.getStatus();
  return (
    <View>
       <Text>{status.category}</Text>
    </View>
  );
}

...
```

## Cleaning and releasing

You can execute clean to remove all message cached in the state of the Component by the instance in run time without 
affecting the capture of new incoming messages for the trigger events.

```
this.pubnub.clean('myChannel1');
```

```
this.pubnub.clean('myGroup1');
```

You can execute release if you want to remove all message cached and stop of capturing new incoming messages for the
trigger events.

```
this.pubnub.release('myChannel1');
```

```
this.pubnub.release('myGroup1');
```

```
this.pubnub.release(['myChannel1', 'myChannel2']);
```

## Accessing Methods

All methods of the Native Javascript SDKs are wrapped within the PubNubReact SDK. To learn more about PubNub JavaScript 
features and methods available please refer to the API Reference of the Javascript SDK, here some examples:

* [JavaScript V4 API Reference](https://www.pubnub.com/docs/javascript/api-reference-sdk-v4)

**Publish a message**

```
this.pubnub.publish({channel: 'myChannel', message: 'Hello!'}, (response) => {
  console.log(response);
});
```

**Subscribe a channel**

To get that `presence` event works, do not forget to add ```withPresence: true```

```javascript
this.pubnub.subscribe({
    channels  : ['channel1', 'channel2', 'channel3'],
    channelGroups: ['channelGroup1', 'channelGroup2'],
    withPresence: true
});
```

**Unsubscribe a channel**

```javascript
this.pubnub.unsubscribe('channel1');
```

### Channels with history

You can retrieve published messages from archival storage for this requires that [Storage and Playback](http://www.pubnub.com/knowledge-base/discussion/644/how-do-i-enable-add-on-features-for-my-keys) add-on is enabled
for your keys. In order to get more information about this feature - see [History](https://www.pubnub.com/docs/javascript/api-reference-sdk-v4#history).

```javascript
this.pubnub.history({ channel: 'myChannel1' }).then((response) => {
  console.log(response);
});
```

**Retriving the history from ```getMessage``` method:**

At the moment that you are subscribing a channel you can pass the optional parameter ```autoload``` this value has to
contain a value from 1 to 100 in order to retrieve the last messages published in the channel. When the ```getMessage```
is called this going to retrieve the history.

```
this.pubnub.subscribe({channels: ['myChannel1'], triggerEvents: true, withPresence: true, autoload: 100});
```

Also you can use a callback to know when the retrieving process has finished.

```
let messages = this.pubnub.getMessage('myChannel1', () => {
  console.log(messages);
});
```
