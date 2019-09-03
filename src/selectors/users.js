import createCachedSelector from 're-reselect';

// Local
import { generateuserList } from 'libs';

const selectUsers = state => state.users;

// User List
export const selectUserList = createCachedSelector(selectUsers, ({ list }) =>
    generateuserList(list)
)(() => 'placeholder');
