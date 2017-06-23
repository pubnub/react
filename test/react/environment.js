/*eslint no-undef: "describe it"*/

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Mock1, Mock2 } from '../mocks';
import { config } from '../testHelper';

require('../../react-environment/dom-mock')('<html><body></body></html>');

const mock1 = mount(<Mock1 keys={ config.demo }/>);
const mock2 = mount(<Mock2 keys={ config.demo }/>);


describe('#environment test', () => {
  it('it is to able to make an instance', () => {
    expect(mock1.nodes[0].pubnub).to.not.be.null;
  });

  it('it is to able to return the origin instance', () => {
    expect(mock1.nodes[0].pubnub.getOriginalInstance()).to.not.be.null;
  });

  it('it is to able to initialize states', () => {
    expect(mock1.state()).to.not.be.null;
    expect(mock1.state().pn_messages).to.be.an('object');
    expect(mock1.state().pn_presence).to.be.an('object');
    expect(mock1.state().pn_status).to.be.an('object');
  });

  it('it is to able to set states without affecting states already defined', () => {
    expect(mock2.state()).to.not.be.null;
    expect(mock2.state().name).to.be.equal('PubNub React SDK');
    expect(mock2.state().pn_messages).to.be.an('object');
    expect(mock2.state().pn_presence).to.be.an('object');
    expect(mock2.state().pn_status).to.be.an('object');
  });
});
