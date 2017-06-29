/*eslint no-undef: "describe it"*/

import React from 'react';
import PubNub from 'pubnub';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock2 } from '../mocks';
import { config, getRandomChannel } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock2 = mount(<Mock2 keys={ config.demo }/>);

const channelA = getRandomChannel();
const channelB = getRandomChannel();

mock2.node.pubnub.init(mock2.node);

mock2.node.pubnub.subscribe({ channels: [channelA, channelB], withPresence: true });

let p = new PubNub(config.demo);

describe('#presence event', () => {
  it('it is to able to invoke a render if the presence is invoked', (done) => {
    expect(mock2.state().pn_presence).to.be.an('object');
    done();
  });

  it('it is to able to receive the presence from PN network', (done) => {
    mock2.node.pubnub.getPresence(channelA, (ps) => {
      expect(ps.action).to.be.equal('join');
      expect(ps.channel).to.be.equal(channelA);
      done();
    });

    p.subscribe({ channels: [channelA], withPresence: true });

  }).timeout(2000);

  it('it is to able to retrieve the presence from state', (done) => {

    let ps = mock2.node.pubnub.getPresence(channelA)
    expect(ps.action).to.be.equal('join');
    expect(ps.channel).to.be.equal(channelA);
    done();
  }).timeout(2000);
});
