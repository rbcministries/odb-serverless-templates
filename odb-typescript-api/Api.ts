
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';

import DBObject from './DbObject';

// you can also define an equality predicate with the `equals` helper method
// import { between, equals, ConditionExpression } from '@aws/dynamodb-expressions';

/**
 * Business logic for API
 * 
 * @see https://github.com/awslabs/dynamodb-data-mapper-js for examples of how to do database calls
 */
export default class Api {
    private _mapper: DataMapper;

    constructor() {
        this._mapper = new DataMapper({
            client: new DynamoDB({ region: 'us-east-1' }), // the SDK client used to execute operations
        });
    }

    async get(params?: {}){
        return await this._mapper.get(Object.assign(new DBObject, { id: 'this' }))
    }

    async post(body: {}) {
        const toSave = Object.assign(new DBObject, body);
        return await this._mapper.put(toSave);
    }

    async put(id: string, body: DBObject) {
        const toSave = Object.assign(new DBObject, body);
        toSave.id = id;

        return await this._mapper.put(toSave);
    }

    async delete(id: any) {
        await this._mapper.delete(Object.assign(
            new DBObject,
            id
        ));

        return { deleted: true }
    }
}