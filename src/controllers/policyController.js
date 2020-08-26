/* eslint-disable no-console */
import database from '../database';

const policyController = {

  getPoliciesByUserName: async (name) => {
    const client = await database.Client.findOne({ name });
    const policies = await database.Policy.find({ clientId: client.id });
    return policies;
  },
};

export default policyController;
