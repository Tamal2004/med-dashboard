export default ({
    name = 'Matt',
    email = 'matthew.tamal@gmail.com',
    message = 'This is the default message???'
}) => {
    return `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong> ${message}</p>
    `;
};
