define(
  ["./react-es6","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var React = __dependency1__["default"];

    __exports__["default"] = {
      componentWillUnmount: function () {
        this._unrenderLayer();
        document.body.removeChild(this._target);
      },

      componentDidUpdate: function () {
        this._renderLayer();
      },

      componentDidMount: function () {
        this._target = document.createElement('div');
        document.body.appendChild(this._target);
        this._renderLayer();
      },

      _renderLayer: function () {
        React.renderComponent(this.renderLayer(), this._target);
      },
      
      _unrenderLayer: function () {
        React.unmountComponentAtNode(this._target);
      }
    };
  });