import * as React from 'react';

function renderValue(valueArray: string[]) {
  const renderedEnumValues = [];
  valueArray.forEach((value: any, i: number) => {
    if (i > 0) {
      renderedEnumValues.push(<span key={`${i}c`}> | </span>);
    }

    renderedEnumValues.push(<code key={i}>{value}</code>);
  });

  return <>{renderedEnumValues}</>;
}

export interface PropTypeProps {
  prop: any;
}

const PropType: React.FC<PropTypeProps> = ({ prop }) => {
  if (prop.doclets.type) {
    // This takes precedence.
    return renderValue(
      prop.doclets.type
        .trim()
        .replace(/^\{/, '')
        .replace(/\}$/, '')
        .replace(/^\(/, '')
        .replace(/\)$/, '')
        .split('|'),
    );
  }

  const { type } = prop;
  const { name, value } = type || {};

  if (name === 'union') {
    return renderValue(value.map((v) => v.name));
  }

  if (name === 'enum') {
    return renderValue(value.map((v) => v.value));
  }

  return name ?? null;
};

export default PropType;
