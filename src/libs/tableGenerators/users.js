export const generateuserList = userList =>
    userList.map(({ id, firstName, lastName, email }) => ({
        User: {
            Component: firstName + ' ' + lastName,
            value: firstName + ' ' + lastName
        },
        Email: {
            Component: email,
            value: email
        },
        actions: {
            deleteAction: idx => console.log('delete', idx)
        }
    }));
