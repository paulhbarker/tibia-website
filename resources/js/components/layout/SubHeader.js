import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeadControls from '../pages/Leads/LeadControls';
import ListingControls from '../pages/Listings/ListingControls';

class SubHeader extends Component {
    render() {
        const controls = {
            leads: <LeadControls />,
            listings: <ListingControls />,
        }

        return (
            <div className='sub-header'>
                {controls[this.props.controlsType]}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    controlsType: state.ui.controls.type
})

export default connect(mapStateToProps)(SubHeader);
