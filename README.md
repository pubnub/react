# PubNub React Framework v2.0 (BETA)

> **This is a beta version of the PubNub React framework.**
> It's provided as a preview of what's to come, and is _very likely_ to change before its GA release.

Welcome to the new PubNub React framework!
This README provides a brief overview of the new framework; it assumes you're familiar with React, and with PubNub.
The [PubNub website](https://www.pubnub.com/) has many [tutorials](https://www.pubnub.com/blog/category/build/) and [demos](https://www.pubnub.com/developers/demos/), in addition to [SDK documentation](https://www.pubnub.com/docs/) and [REST API documentation](https://www.pubnub.com/docs/pubnub-rest-api-documentation).

## Contents

- [Quick start](#quick-start)
- [System requirements](#system-requirements)
- [PubNubProvider](#pubnubprovider)
- [PubNubConsumer](#pubnubconsumer)
- [PubNubContext](#pubnubcontext)
- [usePubNub hook](#usepubnub-hook)

## Quick start

**To get started right away**, do the following:

1. Set up your React project.

   For a quick single-page app, [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) is a good starting point:

   ```bash
   npx create-react-app hello-pubnub-react
   ```

1. Add the PubNub JavaScript SDK and React framework packages to your project:

   ```bash
   npm install pubnub
   npm install pubnub-react@beta
   ```

1. Replace the contents of `src/App.js` with the following:

   ```javascript
   import React, { useState } from 'react';
   import PubNub from 'pubnub';
   import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
   import './App.css';

   const pubnub = new PubNub({
     publishKey: <YOUR PUB KEY>,
     subscribeKey: <YOUR SUB KEY>,
   });
   const channels = ['awesomeChannel'];

   function App() {
     const [messages, addMessage] = useState([]);
     const [message, setMessage] = useState('');

     const sendMessage = message => {
       pubnub.publish(
         {
           channel: channels[0],
           message,
         },
         () => setMessage('')
       );
     };

     return (
       <PubNubProvider client={pubnub}>
         <div className="App">
           <header className="App-header">
             <PubNubConsumer>
               {client => {
                 client.addListener({
                   message: messageEvent => {
                     addMessage([...messages, messageEvent.message]);
                   },
                 });

                 client.subscribe({ channels });
               }}
             </PubNubConsumer>
             <div
               style={{
                 width: '500px',
                 height: '300px',
                 border: '1px solid black',
               }}
             >
               <div style={{ backgroundColor: 'grey' }}>React Chat Example</div>
               <div
                 style={{
                   backgroundColor: 'white',
                   height: '260px',
                   overflow: 'scroll',
                 }}
               >
                 {messages.map((message, messageIndex) => {
                   return (
                     <div
                       key={`message-${messageIndex}`}
                       style={{
                         display: 'inline-block',
                         float: 'left',
                         backgroundColor: '#eee',
                         color: 'black',
                         borderRadius: '20px',
                         margin: '5px',
                         padding: '8px 15px',
                       }}
                     >
                       {message}
                     </div>
                   );
                 })}
               </div>
               <div
                 style={{
                   display: 'flex',
                   height: '40px',
                   backgroundColor: 'lightgrey',
                 }}
               >
                 <input
                   type="text"
                   style={{
                     borderRadius: '5px',
                     flexGrow: 1,
                     fontSize: '18px',
                   }}
                   placeholder="Type your message"
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                 />
                 <button
                   style={{
                     backgroundColor: 'blue',
                     color: 'white',
                     borderRadius: '5px',
                     fontSize: '16px',
                   }}
                   onClick={e => {
                     e.preventDefault();
                     sendMessage(message);
                   }}
                 >
                   Send Message
                 </button>
               </div>
             </div>
           </header>
         </div>
       </PubNubProvider>
     );
   }

   export default App;
   ```

1. In your project, run the following command:

   ```bash
   npm start
   ```

   You should see the following in your browser:

   ![chat UI screenshot][qs-screenshot]

## System requirements

To use the PubNub React framework, you need:

- React 16.8 or above
- PubNub [Javascript SDK](https://www.pubnub.com/docs/web-javascript/pubnub-javascript-sdk)

## PubNubProvider

The PubNubProvider makes available a PubNub client instance to a React component tree. You instantiate the provider as follows (note that this example assumes that your publish and subscribe keys are contained in the `pubnub.config.json` file):

```js
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

const pubNubConfig = require('./pubnub.config.json');
const pubNubClient = new PubNub(pubNubConfig.Demo.keySet);

const App = () => {
  return (
    <PubNubProvider client={pubNubClient}>
      <MyRootComponent />
    </PubNubProvider>
  );
};

export default App;
```

### PubNubProvider props

The PubNubProvider component takes a single prop:

- **client** is the required pubNubClient instance. This is used by all components that require PubNub functionality.

## PubNubConsumer

The PubNubConsumer allows you to access the client instance you made available with a PubNubProvider.

### PubNubConsumer props

The PubNubConsumer component takes a single prop:

- **client** is the required pubNubClient instance. This is used by all components that require PubNub functionality.

### Example PubNubConsumer usage

Once you've created a PubNubProvider, you can access the client with a PubNubConsumer.

```js
import React from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from '../PubNubProvider';
import { PubNubConsumer } from '../PubNubConsumer';
import { getPubNubContext } from '../PubNubContext';

const pubNubConfig = require('../config/pubnub.json');
const pubNubClient = new PubNub(pubNubConfig.Demo.keySet);

const App = () => {
  return (
    <PubNubProvider client={pubNubClient}>
      <PubNubConsumer>
        {client => 'success!' /* do something now */}
      </PubNubConsumer>
    </PubNubProvider>
  );
};
```

## PubNubContext

Coming soon...

## usePubNub hook

The PubNub hook lets you interact with PubNub in function components.

Hooks are a new feature added in React 16.8 that allow you to use React features without writing a class. For a general overview of hooks, refer to [the React documentation](https://reactjs.org/docs/hooks-intro.html).

> **Note**: As you might expect, the `usePubNub` hook requires cleanup. For more information on the cleanup concept, refer to [the React documentation](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup).

### Example usage

```javascript
import React, { useState, useEffect } from 'react';
import { usePubNub } from '../../src/index';

const PubNubTime = () => {
  const client = usePubNub();
  const [time, setTime] = useState(null);

  useEffect(() => {
    client
      .time()
      .then(({ timetoken }) => {
        setTime(timetoken);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <div>{time}</div>;
};

export default PubNubTime;
```

Then, to load `PubNubTime` on-demand, you could use `React.Lazy` and `Suspense`:

```javascript
import React, { Suspense, lazy } from 'react';

const MyRootComponent = () => {
  const DisplayPubNubTime = lazy(() => import('./PubNubTime'));

  return (
    <Suspense fallback={<div>Loading. . .</div>}>
      <DisplayPubNubTime />
    </Suspense>
  );
};

export default MyRootComponent;
```

[qs-screenshot]: ./assets/quickstart-screenshot.png
