import { useContext } from 'react';
import PubNub from 'pubnub';

import { PubNubContext } from '../context/PubNubContext';

export function usePubNub(): PubNub {
  const context = useContext(PubNubContext);

  if (!context || !context.client) {
    console.error(
      'No PubNub Client instance can be found. Please ensure that you ' +
        'have called `PubNubProvider` higher up in your tree.'
    );
  }

  return context!.client;
}
