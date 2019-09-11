import React, { Component } from 'react';

class RippleLoader extends Component {
    render() {
        const {
            width = 44,
            height = 44,
            stroke = 2
        } = this.props;

        return (
            <svg width={width} height={height} viewBox="0 0 44 44" stroke="#B1B8C1" focusable='false' className='loader'>
                <g fill="none" strokeWidth={stroke}>
                    <circle cx="22" cy="22" r="18.5428">
                        <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="22" cy="22" r="2.74">
                        <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                        <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
                    </circle>
                </g>
            </svg>
        );
    }
}

export default RippleLoader;
