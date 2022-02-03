const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

// const userName = process.env.DB_USERNAME;
const userName = 'mongodb-user';
// const password = process.env.DB_PASSWORD;
const password = 'Ab4Y4bhr7tRT3LAK';
const dbName = 'test-shop';
const dbURL = `cluster0.coqsd.mongodb.net/${dbName}`;

describe('Feed Controller - Login', function () {
  // Setup before running test(s)
  before(function (done) {
    mongoose
      .connect(
        `mongodb+srv://${userName}:${password}@${dbURL}?retryWrites=true&w=majority`,
      )
      .then((result) => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '5c0f66b979af55031b34728a',
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it('should add a created post to the posts of the creator', function (done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post',
      },
      file: { path: 'testPath' },
      userId: '5c0f66b979af55031b34728a',
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };
    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  // Breakdown after running test(s)
  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
