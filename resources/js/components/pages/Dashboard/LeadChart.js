import React, { Component } from 'react';
import DashboardCard from '../../layout/DashboardCard';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getLeads } from '../../../actions/leadActions';
import moment from 'moment';

class LeadChart extends Component {
    componentDidMount() {
        this.props.refreshLeads()
    }

    render() {
        const chartData = this.getChartData();

        const data = {
            labels: chartData.labels,
            datasets: [{
                label: 'Leads Per Month',
                data: chartData.counts,
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                fill: false,
                borderWidth: 2,
                pointRadius: 0,
                lineTension: .2
            }]
        }

        const options = {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        padding: 15,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false,
                        max: Math.max.apply(null, chartData.counts) + 1,
                        min: Math.min.apply(null, chartData.counts) - 1
                    }
                }]
            },
            legend: {
                display: false
            },
        }

        return (
            <DashboardCard>
                <Line data={data} options={options} height={50}/>
            </DashboardCard>
        )
    }

    getRandomData() {
        let randomData = [];


        const getRandom = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        for (let i = 0; i < 12; i++) {
            randomData.push(getRandom(1, 20));
        }

        return randomData;
    }

    getLeadsIndexedByDate() {
        let { leads } = this.props;

        return _.groupBy(leads, i => i.created_at.substr(0, 7))
    }

    getPrevMonths() {
        const today = moment();
        const months = [ today.format('YYYY-MM') ];

        for (let i = 0; i < 11; i++) {
            months.unshift(today.subtract(1, 'month').format('YYYY-MM'));
        }

        return months;
    }

    getChartData() {
        const data = {
            labels: [],
            counts: []
        }

        const months = this.getPrevMonths();
        const leads = this.getLeadsIndexedByDate();

        months.forEach(month => {
            data.labels.push(moment(month).format('MMM'));

            leads[month]
                ? data.counts.push(leads[month].length)
                : data.counts.push(0);
        })

        return data;
    }
}

const mapStateToProps = state => {
    return {
        leads: state.leads.allIds.map(i => state.leads.byId[i]),
    };
}

const mapDispatchToProps = dispatch => ({
    refreshLeads() {
        dispatch(getLeads());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LeadChart);
