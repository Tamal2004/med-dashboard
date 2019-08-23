import { deserializeDate } from 'libs';

export const normalizeProjects = ({ items = [] }) =>
    items.map(({ client: { id, name }, testingDate, ...project }) => ({
        ...project,
        clientId: id,
        clientName: name,
        testingDate: deserializeDate(testingDate)
    }));
