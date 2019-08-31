import React from 'react';

export default function delayUnmounting(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                shouldRender: this.props.isMounted
            }
        }

        componentDidUpdate(prevProps) {
            if (prevProps.isMounted && !this.props.isMounted) {
                setTimeout(() => {
                    console.log('TIMEOUT: ' + this.props.delayTime);
                    this.setState({ shouldRender: false })
                }, this.props.delayTime);
            } else if (!prevProps.isMounted && this.props.isMounted) {
                this.setState({ shouldRender: true });
            }
        }

        render() {
            return this.state.shouldRender ? <Component {...this.props} /> : null;
        }
    };
}
