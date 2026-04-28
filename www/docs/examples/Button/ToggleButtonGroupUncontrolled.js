import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function ToggleButtonGroupUncontrolled() {
  const [focusedButton, setFocusedButton] = React.useState(2);
  const buttonRef = [{ ref: useRef() }, { ref: useRef() }, { ref: useRef() }];
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      return;
    }
    buttonRef[0].ref.current.focus();
    setFocusedButton(0);
    if (event.key === 'ArrowLeft' && focusedButton > 1) {
      buttonRef[focusedButton - 1].ref.current.focus();
      setFocusedButton((prev) => prev - 1);
    } else if (event.key === 'ArrowRight' && focusedButton < 4) {
      buttonRef[focusedButton + 1].ref.current.focus();
      setFocusedButton((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedButton]);

  return (
    <>
      <ToggleButtonGroup
        type="checkbox"
        defaultValue={[1, 3]}
        className="mb-2"
        tabIndex={0}
      >
        <ToggleButton
          ref={buttonRef[0].ref}
          id="tbg-check-1"
          value={1}
          tabIndex={0}
        >
          Checkbox 1 (pre-checked)
        </ToggleButton>
        <ToggleButton
          ref={buttonRef[1].ref}
          id="tbg-check-2"
          value={2}
          tabIndex={0}
        >
          Checkbox 2
        </ToggleButton>
        <ToggleButton
          ref={buttonRef[2].ref}
          id="tbg-check-3"
          value={3}
          tabIndex={0}
        >
          Checkbox 3 (pre-checked)
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup
        type="radio"
        name="options"
        defaultValue={1}
        tabIndex={0}
      >
        <ToggleButton id="tbg-radio-1" value={1}>
          Radio 1 (pre-checked)
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2}>
          Radio 2
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3}>
          Radio 3
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default ToggleButtonGroupUncontrolled;
