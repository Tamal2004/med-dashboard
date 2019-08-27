import { deserializeDate, calculateAge } from 'libs';

export const normalizeTestersList = ({ items = [] }) =>
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

export const normalizeTesterForm = (
    { dob, lastUpdated, address, ...testerForm },
    isPublic = true
) => {
    const publicTesterDetails = {
        dob: deserializeDate(dob),
        lastUpdated: deserializeDate(lastUpdated),
        age: calculateAge(dob),
        ...Object.splice(testerForm, [
            'title',
            'firstName',
            'surname',
            'gender',
            'maritalStatus',
            'hasChildren',
            'nationality',
            'ethnicity',
            'firstLanguage',
            'otherLanguages',
            'disability',
            'about',
            'lastUpdated'
        ])
    };

    const testerDetails = isPublic
        ? publicTesterDetails
        : {
              ...publicTesterDetails,
              ...Object.splice(testerForm, [
                  'clientNotes',
                  'facilitatorComments'
              ])
          };

    let addressDetails = {};
    if (address) addressDetails = { manualAddress: false, address };
    else {
        addressDetails = {
            manualAddress: true,
            ...Object.splice(testerForm, [
                'house',
                'street',
                'town',
                'county',
                'postcode',
                'country'
            ])
        };
    }

    const contactDetails = {
        ...Object.splice(testerForm, ['email', 'phone']),
        ...addressDetails
    };

    const employmentDetails = Object.splice(testerForm, [
        'employmentStatus',
        'jobTitle',
        'businessName',
        'employmentSector',
        'employeeCount',
        'subject',
        'educationStage',
        'institution'
    ]);

    return { testerDetails, contactDetails, employmentDetails };
};

export const normalizeTester = ({
    id,
    sessions: { items: sessionsData = [] } = {},
    contactNotes: { items: contactNotesData = [] } = {},
    ...testerData
}) => {
    const sessions = sessionsData.map(
        ({
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
        })
    );

    const contactNotes = contactNotesData.map(
        ({ date, project: { id, reference } = {}, ...rest }) => ({
            date: deserializeDate(date),
            projectId: id,
            projectReference: reference,
            ...rest
        })
    );

    return {
        ...normalizeTesterForm(testerData, false),
        testerData: { id, sessions, contactNotes }
    };
};
