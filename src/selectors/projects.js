import createCachedSelector from 're-reselect';

// Local
import {
    mapArray,
    mapToSelect,
    generateProjectList,
    generateProjectSessions,
    generateProjectProfiles
} from 'libs';

const selectProjects = state => state.projects;

const selectIndividual = createCachedSelector(
    selectProjects,
    ({ individual }) => individual
)(() => 'placeholder');

// Project Clients
export const selectProjectClients = createCachedSelector(
    selectProjects,
    ({ clients }) => mapToSelect(clients, 'id', 'name')
)(() => 'placeholder');

// Project Users
export const selectProjectUsers = createCachedSelector(
    selectProjects,
    ({ users }) => mapArray(users)
)(() => 'placeholder');

// Project Individual
export const selectProjectId = createCachedSelector(
    selectIndividual,
    ({ id }) => id
)(() => 'placeholder');

export const selectProjectProfiles = createCachedSelector(
    selectIndividual,
    ({ profiles = [] }) => generateProjectProfiles(profiles)
)(() => 'placeholder');

export const selectProjectSessions = createCachedSelector(
    selectIndividual,
    ({ sessions = [] }) => generateProjectSessions(sessions)
)(() => 'placeholder');

// Project List
export const selectProjectList = createCachedSelector(
    selectProjects,
    ({ list }) => generateProjectList(list)
)(() => 'placeholder');

// Project Search
export const selectIsValidProjectQuery = createCachedSelector(
    selectProjects,
    (state, id) => id,
    ({ queryId }, id) => queryId === id
)(() => 'placeholder');

export const selectAreProjectsSearching = createCachedSelector(
    selectProjects,
    ({ isSearching }) => isSearching
)(() => 'placeholder');

const composeReportTimestamp = ({ date, time }) => {
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    const hourTime = hour * 60 * 60 * 1000;
    const minuteTime = minute * 60 * 1000;
    const dateTime = new Date(`${month}/${day}/${year}`).getTime();
    return dateTime + hourTime + minuteTime;
};

// Project Report
export const selectProjectReport = createCachedSelector(
    selectProjects,
    ({ report: { reportData, ...restReport } }) => {
        if (!!reportData) {
            const sortedReportData = reportData.sort((a, b) => {
                const aTime = composeReportTimestamp(a);
                const bTime = composeReportTimestamp(b);
                if (aTime > bTime) return 1;
                if (aTime < bTime) return -1;
                if (aTime === bTime) return 0;
            });

            return { reportData: sortedReportData, ...restReport };
        }
        return { reportData, ...restReport };
    }
)(() => 'placeholder');
