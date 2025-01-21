import * as React from 'react';

function parseTsType(tsType: any) {
  if (!tsType) {
    return null;
  }

  if (tsType.name === 'union') {
    return tsType.elements.map(parseTsType).join(' | ');
  }

  if (tsType.name === 'signature' && tsType.type === 'object') {
    return `{ ${tsType.signature.properties
      .map(({ key, value }) => `${key}: ${parseTsType(value)}`)
      .join(', ')} }`;
  }

  return tsType.raw ?? tsType.value ?? tsType.name;
}

export interface PropTypeProps {
  prop: any;
}

const PropType: React.FC<PropTypeProps> = ({ prop }) => {
  const { tsType, type } = prop;

  const parsedType = parseTsType(tsType) ?? type?.name;

  return parsedType ? <code>{parsedType}</code> : null;
};

export default PropType;
