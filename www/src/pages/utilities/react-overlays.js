import LinkedHeading from '../../components/LinkedHeading';
import withLayout from '../../withLayout';

export default withLayout(function ReactOverlaysSection() {
  return (
    <>
      <LinkedHeading h="1" id="react-overlays">
        React Overlays
      </LinkedHeading>
      <p className="lead">
        Low-level components and utilities for building beautiful accessible
        overlay components
      </p>
      <p>
        Often times you may need a more generic or low-level version of a
        Bootstrap component. Many of the <code>react-bootstrap</code> components
        are built on top of components from{' '}
        <a
          href="https://react-bootstrap.github.io/react-overlays/"
          target="_blank"
          rel="noreferrer noopener"
        >
          react-overlays
        </a>
        , if you find yourself at the limit of a Bootstrap component, consider
        using the <code>react-overlays</code> base component directly.
      </p>
    </>
  );
});
