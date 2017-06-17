/*eslint no-undef: "describe it"*/

import React from 'react';
import PubNub from 'pubnub';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock2 } from '../mocks';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock2 = mount(<Mock2 keys={ { subscribeKey: 'demo', publishKey: 'demo' } }/>);

mock2.node.pubnub.init(mock2.node);

mock2.node.pubnub.subscribe({ channels: ['channel_4', 'channel_5', 'channel_6'], withPresence: true });

let p = new PubNub({ subscribeKey: 'demo', publishKey: 'demo' });

describe('#presence event', () => {
  it('it is to able to invoke a render if the presence is invoked', (done) => {
    expect(mock2.state().pn_presence).to.be.an('object');
    done();
  });

  it('it is to able to receive the presence from PN network', (done) => {
    mock2.node.pubnub.getPresence('channel_4', (ps) => {
      expect(ps.action).to.be.equal('join');
      expect(ps.channel).to.be.equal('channel_4');
      done();
    });

    p.subscribe({ channels: ['channel_4'], withPresence: true });

  }).timeout(2000);

  it('it is to able to support multi channels at the same time', (done) => {

    mock2.node.pubnub.getPresence(['channel_5', 'channel_6'], (ps) => {
      expect(ps.action).to.be.equal('join');
      expect(ps.channel).to.be.equal('channel_5');
      done();
    });

    p.subscribe({channels: ['channel_5'], withPresence: true});
  }).timeout(2000);
});
