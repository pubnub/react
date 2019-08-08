import React from 'react';
import { invariant } from 'ts-invariant';
import { getPubNubContext } from '../context/PubNubContext';

export function usePubNub(): any {
  const { client } = React.useContext(getPubNubContext());
  invariant(
    client,
    'No PubNub Client instance can be found. Please ensure that you ' +
      'have called `PubNubProvider` higher up in your tree.'
  );
  return client!;
}
