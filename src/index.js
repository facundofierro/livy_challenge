const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var fs = require('fs');

//example data
const clients = JSON.parse(fs.readFileSync('./data/clients.json', 'utf8')).clients;
const policies = JSON.parse(fs.readFileSync('./data/policies.json', 'utf8')).policies;

//express app
const app = express();

// enhance security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS 
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// get clients by id
app.get('/ClientsById/:id', (req, res) => {
  let filteredClients = clients.filter(c => c.id === req.params.id);
  res.send(filteredClients);
});

// get clients by name
app.get('/ClientsByName/:name', (req, res) => {
    let filteredClients = clients.filter(c => c.name === req.params.name);
    res.send(filteredClients);
});

// get policies by user name 
app.get('/PoliciesByUserName/:name', (req, res) => {
    let filteredClients = clients.filter(c => c.name === req.params.name);
    for (let client of filteredClients) {
        let filteredPolicies = policies.filter(p => p.clientId === client.id);
        client.policies = filteredPolicies;
    }
    res.send(filteredClients);
});

// get user by policy number
app.get('/ClientByPolicyId/:id', (req, res) => {
    let filteredPolicies = policies.filter(p => p.id === req.params.id);
    for (let policy of filteredPolicies) {
        let filteredClients = clients.filter(c => c.id === policy.clientId);
        policy.clients = filteredClients;
    }
    res.send(filteredPolicies);
});

// starting the server
app.listen(4000, () => {
  console.log('Listening on port 4000');
  console.log('http://localhost:4000/ClientsById/e8fd159b-57c4-4d36-9bd7-a59ca13057bb');
  console.log('http://localhost:4000/ClientsByName/Lessie');
  console.log('http://localhost:4000/PoliciesByUserName/Manning');
  console.log('http://localhost:4000/ClientByPolicyId/56b415d6-53ee-4481-994f-4bffa47b5239');
});









