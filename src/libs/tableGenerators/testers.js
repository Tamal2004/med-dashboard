import React from 'react';

import { Link } from 'components';

export const generateTesterList = testerList =>
    testerList.map(
        ({
            testerName,
            testerNumber,
            lastContactDate,
            lastProject,
            lastTestingDate
        }) => ({
            'Tester Name': {
                Component: (
                    <Link to={`/tester/${testerNumber}`}>{testerName}</Link>
                ),
                value: testerName
            },
            'Last Project': {
                Component: (
                    <Link
                        to={lastProject ? `/project/${lastProject}` : '/tester'}
                    >
                        {lastProject || 'No Projects'}
                    </Link>
                ),
                value: lastProject || 'No Projects'
            },
            'Last Testing Date': lastTestingDate || 'No Sessions',
            'Last Contact Date': lastContactDate || 'No Contacts'
        })
    );
