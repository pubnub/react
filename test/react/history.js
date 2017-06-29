/*eslint no-undef: "describe it"*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';
import { config, getRandomChannel } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ config.demoWithHistoryRetention }/>);

mock1.node.pubnub.init(mock1.node);

mock1.node.pubnub.subscribe({ channels: [config.channelWithHistory], autoload: 100 });

describe('#autload', () => {
  it('Get messages from a channel with history', (done) => {
    let t = mock1.node.pubnub.history({
      channel : config.channelWithHistory,
      reverse : false
    });

    t.then(function(r){
      expect(r.messages).to.have.length(100);
      done();
    });
  });

  it('Should be to recovery history messages from a channel', (done) => {
    mock1.node.pubnub.getMessage(config.channelWithHistory, () => {
      expect(mock1.state().pn_messages[config.channelWithHistory]).to.have.length(100);
      done();
    });
  }).timeout(2000);

  it('it is to able to retrieve the stack of message received', (done) => {
    let stack = mock1.node.pubnub.getMessage(config.channelWithHistory);
    expect(stack).length.to.have.length(100);
    done();
  });
});