export default function createSelectedEvent(eventKey) {
  let selectionPrevented = false;

  return {
    eventKey,

    preventSelection() {
      selectionPrevented = true;
    },

    isSelectionPrevented() {
      return selectionPrevented;
    }
  };
}
