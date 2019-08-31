import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import Refresh from '../../icons/Refresh';
import Trash from '../../icons/Trash';
import IconButton from '../../buttons/IconButton';
import WatchFilled from '../../icons/WatchFilled';
import {
    clearCheckedLeads,
    checkLeads,
    refreshLeads,
    deleteLeads,
    markLeadsAsRead,
    getLeads
} from '../../../actions/leadActions';
import Chevron from '../../icons/Chevron';
import { setLeadPagination } from '../../../actions/paginationActions';

class LeadControls extends Component {
    componentWillMount() {
        const { totalPages } = this.props

        this.props.setPagination({ currentPage: 1, totalPages });
    }

    constructor(props) {
        super(props);

        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
        this.handleMultiCheckbox = this.handleMultiCheckbox.bind(this);
        this.deleteCheckedLeads = this.deleteCheckedLeads.bind(this);
        this.markRead = this.markRead.bind(this);
    }

    render() {
        if (this.hasNoLeads()) {
            return <div></div>;
        }

        const { hasCheckedBoxes, checkedLeads, isLoadingLeads } = this.props;

        let allLeadsChecked = this.getLeadsOnPage().length === checkedLeads.length;

        return (
            <div className='control-wrapper'>
                <div className='checkbox'>
                    <Checkbox onChange={this.handleMultiCheckbox}
                              checked={allLeadsChecked && !isLoadingLeads}
                              indeterminate={hasCheckedBoxes && !allLeadsChecked}/>
                </div>
                { hasCheckedBoxes
                    ? this.renderSelectionControls()
                    : this.renderDefaultControls()
                }
                <div className='pagination'>
                    { this.renderPaginationInfo() }
                    <IconButton onClick={this.decrementPage}><Chevron direction={'left'}/></IconButton>
                    <IconButton onClick={this.incrementPage}><Chevron direction={'right'}/></IconButton>
                </div>
            </div>
        );
    }

    hasNoLeads() {
        return _.isEmpty(this.props.leads);
    }

    renderDefaultControls() {
        return (
            <div className='control-menu'>
                <IconButton icon={Refresh} onClick={this.props.refreshLeads}/>
                {/*<IconButton><More vertical={true}/></IconButton>*/}
            </div>
        )
    }

    renderSelectionControls() {
        return (
            <div className='control-menu'>
                <IconButton icon={WatchFilled} onClick={this.markRead}/>
                <IconButton icon={Trash} onClick={this.deleteCheckedLeads}/>
            </div>
        )
    }

    renderPaginationInfo() {
        const { start, end } = this.calcStartAndEnd()

        const total = this.props.totalLeads;

        return (
            <div className='page-info'>
                {this.f(start)} - {this.f(end)} of {this.f(total)}
            </div>
        )
    }

    calcStartAndEnd() {
        const { currentPage, perPage, totalLeads } = this.props

        const start = (currentPage - 1) * perPage + 1;
        let end = currentPage * perPage;

        if (end > totalLeads) {
            end = totalLeads;
        }

        return { start, end };
    }

    handleMultiCheckbox(e) {
        if (this.props.hasCheckedBoxes) {
            return this.props.clearChecked();
        }

        this.checkLeadsOnPage();
    }

    incrementPage() {
        const { currentPage, totalPages } = this.props

        if (currentPage === totalPages) {
            return;
        }

        const options = {
            currentPage: currentPage + 1,
            totalPages: totalPages,
        }

        this.props.setPagination(options);
        this.props.clearChecked();
    }

    decrementPage() {
        const { currentPage, totalPages } = this.props

        if (currentPage === 1) {
            return;
        }

        const options = {
            currentPage: currentPage - 1,
            totalPages: totalPages,
        }

        this.props.setPagination(options);
        this.props.clearChecked();
    }

    f(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getLeadsOnPage() {
        const { pageOffset, perPage, leads } = this.props;

        const sortedLeads = _.orderBy(leads, i => i.created_at, 'desc')

        return sortedLeads.slice(pageOffset, pageOffset + perPage)
    }

    checkLeadsOnPage() {
        const ids = this.getLeadsOnPage().map(i => i.id);

        this.props.checkLeads(ids);
    }

    deleteCheckedLeads() {
        this.props.deleteLeads(this.props.checkedLeads);
    }

    markRead() {
        const { checkedLeads, leadsById } = this.props;

        const leads = checkedLeads.map(i => leadsById[i]);

        let leadsToToggle = [];

        leads.forEach(lead => {
            if (!lead.viewed) leadsToToggle.push(lead.id);
        });

        this.props.markLeadsAsRead(leadsToToggle);
    }
}

const mapStateToProps = state => {
    const { checked, allIds, byId } = state.leads;
    const { perPage, currentPage } = state.pagination.leads;

    return {
        leadsById: byId,
        perPage: perPage,
        checkedLeads: checked,
        currentPage: currentPage,
        totalLeads: allIds.length,
        leads: allIds.map(i => byId[i]),
        hasCheckedBoxes: !_.isEmpty(checked),
        isLoadingLeads: state.ui.leads.loading,
        pageOffset: (currentPage - 1) * perPage,
        totalPages: Math.ceil(allIds.length / perPage),
    }
}

const mapDispatchToProps = dispatch => ({
    refreshLeads: () => dispatch(refreshLeads()),
    setPagination: options => dispatch(setLeadPagination(options)),
    clearChecked: () => dispatch(clearCheckedLeads()),
    checkLeads: ids => dispatch(checkLeads(ids)),
    deleteLeads: ids => dispatch(deleteLeads(ids)),
    markLeadsAsRead: ids => dispatch(markLeadsAsRead(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadControls);
