import configMailer from './mailer';
import configCognito from './cognito';

export default () => {
    configMailer();
};

export * from './mailer';
