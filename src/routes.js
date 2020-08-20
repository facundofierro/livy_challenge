/*
* Process all routes
*
*/

const express = require('express');
const jwt = require('jsonwebtoken');
const login = require('./login');
const conf = require('./conf');

const router = express.Router();

//protected routes
const protectedRoutes = express.Router(); 
protectedRoutes.use((req, res, next) => {
    const token = req.headers['access-token']; 
    if (token) {
        jwt.verify(token, conf.masterkey, (err, decoded) => {      
            if (err) {
                return res.json({ mensaje: 'Invalid token' });    
            } else {
                req.decoded = decoded;   
                next();
            }
        });
    } 
    else {
        res.status(400).json({ mensaje: "Token required"});
    }
 });


 // login 
 router.post('/login', async (req, res) => {
    try {
        let currentUser = await login.authenticate(req.body.user, req.body.password);        
        const payload = {
            check:  true,
            user: currentUser 
        };
        const token = jwt.sign(payload, conf.masterkey, {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Authentication successful',
            token: token
        });
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e);
    }
})

// get clients by id
router.get('/ClientsById/:id', protectedRoutes, (req, res) => {
    try {
        let userRole = req.decoded.user.role; 
        if (userRole !== 'admin' && userRole !== 'users') {
            res.status(400).send(`Role ${userRole} has no access to this api.`);
        }
        else {
            let filteredClients = global.clients.filter(c => c.id === req.params.id);
            res.send(filteredClients);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e);
    }
});

// get clients by name
router.get('/ClientsByName/:name', protectedRoutes, (req, res) => {
    try {
        let userRole = req.decoded.user.role; 
        if (userRole !== 'admin' && userRole !== 'users') {
            res.status(400).send(`Role ${userRole} has no access to this api.`);
        }
        else {
            let filteredClients = global.clients.filter(c => c.name === req.params.name);
            res.send(filteredClients);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json(e);
    }
});

// get policies by user name 
router.get('/PoliciesByUserName/:name', protectedRoutes, (req, res) => {
    try {
        let userRole = req.decoded.user.role; 
        if (userRole !== 'admin') {
            res.status(400).send(`Role ${userRole} has no access to this api.`);
        }
        else {
            let filteredClients = global.clients.filter(c => c.name === req.params.name);
            const resultClients = filteredClients.map(a => Object.assign({}, a));
            for (let client of resultClients) {
                let filteredPolicies = global.policies.filter(p => p.clientId === client.id);
                client.policies = filteredPolicies;
            }
            res.send(resultClients);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ mensaje: e.message});
    }
});

// get user by policy number
router.get('/ClientByPolicyId/:id', protectedRoutes, (req, res) => {
    try {
        let userRole = req.decoded.user.role; 
        if (userRole !== 'admin') {
            res.status(400).send(`Role ${userRole} has no access to this api.`);
        }
        else {
            let filteredPolicies = global.policies.filter(p => p.id === req.params.id);
            const resultPolicies = filteredPolicies.map(a => Object.assign({}, a));
            for (let policy of resultPolicies) {
                let filteredClients = global.clients.filter(c => c.id === policy.clientId);
                policy.clients = filteredClients;
            }
            res.send(resultPolicies);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ mensaje: e.message});
    }
});

module.exports = router;