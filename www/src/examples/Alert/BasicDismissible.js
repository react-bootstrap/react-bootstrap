import React from 'react';
import Alert from 'react-bootstrap/Alert/';

/*
 * Add this component to your project, if you just need a simply dismissible Alert.
 * Usage:
 *   <DismissibleAlert variant="primary">
 *      You're just going to dismiss me, aren't you.
 *   </DismissibleAlert>
 */
class DismissibleAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }

    render() {
        const handleDismiss = () => this.setState({ show: false });
        if (this.state.show) {
            return (
                <Alert
                    variant={this.props.variant ? this.props.variant : "primary"}
                    onClose={this.props.onClose ? this.props.onClose : handleDismiss}
                    dismissible>
                    {this.props.children}
                </Alert>
            );
        }
        return null;
    }
}


export default DismissibleAlert;
