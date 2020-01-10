import React from 'react';
import PubNub from 'pubnub';

import invariant from '../invariant';

export interface PubNubContextValue {
  client: PubNub;
}

export const PubNubContext = React.createContext<PubNubContextValue | null>(
  null
);

export interface PubNubProviderProps<T> {
  client: T;
  children: React.ReactNode | React.ReactNode[] | null;
}

export const PubNubProvider: React.FC<PubNubProviderProps<PubNub>> = ({
  client,
  children,
}) => {
  const contextValue = React.useMemo(() => {
    return { client };
  }, [client]);

  invariant(
    contextValue.client,
    'PubNubProvider was not passed a client instance. Make ' +
      'sure you pass in your client via the "client" prop.'
  );

  return (
    <PubNubContext.Provider value={contextValue}>
      {children}
    </PubNubContext.Provider>
  );
};
