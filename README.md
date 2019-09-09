# PubNub React Framework v2.0 (BETA)

> **This is a beta version of the PubNub React framework.**
> It's provided as a preview of what's to come, and is _very likely_ to change before its GA release.

Welcome to the new PubNub React framework!
This README provides a brief overview of the new framework; it assumes you're familiar with React, and with PubNub.
The [PubNub website](https://www.pubnub.com/) has many [tutorials](https://www.pubnub.com/blog/category/build/) and [demos](https://www.pubnub.com/developers/demos/), in addition to [SDK documentation](https://www.pubnub.com/docs/) and [REST API documentation](https://www.pubnub.com/docs/pubnub-rest-api-documentation).

## Contents

* [System requirements](#system-requirements)
* [PubNubProvider](#pubnubprovider)
* [PubNubConsumer](#pubnubconsumer)
* [PubNubContext](#pubnubcontext)
* [usePubNub hook](#usepubnub-hook)

## System requirements

To use the PubNub React framework, you need:

* React 16.8 or above
* PubNub [Javascript SDK](https://www.pubnub.com/docs/web-javascript/pubnub-javascript-sdk)

## PubNubProvider

The PubNubProvider makes available a PubNub client instance to a React component tree. You instantiate the provider as follows (note that your publish and subscribe keys are contained in the `pubnub.json` file):

```js
import PubNub from 'pubnub';
import { PubNubProvider } from '../../src/index';

const pubNubConfig = require('../config/pubnub.json');
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

* **client** is the required pubNubClient instance. This is used by all components that require PubNub functionality.

## PubNubConsumer

The PubNubConsumer allows you to access the client instance you made available with a PubNubProvider.

### PubNubConsumer props

The PubNubConsumer component takes a single prop:

* **client** is the required pubNubClient instance. This is used by all components that require PubNub functionality.

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
  <PubNubProvider client={pubNubClient}>
    <PubNubConsumer>
      {client => "success!" /* do something now */ }
    </PubNubConsumer>
  </PubNubProvider>
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
import React from 'react';
import { usePubNub } from '../../src/index';

const PubNubTime = () => {
  const PubNubClient = usePubNub();

  return (
    <div>
      {PubNubClient.time((status, response): void => {
        if (status.error) console.log('error', status);
        else console.log('response', response.timetoken);
      })}
    </div>
  );
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
