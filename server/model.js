/* eslint-disable comma-dangle */
const faker = require('faker');
const client = require('../database/database');

const model = {
  users: {},
  conversations: {},
  tasks: {},
  similarTasks: {}
};

model.users.getUsersData = (req, cb) => {
  const query = 'SELECT * from users WHERE userid = ?';
  const params = [req.query.userId];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result.rows)));
      cb(null, JSON.parse(JSON.stringify(result.rows)));
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

model.conversations.getConversations = (req, cb) => {
  const query = 'SELECT * from conversations WHERE userid1 = ? AND userid2 = ?';
  const params = [req.query.userId1, req.query.userId2];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result.rows)));
      cb(null, JSON.parse(JSON.stringify(result.rows)));
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

model.conversations.postConversations = (req, cb) => {
  const query = 'INSERT INTO conversations (userid1, username1, avatar1, userid2, username2, avatar2, messageid, message, chatter, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [
    req.query.userId1,
    req.query.userName1,
    req.query.avatar1,
    req.query.userId2,
    req.query.userName2,
    req.query.avatar2,
    faker.random.uuid(),
    req.query.message,
    req.query.chatter,
    `${new Date()}`
  ];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('success', result.rows);
      cb(null, result.rows);
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

model.tasks.getTasks = (req, cb) => {
  const query = 'SELECT * from tasks WHERE userid = ?';
  const params = [req.query.userId];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result.rows)));
      cb(null, JSON.parse(JSON.stringify(result.rows)));
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

model.tasks.postTask = (req, cb) => {
  const queryForTasks = 'INSERT INTO tasks (taskid, task, note, current, share, userid, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const queryForSimilarTasks = 'INSERT INTO similartasks (taskid, task, note, current, share, userid, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [
    faker.random.uuid(),
    req.query.task,
    req.query.note,
    req.query.current,
    req.query.share,
    req.query.userId,
    req.query.userName
  ];
  client.execute(queryForTasks, params, { prepare: true })
    .then((result) => {
      console.log('success', result.rows);
      cb(null, result.rows);
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    }).then(() => {
      client.execute(queryForSimilarTasks, params, { prepare: true })
        .then((result) => {
          console.log('success', result.rows);
        })
        .catch((error) => {
          console.log(error);
        });
    });
};

model.tasks.updateTask = (req, cb) => {
  const query = `UPDATE tasks
  SET task = ?,
    note = ?, 
    current = ?, 
    share = ?
  WHERE userid = ?
  AND taskid = ?`;
  const params = [
    req.query.task,
    req.query.note,
    req.query.current,
    req.query.share,
    req.query.userId,
    req.query.taskId,
  ];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('success', result.rows);
      cb(null, result.rows);
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    }); // if have time, figure out how to update similartasks table as well...
};

model.tasks.deleteTask = (req, cb) => {
  const query = 'DELETE FROM tasks WHERE userid = ? AND taskid = ?';
  const params = [req.query.userId, req.query.taskId];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log(result.rows);
      cb(null, result.rows);
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

model.similarTasks.getPeopleWithSimilarTasks = (req, cb) => {
  const query = 'SELECT * from similartasks WHERE task = ?';
  const params = [req.query.task];
  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log(JSON.parse(JSON.stringify(result.rows)));
      cb(null, JSON.parse(JSON.stringify(result.rows)));
    })
    .catch((error) => {
      console.log(error);
      cb(error, null);
    });
};

module.exports = model;
