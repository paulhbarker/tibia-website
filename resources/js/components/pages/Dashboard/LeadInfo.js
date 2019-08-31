import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import LeadInfoCard from './LeadInfoCard';
import { getLeads } from '../../../actions/leadActions';

import LeadChart from './LeadChart';
import RippleLoader from '../../loaders/RippleLoader';


class LeadInfo extends Component {
    constructor(props) {
        super(props);

        this.getLeadsLastMonth = this.getLeadsLastMonth.bind(this);
        this.getLeadsLastWeek = this.getLeadsLastWeek.bind(this);

        this.last30days = 0;
        this.last7days = 0;
    }

    componentDidMount() {
        this.props.refreshLeads();
    }

    render() {
        return (
            <div>
                <h2 className='dashboard-header'>Leads { this.props.isLoading ? <RippleLoader /> : ''}</h2>
                <div className='dashboard-row'>
                    <LeadInfoCard title={'Last 30 Days'} count={this.getLeadsLastMonth()} trend={this.getMonthlyTrend()} />
                    <LeadInfoCard title={'Last 7 days'} count={this.getLeadsLastWeek()} trend={this.getWeeklyTrend()} />
                    <LeadInfoCard title={'Total'} count={this.props.totalListings} />
                </div>
                <LeadChart/>
            </div>
        )
    }

    getLeads(start, end) {
        let { leads } = this.props;

        const results = [];
        const length = leads.length;

        for (var i = 0; i < length; i++) {
            const received = new Date(leads[i].created_at);

            if (received > start && received <= end) {
                results.push(leads[i]);
            }
        }

        return results.length;
    }

    getLeadsLastMonth() {
        if (this.last30days !== 0) {
            return this.last30days;
        }

        const end = new Date().getTime();
        const start = moment().subtract(30, 'days').valueOf();

        this.last30days = this.getLeads(start, end);

        return this.last30days;
    }

    getLeadsLastWeek() {
        if (this.last7days !== 0) {
            return this.last7days;
        }

        const end = new Date().getTime();
        const start = moment().subtract(7, 'days').valueOf();

        this.last7days = this.getLeads(start, end);

        return this.last7days;
    }

    getMonthlyTrend() {
        const end = moment().subtract(30, 'days').valueOf();
        const start = moment().subtract(60, 'days').valueOf();

        const leadsPrevMonth = this.getLeads(start, end);
        const leadsLastMonth = this.getLeadsLastMonth();

        return this.calcTrend(leadsPrevMonth, leadsLastMonth);
    }

    getWeeklyTrend() {
        const end = moment().subtract(7, 'days').valueOf();
        const start = moment().subtract(14, 'days').valueOf();

        const leadsPrevWeek = this.getLeads(start, end);
        const leadsLastWeek = this.getLeadsLastWeek();

        return this.calcTrend(leadsPrevWeek, leadsLastWeek);
    }

    calcTrend(oldNumber, newNumber) {
        const difference = newNumber - oldNumber;

        if (oldNumber === 0 && newNumber > 0) {
            return 100;
        }

        if (oldNumber === 0) {
            return 0;
        }

        return difference / oldNumber * 100;
    }
}

const mapStateToProps = state => {
    return {
        leads: state.leads.allIds.map(i => state.leads.byId[i]),
        totalListings: state.leads.allIds.length,
        isLoading: state.ui.leads.loading
    };
}

const mapDispatchToProps = dispatch => ({
    refreshLeads() {
        dispatch(getLeads());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LeadInfo);
