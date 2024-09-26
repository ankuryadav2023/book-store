const { users } = require('./mongodb');
const { responses } = require('./responses');

exports.bookStoreAuthorizer = async (event) => {
    if (event.pathParameters && event.pathParameters.apiKey) {
        try {
            const response = await users.findOne({ apikeys: event.pathParameters.apiKey });
            if (response) {
                if (event.requestContext.http.method === 'GET') {
                    if (event.routeKey === 'GET /{apiKey}/users') {
                        if (response.role === 'admin') {
                            return responses.authorizationPolicyObjectGenerator(response.email, 'Allow', event.routeArn);
                        } else {
                            return responses.authorizationPolicyObjectGenerator(response.email, 'Deny', event.routeArn);
                        }
                    }
                    return responses.authorizationPolicyObjectGenerator(response.email, 'Allow', event.routeArn);
                } else if (event.requestContext.http.method === 'POST' || event.requestContext.http.method === 'PUT') {
                    if (response.role === 'admin') {
                        return responses.authorizationPolicyObjectGenerator(response.email, 'Allow', event.routeArn);
                    } else {
                        return responses.authorizationPolicyObjectGenerator(response.email, 'Deny', event.routeArn);
                    }
                }
            } else {
                return responses.authorizationPolicyObjectGenerator('unknown-user', 'Deny', event.routeArn);
            }
        } catch (error) {
            console.log(error.message);
            return responses.authorizationPolicyObjectGenerator('unknown-user', 'Deny', event.routeArn);
        }
    } else {
        return responses.authorizationPolicyObjectGenerator('unknown-user', 'Deny', event.routeArn);
    }
}