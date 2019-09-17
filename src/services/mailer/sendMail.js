import AWS from 'aws-sdk';

import htmlTemplate from './htmlTemplate';

export const sendMail = ({ from, to, subject, body, testerId = null }) => {
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
                    Data: htmlTemplate(body, testerId)
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
