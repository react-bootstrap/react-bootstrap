const mediaListInstance = (
  <div>
    <MediaList>
      <MediaListItem>
        <MediaLeft>
          <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
        </MediaLeft>
        <MediaBody heading="Media heading">
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

            <Media>
              <MediaLeft>
                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
              </MediaLeft>
              <MediaBody heading="Nested media heading">
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>

                <Media>
                  <MediaLeft>
                    <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
                  </MediaLeft>
                  <MediaBody heading="Nested media heading">
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                  </MediaBody>
                </Media>
              </MediaBody>
            </Media>

            <Media>
              <MediaLeft>
                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
              </MediaLeft>
              <MediaBody heading="Nested media heading">
                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
              </MediaBody>
            </Media>
        </MediaBody>
      </MediaListItem>
    </MediaList>
  </div>
);

ReactDOM.render(mediaListInstance, mountNode);
