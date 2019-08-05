import React from 'react';

function CheckBoxIconBlank(props) {
    const color = props.color || '#373A3F';
    return (
        <svg {...props} x='0px' y='0px' viewBox='0 0 19 18'>
            <path
                style={{
                    fill: '#FFFFFF',
                    fillOpacity: 0,
                    stroke: color,
                    strokeLinejoin: 'round',
                }}
                d='M6,3h7c1.7,0,3,1.3,3,3v6c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3V6C3,4.3,4.3,3,6,3z'
            />
        </svg>
    );
}

export { CheckBoxIconBlank as default, CheckBoxIconBlank };
