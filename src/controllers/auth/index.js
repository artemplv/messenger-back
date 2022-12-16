const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const config = require('../../config/config');

const {
  jwtSecret,
  jwtExpiresIn,
} = config;

const authController = {
  signup: async (req, res) => {
    const {
      firstName,
      lastName,
      username,
      password,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      username,
      password: bcrypt.hashSync(password, 8),
    });

    try {
      await user.save();
      res.status(201).send({ message: 'user registered' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err });
    }
  },

  signin: async (req, res) => {
    const {
      username,
      password,
    } = req.body;

    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      res.status(401)
        .send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      return;
    }

    const token = jwt.sign({
      id: user.id,
    }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.status(200)
      .send({
        user: {
          id: user._id, // eslint-disable-line no-underscore-dangle
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        message: 'Login successfull',
        accessToken: token,
      });
  },
};

module.exports = authController;
