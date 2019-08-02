import React from 'react';

const ClientSingle = ({ match }) => {
	return <h3>Client id: {match.params.id}</h3>;
};

export { ClientSingle as default, ClientSingle };
