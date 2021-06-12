const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-shaped-68096',
      user : 'postgres',
      password : 'captain10majed',
      database : 'facerecognition'
    }
  });

  
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{res.end('success')})
app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)})
app.post('/signup', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



app.listen(process.env.PORT || 8000,()=>{
    console.log(`listening at port ${process.env.PORT}`);
});