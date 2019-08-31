import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Icon } from 'antd';
import Notes from './Notes';
import { checkLead, markLeadAsStarred, removeLeadStar, uncheckLead } from '../../../actions/leadActions';
import moment from 'moment/moment';
import LeadTableMenu from './LeadTableMenu';

class LeadTableRow extends Component {
    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = {
            mouseOverMenu: false
        }
    }

    render() {
        const { lead } = this.props;

        const isNewLead = !lead.viewed;
        const isChecked = this.props.checked.indexOf(lead.id) >= 0;

        return (
            <tr onClick={e  => this.props.onClick(e)}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
                className={isNewLead ? 'is-new' : 'viewed'}
            >
                <td className='checkbox'>
                    <Checkbox checked={isChecked} onChange={e => this.handleCheckboxClick(lead.id, e)} />
                </td>
                <td className='star'>
                    {this.renderStarIcon(lead)}
                </td>
                <td className='phone'>
                    {this.formatPhone(lead.phone)}
                    {isNewLead ? <div className='new-lead-indicator'></div> : ''}
                </td>
                <td className='notes'>
                    <Notes lead={lead}/>
                </td>
                <td className={this.state.mouseOverMenu ? 'menu' : 'date'}>
                    {this.renderDateOrMenu(lead)}
                </td>
            </tr>
        );
    }

    handleMouseOver() {
        this.setState({ mouseOverMenu: true });
    }

    handleMouseLeave() {
        this.setState({ mouseOverMenu: false });
    }

    handleCheckboxClick(id, e) {
        if (!e.target.checked) {
            this.props.uncheckLead(id);
        } else {
            this.props.checkLead(id);
        }
    }

    renderStarIcon(lead) {
        const handler = e => this.handleStarClick(lead.id, lead.starred, e);

        const className = lead.starred ? 'starred' : 'empty';
        const type = lead.starred ? 'star' : 'star-o';

        return <Icon type={type} className={className} onClick={handler}/>
    }

    handleStarClick(id, isStarred, e) {
        isStarred
            ? this.props.removeStar(id)
            : this.props.markAsStarred(id);
    }

    formatPhone(phone) {
        if (!phone) {
            return;
        }

        if (phone.length !== 12) {
            return phone;
        }

        const areaCode = phone.substr(2, 3);
        const firstHalf = phone.substr(5, 3);
        const secondHalf = phone.substr(8, 4);

        return `(${areaCode}) ${firstHalf}-${secondHalf}`;
    }

    formatDate(date) {
        const received = moment.utc(date).local();

        if (received.isSame(moment(), 'day')) {
            return received.local().format('h:mm A');
        }

        return received.local().format('MMM D');
    }

    renderDateOrMenu(lead) {
        if (this.state.mouseOverMenu) {
            return <LeadTableMenu lead={lead}/>
        }

        return this.formatDate(lead.created_at)
    }
}

const mapStateToProps = state => ({
    checked: state.leads.checked,
    isLoading: state.ui.leads.loading,
})

const mapDispatchToProps = dispatch => ({
    markAsStarred: id => dispatch(markLeadAsStarred(id)),
    removeStar: id => dispatch(removeLeadStar(id)),
    checkLead: id => dispatch(checkLead(id)),
    uncheckLead: id => dispatch(uncheckLead(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadTableRow);
