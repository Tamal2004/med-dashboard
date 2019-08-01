import AWS from 'aws-sdk';

const config = {
    accessKeyId: 'AKIA437UHAP7EDLDOG4J',
    secretAccessKey: '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',
    region: 'us-east-1'
};

AWS.config.update(config);

const htmlTemplate = ({
                          name = 'Matt',
                          email = 'matthew.tamal@gmail.com',
                          message = 'This is the default message'
                      }) => {
    return `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong> ${message}</p>
    `;
};

const sendMail = data => {
    const params = {
        Destination: {
            ToAddresses: ['matthew.tamal@gmail.com']
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
        Source: 'matthew.tamal@gmail.com'
    };

    const sendPromise = new AWS.SES().sendEmail(params).promise();

    return sendPromise
        .then(data => data)
        .catch(err => {
            throw new Error(err);
        });
};

export { sendMail as default, sendMail };
