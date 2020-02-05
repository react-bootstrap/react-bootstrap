import React from 'react';

import Callout from '../../components/Callout';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import Prefixes from '../../examples/Theming/Prefixes';
import Variants from '../../examples/Theming/Variants';
import ClassNameMapping from '../../examples/Theming/ClassNameMapping';
import ClassNameMappingWithConverter from '../../examples/Theming/ClassNameMappingWithConverter';
import withLayout from '../../withLayout';
import globalStyles from '../../css/examples.global.module.scss';
import buttonStyles from '../../css/examples.local.module.scss';

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

      <LinkedHeading h="2" id="custom-styles-class-name-mapping">
        CSS Module Support
      </LinkedHeading>
      <p>
        In order to support CSS Modules, the class names used by Components need
        to be mapped to the generated class names from the imported CSS in your
        JavaScript. You can control how a Component maps it's classes locally by
        changing the <code>classNameMap</code> prop. Or globally via the{' '}
        <code>ThemeProvider</code> component.
      </p>
      <p>
        When used in conjunction with a CSS loader, such as{' '}
        <a
          href="https://github.com/webpack-contrib/css-loader"
          target="_blank"
          rel="noopener noreferrer"
        >
          css-loader
        </a>
        , you can import a CSS module directly in your JavaScript code and pass
        the module to the <code>classNameMap</code> prop.
      </p>
      <ReactPlayground
        codeText={ClassNameMapping}
        additionalScope={{
          globalStyles,
          buttonStyles,
        }}
      />
      <p>
        The Webpack{' '}
        <a
          href="https://github.com/webpack-contrib/css-loader"
          target="_blank"
          rel="noopener noreferrer"
        >
          css-loader
        </a>{' '}
        allows for different strategies to be used when exporting the CSS class
        names. A full list of the strategies can be found in the{' '}
        <a
          href="https://webpack.js.org/loaders/css-loader/#localsconvention"
          target="_blank"
          rel="noopener noreferrer"
        >
          css-loader
        </a>{' '}
        documentation under <code>localsConvention</code>. If using{' '}
        <code>camelCaseOnly</code> or <code>dashesOnly</code> then you will need
        to use the optional <code>classNameConverter</code> prop on the{' '}
        <code>ThemeProvider</code> Component. This prop accepts a callback
        function which allows for the classes used by the Components to be
        converted before being looked up in the <code>classNameMap</code>.
      </p>
      <ReactPlayground
        codeText={ClassNameMappingWithConverter}
        additionalScope={{
          globalStyles,
          buttonStyles,
        }}
      />
    </>
  );
});
