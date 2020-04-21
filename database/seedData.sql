USE journeytothewest;

COPY users (userid, username, avatar, frienduserid, friendusername) FROM 'usersData.txt';

COPY tasks (taskid, picture, title, note, current, share, userid, username) FROM 'tasksData.txt';

COPY similartasks (taskid, picture, title, note, current, share, userid, username) FROM 'tasksData.txt';

COPY conversations (userid1, username1, avatar1, userid2, username2, avatar2, messageid, message, chatter, time) FROM 'conversationsData.txt';
