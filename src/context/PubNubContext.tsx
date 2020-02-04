import React from 'react';
import PubNub from 'pubnub';

export interface PubNubContextValue {
  client: PubNub;
}

export const PubNubContext = React.createContext<PubNubContextValue | null>(
  null
);
