import update from 'immutability-helper';

export function getMessage(channel, callback) {
  this._broadcast.message(channel, callback);

  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      this._component.setState(prevState => ({
        pn_messages: update(prevState.pn_messages, { $merge: { [ch]: [] } })
      }));
    });
  } else {
    this._component.setState(prevState => ({
      pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
    }));
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
