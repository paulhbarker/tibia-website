import React, { Component } from 'react';
import ListingModal from './ListingModal';
import AddChannelModal from './AddChannelModal';

class Modal extends Component {
    render() {
        const { data, onClose, type } = this.props;

        let modal;

        switch (type) {
            case 'listing': modal = <ListingModal cleanListing={data} onClose={onClose}/>; break;
            case 'channel': modal = <AddChannelModal onClose={onClose}/>; break;
        }

        return (
            <div onClick={e => e.stopPropagation()}>
                {modal}
            </div>
        );
    }
}

export default Modal;
