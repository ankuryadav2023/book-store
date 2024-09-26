exports.responses = {
    authorizationPolicyObjectGenerator(principalId, effect, routeArn) {
        return {
            "principalId": principalId,
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Action": "execute-api:Invoke",
                        "Effect": effect,
                        "Resource": routeArn
                    }
                ]
            }
        }
    },
    _200(data = {}) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    },
    _400(data = {}) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }
}