/** @jsx React.DOM */

var LoadingButton = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false
    };
  },

  render: function() {
    var isLoading = this.state.isLoading;
    return (
        <Button
          bsStyle="primary"
          disabled={isLoading}
          onClick={!isLoading ? this.handleClick : null}>
          {isLoading ? 'Loading...' : 'Loading state'}
        </Button>
      );
  },

  handleClick: function() {
    this.setState({isLoading: true});

    // This probably where you would have an `ajax` call
    setTimeout(function() {

      // Completed of async action, set loading state back
      this.setState({isLoading: false});
    }.bind(this), 2000);
  }
});

React.renderComponent(LoadingButton(), mountNode);