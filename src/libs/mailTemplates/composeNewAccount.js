const { REACT_APP_SES_ADMIN_EMAIL, REACT_APP_DOMAIN } = process.env;

const composeNewAccountContent = ({
    firstName,
    email,
    password,
    from,
    userFullName = 'Avril Swift'
}) => `
    <tr>
        <td style="font-size: 16px; line-height: 22px;">
            <p>Dear ${firstName},</p>
            <p>Thank you for registering to be a website usability tester. Your 
            details have successfully been added to our database and we will be 
            in touch when suitable projects become available.</p>
            
            <p>So you can keep your details up to date, an account has been 
            automatically generated for you and can be accessed using the following 
            login in details:</p>
            <p>Username: ${email}</p>
            <p>Password: ${password}</p>
            <p>Login here: <a href="${REACT_APP_DOMAIN}">${REACT_APP_DOMAIN}</a></p>
            </br>
            <p>Once logged in, you will be asked to change your password and verify 
            your email address to keep your record secure.</p>
            <p>If you have any questions, please to get in touch at 
            <a href="mailto:${from}">${from}</a></p>
            </br>
            <p>Best wishes</p>
            <p>${userFullName}</p>
        </td>
    </tr>
`;

export const composeNewAccount = ({
    from = REACT_APP_SES_ADMIN_EMAIL,
    email,
    testerId,
    ...contentData
}) => ({
    from,
    to: [email],
    subject: 'Your Web Usability account has been registered!',
    body: composeNewAccountContent({ from, email, ...contentData }),
    testerId
});
