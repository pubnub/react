/*eslint no-undef: "describe it"*/

import React from 'react';
import PubNub from 'pubnub';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1 } from '../mocks';
import { config, getRandomChannel } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ config.demo }/>);

const channelA = getRandomChannel();
const channelB = getRandomChannel();

mock1.node.pubnub.init(mock1.node);

mock1.node.pubnub.subscribe({ channels: [channelA, channelB], withPresence: true });

let p = new PubNub(config.demo);

describe('#clean and release methods', () => {
  it('init the test', (done) => {
    mock1.node.pubnub.getMessage(channelA, (msg) => {
      expect(msg.message).to.be.equal('hello world!');
      done();
    });

    mock1.node.pubnub.getMessage(channelB, (msg) => {
      expect(msg.message).to.be.equal('hello world!');
    });

    mock1.node.pubnub.getStatus(() => {
      mock1.node.pubnub.publish({ channel: channelA, message: 'hello world!'});
      mock1.node.pubnub.publish({ channel: channelB, message: 'hello world!'});
    });
  }).timeout(2500);

  it('validate stack', (done) => {
    expect(mock1.state().pn_messages[channelA][0].message).to.be.equal('hello world!');
    done();
  });

  it('validate presence', (done) => {
    mock1.node.pubnub.getPresence(channelB, (ps) => {
      expect(ps.action).to.be.equal('join');
      expect(ps.channel).to.be.equal(channelB);
      done();
    });

    p.subscribe({ channels: [channelB], withPresence: true });

  }).timeout(2500);

  it('it is able to clean the stack', (done) => {
    mock1.node.pubnub.clean(channelA);
    expect(mock1.state().pn_messages[channelA]).to.have.length(0);
    done();
  });

  it('it is able to left stacks untouchable', (done) => {
    expect(mock1.state().pn_messages[channelB]).to.have.length(1);
    done();
  });

  it('it is able to clean the presence', (done) => {
    mock1.node.pubnub.clean(channelB);
    expect(mock1.state().pn_presence[channelB]).to.be.empty;
    done();
  });

  it('it is able to release the stack', (done) => {
    mock1.node.pubnub.release(channelB);
    expect(mock1.state().pn_messages[channelB]).to.be.equal(undefined);
    done();
  });
});
