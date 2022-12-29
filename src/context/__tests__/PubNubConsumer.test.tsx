import React from 'react';
import PubNub from 'pubnub';
import { render, cleanup } from '@testing-library/react';

import { PubNubContext, PubNubContextValue } from '../PubNubContext';
import { PubNubConsumer } from '../PubNubConsumer';
import { PubNubProvider } from '../PubNubProvider';

describe('<PubNubConsumer /> component', () => {
  afterEach(cleanup);

  const pubNubClient = new PubNub({
    publishKey: 'x',
    subscribeKey: 'y',
    uuid: 'z',
  });

  it('has a client instance provided', done => {
    render(
      <PubNubProvider client={pubNubClient}>
        <PubNubConsumer>
          {clientRender => {
            try {
              expect(clientRender).toBe(pubNubClient);
              done();
            } catch (e) {
              done.fail(e);
            }
            return null;
          }}
        </PubNubConsumer>
      </PubNubProvider>
    );
  });

  it('has error when client is not provided', () => {
    // Prevent Error about missing context type from appearing in the console.
    const errorLogger = console.error;
    console.error = () => {};

    expect(() => {
      render(
        <PubNubContext.Provider value={({} as unknown) as PubNubContextValue}>
          <PubNubConsumer>{() => null}</PubNubConsumer>
        </PubNubContext.Provider>
      );
    }).toThrowError(
      'Could not find "client" in the context of PubNubConsumer. ' +
        'Wrap the root component in an <PubNubProvider>.'
    );

    console.error = errorLogger;
  });
});
