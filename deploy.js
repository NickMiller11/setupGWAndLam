const AWS = require('aws-sdk');
const deployFunction1 = require('./deployFunction1.js');
const deployFunction2 = require('./deployFunction2.js');
const deployApi = require('./deployApi.js');
const deploySQS = require('./deploySQS.js');
const resourceName = 'standup1';

async function deploy() {
  try {
    // await deployFunction1(resourceName);
    // await deployApi(resourceName);
    // await deploySQS(resourceName);
    await deployFunction2();
  } catch (err) {
    console.log(err);
  }
}

deploy();
