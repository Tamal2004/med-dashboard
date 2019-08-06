import React from 'react';

function CheckTickIcon(props) {
    const fill = props.color || '#8fc255';
    return (
        <svg {...props} x='0px' y='0px' viewBox='0 0 14.062 12.093'>
            <path
                style={{
                    fill
                }}
                d='M842.842,364.467a36.9,36.9,0,0,0-8.443,7.191l-3.151-2.445a10.936,10.936,0,0,0-1.767,1.509l5.738,5.779a0.213,0.213,0,0,0,.163.068,0.187,0.187,0,0,0,.045,0,0.23,0.23,0,0,0,.167-0.14,34.751,34.751,0,0,1,7.874-10.8,0.228,0.228,0,0,0,.056-0.256A6.383,6.383,0,0,0,842.842,364.467Z'
                transform='translate(-829.469 -364.469)'
            />
        </svg>
    );
}

export { CheckTickIcon as default, CheckTickIcon };
