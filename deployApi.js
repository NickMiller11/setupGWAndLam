const uuid = require('uuid');
const { promisify } = require('util');
const AWS = require('aws-sdk');
const region = 'us-east-1';
const accountNumber = '895572748148'
const apiPath = '/';
const stageName = 'prod';

const {
  asyncAddPermission,
  asyncCreateApi,
  asyncCreateDeployment,
  asyncCreateResource,
  asyncGetResources,
  asyncPutIntegration,
  asyncPutMethod,
} = require('./awsFunctions.js');

module.exports = async function deployApi(resourceName) {
  const pathPart = '{proxy+}';
  const httpMethod = 'POST'
  const statementId = uuid.v4();

  try {
    const restApiId = (await asyncCreateApi({ name: resourceName })).id;

    const resourceId = (await asyncGetResources({ restApiId })).items[0].id;

    const sourceArn = `arn:aws:execute-api:${region}:${accountNumber}:${restApiId}/*/${httpMethod}${apiPath}`;
    const addPermissionParams = {
      FunctionName: resourceName,
      StatementId: statementId,
      Principal: 'apigateway.amazonaws.com',
      Action: 'lambda:InvokeFunction',
      SourceArn: sourceArn,
    };

    await asyncAddPermission(addPermissionParams);

    const putMethodParams = {
      restApiId,
      resourceId,
      httpMethod,
      authorizationType: 'NONE',
    };

    await asyncPutMethod(putMethodParams);

    const uri = `arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${region}:${accountNumber}:function:${resourceName}/invocations`;
    const credentials = 'arn:aws:iam::895572748148:role/lambda_invoke_function_assume_apigw_role';
    const putIntegrationParams = {
      restApiId,
      resourceId,
      httpMethod,
      type: 'AWS_PROXY',
      integrationHttpMethod: httpMethod,
      uri,
      credentials,
    };

    await asyncPutIntegration(putIntegrationParams);

    await asyncCreateDeployment({ restApiId, stageName })

    const endpoint = `https://${restApiId}.execute-api.${region}.amazonaws.com/${stageName}`;
    console.log(`API Endpoint created: ${endpoint}`);
  } catch (err) {
    console.log(err);
  }
};
