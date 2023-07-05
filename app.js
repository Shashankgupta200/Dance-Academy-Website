const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contactDance', {useNewUrlParser: true});
const port = 8000;

// DEFINE MONGOOSE SCHEMA
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
});

var Contact = mongoose.model('Contact', contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);     //Now as we have made a folder name home.pug so that will be served now instead of index.pug
});
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);     
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
})
app.listen(port, ()=>{
    console.log(`The webpage has been started successfully on port ${port}`);
});