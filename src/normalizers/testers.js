import { deserializeDate } from 'libs';

export const normalizeTesters = ({ items = [] }) =>
    items.map(
        ({
            id,
            firstName,
            surname,
            sessions: { items: sessions = [] },
            contactNotes: { items: contactNotes = [] }
        }) => {
            const lastContactDate = contactNotes.reduce((acm, { date }) => {
                if (!acm) return new Date(date);

                const formattedDate = new Date(date);
                return acm < formattedDate ? formattedDate : acm;
            }, null);

            const { date: lastTestingDate, reference } = sessions.reduce(
                (acm, { date, project: { reference = null } = {} }) => {
                    if (!acm.date) return { date: new Date(date), reference };
                    const formattedDate = new Date(date);
                    return acm.date < formattedDate
                        ? { date: formattedDate, reference }
                        : acm;
                },
                { date: null }
            );

            return {
                testerName: `${firstName} ${surname}`,
                testerNumber: id,
                lastProject: reference,
                lastTestingDate: deserializeDate(lastTestingDate),
                lastContactDate: deserializeDate(lastContactDate)
            };
        }
    );
