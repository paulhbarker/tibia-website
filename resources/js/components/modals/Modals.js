import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modalActions';
import Modal from './Modal';
import { CSSTransition } from 'react-transition-group';

class Modals extends Component {
    render() {
        const { modal } = this.props;

        return (
            <CSSTransition
                in={modal.isVisible}
                timeout={{ enter: 0, exit: 220 }}
                classNames={'modal'}
                unmountOnExit={true}
            >
                <div className="modal-mask" onClick={() => this.props.hideModal()}>
                    <div className='modal-wrapper'>
                        <Modal
                            type={modal.type}
                            data={modal.data}
                            onClose={() => this.props.hideModal()}
                        />
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.modal
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
