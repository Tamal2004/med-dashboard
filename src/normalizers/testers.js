import { deserializeDate, calculateAge } from 'libs';

// Local
import { normalizeSessionTester } from './sessions';
import { normalizeContactNote } from './contactNotes';

export const normalizeTestersSearch = testersSearch =>
    testersSearch.map(({ dob, firstName, surname, ...tester }) => ({
        name: `${firstName} ${surname}`,
        age: calculateAge(dob),
        ...tester
    }));

export const normalizeTestersList = testers =>
    testers.map(
        ({
            id,
            firstName,
            surname,
            sessions: { items: sessions = [] },
            contactNotes: { items: contactNotes = [] }
        }) => {
            const lastContactDate = contactNotes
                .filter(contactNote => !!contactNote)
                .reduce((acm, { date }) => {
                    if (!acm) return new Date(date);

                    const formattedDate = new Date(date);
                    return acm < formattedDate ? formattedDate : acm;
                }, null);

            const {
                date: lastTestingDate,
                reference: lastProjectReference,
                id: lastProjectId
            } = sessions
                .filter(session => !!session)
                .reduce(
                    (
                        acm,
                        { date, project: { reference = null, id = null } = {} }
                    ) => {
                        if (!acm.date)
                            return { date: new Date(date), reference, id };
                        const formattedDate = new Date(date);
                        return acm.date < formattedDate
                            ? { date: formattedDate, reference, id }
                            : acm;
                    },
                    { date: null }
                );

            return {
                testerName: `${firstName} ${surname}`,
                testerNumber: id,
                lastProjectReference,
                lastProjectId,
                lastTestingDate: deserializeDate(lastTestingDate),
                lastContactDate: deserializeDate(lastContactDate)
            };
        }
    );

export const normalizeTesterForm = (
    { dob, hasChildren, lastUpdated, address, ...testerForm },
    isPublic = true
) => {
    const publicTesterDetails = {
        dob: deserializeDate(dob),
        lastUpdated: deserializeDate(lastUpdated),
        age: calculateAge(dob),
        hasChildren: hasChildren ? 'Yes' : 'No',
        ...Object.splice(testerForm, [
            'email',
            'title',
            'firstName',
            'surname',
            'gender',
            'maritalStatus',
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

    const contactDetails = {
        ...Object.splice(testerForm, [
            'email',
            'phone',
            'town',
            'house',
            'street',
            'county',
            'postcode',
            'country'
        ])
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
    const sessions = sessionsData
        .filter(session => !!session && !!session.project)
        .map(normalizeSessionTester);

    const contactNotes = contactNotesData
        .filter(contactNote => !!contactNote && !!contactNote.project)
        .map(normalizeContactNote);

    return {
        ...normalizeTesterForm(testerData, false),
        testerData: { id, sessions, contactNotes }
    };
};
