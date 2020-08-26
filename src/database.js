const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const mongod = new MongoMemoryServer();

//sample data
const sampleClients = require('../data/clients.json').clients;
const samplePolicies = require('../data/policies.json').policies;
const sampleUsers = require('../data/users.json').users;

//database utils
var database = () => {};

//mongoose models
database.Client = require('./models/clientModel.js');
database.Policy = require('./models/policyModel.js');
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
        reconnectInterval: 1000
    };

    await mongoose.connect(uri, mongooseOpts);

    database.insertSampleData();
}

database.insertSampleData = async () => {
    try {
        //insert sample clients
        await database.Client.insertMany(sampleClients);

        //insert sample policies
        await database.Policy.insertMany(samplePolicies);

        //insert sample users
        await database.User.insertMany(sampleUsers);
        
    }
    catch (e) {
        console.log(e.message);
    }
}

module.exports = database;