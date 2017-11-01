/*eslint no-undef: "describe it"*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';
import { config, getRandomChannel } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ config.demo }/>);

const channelA = getRandomChannel();
const channelB = getRandomChannel();

mock1.node.pubnub.init(mock1.node);

describe('#message event', () => {
  it('it is to able to invoke a render if the messages are received', (done) => {
    expect(mock1.state().pn_messages).to.be.an('object');
    done();
  });

  it('it is to able to receive a message of a channel subscribed', (done) => {

    mock1.node.pubnub.getMessage(channelA, (msg) => {
      expect(msg).to.be.an('object');
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: channelA, message: 'hello world!'});
    });

    mock1.node.pubnub.subscribe({ channels: [channelA, channelB] });

  }).timeout(2000);

  it('it is to able to retrieve the stack of message received', (done) => {
    let stack = mock1.node.pubnub.getMessage(channelA);
    expect(stack).length.to.have.length(1);
    done();
  });

  it('it is to able to update the state: pn_message', (done) => {
    expect(mock1.state().pn_messages[channelA][0].message).to.be.equal('hello world!');
    done();
  });

  it('it is to able to trim the stack of messages', (done) => {
    let counter = 0;
    mock1.node.pubnub.getMessage(channelB, () => {
      counter += 1;
      if (counter === 4) {
        expect(mock1.node.pubnub.getMessage(channelB)).length.to.have.length(3);
        done();
      }
    }, 3);

    for (let i = 1; i <= 4; i++) {
      mock1.node.pubnub.publish({ channel: channelB, message: `message-${i}`});
    }
  }).timeout(5000);
});
