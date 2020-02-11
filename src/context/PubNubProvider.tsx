import React from 'react';
import PubNub from 'pubnub';
import invariant from 'ts-invariant';

import { PubNubContext } from './PubNubContext';

export interface PubNubProviderProps<PubNubInstance> {
  client: PubNubInstance;
  children: React.ReactNode | React.ReactNode[] | null;
}

function appendPnsdk(pubnub: any) {
  if (typeof pubnub._addPnsdkSuffix === 'function') {
    pubnub._addPnsdkSuffix('React/__VERSION__');
  }
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

  React.useEffect(() => {
    appendPnsdk(contextValue.client);
  }, []);

  return (
    <PubNubContext.Provider value={contextValue}>
      {children}
    </PubNubContext.Provider>
  );
};
