import update from 'immutability-helper';

function init(instance, channel) {
  if (instance._component.state.pn_messages[channel]) {
    return false;
  }

  instance._component.setState(prevState => ({
    pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
  }));

  return true;
}

export function getMessage(channel, callback) {
  this._broadcast.message(channel, callback);

  if (init(this, channel)) {
    this._autoload.getHistory(channel, callback);
  }

  if (!this._listener.message) {
    this._listener.message = (received) => {
      if (!this._broadcast.isSubscribe('message', received.channel)) {
        return true;
      }

      this._component.setState(prevState => ({
        pn_messages: update(prevState.pn_messages, { [received.channel]: { $push: [received] } })
      }));

      this._broadcast.emit('message', received.channel, received);
    };
  }

  if (this._component.state && this._component.state.pn_messages) {
    return this._component.state.pn_messages[channel];
  } else {
    return [];
  }
}
