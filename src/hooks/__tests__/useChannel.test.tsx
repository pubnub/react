import React from 'react';
import PubNub from 'pubnub';
import { cleanup, render } from '@testing-library/react';
import { PubNubProvider } from '../../context/PubNubContext';
import { useChannel } from '../useChannel';

describe('useChannel hook', () => {
  afterEach(cleanup);

  let pubNubClient: PubNub;

  beforeEach(() => {
    if (pubNubClient) {
      pubNubClient.unsubscribeAll();
    }

    pubNubClient = new PubNub({
      publishKey: 'x',
      subscribeKey: 'y',
    });
  });

  it('should return publish and unsubscribe functions', () => {
    const Child = () => {
      const { publish, unsubscribe } = useChannel(['myChannel'], message => {
        console.log(message);
      });

      expect(publish).toBeDefined();
      expect(unsubscribe).toBeDefined();

      return null;
    };

    render(
      <PubNubProvider client={pubNubClient}>
        <Child />
      </PubNubProvider>
    );
  });

  it('should call subscribe and addListeners as soon as mounted', () => {
    const Child = () => {
      const channel = useChannel(['myChannel'], message => {
        console.log(message);
      });

      channel.publish('myChannel', { message: 'Hello world' });

      return null;
    };

    pubNubClient.subscribe = jest.fn();
    pubNubClient.addListener = jest.fn();
    pubNubClient.publish = jest.fn();

    render(
      <PubNubProvider client={pubNubClient}>
        <Child />
      </PubNubProvider>
    );

    expect(pubNubClient.subscribe).toHaveBeenCalledTimes(1);
    expect(pubNubClient.addListener).toHaveBeenCalledTimes(1);
    expect(pubNubClient.publish).toHaveBeenCalledTimes(1);
  });
});
