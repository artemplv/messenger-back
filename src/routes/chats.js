const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const verifyChatAccess = require('../middlewares/verifyChatAccess');
const chatsController = require('../controllers/chats');

const path = '/chats';

router
  .route(path)
  .get(
    asyncHandler(chatsController.get),
  )
  .post(
    asyncHandler(chatsController.create),
  );

router
  .route(`${path}/users`)
  .all(
    verifyChatAccess,
  )
  .put(
    asyncHandler(chatsController.addToChat),
  )
  .delete(
    asyncHandler(chatsController.removeUsers),
  );

router
  .route(`${path}/:chatId/users`)
  .all(
    verifyChatAccess,
  )
  .get(
    asyncHandler(chatsController.getUsers),
  );

module.exports = router;
