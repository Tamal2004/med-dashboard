import createCachedSelector from 're-reselect';

// Local
import {
    mapArray,
    mapToSelect,
    generateClientProjects,
    generateuserList
} from 'libs';

const selectUsers = state => state.users;

// User Id
// export const selectClientId = createCachedSelector(
//     selectUsers,
//     (state, clientIndex) => clientIndex,
//     ({ list = [] }, clientIndex) => {
//         return list[clientIndex] && list[clientIndex].id;
//     }
// )(() => 'placeholder');

// User List
export const selectUserList = createCachedSelector(selectUsers, ({ list }) =>
    generateuserList(list)
)(() => 'placeholder');
