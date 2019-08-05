import React from 'react';

function GreyDot(props) {
    const color = props.color || '#cacaca';
    return (
        <svg {...props} x='0px' y='0px' viewBox='0 0 20 20'>
            <circle
                style={{
                    fill: color,
                }}
                cx='10'
                cy='10'
                r='9'
            />
        </svg>
    );
}

export default GreyDot;
