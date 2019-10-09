import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class SelectField extends Component {
    constructor(props) {
        super(props);

        let selection = null;
        const { value } = this.props.input;
        const hasSelection = !_.isEmpty(value);

        if (hasSelection) {
            selection = this.props.options.find(i => i.value === value);
        }

        this.state = {
            isOpen: false,
            selection
        };
    }

    render() {
        const { touched, error } = this.props.meta;
        const hasErrors = touched && error;

        const classes = classNames({
            'select-container': true,
            'dropdown-open': this.state.isOpen,
            'select-default': _.isNull(this.state.selection),
            'filled': !_.isNull(this.state.selection),
            'has-error': hasErrors
        });

        return (
            <div className={classes}>
                <div className="select-choice" onClick={() => this.toggle()}>
                    <span className="select-chosen">{ this.state.selection ? this.state.selection.name : '' }</span>
                </div>
                <label htmlFor={this.props.name} className={ (hasErrors && !this.state.isOpen) ? 'has-error' : ''}>{ (hasErrors && !this.state.isOpen) ? error : this.props.label }</label>

                <input
                    {...this.props.input}
                    className="select-offscreen"
                    type="text"
                />

                { this.state.isOpen && <div className="select-mask" onClick={() => this.close()} /> }
                { this.renderDropdown() }
            </div>
        );
    }

    renderDropdown() {
        return (<CSSTransition
            in={this.state.isOpen}
            timeout={{ enter: 0, exit: 0 }}
            classNames={'select-dropdown'}
            unmountOnExit
        >
            <div className="select-dropdown">
                <ul className="select-options">
                    {this.renderDropdownItems()}
                </ul>
            </div>
        </CSSTransition>);
    }

    renderDropdownItems() {
        return this.props.options.map((option, i) => (
            <li key={i} onClick={() => this.selectOption(option)}>
                <div className="select-option-label">{ option.name }</div>
            </li>
        ));
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    selectOption(option) {
        this.setState({ selection: option });
        this.props.input.onChange(option.value);

        this.close();
    }

    close() {
        this.setState({ isOpen: false });
    }
}

SelectField.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    input: PropTypes.object,
    meta: PropTypes.object
};

SelectField.defaultProps = {
    options: [
        { name: 'Option 1', value: 1 }
    ]
};

export default SelectField;
