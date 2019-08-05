import React from 'react';

const CopyIcon = ({ color: fill = 'rgba(0, 0, 0, 0.87)', ...restProps }) => {
    return (
        <svg {...restProps} x='0px' y='0px' viewBox='0 0 13 13'>
            <path
                style={{
                    fill,
                    fillRule: 'evenodd'
                }}
                d='M609.437,991.75v-4.063a3.251,3.251,0,0,1,3.25-3.25h3.251c0.28,0,.553,0,0.812,0A2.435,2.435,0,0,0,614.315,982h-4.88A2.435,2.435,0,0,0,607,984.435v4.88a2.435,2.435,0,0,0,2.435,2.435h0Zm8.128-6.5h-4.88a2.435,2.435,0,0,0-2.435,2.435v4.88A2.435,2.435,0,0,0,612.685,995h4.88A2.435,2.435,0,0,0,620,992.565v-4.88A2.435,2.435,0,0,0,617.565,985.25Z'
                transform='translate(-607 -982)'
            />
        </svg>
    );
};

export { CopyIcon as default, CopyIcon };
