import React, { Component } from 'react';
import DashboardCard from '../../layout/DashboardCard';
import CountUp from 'react-countup';
import Arrow from '../../icons/Arrow';
import moment from 'moment';
import { getLeads } from '../../../actions/leadActions';

class LeadInfoCard extends Component {
    render() {
        return (
            <DashboardCard>
                <h2>{this.props.title}</h2>
                <div className='lead-info-wrapper'>
                    <CountUp className='lead-number' end={this.props.count} {...this.countOpts()}/>
                    { this.renderTrend() }
                </div>
            </DashboardCard>
        )
    }

    renderTrend() {
        const { trend } = this.props;

        if (trend === undefined) {
            return;
        }

        let className;
        let arrowIcon;

        if (this.props.trend === 0) {
            className = 'neutral';
            arrowIcon = '';
        }

        if (this.props.trend > 0) {
            className = 'up';
            arrowIcon = <Arrow direction={'up'} />;
        }

        if (this.props.trend < 0) {
            className = 'down';
            arrowIcon = <Arrow direction={'down'} />;
        }

        return (
            <div className={'lead-stats ' + className}>{arrowIcon}
                <CountUp end={trend} decimal={'.'} decimals={1} {...this.countOpts()}/>%
            </div>
        )
    }

    countOpts() {
        return {
            duration: 1.5,
            separator: ','
        }
    }
}

export default LeadInfoCard;
