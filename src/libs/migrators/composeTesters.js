import uuid from 'uuid/v4';

const validateEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export default testers =>
    testers.reduce(
        (
            acm,
            {
                id,
                email,
                about,
                dob,
                updatedAt,
                sessions,
                contactNotes,
                ...tester
            }
        ) => {
            const newTesterId = uuid();
            const composedEmail =
                !email || validateEmail(email) === 'Invalid email address'
                    ? `${newTesterId}@archive.com`
                    : email;

            const testerDatum = {
                id: newTesterId,
                dob: dob || '1990-01-01',
                email: composedEmail,
                updatedAt: new Date(updatedAt).getTime(),
                about: about || 'Unknown',
                lastUpdated: updatedAt || today(),
                ...tester
            };

            return {
                testerIds: { ...acm.testerIds, [id]: newTesterId },
                testerData: [...acm.testerData, testerDatum]
            };
        },
        { testerIds: {}, testerData: [] }
    );
