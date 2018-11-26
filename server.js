const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

let app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/build')));
app.use('/build/assets', express.static(__dirname + '/build/assets/'));

app.get('/api/auth', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                user : authData
            })
        }
    });
})

app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    const user = db.get('users')
                    .find({
                        email : email,
                        password : password
                    })
                    .value();
    
    if( user ){
        jwt.sign({...user}, 'secret', (err, token) => {
            res.json({token: token})
        });
    } else {
        res.status(401).send({message: 'Wrong email or password'})
    }
});

app.post('/api/places', (req, res) => {
    let myMarkers = db.get('markers')
        .push(...req.body.markers)
        .write()
    
    res.send(myMarkers)
})

app.use('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/build/index.html'), (err) => {
        if (err){
            res.status(500).send(err)
        }
    })
})

app.listen(PORT, function(){
    console.log('Express server is up on port' + PORT);
});

//Token verification
function verifyToken(req, res, next) {
    const bearerHeader = req.get('Authorization')

    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)  
    };
};