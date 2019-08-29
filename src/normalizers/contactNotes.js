import { deserializeDate } from 'libs';

export const normalizeContactNote = ({
    date,
    project: { id, reference } = {},
    ...rest
}) => ({
    date: deserializeDate(date),
    projectId: id,
    projectReference: reference,
    ...rest
});
