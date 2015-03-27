/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

const ContainedModal = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsStyle='primary' title='Contained Modal' animation>
        <div className='modal-body'>
          Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

const Trigger = React.createClass({
  render() {
    return (
      <div className='modal-container' style={{height: 200}}>
        <ModalTrigger modal={<ContainedModal container={this} />} container={this}>
          <Button bsStyle='primary' bsSize='large'>Launch contained modal</Button>
        </ModalTrigger>
      </div>
    );
  }
});

React.render(<Trigger />, mountNode);
