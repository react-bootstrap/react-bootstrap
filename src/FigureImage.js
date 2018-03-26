import classNames from 'classnames';
import React from 'react';

import Image from './Image';

class FigureImage extends React.Component {
  static propTypes = Image.propTypes;

  static defaultProps = { fluid: true };

  render() {
    const { className, ...props } = this.props;
    return <Image {...props} className={classNames(className, 'figure-img')} />;
  }
}

export default FigureImage;
