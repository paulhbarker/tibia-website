import Team from '../icons/Team';
import Logo from '../icons/Logo';
import Lock from '../icons/Lock';
import Email from '../icons/Email';
import Person from '../icons/Person';
import { connect } from 'react-redux';
import SignOut from '../icons/SignOut';
import LinkSection from './LinkSection';
import React, { Component } from 'react';
import Dashboard from '../icons/Dashboard';
import CustomNavLink from './CustomNavLink';
import { logout } from '../../actions/authActions';
import { Link, withRouter } from 'react-router-dom';

class MainNav extends Component {
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
                        <CustomNavLink to={'/players'} label={'Players'} icon={Team}/>
                    </LinkSection>
                    <LinkSection label={'Account'}>
                        <CustomNavLink to={'/profile'} label={'Profile'} icon={Person}/>
                        <CustomNavLink to={'/security'} label={'Security'} icon={Lock}/>
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

});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNav));

