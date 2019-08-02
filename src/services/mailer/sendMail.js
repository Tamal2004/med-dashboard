import AWS from 'aws-sdk';
import htmlTemplate from './htmlTemplate';

export const sendMail = (
    data = {},
    ToAddresses = ['matthew.tamal@gmail.com', 'ahmad.nabil@echotechsys.com'],
    Source = 'matthew.tamal@gmail.com'
) => {
    const params = {
        Destination: {
            ToAddresses
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Website Enquiry'
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: htmlTemplate(data)
                }
            }
        },
        Source
    };

    const sendPromise = new AWS.SES().sendEmail(params).promise();

    return sendPromise
        .then(data => data)
        .catch(err => {
            throw new Error(err);
        });
};
