const AWS = require('aws-sdk');
const deployFunction = require('./deployFunction.js');
const deployApi = require('./deployApi.js');
const resourceName = 'standup1'

async function deploy() {
  try {
    await deployFunction(resourceName);
    await deployApi(resourceName);
  } catch (err) {
    console.log(err);
  }
}

deploy();
