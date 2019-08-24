import createCachedSelector from 're-reselect';

const selectAuth = state => state.auth;

export const selectAuthTesterId = createCachedSelector(
    selectAuth,
    ({ testerId }) => testerId || null
)(() => 'placeholder');

export const selectIsTester = createCachedSelector(
    selectAuthTesterId,
    testerId => !!testerId
)(() => 'placeholder');
