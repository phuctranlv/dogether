/* eslint-disable comma-dangle */
const faker = require('faker');
const fs = require('fs');

// users table:
const usersNumberOfPrimaryRecords = 10000; // users are primary
const usersMaxNumberOfSecondaryRecords = 100; // a user could have up to 100 friends (secondary)
const usersTable = {
  userId: [],
  userName: [],
  avatar: [],
  friendUserId: [],
  friendUserName: []
};

// tasks table:
const tasksNumberOfPrimaryRecords = 100000; // users are primary
const tasksTable = {
  taskId: [],
  task: [],
  note: [],
  current: [],
  share: [],
  userId: [],
  userName: []
};

// conversations table:
const convoNumberOfPrimaryRecords = 10000;
const convoNumberOfSecondaryRecords = 100; // a conversation could have up to 100 messages
const conversations = {
  userId1: [],
  userName1: [],
  avatar1: [],
  userId2: [],
  userName2: [],
  avatar2: [],
  conversation: [],
};

// create users data:
for (let i = 0; i < usersNumberOfPrimaryRecords; i += 1) {
  usersTable.userId.push(faker.random.uuid());
  usersTable.userName.push(`${faker.name.firstName()}.${faker.name.lastName()}${faker.random.number(2020)}`);
  usersTable.avatar.push(faker.image.avatar());
}
for (let i = 0; i < usersNumberOfPrimaryRecords; i += 1) {
  const friendUserIdArray = [];
  const friendUserNameArray = [];
  const numberOfFriends = faker.random.number(usersMaxNumberOfSecondaryRecords);
  if (numberOfFriends === 0) {
    usersTable.friendUserId.push(friendUserIdArray);
    usersTable.friendUserName.push(friendUserNameArray);
  } else {
    for (let j = 0; j < numberOfFriends; j += 1) {
      let friendId = faker.random.number(usersNumberOfPrimaryRecords);
      if (friendId === usersNumberOfPrimaryRecords) {
        friendId -= 1;
      }
      const friendUserId = usersTable.userId[friendId];
      const friendUserName = usersTable.userName[friendId];
      friendUserIdArray.push(friendUserId);
      friendUserNameArray.push(friendUserName);
    }
  }
  usersTable.friendUserId.push(friendUserIdArray);
  usersTable.friendUserName.push(friendUserNameArray);
}

// create tasks and similar tasks data:
for (let i = 0; i < tasksNumberOfPrimaryRecords; i += 1) {
  tasksTable.taskId.push(faker.random.uuid());
  tasksTable.task.push(faker.random.word('string').replace(',', ''));
  tasksTable.note.push(faker.lorem.sentence(10));
  tasksTable.current.push(faker.random.boolean());
  tasksTable.share.push(faker.random.boolean());
  let id = faker.random.number(usersNumberOfPrimaryRecords);
  if (id === usersNumberOfPrimaryRecords) {
    id -= 1;
  }
  const userId = usersTable.userId[id];
  const userName = usersTable.userName[id];
  tasksTable.userId.push(userId);
  tasksTable.userName.push(userName);
}

// create conversations data:
for (let i = 0; i < convoNumberOfPrimaryRecords; i += 1) {
  let id1 = faker.random.number(usersNumberOfPrimaryRecords);
  if (id1 === usersNumberOfPrimaryRecords) {
    id1 -= 1;
  }
  const userId1 = usersTable.userId[id1];
  const userName1 = usersTable.userName[id1];
  const avatar1 = usersTable.avatar[id1];
  let id2 = faker.random.number(usersNumberOfPrimaryRecords);
  if (id2 === usersNumberOfPrimaryRecords) {
    id2 -= 1;
  }
  const userId2 = usersTable.userId[id2];
  const userName2 = usersTable.userName[id2];
  const avatar2 = usersTable.avatar[id2];
  conversations.userId1.push(userId1);
  conversations.userName1.push(userName1);
  conversations.avatar1.push(avatar1);
  conversations.userId2.push(userId2);
  conversations.userName2.push(userName2);
  conversations.avatar2.push(avatar2);
}

for (let i = 0; i < convoNumberOfPrimaryRecords; i += 1) {
  const conversation = [];
  const numberOfMessages = faker.random.number(convoNumberOfSecondaryRecords) + 1;
  for (let j = 0; j < numberOfMessages; j += 1) {
    const convo = {};
    convo.messageId = faker.random.uuid();
    convo.message = faker.lorem.sentence(10);
    convo.chatter = faker.random.boolean();
    convo.time = faker.date.past(10);
    conversation.push(convo);
  }
  conversations.conversation.push(conversation);
}


// create users file
const usersFileWriteStream = fs.createWriteStream('usersData.txt');
console.log('Writing users to a file');

function writeAlotUsers(writer, callback) {
  let i = usersNumberOfPrimaryRecords;
  let id = -1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let data;
      if (usersTable.friendUserId[id][0] === undefined) {
        data = `${usersTable.userId[id]},${usersTable.userName[id]},${usersTable.avatar[id]},${usersTable.userId[id]},${usersTable.userName[id]}\n`;
        if (i === 0) {
          writer.write(data, callback);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = writer.write(data);
        }
      } else {
        for (let j = 0; j < usersTable.friendUserId[id].length; j += 1) {
          data = `${usersTable.userId[id]},${usersTable.userName[id]},${usersTable.avatar[id]},${usersTable.friendUserId[id][j]},${usersTable.friendUserName[id][j]}\n`;
          if (i === 0) {
            writer.write(data, callback);
          } else {
            // see if we should continue, or wait
            // don't pass the callback, because we're not done yet.
            ok = writer.write(data);
          }
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAlotUsers(usersFileWriteStream, () => { usersFileWriteStream.end(); });

// create tasks file:
const tasksFileWriteStream = fs.createWriteStream('tasksData.txt');
console.log('Writing tasks to a file');

function writeAlotTasks(writer, callback) {
  let i = tasksNumberOfPrimaryRecords;
  let id = -1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = `${tasksTable.taskId[id]},${tasksTable.task[id]},${tasksTable.note[id]},${tasksTable.current[id]},${tasksTable.share[id]},${tasksTable.userId[id]},${tasksTable.userName[id]}\n`;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAlotTasks(tasksFileWriteStream, () => { tasksFileWriteStream.end(); });

// create conversations file:
const conversationsFileWriteStream = fs.createWriteStream('conversationsData.txt');
console.log('Writing conversations to a file');

function writeAlotConversations(writer, callback) {
  let i = convoNumberOfPrimaryRecords;
  let id = -1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let data;
      for (let j = 0; j < conversations.conversation[id].length; j += 1) {
        data = `${conversations.userId1[id]},${conversations.userName1[id]},${conversations.avatar1[id]},${conversations.userId2[id]},${conversations.userName2[id]},${conversations.avatar2[id]},${conversations.conversation[id][j].messageId},${conversations.conversation[id][j].message},${conversations.conversation[id][j].chatter},${conversations.conversation[id][j].time}\n`;
        if (i === 0) {
          writer.write(data, callback);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = writer.write(data);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAlotConversations(conversationsFileWriteStream, () => { conversationsFileWriteStream.end(); });
