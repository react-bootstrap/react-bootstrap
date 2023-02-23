import * as React from 'react';
import { useEffect, useState } from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Markdown from '@site/src/components/Markdown';
import Table from 'react-bootstrap/Table';
import DEFAULT_PROP_DESCRIPTIONS from './defaultPropDescriptions';
import ControllableNote from './ControllableNote';
import PropType from './PropType';

function useComponentData(name: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    import(`@react-docgen-plugin/${name}.json`)
      .then((module) => {
        setData(module.default);
      })
      .catch(console.error);
  }, [name]);

  return data;
}

interface PropsTableProps {
  name: string;
}

const PropsTable: React.FC<PropsTableProps> = ({ name }) => {
  const data = useComponentData(name);

  if (!data) {
    return null;
  }

  return (
    <>
      <CodeBlock language="jsx">{`import ${name} from 'react-bootstrap/${name}'`}</CodeBlock>

      {data.description && (
        <div className="my-3">
          <Markdown>{data.description}</Markdown>
        </div>
      )}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries<any>(data.props).map(([propName, prop]) => {
            if (prop.doclets.private) {
              return null;
            }

            const defaultValue =
              prop.doclets.default ?? prop.defaultValue?.value;
            const deprecated = !!prop.doclets.deprecated;

            return (
              <tr key={propName}>
                <td className="font-monospace">
                  {propName}{' '}
                  {prop.required && <sup className="text-danger">Required</sup>}
                </td>
                <td className="font-monospace">
                  <div>
                    <PropType prop={prop} />
                  </div>
                </td>
                <td>{defaultValue && <code>{defaultValue}</code>}</td>
                <td>
                  {deprecated && (
                    <div className="mb-1">
                      <strong className="text-danger">Deprecated</strong>
                    </div>
                  )}
                  {prop.doclets.controllable && (
                    <ControllableNote propName={propName} prop={prop} />
                  )}
                  <Markdown>
                    {prop.description || DEFAULT_PROP_DESCRIPTIONS[propName]}
                  </Markdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PropsTable;
