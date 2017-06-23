/*eslint no-undef: "describe it"*/

import React from 'react';
import PubNub from 'pubnub';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ { subscribeKey: 'demo', publishKey: 'demo' } }/>);

mock1.node.pubnub.init(mock1.node);

mock1.node.pubnub.subscribe({ channels: ['channel_22', 'channel_23'], withPresence: true });

let p = new PubNub({ subscribeKey: 'demo', publishKey: 'demo' });

describe('#clean and release methods', () => {
  it('init the test', (done) => {
    mock1.node.pubnub.getMessage(['channel_22', 'channel_23'], (msg) => {
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: 'channel_22', message: 'hello world!'});
      mock1.node.pubnub.publish({ channel: 'channel_23', message: 'hello world!'});
    });
  }).timeout(2500);

  it('validate stack', (done) => {
    expect(mock1.state().pn_messages['channel_22'][0].message).to.be.equal('hello world!');
    done();
  });

  it('validate presence', (done) => {
    mock1.node.pubnub.getPresence('channel_23', (ps) => {
      expect(ps.action).to.be.equal('join');
      expect(ps.channel).to.be.equal('channel_23');
      done();
    });

    p.subscribe({ channels: ['channel_23'], withPresence: true });

  }).timeout(2500);

  it('it is able to clean the stack', (done) => {
    mock1.node.pubnub.clean('channel_22');
    expect(mock1.state().pn_messages['channel_22']).to.have.length(0);
    done();
  });

  it('it is able to left stacks untouchable', (done) => {
    expect(mock1.state().pn_messages['channel_23']).to.have.length(1);
    done();
  });

  it('it is able to clean the presence', (done) => {
    mock1.node.pubnub.clean(['channel_22', 'channel_23']);
    expect(mock1.state().pn_presence['channel_23']).to.be.empty;
    done();
  });

  it('it is able to release the stack', (done) => {
    mock1.node.pubnub.release('channel_22');
    done();
  });

  it('it is able to release a set of channels', (done) => {
    mock1.node.pubnub.release(['channel_22', 'channel_23']);
    done();
  });
});
