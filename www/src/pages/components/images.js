import { graphql } from 'gatsby';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import Fluid from '../../examples/Image/Fluid';
import Shape from '../../examples/Image/Shape';
import withLayout from '../../withLayout';

export default withLayout(function ImageSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="images">
        Images
      </LinkedHeading>

      <LinkedHeading h="2" id="image-shape">
        Shape
      </LinkedHeading>
      <p>
        Use the <code>rounded</code>, <code>roundedCircle</code> and{' '}
        <code>thumbnail</code> props to customise the image.
      </p>
      <ReactPlayground codeText={Shape} />

      <LinkedHeading h="2" id="image-fluid">
        Fluid
      </LinkedHeading>
      <p>
        Use the <code>fluid</code> to scale image nicely to the parent element.
      </p>
      <ReactPlayground codeText={Fluid} />
      <LinkedHeading h="2" id="image-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Image} />
    </>
  );
});

export const query = graphql`
  query ImageQuery {
    Image: componentMetadata(displayName: { eq: "Image" }) {
      ...ComponentApi_metadata
    }
  }
`;
