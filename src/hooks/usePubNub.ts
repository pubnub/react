import { useContext } from 'react';
import PubNub from 'pubnub';

import { PubNubContext } from '../context/PubNubContext';
import invariant from '../invariant';

export function usePubNub(): PubNub {
  const context = useContext(PubNubContext);

  invariant(
    context?.client,
    'No PubNub Client instance can be found. Please ensure that you ' +
      'have called `PubNubProvider` higher up in your tree.'
  );

  return context.client;
}
