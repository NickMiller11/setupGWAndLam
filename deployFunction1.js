const { promisify } = require('util');
const fs = require('fs');
const AWS = require('aws-sdk');

const readFile = promisify(fs.readFile);
const {
  asyncLambdaCreateFunction,
} = require('./awsFunctions.js');

module.exports = async function deployFunction(resourceName) {
  const zipContents = await readFile(`../standup1Lambda/${resourceName}.zip`)
  try {
    const createFunctionParams = {
      Code: {
        ZipFile: zipContents,
      },
      FunctionName: resourceName,
      Handler: `${resourceName}.handler`,
      Role: 'arn:aws:iam::895572748148:role/api-gateway-lambda-exec-role',
      Runtime: 'nodejs8.10',
      Description: 'my first stand up test',
    };

    const data = await asyncLambdaCreateFunction(createFunctionParams);
    return data;
  } catch (err) {
    console.log(err)
  }
};
