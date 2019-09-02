export const generateuserList = userList =>
    userList.map(({ id, firstName, lastName, email }) => ({
        User: {
            Component: firstName + ' ' + firstName,
            value: firstName + ' ' + firstName
        },
        Email: {
            Component: email,
            value: email
        },
        actions: {
            deleteAction: idx => console.log('delete', idx)
        }
    }));
