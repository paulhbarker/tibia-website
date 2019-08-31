import React, { Component } from 'react';
import {
    getLeads,
    checkLead,
    uncheckLead,
    removeLeadStar,
    markLeadAsStarred, markLeadAsViewed,
} from '../../../actions/leadActions';
import { clearControls, loadLeadControls } from '../../../actions/uiActions';
import { connect } from 'react-redux';

import LeadTableRow from './LeadTableRow';
import RippleLoader from '../../loaders/RippleLoader';
import PageCard from '../../layout/PageCard';

class LeadTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseOverMenu: false,
            lead: null,
        };

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    componentDidMount() {
        this.props.refreshLeads();
        this.props.loadControls();
    }

    componentWillUnmount() {
        this.props.clearControls();
    }

    render() {
        if (this.shouldShowLoader()) {
            return (
                <div className='fill-page'>
                    <RippleLoader width={88} height={88} stroke={1}/>
                </div>
            )
        }

        if (this.hasNoLeads()) {
            return (
                <PageCard>
                    <h2>Be your own first lead!</h2>
                    <p>
                        It looks like you're short on leads. Why don't you try texting
                        your keyword to <code>50505</code> and become your very first lead?
                    </p>
                </PageCard>
            )
        }

        return (
            <table className='table table-leads'>
                <tbody>
                    {this.renderLeads()}
                </tbody>
            </table>
        )
    }

    renderLeads() {
        const { leads, pageOffset, perPage } = this.props;

        const sortedLeads = _.orderBy(leads, i => i.created_at, 'desc');
        const leadsOnPage = sortedLeads.slice(pageOffset, pageOffset + perPage)
        const leadsToRender = leadsOnPage.filter(i => !i.deleting);

        return leadsToRender.map(lead => <LeadTableRow key={lead.id} lead={lead} onClick={e => this.markRead(lead)}/>)
    }

    hasNoLeads() {
        return _.isEmpty(this.props.leads);
    }

    shouldShowLoader() {
        return this.props.isLoading;
    }

    handleMouseOver(e, lead) {
        e.stopPropagation();
        this.setState({ mouseOverMenu: true, lead: lead });
    }

    handleMouseLeave(e) {
        e.stopPropagation();
        this.setState({ mouseOverMenu: false, lead: null });
    }

    markRead(lead) {
        if (!lead.viewed) {
            this.props.markAsViewed(lead.id);
        }
    }
}

const mapStateToProps = state => {
    const { currentPage, perPage } = state.pagination.leads;
    const { allIds, byId, checked } = state.leads;

    return {
        perPage: perPage,
        checked: checked,
        leads: allIds.map(i => byId[i]),
        isLoading: state.ui.leads.loading,
        pageOffset: (currentPage - 1) * perPage,
    }
}

const mapDispatchToProps = dispatch => ({
    refreshLeads: () => dispatch(getLeads()),
    markAsStarred: id => dispatch(markLeadAsStarred(id)),
    removeStar: id => dispatch(removeLeadStar(id)),
    checkLead: id => dispatch(checkLead(id)),
    uncheckLead: id => dispatch(uncheckLead(id)),
    loadControls: () => dispatch(loadLeadControls()),
    clearControls: () => dispatch(clearControls()),
    markAsViewed: id => dispatch(markLeadAsViewed(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LeadTable);
