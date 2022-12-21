const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const usersController = require('../controllers/users');

const path = '/user';

router
  .route(`${path}/profile`)
  .put(
    asyncHandler(usersController.update),
  );

router
  .route(`${path}/password`)
  .put(
    asyncHandler(usersController.changePassword),
  );

router
  .route(`${path}/search`)
  .post(
    asyncHandler(usersController.getByUsername),
  );

module.exports = router;
