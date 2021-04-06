import React from 'react';
import PubNub from 'pubnub';
import { PubNubContext } from './PubNubContext';

export interface PubNubConsumerProps {
  children: (client: PubNub) => React.ReactChild | null;
}

export const PubNubConsumer: React.FC<PubNubConsumerProps> = ({ children }) => {
  const context = React.useContext(PubNubContext);

  if (!context || !context.client) {
    throw new Error(
      'Could not find "client" in the context of PubNubConsumer. ' +
        'Wrap the root component in an <PubNubProvider>.'
    );
  }

  return <>{children(context!.client)}</>;
};
