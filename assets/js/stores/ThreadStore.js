import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import ChatConstants from '../constants/ChatConstants';
import ChatMessageUtils from '../utils/ChatMessageUtils';
import {EventEmitter} from 'events';
import assign from 'object-assign';

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentID = null;
var _threads = {};

const ThreadStore = assign({}, EventEmitter.prototype, {
  init: rawMessages => {
    rawMessages.forEach(message => {
      var threadID = message.threadID;
      var thread = _threads[threadID];
      if (thread && thread.lastMessage.timestamp > message.timestamp) {
        return;
      }
      _threads[threadID] = {
        id: threadID,
        name: message.threadName,
        lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
      };
    });

    if (!_currentID) {
      var allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }

    _threads[_currentID].lastMessage.isRead = true;
  },
  emitChange: () => this.emit(CHANGE_EVENT),
  addChangeListener: callback => this.on(CHANGE_EVENT, callback),
  removeChangeListener: callback => this.removeListener(CHANGE_EVENT, callback),
  get: id => _threads[id],
  getAll: () => _threads,
  getAllChrono: () => {
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort((a, b) => {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  },
  getCurrentID: () => _currentID,
  getCurrent: () => this.get(this.getCurrentID())
});
ThreadStore.dispatchToken = ChatAppDispatcher.register(action => {
  switch(action.type) {
    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default ThreadStore;
