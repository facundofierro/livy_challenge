/**
 *
 * Sample application for livy challege 2020
 *
 * Creation date: 18/08/2020
 *
 * Author: Facundo Fierro
 *
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import clientRoute from './src/routes/clientRoute.js';
import policyRoute from './src/routes/policyRoute.js';
import loginRoute from './src/routes/loginRoute.js';

import database from './src/database.js';

// load dotenv variables
dotenv.config();

// start mongo in memory service
database.start();

// express app
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

// process routes
app.use('/login', loginRoute);
app.use('/client', clientRoute);
app.use('/policy', policyRoute);

// starting the server
app.listen(4000, () => {
  console.log('Listening on port 4000');

  const helpText = `1) Run "npm test" to check that all functions are working.

2) Login with test users using post method: http://localhost:4000/login

Post content for sample admin user: {"user":"Facundo", "password":"clave1"}

Post content for sample user with users role: {"user":"Matias", "password":"clave2"}

Response sample: { "mensaje": "Authentication successful", "token": "xxxxxxxxxxxxxx" }

3) Make get calls adding access-token header with token retrived by login request.

Sample call for getting clients by id: http://localhost:4000/ClientsById/e8fd159b-57c4-4d36-9bd7-a59ca13057bb

Sample call for getting clients by name: http://localhost:4000/ClientsByName/Lessie

Sample call for getting policies by user name: http://localhost:4000/PoliciesByUserName/Manning

Sample call for getting clients by policy id: http://localhost:4000/ClientByPolicyId/56b415d6-53ee-4481-994f-4bffa47b5239`;

  console.log(helpText);
});
