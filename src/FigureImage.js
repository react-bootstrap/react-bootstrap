import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

import Image from './Image';

class FigureImage extends React.Component {
  static propTypes = { ...Image.propTypes };

  static defaultProps = { ...Image.propTypes, fluid: true };

  render() {
    const { ...props } = this.props;
    return <Image {...props} className="figure-img" />;
  }
}

export default createBootstrapComponent(FigureImage, 'img');
