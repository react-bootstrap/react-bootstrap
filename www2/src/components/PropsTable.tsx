import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

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
      <h3>{name}</h3>
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
          {Object.entries<any>(data.props).map(([propName, prop]) => (
            <tr key={propName}>
              <td>
                {propName}{' '}
                {prop.required && <sup className="text-danger">Required</sup>}
              </td>
              <td>
                {prop.type.value
                  ? prop.type.value.map((v) => v.name).join(' | ')
                  : prop.type.name}
              </td>
              <td>{}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PropsTable;
