/**
 * This is meant to be a starting place for handling Lambda Proxy
 * request. Please modify as needed.
 */

import {
	APIGatewayEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
	Context,
} from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

// Abstract business logic into API
import API from './Api';

const api = new API();

const lambdaProxyResponse = (
	data: {},
	statusCode: number = StatusCodes.OK
): APIGatewayProxyResult => {
	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		statusCode: statusCode,
		body: JSON.stringify(data), // Consider obsfucating the error if it poses a security risk
	};
};

export const getMethod: APIGatewayProxyHandler = async (
	event: APIGatewayEvent,
	_context: Context
) => {
	// Access params from event
	const params = event.queryStringParameters ? event.queryStringParameters : {};

	try {
		const data = await api.get(params);

		return lambdaProxyResponse(data);
	} catch (err) {
		return lambdaProxyResponse(err, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};

export const postMethod: APIGatewayProxyHandler = async (
	event: APIGatewayEvent,
	_context: Context
) => {
	try {
		const body = JSON.parse(event.body);
		const data = await api.post(body);

		return lambdaProxyResponse(data, StatusCodes.CREATED);
	} catch (err) {
		return lambdaProxyResponse(err, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};

export const putMethod: APIGatewayProxyHandler = async (
	event: APIGatewayEvent,
	_context
) => {
	try {
		const body = JSON.parse(event.body);
		const id = event.pathParameters.id;

		const data = await api.put(id, body);

		return lambdaProxyResponse(data);
	} catch (err) {
		return lambdaProxyResponse(err, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};

export const deleteMethod: APIGatewayProxyHandler = async (
	event: APIGatewayEvent,
	_context: Context
) => {
	try {
		const id = event.pathParameters.id;
		const data = await api.delete(id);

		return lambdaProxyResponse(data);
	} catch (err) {
		return lambdaProxyResponse(err, 500);
	}
};
