let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Connect to MongoDB (mLab) online
mongoose.connect('mongodb://nosqldb:nosqldb1@ds117545.mlab.com:17545/nodejstodo');

// Create a Schema - this is like a blueprint - class
let todoSchema = new mongoose.Schema({
    item: String
});

// Create a model based on your schema
let Todo = mongoose.model('Todo', todoSchema);

let urlencodedParser = bodyParser.urlencoded({extended: false});

// pass dummy data into item list
//let data = [{item: 'get fresh milk'}, {item: 'go jogging'}, {item: 'get some good sleep'}, {item: 'kick some coding ass'}];

module.exports = function(app){

app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    Todo.find({}, function (err, data) {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
   
});

app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongoDB
    let newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json({todos: data});
    });
    
});

app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json({todos: data});
    })
});

};