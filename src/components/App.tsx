import React from 'react';
import MyRootComponent from './MyRootComponent';
import PubNub from 'pubnub';
import { PubNubProvider } from '../context/PubNubProvider';

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
