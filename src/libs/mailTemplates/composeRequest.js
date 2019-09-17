const { REACT_APP_DOMAIN } = process.env;

const composeRequestContent = ({ firstName, surname, userFullName }) => `
    <tr>
        <td style="font-size: 16px; line-height: 22px;">
            <p>Dear ${firstName} ${surname},</p>
            <p>We just wanted to make sure that the details we have for you 
            on our tester database are up to date. Please 
            <a href="${REACT_APP_DOMAIN}/sign-in">click here to login and update your 
            details.</a> The more details you provide, the easier it will 
            be for us to match you to relevant projects!</p>
            </br>
            <p>Many thanks,</p>
            <p>${userFullName}</p>
        </td>
    </tr>
`;

export const composeRequest = requestContent => ({
    subject: 'Please ensure your details are up to date',
    body: composeRequestContent(requestContent)
});

// d1846baa-1b19-4b60-b753-644858bd0c1f
