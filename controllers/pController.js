var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/PharmacyDB');
var PharmacyChar = require('../models/pharmacychar');
var GeneralChar = require('../models/generalchar');
var RecordsChar = require('../models/recordschar');
var UserChar = require('../models/userchar');
var CartChar = require('../models/cartchar');
var HistoryChar = require('../models/historychar');

var newUser = GeneralChar({
    name: 'T shirt',
    price: '20',
    discount: '5',
    imageURL : 'assets/T1.jpg'
  });
  
  // save the user
  newUser.save(function(err) {
    if (err) throw err;
    console.log('created');

  });
module.exports = function(app){
    var cookieuser;

    app.get('/',function(req,res){
    
        res.render('home');
    });
    app.get('/home',function(req,res){
      
        res.render('home');
    });
   
    app.get('/records',function(req,res){
        RecordsChar.find({}, function(err,data) {
            if (err) throw err;
        
     
        res.render('records',{data: data });
    });
    });
 
    app.post('/records',urlencodedParser,function(req,res){
        var newUser = RecordsChar({
            user: cookieuser,
            Name: req.body.name,
            Age: req.body.age,
            Address: req.body.address,
            Diseases: req.body.diseases,
            RecordDate: req.body.date,
            Description:  req.body.desc,
            Contact: req.body.contact
          });
          
          // save the user
          newUser.save(function(err) {
            if (err) throw err;
          
            console.log('Record created!');
          });
          RecordsChar.find({user:cookieuser}, function(err,data) {
            if (err) throw err;
        
     
        res.render('records',{data: data });
    });
    });
    app.get('/orderp',function(req,res){
    
        res.render('orderp');
    });
    app.get('/orderg',function(req,res){
    
        res.render('orderg');
    });
   
    


    app.get('/thank',function(req,res){
    
        res.render('thank');
    });
    app.get('/history',function(req,res){
    
        HistoryChar.find({user:cookieuser}, function(err,data) {
            if (err) throw err;
        res.render('history',{data: data});
    });});
    app.get('/refil',function(req,res){
    
        HistoryChar.find({user:cookieuser}, function(err,data) {
            if (err) throw err;
        res.render('history',{data: data});
    });});
    
    app.get('/login',function(req,res){
    
        res.render('login');
    });
    
    

      app.post('/', urlencodedParser, function (req, res) {
       if(req.body.submit){
       
        var newUser = UserChar({
            fname: req.body.first,
            lname: req.body.last,
            email: req.body.email,
            pass: req.body.pass
          });
          
          // save the user
          newUser.save(function(err) {
            if (err) throw err;
          
            console.log('User created!');
          });
        
        
        res.render('login');}
        if(req.body.submit1)
{       var email1 = req.body.email1;
        var pass1 = req.body.pass1;
        UserChar.find({}, function(err,data) {
            var i=0;
            if (err) throw err;
            data.forEach(function(item){
                if((item.email === email1) && (item.pass === pass1))
                {
                    res.render('home');
                     i=1;
                  
                     console.log('found');
                }
                });
                if(i === 0)
               { res.render('login');
               console.log('Not -found');   
            }
      
    });
           }     });
    
    app.post('/menu', urlencodedParser, function (req, res) {
        PharmacyChar.find({name: req.body.search}, function(err,data) {
            if (err) throw err;
        res.render('menu',{data: data});
      });
    
    });
    app.get('/menu',function(req,res){
        PharmacyChar.find({}, function(err,data) {
            if (err) throw err;
        
        
        res.render('menu',{data: data });
    });
    });
    app.post('/general', urlencodedParser, function (req, res) {
        GeneralChar.find({name: req.body.search}, function(err,data) {
            if (err) throw err;
        res.render('general',{data: data});
      });
    
    });
    app.get('/general',function(req,res){
        GeneralChar.find({}, function(err,data) {
            if (err) throw err;
        
     
        res.render('general',{data: data });
    });
    });
    app.post('/add',function(req,res){
        req.on('data', function(data){
        data=JSON.parse(data);
        data.item=JSON.parse(data.item);
        console.log(data);
        console.log(data.name);
        cookieuser = data.name;
       
        var newUser = CartChar({
            name: data.item.name,
            user: data.name,
            price: data.item.price ,
            discount: data.item.discount, 
          });
          var newUser1 = HistoryChar({
            name: data.item.name,
            user: data.name,
            price: data.item.price ,
            discount: data.item.discount, 
          });
          
          // save the user
          newUser.save(function(err) {
            if (err) throw err;
            

            console.log('Added Succesfully!');
          });
          newUser1.save(function(err) {
            if (err) throw err;
            

            console.log('Saved Succesfully!');
          });


          CartChar.find({}, function(err,data) {
            if (err) throw err;
        res.end();
    });
});
    });
    app.get('/cart',function(req,res){
        
        CartChar.find({user:cookieuser}, function(err,data) {
        if (err) throw err;
        console.log(cookieuser);
        console.log(data);
    res.render('cart',{data: data });
});
    });

    app.post('/deletedb',function(req,res){
        CartChar.remove({ user: cookieuser }, function(err) {
            if (!err) {
                console.log('REMOVED');
            }
            else {
                    console.log('Not REMOVED');
            }
        });

      console.log('RECEIVED');
      res.end();
 

});
}