import * as React from 'react';

class Sonnet extends React.Component {
  constructor(props) {
    super(props);
    import('shakespeare-data').then((s) =>
      this.setState({ sonnet: s.sonnets.random() }),
    );
  }

  state = {};

  render() {
    const { sonnet } = this.state;

    if (!sonnet) return <p />;

    return <p>{sonnet.lines.slice(0, 10).join(' ')}</p>;
  }
}

export default Sonnet;
