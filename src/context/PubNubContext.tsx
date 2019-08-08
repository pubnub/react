import React from 'react';

export interface PubNubContextValue {
  client?: object;
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
