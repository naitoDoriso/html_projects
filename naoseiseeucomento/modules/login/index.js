const express = require('express');
const app = express();
const path = require('path');

const root = path.join(__dirname,'..','..');

app.get('/', (req,res)=>{
    res.render(path.join(root,'/views/login/index'));
});

module.exports = app;