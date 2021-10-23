import * as React from 'react';

class PlaceholderImage extends React.Component {
  image = React.createRef();

  async componentDidMount() {
    const { default: holderjs } = await import('holderjs');

    holderjs.run({
      domain: 'holder.js',
      images: this.image.current,
      object: null,
      bgnodes: null,
      stylenodes: null,
    });
    holderjs.setResizeUpdate(this.image.current, false);
  }

  render() {
    const { width, height, text, bg, fg, ...rest } = this.props;
    const src = `holder.js/${width}x${height}?text=${text}&auto=yes&bg=${bg}&fg=${fg}`;
    return <img ref={this.image} data-src={src} alt={text} {...rest} />;
  }
}

export default PlaceholderImage;
