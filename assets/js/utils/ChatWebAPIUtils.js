import ChatServerActionCreators from '../actions/ChatServerActionCreators';

export default {
  getAllMessages: () => {
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    ChatServerActionCreators.receiveAll(rawMessages);
  },
  createMessage: (message, threadName) => {
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));
    setTimeout(() => ChatServerActionCreators.receiveCreatedMessage(createdMessage), 0);
  }
};
