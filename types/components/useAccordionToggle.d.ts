export default interface useAccordionToggle {
  (eventKey: string, onClick: (event?: React.SyntheticEvent) => void): (
    event?: React.SyntheticEvent,
  ) => void;
}
