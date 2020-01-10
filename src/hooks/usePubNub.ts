import { useContext } from 'react';
import PubNub from 'pubnub';

import { getPubNubContext } from '../context/PubNubContext';
import invariant from '../invariant';

export function usePubNub(): PubNub {
  const { client } = useContext(getPubNubContext());

  invariant(
    client,
    'No PubNub Client instance can be found. Please ensure that you ' +
      'have called `PubNubProvider` higher up in your tree.'
  );

  return client;
}
