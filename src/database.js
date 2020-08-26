import mongoMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Client from './models/clientModel.js';
import Policy from './models/policyModel.js';
import User from './models/userModel.js';

// sample data
import sampleClients from '../data/clients.js';
import samplePolicies from '../data/policies.js';
import sampleUsers from '../data/users.js';

const mongod = new mongoMemoryServer.MongoMemoryServer();

// database utils
const database = () => {};

// mongoose models
database.Client = Client;
database.Policy = Policy;
database.User = User;

/**
 * Connect to the in-memory database.
 */
database.start = async () => {
  const uri = await mongod.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);

  database.insertSampleData();
};

database.insertSampleData = async () => {
  try {
    // insert sample clients
    await database.Client.insertMany(sampleClients.clients);

    // insert sample policies
    await database.Policy.insertMany(samplePolicies.policies);

    // insert sample users
    await database.User.insertMany(sampleUsers.users);
  } catch (e) {
    console.log(e.message);
  }
};

export default database;
