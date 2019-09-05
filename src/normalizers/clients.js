import { deserializeDate, calculateAge } from 'libs';

export const normalizeClientSingle = ({
    name,
    projects: { items: projects = [] } = {}
}) => ({
    name,
    projects: projects.map(({ testingDate, ...project }) => ({
        testingDate: deserializeDate(testingDate),
        ...project
    }))
});

export const normalizeClient = client => {
    const { projects: { items: projects = [] } = {}, ...rest } = client;

    const { latestProjectDate, ...latestProject } = projects.reduce(
        (acm, { id, reference, testingDate }) => {
            if (!acm.latestProjectDate)
                return {
                    latestProjectId: id,
                    latestProjectReference: reference,
                    latestProjectDate: new Date(testingDate)
                };

            const formattedDate = new Date(testingDate);

            return acm.latestProjectDate < formattedDate
                ? {
                      latestProjectId: id,
                      latestProjectReference: reference,
                      latestProjectDate: formattedDate
                  }
                : acm;
        },
        {
            latestProjectDate: null
        }
    );

    return {
        latestProjectDate: deserializeDate(latestProjectDate),
        ...latestProject,
        ...rest
    };
};

export const normalizeClients = clients => clients.map(normalizeClient);
