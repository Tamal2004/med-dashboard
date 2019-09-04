import createCachedSelector from 're-reselect';

const selectAuth = state => state.auth;

export const selectAuthTesterId = createCachedSelector(
    selectAuth,
    ({ testerId }) => testerId || null
)(() => 'placeholder');

export const selectIsTester = createCachedSelector(
    selectAuth,
    ({ isTester }) => isTester
)(() => 'placeholder');

export const selectEmail = createCachedSelector(
    selectAuth,
    ({ email }) => email
)(() => 'placeholder');

export const selectFullName = createCachedSelector(
    selectAuth,
    ({ name }) => name
)(() => 'placeholder');
