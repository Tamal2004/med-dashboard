import React from 'react';

import { GridContainer, GridItem, ReportTable } from 'components';

const ProjectReport = ({ location }) => {
	const params = new URLSearchParams(location.search);
	const profileType = params.get('type');

	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				<ReportTable type={profileType} />
			</GridItem>
		</GridContainer>
	);
};

export { ProjectReport as default, ProjectReport };
