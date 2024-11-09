import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function ToggleButtonGroupUncontrolled() {
  return (
    <>
      <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="mb-2">
        <ToggleButton id="tbg-check-1" value={1}>
          Checkbox 1 (pre-checked)
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value={2}>
          Checkbox 2
        </ToggleButton>
        <ToggleButton id="tbg-check-3" value={3}>
          Checkbox 3 (pre-checked)
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
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
