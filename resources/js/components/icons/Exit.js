import React from 'react';

const Exit = props => {
    return (
        <svg viewBox="0 0 24 24" height={props.height || 24} width={props.width || 24} focusable="false" className="icon">
            <ellipse fill="currentColor" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)" cx="12" cy="12" rx="11.9" ry="11.9"></ellipse>
            <path fill="#fff" d="M15.7,5.7L12,9.4L8.3,5.7C7.6,5,6.4,5,5.7,5.7C5,6.4,5,7.6,5.7,8.3L9.4,12l-3.7,3.7c-0.7,0.7-0.7,1.9,0,2.6 c0.7,0.7,1.9,0.7,2.6,0l3.7-3.7l3.7,3.7c0.7,0.7,1.9,0.7,2.6,0c0.7-0.7,0.7-1.9,0-2.6L14.6,12l3.7-3.7c0.7-0.7,0.7-1.9,0-2.6 C17.5,5,16.4,5,15.7,5.7z"></path>
        </svg>
    );
};

export default Exit;
