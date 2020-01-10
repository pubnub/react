import React from 'react';
import PubNub from 'pubnub';

export interface PubNubContextValue {
  client?: PubNub;
  renderPromises?: Record<any, any>;
}

let pubNubContext: React.Context<PubNubContextValue>;

export function getPubNubContext() {
  if (!pubNubContext) {
    pubNubContext = React.createContext<PubNubContextValue>({});
  }
  return pubNubContext;
}

export function resetPubNubContext() {
  pubNubContext = React.createContext<PubNubContextValue>({});
}
