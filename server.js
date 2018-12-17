const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const events = require('./routes/api/db');
const messaging = require('./routes/api/send');
const paypal = require('./routes/api/paypal');
const app = express();
var path = require('path')
const ejs = require('ejs');
// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'))

// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'css')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Set the view engine to ejs
app.set('view engine', 'ejs')


app.use(bodyParser.json());

// fixing error - look into cors
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
 });

 app.get('/',function(req,res){

 res.send('<div id="message">hello world</div>');

});

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected ......'))
  .catch(err => console.log(err));


  // Use routes
  app.use('/api/db', events);
//Body Parser middleware
// now to run server we want to connect to a port. The process.env.PORT allow me to connect to an external server. I have it to go to port 5000 if not.


// sms ----------
app.use('/api/send', messaging);
app.use('/api/send/sms', messaging);
// sms -------------

app.use('/api/paypal/', paypal);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port '+ port));
// this will listen on this port and callback when it starts on that port

module.exports = app
