import { deserializeDate, calculateAge } from 'libs';

export const normalizeSessionTester = ({
    date,
    project: {
        id: projectId,
        reference,
        client: { id: clientId, name } = {}
    } = {},
    ...rest
}) => ({
    date: deserializeDate(date),
    projectId,
    projectReference: reference,
    clientId,
    clientName: name,
    ...rest
});
