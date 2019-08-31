import React from 'react';

const Arrow = ({ direction }) => {
    let transform = '';

    switch(direction) {
        case 'up': transform = 'translate(12, 12) scale(-1, 1) rotate(-90) translate(-12, -12)'; break;
        case 'down': transform = 'translate(12, 12) scale(-1, 1) rotate(90) translate(-12, -12)'; break;
        case 'left': transform = 'translate(12, 12) scale(-1, 1) translate(-12, -12)'; break;
        case 'right': transform = ''; break;
        default: break;
    }

    return (
        <svg width='24' height='24' viewBox='0 0 24 24' focusable='false' className='icon'>
            <g fill='currentColor'>
                <path transform={transform} d="M14.1911587,5.82359068 C13.5411858,6.47856339 13.5411858,7.53851923 14.1911587,8.19349194 L16.3094038,10.3250698 L14.1478272,10.3250698 L10.9629599,10.3250698 L3.66826382,10.3250698 C2.74663556,10.3250698 2,11.0750385 2,12 C2,12.9249615 2.74663556,13.6749302 3.66826382,13.6749302 L10.9629599,13.6749302 L14.1478272,13.6749302 L16.3094038,13.6749302 L14.1911587,15.8065081 C13.5411858,16.4614808 13.5411858,17.51977 14.1911587,18.1764093 C14.5178118,18.5013958 14.9444606,18.6663889 15.3677763,18.6663889 C15.7960918,18.6663889 16.2210741,18.5013958 16.5493938,18.1764093 L21.5125203,13.1849506 C22.1624932,12.5316445 22.1624932,11.4716887 21.5125203,10.8150494 L16.5493938,5.82359068 C16.2227407,5.49693763 15.7960918,5.3336111 15.3694429,5.3336111 C14.9427941,5.3336111 14.5161452,5.49693763 14.1911587,5.82359068 Z" id="path-1"></path>
            </g>
        </svg>
    )
};

export default Arrow;
