import update from 'immutability-helper';

function setState(instance, channel) {
  if (instance._component.state.pn_messages[channel]) {
    return true;
  }

  instance._component.setState(prevState => ({
    pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
  }));
}

export function getMessage(channel, callback) {
  this._broadcast.message(channel, callback);
  this._autoload.getHistory(channel, callback);

  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      setState(this, ch);
    });
  } else {
    setState(this, channel);
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
}
