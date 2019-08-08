import React from 'react';
import { invariant } from 'ts-invariant';
import { getPubNubContext } from './PubNubContext';

export interface PubNubProviderProps<T> {
  client: T;
  children: React.ReactNode | React.ReactNode[] | null;
}
export const PubNubProvider: React.FC<PubNubProviderProps<any>> = ({
  client,
  children,
}) => {
  const PubNubContext = getPubNubContext();
  return (
    <PubNubContext.Consumer>
      {(context = {}) => {
        if (client && context.client !== client) {
          context = Object.assign({}, context, { client });
        }

        invariant(
          context.client,
          'PubNubProvider was not passed a client instance. Make ' +
            'sure you pass in your client via the "client" prop.'
        );

        return (
          <PubNubContext.Provider value={context}>
            {children}
          </PubNubContext.Provider>
        );
      }}
    </PubNubContext.Consumer>
  );
};
