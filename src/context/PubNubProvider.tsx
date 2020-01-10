import React from 'react';
import PubNub from 'pubnub';

import { getPubNubContext } from './PubNubContext';
import invariant from '../invariant';

export interface PubNubProviderProps<T> {
  client: T;
  children: React.ReactNode | React.ReactNode[] | null;
}
export const PubNubProvider: React.FC<PubNubProviderProps<PubNub>> = ({
  client,
  children,
}) => {
  const PubNubContext = getPubNubContext();
  return (
    <PubNubContext.Consumer>
      {(context = {}) => {
        const newContext = { client: client, ...context };

        invariant(
          newContext.client,
          'PubNubProvider was not passed a client instance. Make ' +
            'sure you pass in your client via the "client" prop.'
        );

        return (
          <PubNubContext.Provider value={newContext}>
            {children}
          </PubNubContext.Provider>
        );
      }}
    </PubNubContext.Consumer>
  );
};
