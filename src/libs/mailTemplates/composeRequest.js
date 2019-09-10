const { REACT_APP_DOMAIN } = process.env;

const unsubscribeUrl = id => `${REACT_APP_DOMAIN}/unsubscribe?id=${id}`;

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
        <a href="${REACT_APP_DOMAIN}/sign-in">click here to login and update your 
        details.</a> The more details you provide, the easier it will 
        be for us to match you to relevant projects!</p>
        </br>
        <p>Many thanks,</p>
        <p>${userFullName}</p>
        </br>
        <p>If you no longer wish to be considered for website usability testing sessions, please <a href="${unsubscribeUrl(
            testerId
        )}">click here</a> to be removed from our tester database</p>
    `
});

// d1846baa-1b19-4b60-b753-644858bd0c1f
