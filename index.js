const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const router = express.Router();



app.get('/weatherApi', (req, res) =>{
    let obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.send(obj);
})
 
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/View/index.html'));
})

app.use('/', router);
app.use(express.static(__dirname + '/View'));

const server = app.listen(3000, () => {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://localhost:3000")
 })