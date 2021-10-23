import LinkedHeading from '../../components/LinkedHeading';
import withLayout from '../../withLayout';

export default withLayout(function ReactOverlaysSection() {
  return (
    <>
      <LinkedHeading h="1" id="restart-ui">
        @restart/ui
      </LinkedHeading>
      <p className="lead">
        Low-level components and utilities for building beautiful accessible
        components
      </p>
      <p>
        Often times you may need a more generic or low-level version of a
        Bootstrap component. Many of the <code>react-bootstrap</code> components
        are built on top of components from{' '}
        <a
          href="https://github.com/react-restart/ui"
          target="_blank"
          rel="noreferrer noopener"
        >
          @restart/ui
        </a>
        . If you find yourself at the limit of a Bootstrap component, consider
        using the <code>@restart/ui</code> base component directly.
      </p>
    </>
  );
});
