const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const authController = require('../controllers/auth');

router
  .route('/register')
  .post(
    asyncHandler(authController.signup),
  );

router
  .route('/login')
  .post(
    asyncHandler(authController.signin),
  );

module.exports = router;
