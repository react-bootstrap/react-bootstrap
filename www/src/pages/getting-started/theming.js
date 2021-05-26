import Callout from '../../components/Callout';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import Prefixes from '../../examples/Theming/Prefixes';
import Variants from '../../examples/Theming/Variants';
import withLayout from '../../withLayout';

export default withLayout(function ThemingSection() {
  return (
    <>
      <LinkedHeading h="1" id="custom-styles">
        Theming and customizing styles
      </LinkedHeading>

      <p>
        Generally, if you stick to the Bootstrap defined classes and variants,
        there isn't anything you need to do to use a custom theme with
        React-Bootstrap. It just works. But we also make coloring outside the
        lines easy to do.
      </p>
      <LinkedHeading h="2" id="custom-styles-variants">
        New variants and sizes
      </LinkedHeading>
      <p>
        Custom variants and sizes should follow the pattern of the default
        bootstrap variants, and define css classes matching:{' '}
        <code>component-*</code>. React bootstrap builds the component{' '}
        <code>classNames</code> in a consistent way that you can rely on. For
        instance this custom Button.
      </p>
      <ReactPlayground codeText={Variants} />

      <LinkedHeading h="2" id="custom-styles-prefix">
        Prefixing components
      </LinkedHeading>
      <p>
        In some cases you may need to change the base class "prefix" of one or
        more Components. You can control how a Component prefixes its classes
        locally by changing the <code>bsPrefix</code> prop. Or globally via the{' '}
        <code>ThemeProvider</code> Component.
      </p>
      <Callout theme="warning">
        Changing prefixes is an escape hatch and generally shouldn't be used.
      </Callout>
      <ReactPlayground codeText={Prefixes} />
    </>
  );
});
