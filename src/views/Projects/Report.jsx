import React from 'react';

import { GridContainer, GridItem, ReportTable } from 'components';

const ProjectReport = ({ location }) => {
	const params = new URLSearchParams(location.search);
	const profileType = params.get('type');

	const id = params.get('id');
	const testers = params.get('testers');
	if (testers) {
		console.log(testers.split('||'))
	}

	console.log(id)


	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				<ReportTable type={profileType} />
			</GridItem>
		</GridContainer>
	);
};

export { ProjectReport as default, ProjectReport };
