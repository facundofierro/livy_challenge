const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const login = require('./login');
const conf = require('./conf');

//example data
const clients = JSON.parse(fs.readFileSync('./data/clients.json', 'utf8')).clients;
const policies = JSON.parse(fs.readFileSync('./data/policies.json', 'utf8')).policies;
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8')).users;

//express app
const app = express();

// enhance security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enabling CORS 
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

//set master key
console.log(conf.masterkey);
app.set('masterkey', conf.masterkey);

//protect routes
const protectedRoutes = express.Router(); 
protectedRoutes.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
        jwt.verify(token, app.get('masterkey'), (err, decoded) => {      
            if (err) {
                return res.json({ mensaje: 'Invalid token' });    
            } else {
                req.decoded = decoded;   
                next();
            }
        });
    } 
    else {
        res.send({ 
          mensaje: 'Token required' 
        });
    }
 });

 // login 
 app.post('/login', async (req, res) => {
    try {
        let currentUser = await login.authenticate(req.body.user, req.body.password, users);        
        const payload = {
            check:  true,
            user: currentUser 
        };
        const token = jwt.sign(payload, app.get('masterkey'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Authentication successful',
            token: token
        });
    } catch (e) {
        console.log(e.message);
        res.json({ mensaje: "User or password incorrect"})
    }
})

// get clients by id
app.get('/ClientsById/:id', protectedRoutes, (req, res) => {
    if (userRole !== 'admin' && userRole !== 'users') {
        res.send(`Role ${userRole} has no access to this api.`);
    }
    else {
        let filteredClients = clients.filter(c => c.id === req.params.id);
        res.send(filteredClients);
    }
});

// get clients by name
app.get('/ClientsByName/:name', protectedRoutes, (req, res) => {
    let userRole = req.decoded.user.role; 
    if (userRole !== 'admin' && userRole !== 'users') {
        res.send(`Role ${userRole} has no access to this api.`);
    }
    else {
        let filteredClients = clients.filter(c => c.name === req.params.name);
        res.send(filteredClients);
    }
});

// get policies by user name 
app.get('/PoliciesByUserName/:name', protectedRoutes, (req, res) => {
    if (userRole !== 'admin') {
        res.send(`Role ${userRole} has no access to this api.`);
    }
    else {
        let filteredClients = clients.filter(c => c.name === req.params.name);
        for (let client of filteredClients) {
            let filteredPolicies = policies.filter(p => p.clientId === client.id);
            client.policies = filteredPolicies;
        }
        res.send(filteredClients);
    }
});

// get user by policy number
app.get('/ClientByPolicyId/:id', protectedRoutes, (req, res) => {
    if (userRole !== 'admin') {
        res.send(`Role ${userRole} has no access to this api.`);
    }
    else {
        let filteredPolicies = policies.filter(p => p.id === req.params.id);
        for (let policy of filteredPolicies) {
            let filteredClients = clients.filter(c => c.id === policy.clientId);
            policy.clients = filteredClients;
        }
        res.send(filteredPolicies);
    }
});

// starting the server
app.listen(4000, () => {

    console.log('Listening on port 4000');

    let helpText = `1) Login with test users using post method: http://localhost:4000/login

Post content for sample admin user: {"user":"Facundo", "password":"clave1"}

Post content for sample user with users role: {"user":"Matias", "password":"clave2"}

Response sample: { "mensaje": "Authentication successful", "token": "xxxxxxxxxxxxxx" }

2) Make get calls adding access-token header with token retrived by login request.

Sample call for getting clients by id: http://localhost:4000/ClientsById/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

Sample call for getting clients by name: http://localhost:4000/ClientsByName/Lessie

Sample call for getting policies by user name: http://localhost:4000/PoliciesByUserName/Manning

Sample call for getting clients by policy id: http://localhost:4000/ClientByPolicyId/56b415d6-53ee-4481-994f-4bffa47b5239`;

    console.log(helpText);
});









