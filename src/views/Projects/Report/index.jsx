import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

// Material
import { makeStyles, Typography } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';

// Components
import {
    GridContainer,
    GridItem,
    ReportTable,
    IconButton,
    Link,
    BarLoader
} from 'components';
/*eslint-disable-next-line no-unused-vars*/
import print from './print.css';

// Selectors
import { selectProjectReport } from 'selectors';

// Actions
import { fetchProjectReport, resetProjectReport } from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
    textAlign: {
        textAlign: 'right'
    },
    sectionToPrint: {
        padding: spacing(2.5)
    }
}));

const ProjectReport = ({
    location,
    fetchProjectReport,
    resetProjectReport,
    id,
    reference,
    title,
    reportData
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);

    const params = new URLSearchParams(location.search);
    const profileType = params.get('type');
    const testers = params.get('testers');

    useEffect(() => {
        const id = params.get('id');

        if (testers) {
            const testerIndices = testers.split('||');
            fetchProjectReport(id, testerIndices).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
        return () => {
            resetProjectReport();
        };
        /*eslint-disable-next-line*/
    }, []);

    return (
        <GridContainer alignItems='center'>
            {testers && (
                <GridItem md={12}>
                    {isLoading ? (
                        <BarLoader />
                    ) : (
                        <Fragment>
                            <div className={c.textAlign}>
                                <IconButton
                                    title='Print'
                                    onClick={() => window.print()}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </div>
                            <div
                                className={clsx(
                                    c.sectionToPrint,
                                    'section-to-print'
                                )}
                            >
                                <Typography variant='h4' align='center'>
                                    {`Web Usability tester profiles for `}
                                    <Link to={`/project/${id}`}>
                                        {reference}
                                    </Link>
                                    {` -- ${title}`}
                                </Typography>
                                <ReportTable
                                    type={profileType}
                                    data={reportData}
                                />
                            </div>
                        </Fragment>
                    )}
                </GridItem>
            )}
        </GridContainer>
    );
};

const mapState = state => ({ ...selectProjectReport(state) });

const mapDispatch = { fetchProjectReport, resetProjectReport };

const _ProjectReport = connect(
    mapState,
    mapDispatch
)(ProjectReport);

export { _ProjectReport as default, _ProjectReport as ProjectReport };
