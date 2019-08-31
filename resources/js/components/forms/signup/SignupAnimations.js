import React from 'react';
import { CSSTransition } from 'react-transition-group';

const SignupFormAnimator = props => {
    return (
        <CSSTransition
            in={props.in}
            timeout={{ enter: 300, exit: 300 }}
            classNames={'signup'}
            unmountOnExit={true}
            appear={true}
        >
            <div className='transition'>
                {props.render()}
            </div>
        </CSSTransition>
    );
};

export default SignupFormAnimator;
