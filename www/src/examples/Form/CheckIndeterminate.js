import Form from 'react-bootstrap/Form';

function CheckIndeterminateExample() {
  return (
    <Form>
      <div key="default-indeterminate" className="mb-3">
        <Form.Check // prettier-ignore
          type="checkbox"
          id="default-indeterminate"
          label="default indeterminate"
          indeterminate
        />
      </div>
    </Form>
  );
}

export default CheckIndeterminateExample;
