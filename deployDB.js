const AWS = require('aws-sdk');

const {

} = require('./awsFunctions.js');

module.exports = async function deployDB(resourceName) {
  try {
    const createTableParams = {
      TableName: `${resourceName}Table`,

    };

    const tableDescriptionObj = await asyncCreateTable(createTableParams);

  } catch (err) {
    console.log(err);
  }
};
