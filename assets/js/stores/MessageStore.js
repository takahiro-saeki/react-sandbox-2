import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtils';
import {EventEmitter} from 'events';
import ThreadStore from '../stores/ThreadStore';
import assign from 'object-assign';

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var _messages = {};

function _addMessages(rawMessages) {
  rawMessages.forEach(message => {
    if (!_messages[message.id]) {
      _messages[message.id] = ChatMessageUtils.convertRawMessage(
        message,
        ThreadStore.getCurrentID()
      );
    }
  });
}

function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

var MessageStore = assign({}, EventEmitter.prototype, {
  emitChange: () => this.emit(CHANGE_EVENT),
  addChangeListener: callback => this.on(CHANGE_EVENT, callback),
  removeChangeListener: callback => this.removeListener(CHANGE_EVENT, callback),
  get: id => _messages[id],
  getAll: () => _messages,
  getAllForThread: threadID => {
    var threadMessages = [];
    for (var id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  },
  getAllForCurrentThread: () => this.getAllForThread(ThreadStore.getCurrentID())
});

MessageStore.dispatchToken = ChatAppDispatcher.register(action => {
  switch(action.type) {
    case ActionTypes.CLICK_THREAD:
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      _messages[message.id] = message;
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages);
      ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = MessageStore;
