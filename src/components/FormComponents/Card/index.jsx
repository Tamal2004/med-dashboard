import React from 'react';

// Local
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import { CardBase } from 'components';

const Card = props => {
    return (
        <CardBase
            CustomContent={CardContent}
            CustomHeader={CardHeader}
            {...props}
        />
    );
};

export { Card as default, Card };
