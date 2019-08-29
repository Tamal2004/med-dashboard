import Auth from '@aws-amplify/auth';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsConfig from '../aws-exports';

export const client1 = new AWSAppSyncClient({
	url: awsConfig.aws_appsync_graphqlEndpoint,
	region: awsConfig.aws_appsync_region,
	auth: {
		type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS
	},
	disableOffline: true
});

// Client 2 uses AWS_IAM as auth type, leverages Amplify's credentials handling/refresh
export const client2 = new AWSAppSyncClient({
	url: awsConfig.aws_appsync_graphqlEndpoint,
	region: awsConfig.aws_appsync_region,
	auth: {
		type: AUTH_TYPE.AWS_IAM,
		credentials: () => Auth.currentCredentials()
	},
	disableOffline: true
});
