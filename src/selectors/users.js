import createCachedSelector from 're-reselect';

// Local
import { generateuserList } from 'libs';

const selectUsers = state => state.users;

// User Id
export const selectUserId = createCachedSelector(
    selectUsers,
    (state, userIndex) => userIndex,
    ({ list = [] }, userIndex) => {
        return list[userIndex] && list[userIndex].id;
    }
)(() => 'placeholder');

// User List
export const selectUserList = createCachedSelector(selectUsers, ({ list }) =>
    generateuserList(list)
)(() => 'placeholder');
