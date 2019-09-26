const { REACT_APP_SES_ADMIN_EMAIL, REACT_APP_DOMAIN } = process.env;

const composeBulkTesterContent = ({ firstName, surname, email, password }) => `
    <tr>
        <td className="bodycopy">
            <p>Dear ${firstName} ${surname},</p>
            <p>You are currently registered on the Web Usability tester database to 
            be considered for website testing opportunities. </p>
            <p>We are in the process of updating our database and you will now be 
            able to update or amend your details online whenever you want. </p>
            <p>An account has been automatically generated for you and can be 
            accessed using the following unique log in details:</p>
            </br>
            <p>Email: ${email}</p>
            <p>Password: ${password}</p>
            <p><a href="${REACT_APP_DOMAIN}">Click here to get started.</a></p>
            </br>
            <p>Once logged in, you will be asked to change your password and 
            verify your email address to keep your record secure.</p>
            <p>If you have any questions, please do get in touch at 
            <a href="mailto:avril@webusability.co.uk">avril@webusability.co.uk</a>.</p>
            </br>
            <p>Best wishes</p>
            <p>Avril Swift</p>
        </td>
    </tr>
`;

export const composeNewTesterBulk = ({ email, testerId, ...contentData }) => ({
    from: REACT_APP_SES_ADMIN_EMAIL,
    to: [email],
    subject: 'Your new Web Usability account has been created',
    body: composeBulkTesterContent({ email, ...contentData }),
    testerId
});
