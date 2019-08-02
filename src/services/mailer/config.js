const {
    REACT_APP_SES_ACCESS_KEY_ID,
    REACT_APP_SES_SECRET_ACCESS_KEY,
    REACT_APP_REGION
} = process.env;

export default {
    accessKeyId: REACT_APP_SES_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_SES_SECRET_ACCESS_KEY,
    region: REACT_APP_REGION
};
