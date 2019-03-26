const { promisify } = require('util');
const fs = require('fs');
const AWS = require('aws-sdk');

const readFile = promisify(fs.readFile);
const {
  asyncLambdaCreateFunction,
  asyncCreateEventSourceMapping,
} = require('./awsFunctions.js');

const resourceName = 'standup2'

module.exports = async function deployFunction2() {
  const zipContents = await readFile(`../standup2Lambda/${resourceName}.zip`)
  try {
    const createFunctionParams = {
      Code: {
        ZipFile: zipContents,
      },
      FunctionName: resourceName,
      Handler: `${resourceName}.handler`,
      Role: 'arn:aws:iam::895572748148:role/lambda-between-sqs-ec2',
      Runtime: 'nodejs8.10',
      Description: 'my first stand up test',
      VpcConfig: {
        SecurityGroupIds: [
          'sg-022536b5b5db8d8e3'
        ],
        SubnetIds: [
          'subnet-0afed1778244e6199'
        ]
      }
    };

    const data = await asyncLambdaCreateFunction(createFunctionParams);

    // const eventSourceMappingParams = {
    //   EventSourceArn: 'arn:aws:sqs:us-east-1:895572748148:standup1Queue',
    //   FunctionName: 'standup2',
    //   BatchSize: 1,
    // };
    //
    // await asyncCreateEventSourceMapping(eventSourceMappingParams);

    return data;
  } catch (err) {
    console.log(err)
  }
};
