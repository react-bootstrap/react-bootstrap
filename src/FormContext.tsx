import React from 'react';

// TODO
interface FormContextType {
  controlId: any;
  custom?: boolean; // TODO delete
}

const FormContext = React.createContext<FormContextType>({
  controlId: undefined,
});

export default FormContext;
