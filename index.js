/* eslint-disable no-console */
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
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoute from './src/routes/clientRoute';
import policyRoute from './src/routes/policyRoute';
import loginRoute from './src/routes/loginRoute';

import { start } from './src/database';

// start mongo in memory service
start();

// express app
const app = express();

// enhance security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(json());
app.use(urlencoded({ extended: true }));

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
