/**
 * This is meant to be a starting place for handling Lambda Proxy
 * request. Please modify as needed.
 */

import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as HttpStatus from 'http-status-codes';

// Abstract business logic into API
import API from './Api';

const api = new API();

const lambdaProxyResponse = (data: {}, statusCode: number = HttpStatus.OK) : APIGatewayProxyResult => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: statusCode,
    body: JSON.stringify(data), // Consider obsfucating the error if it poses a security risk
  }
};

export const getMethod: APIGatewayProxyHandler = async (event, _context) => {
  // Access params from event
  const params = event.queryStringParameters ? event.queryStringParameters : {};

  try {
    const data = await api.get(params);

    return lambdaProxyResponse(data);
  } catch (err) {
    return lambdaProxyResponse(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const postMethod: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body);
    const data = await api.post(body);
    
    return lambdaProxyResponse(data, HttpStatus.CREATED);
  } catch (err) {
    return lambdaProxyResponse(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const putMethod: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;

    const data = await api.put(id, body);
    
    return lambdaProxyResponse(data);
  } catch (err) {
    return lambdaProxyResponse(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export const deleteMethod: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const id = event.pathParameters.id;
    const data = await api.delete(id);
    
    return lambdaProxyResponse(data);
  } catch (err) {
    return lambdaProxyResponse(err, 500);
  }
}
