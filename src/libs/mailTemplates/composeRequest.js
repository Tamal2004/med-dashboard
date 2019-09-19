const { REACT_APP_DOMAIN } = process.env;

const composeRequestContent = ({ firstName, surname, userFullName }) => `
    <tr>
        <td style="font-size: 16px; line-height: 22px;">
            <p>Dear ${firstName} ${surname},</p>
            
            <p>You are currently registered on the Web Usability tester 
            database to be considered for website testing opportunities.</p>
            
            <p>We just wanted to make sure that the details we have for you 
            are up to date. Please <a href="${REACT_APP_DOMAIN}">click here</a> to login and update your details. 
            The more details you provide, the easier it will be for us to 
            match you to relevant projects!</p>
            
            </br>
            <p>Many thanks,</p>
            <p>${userFullName}</p>
        </td>
    </tr>
`;

export const composeRequest = requestContent => ({
    subject: 'Web Usability – please ensure your details are up to date',
    body: composeRequestContent(requestContent)
});
