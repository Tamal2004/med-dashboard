import React from 'react';

const TesterSingle = ({ match }) => {
	return <h3>Tester id: {match.params.id}</h3>;
};

export { TesterSingle as default, TesterSingle };
