import { useContext } from 'react';
import PubNub from 'pubnub';
import invariant from 'ts-invariant';

import { PubNubContext } from '../context/PubNubContext';

export function usePubNub(): PubNub {
  const context = useContext(PubNubContext);

  invariant(
    context && context.client,
    'No PubNub Client instance can be found. Please ensure that you ' +
      'have called `PubNubProvider` higher up in your tree.'
  );

  return context!.client;
}
