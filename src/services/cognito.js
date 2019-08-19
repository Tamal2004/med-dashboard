// import Amplify from 'aws-amplify';
//
// const {
//     REACT_APP_REGION,
//     REACT_APP_COGNITO_USER_POOL_ID,
//     REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
//     REACT_APP_COGNITO_MANDATORY_SIGN_IN
// } = process.env;
//
// const config = {
//     // REQUIRED - Amazon Cognito Region
//     region: REACT_APP_REGION,
//
//     // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolId: REACT_APP_COGNITO_USER_POOL_ID,
//
//     userPoolWebClientId: REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
//
//     // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//     mandatorySignIn: REACT_APP_COGNITO_MANDATORY_SIGN_IN
// };
//
// export default () =>
//     Amplify.configure({
//         Auth: config
//     });
