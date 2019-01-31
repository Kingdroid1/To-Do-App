// require express module
const express = require('express');
let todoController = require('./controllers/todoController');

// fire up express module
let app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire up controllers
todoController(app);

// listen to host port
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});