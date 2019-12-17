const faker = require('faker')
faker.locale = 'ru';

function makeMsgs(msgCount, author) {
  let res = []

  res.length = msgCount

  res.fill({})

  res = res.map((msg, m) => {
    let isMe = !!Math.round(Math.random())

    return {
      id: faker.random.uuid(),
      author: isMe ? '__CURRENT_USER__' : author,
      date: faker.date.past(),
      text: faker.lorem.sentences()
    }
  })

  res = res.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  })

  return res
}

function makeUsers(opts) {
  let res = {}
  let { userCount, msgCount } = opts

  for (let i = 0; i < userCount; i++) {
    let userId = faker.random.uuid()
    let userName = faker.name.firstName()
    let dialog = {
      userId,
      userName,
      history: makeMsgs(msgCount, userName)
    }
    res[userId] = dialog
  }

  return res
}

module.exports = makeUsers