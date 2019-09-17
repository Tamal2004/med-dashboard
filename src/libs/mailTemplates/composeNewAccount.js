const { REACT_APP_DOMAIN, REACT_APP_SES_ADMIN_EMAIL } = process.env;

const composeNewAccountContent = ({ firstName, email, password }) => `
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

export const composeNewAccount = ({ firstName, email, password }) => ({
    from: REACT_APP_SES_ADMIN_EMAIL,
    to: [email],
    subject: 'Your Web Usability account has been registered!',
    body: composeNewAccountContent({ firstName, email, password })
});
