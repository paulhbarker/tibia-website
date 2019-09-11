import React, { Component } from 'react';
import { connect } from 'react-redux';

class SubHeader extends Component {
    render() {
        return (
            <div className='sub-header'>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    controlsType: state.ui.controls.type
});

export default connect(mapStateToProps)(SubHeader);
