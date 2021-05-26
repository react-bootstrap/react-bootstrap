import * as React from 'react';

// TODO
interface FormContextType {
  controlId?: any;
}

const FormContext = React.createContext<FormContextType>({});

export default FormContext;
