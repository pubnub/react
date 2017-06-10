import update from 'immutability-helper';

let _listener;

export function getMessage(channel, callback) {
  this._broadcast.message(channel, callback);

  this._component.setState(prevState => ({
    pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
  }));

  if (!this._listener.message) {
    this._listener.message = (received) => {
      // if (this._trigger.isSubscribe(received.channel)) {
      //   return 0;
      // }

      this._component.setState(prevState => ({
        pn_messages: update(prevState.pn_messages, { [received.channel]: { $push: [received] } })
      }));

      this._broadcast.emit('message', received.channel, received);
    }
  }
}
