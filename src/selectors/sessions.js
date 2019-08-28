import createCachedSelector from 're-reselect';

// Local
import { selectIndividual as selectTesterIndividual } from './testers';
import { mapArray } from 'libs';

// Session Profiles
export const selectSessionProfiles = createCachedSelector(
    selectTesterIndividual,
    (state, projectId) => projectId,
    ({ projects = [] }, projectId) => {
        const [{ profiles = [] } = {}] = projects.filter(
            ({ id }) => id === projectId
        );

        return profiles ? mapArray(profiles) : [];
    }
)(() => 'placeholder');

// Session Id
export const selectSessionId = createCachedSelector(
    selectTesterIndividual,
    (state, sessionIndex) => sessionIndex,
    ({ sessions = [] }, sessionIndex) => {
        return sessions[sessionIndex] && sessions[sessionIndex].id;
    }
)(() => 'placeholder');
