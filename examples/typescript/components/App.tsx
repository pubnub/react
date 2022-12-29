import React, { useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
import Chat from './Chat';
import MyRootComponent from './MyRootComponent';

const pubNubConfig = require('../config/pubnub.json');
const pubNubClient = new PubNub(pubNubConfig.Demo.keySet);

function App() {
  return (
    <PubNubProvider client={pubNubClient}>
      <Chat />
    </PubNubProvider>
  );
}

export default App;
