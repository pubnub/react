import React, { Component } from 'react';
import PubNub from '../../src/pubnub-react';

export class Mock2 extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNub(props.keys);
    this.state = { name: 'PubNub React SDK' };
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
