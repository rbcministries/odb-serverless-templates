import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table(process.env.DYNAMODB_TABLE)
class DbObject {
    @hashKey()
    id: string;

    @rangeKey({ defaultProvider: () => new Date() })
    createdAt: Date;

    @attribute()
    completed?: boolean;
}

export default DbObject;