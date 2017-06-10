import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock2 } from '../mocks';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock2 = mount(<Mock2 keys={ { subscribeKey: 'demo', publishKey: 'demo' } }/>);

mock2.node.pubnub.init(mock2.node);

describe('#status event', () => {
  it('it is to able to invoke a render if the status change', (done) => {
    expect(mock2.state().pn_status).to.be.an('object');
    done();
  });

  it('it is to able to receive the status from PN network', (done) => {
    mock2.node.pubnub.getStatus((st) => {
      expect(st.category).to.be.equal('PNConnectedCategory');
      done();
    });

    mock2.node.pubnub.subscribe({ channels: ['channel_1'] });
  }).timeout(2000);

  it('it is to able to update the state: pn_status', (done) => {
    expect(mock2.state().pn_status.category).to.be.equal('PNConnectedCategory');
    done();
  });
});