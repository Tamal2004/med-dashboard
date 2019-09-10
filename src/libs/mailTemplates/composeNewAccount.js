const { REACT_APP_DOMAIN, REACT_APP_SES_ADMIN_EMAIL } = process.env;

export const composeNewAccount = ({ firstName, email, password }) => ({
    from: REACT_APP_SES_ADMIN_EMAIL,
    to: [email],
    subject: 'Your Web Usability account has been registered!',
    body: `
        <p>Hi ${firstName},</p>
        </br>
        <p>Your new Web Usability account has been registered!</p>
        </br>
        <p>Your account details are:</p>
        </br>
        <p>Email: ${email}</p>
        <p>Temporary password: ${password}</p>
        </br>
        <p><a href="${REACT_APP_DOMAIN}/sign-in">Please click here to go to the login page.</a></p>
        </br>
        </br>
        <p>Phone 01249-444-757 / 
        <a href="mailto:avril@webusability.co.uk">avril@webusability.co.uk</a></p>
    `
});
