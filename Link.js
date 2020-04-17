var AWS = require("aws-sdk");
AWS.config.update({ region: 'us-east-1' });

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

console.log("hello");

var params = {
    User: { /* required */
        ProviderAttributeName: 'sub',
        ProviderAttributeValue: 'Google_102814628902859765991',
        ProviderName: 'google'
    },
    UserPoolId: 'us-east-1_3Jgh6NkX9' /* required */
};
cognitoidentityserviceprovider.adminDisableProviderForUser(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});
