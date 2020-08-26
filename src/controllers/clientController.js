import database from '../database.js';

const clientController = {
  getById: async (id) => {
    const client = await database.Client.findOne({ id });
    return client;
  },

  getByName: async (name) => {
    const client = await database.Client.findOne({ name });
    return client;
  },

  getByPolicyId: async (id) => {
    const policy = await database.Policy.findOne({ id });
    const client = await database.Client.findOne({ id: policy.client_id });
    return client;
  },

};

export default clientController;
