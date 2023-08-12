const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/imgs/', (req,res)=>{
    res.redirect('../');
});

fs.readdir(__dirname,(err,files)=>{
    files.forEach((v)=>{
        if (v.match(/jpg|jpeg|png|mp3|mp4/g)) {
            app.get('/imgs/'+v, (req,res)=>{
                res.sendFile(path.join(__dirname,v));
            });
        }
    });
});

module.exports = app;