import { useEffect, useState } from 'react';
import PROPS_OVERRIDE from './propsOverride';

interface ComponentData {
  name: string;
  description: string | null;
  props: {
    name: string;
    type: string;
    defaultValue: string | null;
    required: boolean;
    description: string | null;
    deprecated: boolean;
    rawProp: any;
    controllable: boolean;
  }[];
}

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

export default function useComponentData(name: string): ComponentData | null {
  const [data, setData] = useState<ComponentData>(null);

  useEffect(() => {
    import(`@react-docgen-plugin/${name}.json`)
      .then((module) => {
        let parsedData = [];
        if (module.default.props) {
          parsedData = Object.entries<any>(module.default.props).map(
            ([propName, prop]) => {
              if (prop.doclets.private) {
                return null;
              }

              const defaultValue =
                prop.doclets.default ?? prop.defaultValue?.value;
              const deprecated = !!prop.doclets.deprecated;
              const propDescription =
                prop.description ||
                PROPS_OVERRIDE[name]?.[propName]?.description ||
                PROPS_OVERRIDE.common[propName];
              const overriddenType = PROPS_OVERRIDE[name]?.[propName]?.type;

              // Types can be overridden in the JS doc comments. These are used in cases where
              // the docgen types is not accurate or cannot be inferred.
              const parsedType =
                overriddenType ??
                prop.doclets.type ??
                parseTsType(prop.tsType) ??
                prop.type?.name;

              return {
                name: propName,
                type: parsedType,
                defaultValue,
                required: prop.required,
                description: propDescription,
                deprecated,
                rawProp: prop,
                controllable: prop.doclets.controllable,
              };
            },
          );
        }

        const additionalProps =
          PROPS_OVERRIDE[name]?.additionalProps?.map((prop) => {
            return {
              ...prop,
              rawProp: prop.rawProp ?? null,
              controllable: prop.controllable ?? false,
            };
          }) ?? [];

        setData({
          name,
          description: module.default.description,
          props: [...parsedData, ...additionalProps].filter(Boolean),
        });
      })
      .catch(console.error);
  }, [name]);

  return data;
}
