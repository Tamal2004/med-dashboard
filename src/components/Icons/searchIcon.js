import React from 'react';

function SearchIcon(props) {
    const color = props.color || '#1e1e1e';
    return (
        <svg {...props} x='0px' y='0px' viewBox='0 0 15 15'>
            <path
                style={{
                    fill: color,
                    fillRule: 'evenodd',
                }}
                d='M1267.81,1085.93l-3.61-3.61a6.246,6.246,0,0,0,1.43-4,6.291,6.291,0,1,0-2.31,4.89l3.6,3.6a0.64,0.64,0,0,0,.89,0A0.628,0.628,0,0,0,1267.81,1085.93Zm-8.49-2.55a5.065,5.065,0,1,1,5.06-5.06A5.068,5.068,0,0,1,1259.32,1083.38Z'
                transform='translate(-1253 -1072)'
            />
        </svg>
    );
}

export default SearchIcon;
