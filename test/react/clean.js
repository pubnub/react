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

describe('#clean method', () => {
  it('init the test', (done) => {
    mock1.node.pubnub.getMessage('channel_22', (msg) => {
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: 'channel_22', message: 'hello world!'});
    });
  }).timeout(2000);

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

  }).timeout(2000);

  it('it is able to clean the stack', (done) => {
    mock1.node.pubnub.clean('channel_22');
    expect(mock1.state().pn_messages['channel_22']).to.have.length(0);
    done();
  });

  it('it is able to clean the presence', (done) => {
    mock1.node.pubnub.clean(['channel_22', 'channel_23']);
    expect(mock1.state().pn_presence['channel_23']).to.be.empty;
    done();
  });
});
