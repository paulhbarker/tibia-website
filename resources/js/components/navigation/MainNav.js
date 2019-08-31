import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomNavLink from './CustomNavLink';
import { getLeads } from '../../actions/leadActions';
import { logout } from '../../actions/authActions';
import LinkSection from './LinkSection';
import Dashboard from '../icons/Dashboard';
import Team from '../icons/Team';
import Page from '../icons/Page';
import Star from '../icons/Star';
import Logo from '../icons/Logo';
import SignOut from '../icons/SignOut';
import Lock from '../icons/Lock';
import Email from '../icons/Email';
import Person from '../icons/Person';
import CreditCard from '../icons/CreditCard';

class MainNav extends Component {
    componentDidMount() {
        this.props.refreshLeads();
    }

    render() {
        return (
            <div className='main-nav-wrapper'>
                <div className='main-nav'>
                    <div className='logo-wrapper'>
                        <Link to={'/dashboard'}>
                            <Logo />
                        </Link>
                    </div>
                    <LinkSection label={'App'}>
                        <CustomNavLink to={'/dashboard'} label={'Dashboard'} icon={Dashboard}/>
                        <CustomNavLink to={'/leads'} label={'Leads'} icon={Team} notifications={this.props.notifications}/>
                        <CustomNavLink to={'/listings'} label={'Listings'} icon={Page}/>
                        <CustomNavLink to={'/keyword'} label={'Keyword'} icon={Star}/>
                    </LinkSection>
                    <LinkSection label={'Account'}>
                        <CustomNavLink to={'/profile'} label={'Profile'} icon={Person}/>
                        <CustomNavLink to={'/security'} label={'Security'} icon={Lock}/>
                        <CustomNavLink to={'/billing'} label={'Billing'} icon={CreditCard}/>
                        <CustomNavLink to={'/notifications'} label={'Notifications'} icon={Email}/>
                    </LinkSection>
                    <LinkSection>
                        <CustomNavLink label={'Logout'} icon={SignOut} onClick={() => this.props.logout()}/>
                    </LinkSection>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    notifications: _.reduce(state.leads.allIds, (sum, id) => {
        return !_.get(state, `leads.byId[${id}].viewed`, true) ? sum + 1 : sum;
    }, 0)
})

const mapDispatchToProps = dispatch => ({
    refreshLeads: () => dispatch(getLeads()),
    logout: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));

