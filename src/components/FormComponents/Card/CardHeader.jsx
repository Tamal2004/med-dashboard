import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { CardHeaderBase } from 'components';
import { CopyAction, DeleteAction, EditAction } from 'assets';
import styles from './styles';
import { composeClasses } from 'helpers';

const CardHeader = ({
	classes,
	duplicateAction,
	deleteAction,
	editAction,
	...props
}) => {
	const c = composeClasses({ classes, styles });
	const action = (
		<Fragment>
			{duplicateAction && <CopyAction onClick={duplicateAction} />}
			{editAction && <EditAction onClick={editAction} />}
			{deleteAction && <DeleteAction onClick={deleteAction} />}
		</Fragment>
	);
	return <CardHeaderBase {...props} classes={c} action={action} />;
};

const _CardHeader = withStyles(styles)(CardHeader);

export { _CardHeader as default, _CardHeader as CardHeader };
