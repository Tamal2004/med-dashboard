export const composeRequest = ({
    firstName,
    surname,
    userFullName,
    testerId = ''
}) => ({
    subject: 'Please ensure your details are up to date',
    body: `
        <p>Dear ${firstName} ${surname},</p>
        </br>
        <p>We just wanted to make sure that the details we have for you 
        on our tester database are up to date. Please 
        <a href="mailto:www.google.com">click through to check and update your 
        details.</a> The more details you provide, the easier it will 
        be for us to match you to relevant projects!</p>
        </br>
        <p>Many thanks,</p>
        <p>${userFullName}</p>
        </br>
        <p>To be removed from our tester database, please 
        <a href="mailto:www.google.com">unsubscribe here</a></p>
    `
});
