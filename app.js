
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/', (req,res) => {
  const name = req.cookies.username
  if (name){
  res.redirect('/battle');
}else {
  res.render('index')
}
});
app.get('/battle', (req,res) => {
  const name = req.cookies.username;
  if(name){
  res.render('battle', {name: name});
}else {
  res.redirect('/')
}
});

app.post('/battle', (req,res) => {
  res.clearCookie('username')
  res.redirect('/');
})

app.post('/', (req,res) => {
  res.cookie('username',req.body.username);
  res.redirect('/battle');
});

app.listen(3000, () => {
  console.log('server is running...');
});
