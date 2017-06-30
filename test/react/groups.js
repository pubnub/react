/*eslint no-undef: "describe it"*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';
import { config, getRandomChannel, getRandomChannelGroup } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ config.with_channel_groups }/>);

const channelA = getRandomChannel();
const channelB = getRandomChannel();
const channelC = getRandomChannel();

const channelGroup = getRandomChannelGroup();

mock1.node.pubnub.init(mock1.node);

describe('#groups', () => {
  it('it is abble to create a channel group', (done) => {
    mock1.node.pubnub.channelGroups.addChannels(
      {
        channels: [channelA, channelB, channelC],
        channelGroup: channelGroup
      },
      (status) => {
        expect(status.error).to.be.equal(false);
        done();
      }
    );
  });

  it('it is to able to receive a message of a channelGroup subscribed', (done) => {
    mock1.node.pubnub.getMessage(channelA);
    mock1.node.pubnub.getMessage(channelGroup, (msg) => {
      expect(msg).to.be.an('object');
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: channelA, message: 'hello world!'});
    });

    mock1.node.pubnub.subscribe({ channelGroups: [channelGroup] });

  }).timeout(2000);

  it('it is to able to retrieve the stack of messages received', (done) => {
    let stack1 = mock1.node.pubnub.getMessage(channelGroup);
    let stack2 = mock1.node.pubnub.getMessage(channelA);

    expect(stack1).length.to.have.length(1);
    expect(stack2).length.to.have.length(1);

    done();
  });

  it('it is to able to update the state: pn_message', (done) => {
    expect(mock1.state().pn_messages[channelGroup][0].message).to.be.equal('hello world!');
    expect(mock1.state().pn_messages[channelA][0].message).to.be.equal('hello world!');
    done();
  });
});
