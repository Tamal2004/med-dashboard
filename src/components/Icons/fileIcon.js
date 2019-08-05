import React from 'react';

function FileIcon(props) {
    const color = props.color || '#7C7C7C';
    return (
        <svg {...props} x='0px' y='0px' viewBox='0 0 60 60'>
            <g>
                <path
                    style={{
                        fill: color,
                    }}
                    d='M42.5,22h-25c-0.6,0-1,0.4-1,1s0.4,1,1,1h25c0.6,0,1-0.4,1-1S43.1,22,42.5,22z'
                />
                <path
                    style={{
                        fill: color,
                    }}
                    d='M17.5,16h10c0.6,0,1-0.4,1-1s-0.4-1-1-1h-10c-0.6,0-1,0.4-1,1S16.9,16,17.5,16z'
                />
                <path
                    style={{
                        fill: color,
                    }}
                    d='M42.5,30h-25c-0.6,0-1,0.4-1,1s0.4,1,1,1h25c0.6,0,1-0.4,1-1S43.1,30,42.5,30z'
                />
                <path
                    style={{
                        fill: color,
                    }}
                    d='M42.5,38h-25c-0.6,0-1,0.4-1,1s0.4,1,1,1h25c0.6,0,1-0.4,1-1S43.1,38,42.5,38z'
                />
                <path
                    style={{
                        fill: color,
                    }}
                    d='M42.5,46h-25c-0.6,0-1,0.4-1,1s0.4,1,1,1h25c0.6,0,1-0.4,1-1S43.1,46,42.5,46z'
                />
                <path
                    style={{
                        fill: color,
                    }}
                    d='M38.9,0H6.5v60h47V14.6L38.9,0z M39.5,3.4L50.1,14H39.5V3.4z M8.5,58V2h29v14h14v42H8.5z'
                />
            </g>
        </svg>
    );
}

export { FileIcon as default, FileIcon };
