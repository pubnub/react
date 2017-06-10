import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock2 = mount(<Mock1 keys={ { subscribeKey: 'demo', publishKey: 'demo' } }/>);

mock2.node.pubnub.init(mock2.node);

describe('#message event', () => {
  it('it is to able to invoke a render if the messages are received', (done) => {
    expect(mock2.state().pn_messages).to.be.an('object');
    done();
  });

  it('it is to able to receive a message of a channel subscribed', (done) => {

    mock2.node.pubnub.getMessage('channel_2', (msg) => {
      expect(msg).to.be.an('object');
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock2.node.pubnub.getStatus(() => {
      mock2.node.pubnub.publish({ channel: 'channel_2', message: 'hello world!'});
    });


    mock2.node.pubnub.subscribe({ channels: ['channel_2'] });

  }).timeout(2000);

  it('it is to able to update the state: pn_message', (done) => {
    // console.log(mock2.state().pn_messages.channel_2[0]);
    expect(mock2.state().pn_messages.channel_2[0].message).to.be.equal('hello world!');
    done();
  });
});
