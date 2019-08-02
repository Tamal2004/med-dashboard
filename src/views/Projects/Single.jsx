import React from 'react';

const ProjectSingle = ({ match }) => {
	console.log('proejct ', match);
	return <h3>Project id: {match.params.id}</h3>;
};

export { ProjectSingle as default, ProjectSingle };
