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

export const normalizeTester = (
    data = {
        id: '3a8cf4b5-433a-4ab9-b706-5b153c97d0cb',
        title: 'Mr',
        firstName: 'Matt',
        surname: 'Tamal',
        email: 'matt@echotechsys.com',
        phone: '01306568988',
        address: null,
        house: '12',
        street: 'Avenue Adolphe',
        town: 'Brussels',
        county: 'Yorkshire',
        postcode: '1050',
        country: 'Belgium',
        gender: 'Male',
        dob: '1999-01-01',
        maritalStatus: 'Single',
        hasChildren: true,
        nationality: 'United Kingdom',
        ethnicity: 'Arab',
        firstLanguage: 'English',
        otherLanguages: 'Bengali',
        disability: 'None',
        about: 'Software developer',
        employmentStatus: 'Full-time employment',
        jobTitle: 'Software Engineer',
        businessName: 'Matt Tamal',
        employmentSector: 'Computers & ICT',
        employeeCount: '1 - 9',
        subject: null,
        educationStage: null,
        institution: null,
        clientNotes: null,
        facilitatorComments: null,
        lastUpdated: '2019-08-23',
        contactNotes: {
            items: [
                {
                    id: '2c363a6e-b5b0-43f0-879c-bdf8dfd07361',
                    date: '2019-08-18',
                    project: {
                        id: '8916b36d-3db2-4c94-8786-81ad3c0518e7',
                        reference: 'EU26'
                    },
                    type: 'Attended',
                    contactedBy: 'Avril',
                    note: 'Good work'
                },
                {
                    id: '313026e9-17f1-4850-a879-dde14abf1220',
                    date: '2019-08-08',
                    project: {
                        id: '8916b36d-3db2-4c94-8786-81ad3c0518e7',
                        reference: 'EU26'
                    },
                    type: 'Confirmed',
                    contactedBy: 'Lucy',
                    note: 'Decent'
                }
            ]
        },
        sessions: {
            items: [
                {
                    id: '8914f4c3-cd78-4cfd-aaca-ed6d54098733',
                    date: '2019-08-11',
                    time: '16:30',
                    project: {
                        id: '8916b36d-3db2-4c94-8786-81ad3c0518e7',
                        reference: 'EU26',
                        client: {
                            id: 'cecea1c8-f178-46cd-9a4e-4b6f1508c987',
                            name: 'Disney'
                        }
                    },
                    notes: 'This one has a note too'
                }
            ]
        }
    }
) => {
    const {
        id,
        sessions: { items: sessionsData = [] } = {},
        contactNotes: { items: contactNotesData = [] } = {},
        ...testerData
    } = data;

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
