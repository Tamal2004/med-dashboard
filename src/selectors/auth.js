import createCachedSelector from 're-reselect';

const selectAuth = state => state.auth;

export const selectTesterId = createCachedSelector(
    selectAuth,
    ({ testerId }) => testerId || null
)(() => 'placeholder');

export const selectIsTester = createCachedSelector(
    selectTesterId,
    testerId => !!testerId
)(() => 'placeholder');
