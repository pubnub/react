import React, { Component } from 'react';
import PubNub from '../../src/pubnub-react';

export class Mock1 extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNub(props.keys);
  }
  componentDidMount() {
    this.pubnub.init(this);
  }

  render() {
    return (
      <div>
      <span>PubNub React SDK Test Environment</span>
    </div>
    );
  }
}
