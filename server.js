const express=require('express');
const hbs=require('hbs');
const fs=require('fs')
var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('View Engine', 'hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  // console.log(`${now}:${req.method}:${req.url}`)
  var log=`${now}:${req.method}:${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
next();
})

// app.use((req,res,next)=>{
// res.render('maintanence.hbs')
//
// })
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{
//res.send('<h1>Hello Express !</h1>');

// res.send({
//   name :'Abhi',
//   likes:[
//     'Gaming',
//     'Songs',
//     'Coding'
//   ],
//   currentYear:new Date().getFullYear()
// })

res.render('home.hbs',{
  pageTitle :'Welcome Abhishek',
    likes:[
      'Gaming',
      'Songs',
      'Coding'
    ]
})
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'

  })
  //res.send('About Page')
})

app.get('/bad',(req,res)=>{
  res.send({
    Errormsg:'Unable to fullfil request'
  })
})
app.listen(3000,()=>{
  console.log('Server is up on 3000')
})
