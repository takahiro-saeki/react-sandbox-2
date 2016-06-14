import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import {EventEmitter} from 'events';
import MessageStore from '../stores/MessageStore';
import ThreadStore from '../stores/ThreadStore';
import assign from 'object-assign';

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var UnreadThreadStore = assign({}, EventEmitter.prototype, {
  emitChange: () => this.emit(CHANGE_EVENT),
  addChangeListener: callback => this.on(CHANGE_EVENT, callback),
  removeChangeListener: callback => this.removeListener(CHANGE_EVENT, callback),
  getCount: () => {
    var threads = ThreadStore.getAll();
    var unreadCount = 0;
    for (var id in threads) {
      if (!threads[id].lastMessage.isRead) {
        unreadCount++;
      }
    }
    return unreadCount;
  }
});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(action => {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);
  switch (action.type) {
    case ActionTypes.CLICK_THREAD:
      UnreadThreadStore.emitChange();
      break;
    case ActionTypes.RECEIVE_RAW_MESSAGES:
      UnreadThreadStore.emitChange();
      break;
    default:
      // do nothing
  }
});

export default UnreadThreadStore;
