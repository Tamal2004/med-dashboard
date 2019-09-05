import AWS from 'aws-sdk';
import htmlTemplate from './htmlTemplate';

export const sendMail = ({ from, to, subject, body }) => {
    console.log('sendmail', from, to, subject, body)
    const params = {
        Destination: {
            BccAddresses: to
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body
                }
            }
        },
        Source: from
    };

    const sendPromise = new AWS.SES().sendEmail(params).promise();

    return sendPromise
        .then(data => data)
        .catch(err => {
            throw new Error(err);
        });
};
