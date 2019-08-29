import React, { useContext } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from '../PubNubProvider';
import { getPubNubContext } from '../PubNubContext';
import { render, cleanup } from '@testing-library/react';

describe('<PubNubProvider /> component', () => {
  afterEach(cleanup);

  const pubNubClient = new PubNub({
    publishKey: 'x',
    subscribeKey: 'y',
  });

  it('has an error when PubNubProvider was not passed a client instance', () => {
    const originalConsoleError = console.error;
    console.error = () => {};

    expect(() => {
      // Reset the context before testing
      const PubNubContext = getPubNubContext();
      render(
        <PubNubContext.Provider value={{}}>
          <PubNubProvider client={undefined}></PubNubProvider>
        </PubNubContext.Provider>
      );
    }).toThrowError(
      'PubNubProvider was not passed a client instance. Make ' +
        'sure you pass in your client via the "client" prop.'
    );

    console.error = originalConsoleError;
  });

  it('should pass a client instance to the children context', () => {
    const Child = () => {
      const context = useContext(getPubNubContext());
      expect(context.client).toEqual(pubNubClient);
      return null;
    };

    render(
      <PubNubProvider client={pubNubClient}>
        <Child />
      </PubNubProvider>
    );
  });
});
