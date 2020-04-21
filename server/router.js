const socialRouter = require('express').Router();
const planRouter = require('express').Router();

const controller = require('./controller');

socialRouter.get('/friends', controller.users.getUsersData);
socialRouter.get('/conversations', controller.conversations.getConversations);
socialRouter.post('/conversations', controller.conversations.postConversations);

planRouter.get('/tasks', controller.tasks.getTasks);
planRouter.post('/tasks', controller.tasks.postTask);
planRouter.put('/tasks', controller.tasks.updateTask);
planRouter.delete('/tasks', controller.tasks.deleteTask);
planRouter.get('/peoplewithsimilartasks', controller.similarTasks.getPeopleWithSimilarTasks);

module.exports = { socialRouter, planRouter };
