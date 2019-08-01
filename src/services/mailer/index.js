import AWS from 'aws-sdk';

// Local
import config from './config';

export * from './sendMail';

export default () => AWS.config.update(config);
