const fs = require(`fs-extra`);
const React = require('react');
const { join } = require('path');

const prefix = __PATH_PREFIX__; // eslint-disable-line no-undef
let css;
try {
  ({ css } = fs.readJsonSync(`./public/sorted-assets.json`));
} catch (err) {
  /** why does this happen? */
}

const styleMap = css && new Set(css.map(({ file }) => `${prefix}/${file}`));

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  if (!css) return;

  const pageStyles = new Set();
  const headComponents = getHeadComponents().filter(el => {
    let href = el && (el.props.href || el.props['data-href']);
    if (href && styleMap.has(href)) {
      pageStyles.add(href);
      return false;
    }
    return true;
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const { file, rel } of css) {
    const href = `${prefix}/${file}`;

    if (pageStyles.has(href)) {
      pageStyles.delete(href);

      if (rel === `prefetch`) {
        headComponents.push(
          React.createElement('link', {
            rel,
            href,
            as: 'style',
            key: file,
          }),
        );
      } else {
        headComponents.push(
          React.createElement('style', {
            key: file,
            'data-href': href,
            dangerouslySetInnerHTML: {
              __html: fs.readFileSync(
                join(process.cwd(), `public`, file),
                `utf8`,
              ),
            },
          }),
        );
      }
    }
    if (pageStyles.size === 0) break;
  }

  replaceHeadComponents(headComponents);
};
