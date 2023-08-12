const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const loginRoutes = require('./modules/login/index');
const imgsRoutes = require('./imgs/index');
app.use(imgsRoutes);
app.use(loginRoutes);

app.listen(process.env.PORT || 8013, ()=>{
    console.log('Running on '+(process.env.PORT || 'http://localhost:8013')+' ...')
});