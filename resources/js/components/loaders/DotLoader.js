import React, { Component } from 'react';

class DotLoader extends Component {
    render() {
        return (
            <div className='dots'>
                {this.renderDots().map(i => i)}
            </div>
        );
    }

    renderDots() {
        const output = [];

        for (let i = 1; i <= 6; i++) {
            output.push(<span key={i} className={`dot dot-${i}`}></span>);
        }

        return output;
    }
}

export default DotLoader;
