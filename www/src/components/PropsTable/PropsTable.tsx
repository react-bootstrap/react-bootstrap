import * as React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Markdown from '@site/src/components/Markdown';
import Table from 'react-bootstrap/Table';
import ControllableNote from './ControllableNote';
import useComponentData from './useComponentData';

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
          {data.props.map((prop) => {
            return (
              <tr key={prop.name}>
                <td className="font-monospace">
                  {prop.name}{' '}
                  {prop.required && <sup className="text-danger">Required</sup>}
                </td>
                <td className="font-monospace">
                  <div>
                    <code>{prop.type}</code>
                  </div>
                </td>
                <td>{prop.defaultValue && <code>{prop.defaultValue}</code>}</td>
                <td>
                  {prop.deprecated && (
                    <div className="mb-1">
                      <strong className="text-danger">Deprecated</strong>
                    </div>
                  )}
                  {prop.controllable && (
                    <ControllableNote
                      propName={prop.name}
                      prop={prop.rawProp}
                    />
                  )}
                  {prop.description && <Markdown>{prop.description}</Markdown>}
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
