import React, { useEffect}from 'react';
import { connect } from 'react-redux';

// Components
import { GridContainer, GridItem, ReportTable } from 'components';

// Selectors
import { listProjectReports } from 'actions';

const ProjectReport = ({ location, listProjectReports }) => {
	const params = new URLSearchParams(location.search);
	const profileType = params.get('type');
    useEffect(() => {
		const params = new URLSearchParams(location.search);
		const profileType = params.get('type');
		const id = params.get('id');
		const testers = params.get('testers');

		if (testers) {
			listProjectReports(id).then(() => console.log('called'))
		}

	}, []);

    return (
        <GridContainer alignItems='center'>
            <GridItem md={12}>
                <ReportTable type={profileType} />
            </GridItem>
        </GridContainer>
    );
};

const mapState = state => ({});

const mapDispatch = {listProjectReports};

const _ProjectReport = connect(
    mapState,
    mapDispatch
)(ProjectReport);

export { _ProjectReport as default, _ProjectReport as ProjectReport };
