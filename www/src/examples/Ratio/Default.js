['1x1', '4x3', '16x9', '21x9'].map((ratio) => (
  <Ratio aspectRatio={ratio}>
    <div>{ratio}</div>
  </Ratio>
));
