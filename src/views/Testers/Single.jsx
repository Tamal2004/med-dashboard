import React from 'react';

const TesterSingle = ({ match }) => {
	return <h3>Tester id: {match.params.idd}</h3>;
};

export { TesterSingle as default, TesterSingle };
