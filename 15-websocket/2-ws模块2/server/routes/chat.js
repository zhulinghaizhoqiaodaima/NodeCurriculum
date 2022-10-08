var express = require('express');


var chatRouter = express.Router();
/* GET users listing. */
chatRouter.get('/', function(req, res) {
  res.render('chat', );
});

module.exports = chatRouter;
