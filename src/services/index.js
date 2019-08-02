import configMailer from './mailer';
import configCognito from './cognito';

export default () => {
    configMailer();
    configCognito();
}

export * from './mailer';
