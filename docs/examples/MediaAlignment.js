const mediaAlignmentInstance = (
  <div>
    <Media>
      <MediaLeft align="top">
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Top aligned media">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </MediaBody>
    </Media>
    <Media>
      <MediaLeft align="middle">
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Middle aligned media">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </MediaBody>
    </Media>
    <Media>
      <MediaLeft align="bottom">
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Bottom aligned media">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </MediaBody>
    </Media>
  </div>
);

ReactDOM.render(mediaAlignmentInstance, mountNode);
