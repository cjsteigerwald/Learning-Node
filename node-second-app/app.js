const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');

const app = express();

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
