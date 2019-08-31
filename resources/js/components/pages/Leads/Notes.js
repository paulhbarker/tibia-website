import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startEditingLead, updateNotes, changeNote } from '../../../actions/leadActions';
import NotesInput from './NotesInput';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.handleAddNoteClick = this.handleAddNoteClick.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleBlurEvent = this.handleBlurEvent.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
    }

    render() {
        if (this.props.isBeingEdited) {
            return <NotesInput
                onSubmit={this.handleOnSubmit}
                onChange={this.handleNoteChange}
                onBlur={this.handleBlurEvent}
                value={this.props.leadInFlux.notes || ''}
            />
        }

        if (this.props.lead.notes) {
            return <div className={'note'} onClick={this.handleAddNoteClick}>{this.props.lead.notes}</div>;
        }

        return <a onClick={this.handleAddNoteClick}>Add Notes</a>
    }

    handleNoteChange(e) {
        this.props.onNoteChange(e.target.value);
    }

    handleBlurEvent(e) {
        e.preventDefault();

        this.submitChanges();
    }

    handleOnSubmit(e) {
        e.preventDefault();
        e.target.blur();

        this.submitChanges();
    }

    submitChanges() {
        const { lead, leadInFlux } = this.props;

        this.props.updateNotes(lead.id, lead.notes, leadInFlux.notes);
    }

    handleAddNoteClick(e) {
        e.stopPropagation();

        this.props.editNotes(this.props.lead);
    }
}

const mapStateToProps = (state, props) => ({
    isBeingEdited: !! state.leads.updating[props.lead.id],
    leadInFlux: state.leads.updating[props.lead.id]
});

const mapDispatchToProps = (dispatch, props) => ({
	editNotes: () => dispatch(startEditingLead(props.lead)),
    onNoteChange: notes => dispatch(changeNote(props.lead, notes)),
    updateNotes: (id, prev, next) => dispatch(updateNotes(id, prev, next))
});


export default connect(mapStateToProps, mapDispatchToProps)(Notes);
