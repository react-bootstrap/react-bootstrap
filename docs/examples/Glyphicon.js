/** @jsx React.DOM */

var glyphInstance = (
  <div>
    <ButtonToolbar>
      <ButtonGroup>
        <Button><Glyphicon bsGlyph="align-left" /></Button>
        <Button><Glyphicon bsGlyph="align-center" /></Button>
        <Button><Glyphicon bsGlyph="align-right" /></Button>
        <Button><Glyphicon bsGlyph="align-justify" /></Button>
      </ButtonGroup>
    </ButtonToolbar>
    <ButtonToolbar>
      <ButtonGroup>
        <Button bsSize="large"><Glyphicon bsGlyph="star" /> Star</Button>
        <Button><Glyphicon bsGlyph="star" /> Star</Button>
        <Button bsSize="small"><Glyphicon bsGlyph="star" /> Star</Button>
        <Button bsSize="xsmall"><Glyphicon bsGlyph="star" /> Star</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);

React.renderComponent(glyphInstance, mountNode);