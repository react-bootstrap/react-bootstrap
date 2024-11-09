let style: any;
let seen: string[] = [];

// eslint-disable-next-line import/prefer-default-export
export function injectCss(rules: string) {
  if (seen.indexOf(rules) !== -1) {
    return;
  }

  style =
    style ||
    (function iife() {
      const _style = document.createElement('style');
      _style.appendChild(document.createTextNode(''));
      document.head.appendChild(_style);
      return _style;
    })();

  seen.push(rules);
  style.innerHTML += `\n${rules}`;
}

injectCss.reset = () => {
  if (style) {
    document.head.removeChild(style);
  }
  style = null;
  seen = [];
};
