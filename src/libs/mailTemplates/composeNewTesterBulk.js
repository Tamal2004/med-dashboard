import baseTemplate from './baseTemplate';

const { REACT_APP_SES_ADMIN_EMAIL, REACT_APP_DOMAIN } = process.env;

const mailContent = ({ firstName, email, password }) => `
    <tr>
        <td className="h2">
            Welcome to the new database!
        </td>
    </tr>
    <tr>
        <td className="bodycopy">
            <p>Hi ${firstName}!</p>
            <p>Your new Web Usability account has been registered.</p>
            <p>Your account details are: </p>
            <p>Email: ${email}</p>
            <p>Temporary password: ${password}</p>
            </br>
            <p><span><a href="${REACT_APP_DOMAIN}/sign-in">Click here</a> to sign in!</span></p>
        </td>
    </tr>
`;

export const composeNewTesterBulk = ({
    firstName,
    email,
    password,
    testerId
}) => ({
    from: REACT_APP_SES_ADMIN_EMAIL,
    to: [email],
    subject: 'A new Web Usability account has been created!',
    body: baseTemplate(mailContent({ firstName, email, password }), testerId)
});
