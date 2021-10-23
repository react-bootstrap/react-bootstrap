import { graphql } from 'gatsby';

import LinkedHeading from '../../components/LinkedHeading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import RatioCustom from '../../examples/Ratio/Custom';
import RatioDefault from '../../examples/Ratio/Default';
import RatioExample from '../../examples/Ratio/Example';
import withLayout from '../../withLayout';

import styles from '../../css/examples.module.scss';

export default withLayout(function RatioSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="ratio">
        Ratios
      </LinkedHeading>

      <p className="lead">
        Use generated pseudo elements to make an element maintain the aspect
        ratio of your choosing. Perfect for responsively handling video or
        slideshow embeds based on the width of the parent.
      </p>

      <LinkedHeading h="2" id="ratio-props">
        About
      </LinkedHeading>
      <p>
        Use the ratio helper to manage the aspect ratios of external content
        like <code>{'<iframe>'}</code>s, <code>{'<embed>'}</code>s,{' '}
        <code>{'<video>'}</code>s, and <code>{'<object>'}</code>s. These helpers
        also can be used on any standard HTML child element (e.g., a{' '}
        <code>{'<div>'}</code> or <code>{'<img>'}</code>). Styles are applied
        from the parent .ratio class directly to the child.
      </p>

      <p>
        You don't need to include <code>frameborder="0"</code> in your{' '}
        <code>iframe</code>s.
      </p>

      <LinkedHeading h="2" id="ratio-example">
        Example
      </LinkedHeading>
      <ReactPlayground codeText={RatioExample} />

      <LinkedHeading h="2" id="aspect-ratios">
        Aspect ratios
      </LinkedHeading>
      <p>
        Aspect ratios can be customized using <code>aspectRatio</code>. By
        default the following <code>aspectRatio</code> values are provided:
      </p>
      <ReactPlayground
        codeText={RatioDefault}
        exampleClassName={styles.ratioExamples}
      />

      <LinkedHeading h="2" id="custom-ratios">
        Custom
      </LinkedHeading>
      <p>
        Create custom aspect ratios by passing a number to{' '}
        <code>aspectRatio</code> instead of using the above pre-defined values.
        You can use either a fraction or percentage to define the custom ratio.
      </p>
      <ReactPlayground
        codeText={RatioCustom}
        exampleClassName={styles.ratioExamples}
      />

      <LinkedHeading h="3" id="ratio-props">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Ratio} />
    </>
  );
});

export const query = graphql`
  query RatioQuery {
    Ratio: componentMetadata(displayName: { eq: "Ratio" }) {
      ...ComponentApi_metadata
    }
  }
`;
