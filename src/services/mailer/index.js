import AWS from 'aws-sdk';

// Local
import config from './config';

AWS.config.update(config);

export * from './sendMail';