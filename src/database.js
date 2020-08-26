import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect } from 'mongoose';

// sample data
import { clients as sampleClients } from '../data/clients.json';
import { policies as samplePolicies } from '../data/policies.json';
import { users as sampleUsers } from '../data/users.json';

const mongod = new MongoMemoryServer();

// database utils
const database = () => {};

// mongoose models
database.Client = require('./models/clientModel.js');
database.Policy = require('./models/policyModel.js').default;
database.User = require('./models/userModel.js');

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

  await connect(uri, mongooseOpts);

  database.insertSampleData();
};

database.insertSampleData = async () => {
  try {
    // insert sample clients
    await database.Client.insertMany(sampleClients);

    // insert sample policies
    await database.Policy.insertMany(samplePolicies);

    // insert sample users
    await database.User.insertMany(sampleUsers);
  } catch (e) {
    console.log(e.message);
  }
};

export default database;
