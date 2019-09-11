import React, { Component } from 'react';
import AddChannelModal from './AddChannelModal';

class Modal extends Component {
    render() {
        const { onClose, type } = this.props;

        let modal;

        switch (type) {
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
