import React from 'react';
import PubNub from 'pubnub';
import { cleanup, render } from '@testing-library/react';
import { PubNubProvider } from '../../context/PubNubProvider';
import { usePubNub } from '../usePubNub';
import { resetPubNubContext } from '../../context/PubNubContext';

describe('usePubNub hook', () => {
  afterEach(() => {
    cleanup();
    resetPubNubContext();
  });

  const pubNubClient = new PubNub({
    publishKey: 'x',
    subscribeKey: 'y',
  });

  it('should have client instance provided', () => {
    const Child = () => {
      expect(usePubNub()).toEqual(pubNubClient);
      return null;
    };

    render(
      <PubNubProvider client={pubNubClient}>
        <Child />
      </PubNubProvider>
    );
  });

  it('should throw an error when client instance is not provided', () => {
    const Child = () => {
      expect(() => usePubNub()).toThrowError(
        'No PubNub Client instance can be found. Please ensure that you ' +
          'have called `PubNubProvider` higher up in your tree.'
      );
      return null;
    };

    render(<Child />);
  });
});
