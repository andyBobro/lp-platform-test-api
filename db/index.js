const chats = require('./chats.js');

let chatList = chats({
  userCount: 10,
  msgCount: 20
})

let userList = Object.keys(chatList).map((chatId) => {
  return {
    id: chatId,
    name: chatList[chatId].userName,
    lastMsg: chatList[chatId].history[chatList[chatId].history.length - 1],
    msgCount: chatList[chatId].history.length
  }
})

module.exports = {
  chats: chatList,
  userList
}
