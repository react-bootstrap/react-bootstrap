const mediaInstance = (
  <div>
    <Media>
     <MediaLeft>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Media Heading">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
      </MediaBody>
    </Media>
    <Media>
      <MediaLeft>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Media Heading">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        <Media>
          <MediaLeft>
            <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
          </MediaLeft>
          <MediaBody heading="Nested Media Heading">
            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
          </MediaBody>
        </Media>
      </MediaBody>
    </Media>
    <Media>
      <MediaBody heading="Media Heading">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
      </MediaBody>
      <MediaRight>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaRight>
    </Media>
    <Media>
      <MediaLeft>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaLeft>
      <MediaBody heading="Media Heading">
        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
      </MediaBody>
       <MediaRight>
        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
      </MediaRight>
    </Media>
  </div>
);

ReactDOM.render(mediaInstance, mountNode);
