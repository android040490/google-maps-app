const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();

const PORT = process.env.PORT || 3000;

//Mock user
const user = {
    id: 1,
    name: 'Vasya',
    surname: 'Pupkin',
    email: 'user@gmail.com',
    password: '1234',
    avatar: 'assets/images/Vasya.png'
};

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/build')));
app.use('/build/assets', express.static(__dirname + '/build/assets/'));

app.get('/api/auth', verifyToken, (req, res) => {
    res.json({user: user})
})

app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    if((email == user.email) && (password == user.password)){
        jwt.sign({user: user}, 'secret', (err, token) => {
            res.json({token: token})
        });
    } else {
        res.status(401).send({message: 'Wrong email or password'})
    }
});

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


function verifyToken(req, res, next) {
    const bearerHeader = req.get('Authorization')

    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secret', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                next()
            }
        });
    } else {
        res.sendStatus(403)  
    };
};