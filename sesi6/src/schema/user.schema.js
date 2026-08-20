const getUserSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "status": {
            "type": "number"
        },
        "users": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "userId": {
                        "type": "string"
                    },
                    "username": {
                        "type": "string"
                    },
                    "age": {
                        "type": "number"
                    },
                    "protected": {
                        "type": "boolean"
                    }
                },
                "required": [
                    "userId",
                    "username",
                    "age"
                ]
            }
        }
    },
    "required": [
        "status",
        "users"
    ]
};
const invalidTokenSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        }
    },
    "required": [
        "message"
    ]
}

const addUserSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "status": {
            "type": "number"
        },
        "userId": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "age": {
            "type": "number"
        },
        "message": {
            "type": "string"
        }
    },
    "required": [
        "status",
        "userId",
        "username",
        "age",
        "message"
    ]
};

export {
    getUserSchema,
    invalidTokenSchema,
    addUserSchema
}