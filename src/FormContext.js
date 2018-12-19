import React from 'react';
import transformContext from 'react-context-toolbox/transformContext';

const FormContext = React.createContext({ controlId: undefined });

FormContext.Transform = transformContext(FormContext);

export default FormContext;
