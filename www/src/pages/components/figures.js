import { graphql } from 'gatsby';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import Figure from '../../examples/Figure';
import withLayout from '../../withLayout';

export default withLayout(function FigureSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="figures">
        Figures
      </LinkedHeading>

      <p>
        Anytime you need to display a piece of content, like an image with an{' '}
        optional caption, consider using a <code>Figure</code>.
      </p>

      <LinkedHeading h="2" id="figures-anchor">
        Figure
      </LinkedHeading>
      <p>Displaying related images and text with the Figure component.</p>
      <ReactPlayground codeText={Figure} />

      <LinkedHeading h="2" id="figures-props">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.figure} />
      <ComponentApi metadata={data.image} />
      <ComponentApi metadata={data.caption} />
    </>
  );
});

export const query = graphql`
  query FigureQuery {
    figure: componentMetadata(displayName: { eq: "Figure" }) {
      displayName
      ...ComponentApi_metadata
    }
    image: componentMetadata(displayName: { eq: "FigureImage" }) {
      displayName
      ...ComponentApi_metadata
    }
    caption: componentMetadata(displayName: { eq: "FigureCaption" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
