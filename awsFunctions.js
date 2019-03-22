const { promisify } = require('util');
const AWS = require('aws-sdk');
const apiVersion = 'latest';
const region = 'us-east-1';
const api = new AWS.APIGateway({ apiVersion, region });
const lambda = new AWS.Lambda({ apiVersion, region });

const asyncAddPermission = promisify(lambda.addPermission.bind(lambda));
const asyncLambdaCreateFunction = promisify(lambda.createFunction.bind(lambda));

const asyncCreateApi = promisify(api.createRestApi.bind(api));
const asyncCreateDeployment = promisify(api.createDeployment.bind(api));
const asyncCreateResource = promisify(api.createResource.bind(api));
const asyncGetResources = promisify(api.getResources.bind(api));
const asyncPutIntegration = promisify(api.putIntegration.bind(api));
const asyncPutMethod = promisify(api.putMethod.bind(api));

module.exports = {
  asyncAddPermission,
  asyncCreateApi,
  asyncCreateDeployment,
  asyncCreateResource,
  asyncGetResources,
  asyncLambdaCreateFunction,
  asyncPutIntegration,
  asyncPutMethod,
}
