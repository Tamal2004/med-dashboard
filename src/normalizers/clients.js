import { deserializeDate, calculateAge } from 'libs';

export const normalizeClientSingle = (
    client = {
        name: 'Aldi',
        projects: {
            items: [
                {
                    id: '8916b36d-3db2-4c94-8786-81ad3c0518e7',
                    reference: 'EU26',
                    title: 'Old Vamp',
                    testingDate: '2019-08-22',
                    status: 'In Progress',
                    principalContact: 'Matt'
                }
            ]
        }
    }
) => {
    const { name, projects: { items: projects = [] } = {} } = client;

    return { name, projects };
};

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
