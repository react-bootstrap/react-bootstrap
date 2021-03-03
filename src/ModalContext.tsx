import * as React from 'react';

interface ModalContextType {
  onHide: () => void;
}

const ModalContext = React.createContext<ModalContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {},
});

export default ModalContext;
