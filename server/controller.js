/* eslint-disable comma-dangle */
const model = require('./model');

const controller = {};

controller.users = {
  getUsersData: (req, res) => {
    model.users.getUsersData(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  }
};

controller.conversations = {
  getConversations: (req, res) => {
    model.conversations.getConversations(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  },
  postConversations: (req, res) => {
    model.conversations.postConversations(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  }
};

controller.tasks = {
  getTasks: (req, res) => {
    model.tasks.getTasks(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  },
  postTask: (req, res) => {
    model.tasks.postTask(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  },
  updateTask: (req, res) => {
    model.tasks.updateTask(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  },
  deleteTask: (req, res) => {
    model.tasks.deleteTask(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  }
};

controller.similarTasks = {
  getPeopleWithSimilarTasks: (req, res) => {
    model.similarTasks.getPeopleWithSimilarTasks(req, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    });
  }
};

module.exports = controller;
