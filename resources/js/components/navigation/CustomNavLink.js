import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from 'antd';

class CustomNavLink extends Component {
    constructor(props) {
        super(props);

        this.renderLink = this.renderLink.bind(this);
        this.renderFake = this.renderFake.bind(this);
    }

    render() {
        const { to } = this.props;

        return (
            <div className='link-wrapper'>
                {to ? this.renderLink() : this.renderFake()}
            </div>
        )
    }

    renderLink() {
        const { to, label } = this.props;
        const Icon = this.props.icon;

        return (
            <NavLink to={to} activeClassName={'active'}>
                <div className='link-inner'>
                    <div className='main-link-icon'>
                        <Icon />
                    </div>
                    <div className='main-link-text-wrapper'>
                        <div className='main-link-text'>
                            {label} {this.renderNotifications()}
                        </div>
                    </div>
                </div>
            </NavLink>
        )
    }

    renderFake() {
        const { label, onClick } = this.props;
        const Icon = this.props.icon;

        return (
            <a onClick={onClick}>
                <div className='link-inner'>
                    <div className='main-link-icon'>
                        <Icon />
                    </div>
                    <div className='main-link-text-wrapper'>
                        <div className='main-link-text'>
                            {label}
                        </div>
                    </div>
                </div>
            </a>
        )

    }

    renderNotifications() {
        if (this.props.notifications) {
            return <Badge className='leads-notification' count={this.props.notifications} />
        }
    }
};

export default CustomNavLink;

