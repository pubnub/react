import React from 'react';
import PubNub from 'pubnub';

import { getPubNubContext, PubNubContextValue } from './PubNubContext';
import invariant from '../invariant';

export interface PubNubConsumerProps {
  children: (client: PubNub) => React.ReactChild | null;
}

export const PubNubConsumer: React.FC<PubNubConsumerProps> = props => {
  const PubNubContext = getPubNubContext();
  return (
    <PubNubContext.Consumer>
      {(context: PubNubContextValue | null) => {
        invariant(
          context?.client,
          'Could not find "client" in the context of PubNubConsumer. ' +
            'Wrap the root component in an <PubNubProvider>.'
        );

        return props.children(context.client);
      }}
    </PubNubContext.Consumer>
  );
};
