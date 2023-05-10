const express = require('express');
const exphbs = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware')
var path = require('path');
const app = express();
const routes = require('./server/routes/allroutes');
var bodyParser = require('body-parser');




app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    
    helpers: {
        todaysDate:(date) => new Date(date),   
        //helpers: require(__dirname +"/public/javascripts/helpers.js").helpers,

      },
    extname: '.hbs'
  }));

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//console.log( __dirname + '/public/scss');
app.use(
  sassMiddleware ({
      src: __dirname + '/public/scss', 
      dest: __dirname + '/public',
      debug: true,       
  })
);   
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', routes);
app.use('*', (req, res) => {
    res.status(404).render('404');
  });




// port where app is served
app.listen(4000, () => {
    console.log('The web server has started on port 4000');
});