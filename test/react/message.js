/*eslint no-undef: "describe it"*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ { subscribeKey: 'demo', publishKey: 'demo' } }/>);

mock1.node.pubnub.init(mock1.node);

describe('#message event', () => {
  it('it is to able to invoke a render if the messages are received', (done) => {
    expect(mock1.state().pn_messages).to.be.an('object');
    done();
  });

  it('it is to able to receive a message of a channel subscribed', (done) => {

    mock2.node.pubnub.getMessage('channel_2', (msg) => {
      expect(msg).to.be.an('object');
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus((st) => {
      mock1.node.pubnub.publish({ channel: 'channel_2', message: 'hello world!'});
    });

    mock1.node.pubnub.subscribe({ channels: ['channel_2'] });

  }).timeout(2000);

  it('it is to able to support multi channels at the same time', (done) => {
    mock1.node.pubnub.getMessage(['channel_3', 'channel_4'], (msg) => {
      expect(msg).to.be.an('object');
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: 'channel_3', message: 'hello world!'});
    });


    mock1.node.pubnub.subscribe({ channels: ['channel_3', 'channel_4'] });
  }).timeout(2000);

  it('it is to able to update the state: pn_message', (done) => {
    expect(mock1.state().pn_messages.channel_2[0].message).to.be.equal('hello world!');
    done();
  });
});
