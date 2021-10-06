const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('615ae9c79eab21ac20cb7578')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// DB connection variables
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = 'shop';
const dbURL = `cluster0.coqsd.mongodb.net/${dbName}`;

mongoose
  .connect(
    `mongodb+srv://${userName}:${password}@${dbURL}?retryWrites=true&w=majority`,
  )
  .then((result) => {
    console.log('Connected!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
