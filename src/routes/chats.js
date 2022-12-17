const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const chatsController = require('../controllers/chats');

router
  .route('/chats')
  .get(
    asyncHandler(chatsController.get),
  )
  .post(
    asyncHandler(chatsController.create),
  );

module.exports = router;
