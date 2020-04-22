DROP KEYSPACE IF EXISTS journeytothewest;

CREATE KEYSPACE If NOT EXISTS journeytothewest
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE journeytothewest;

CREATE TABLE users (
  userid UUID,
  username VARCHAR,
  avatar VARCHAR,
  frienduserid UUID,
  friendusername VARCHAR,
  friendavatar VARCHAR,
  PRIMARY KEY (userid, username, frienduserid)
);

CREATE TABLE tasks (
  taskid UUID,
  picture VARCHAR,
  title VARCHAR,
  note VARCHAR,
  current BOOLEAN,
  share BOOLEAN,
  userid UUID,
  username VARCHAR,
  PRIMARY KEY (userid, taskid)
);

CREATE TABLE similartasks (
  taskid UUID,
  picture VARCHAR,
  title VARCHAR,
  note VARCHAR,
  current BOOLEAN,
  share BOOLEAN,
  userid UUID,
  username VARCHAR,
  PRIMARY KEY (title, share, current, taskid)
);

CREATE TABLE conversations (
  userid1 UUID,
  username1 VARCHAR,
  avatar1 VARCHAR,
  userid2 UUID,
  username2 VARCHAR,
  avatar2 VARCHAR,
  messageid UUID,
  message VARCHAR,
  chatter BOOLEAN,
  time VARCHAR,
  PRIMARY KEY ((userid1, userid2), time, messageid)
);