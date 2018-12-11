// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// requires dependencies
const app = express();
// connect to express

app.use(bodyParser.json());

//Body Parser middleware
// now to run server we want to connect to a port. The process.env.PORT allow me to connect to an external server. I have it to go to port 5000 if not.
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port '+ port));
// this will listen on this port and callback when it starts on that port
