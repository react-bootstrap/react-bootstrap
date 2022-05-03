import { render } from '@testing-library/react';
import ToastContainer, { ToastPosition } from '../src/ToastContainer';

const expectedClassesWithoutPosition: Record<ToastPosition, Array<string>> = {
  'top-start': ['top-0', 'start-0'],
  'top-center': ['top-0', 'start-50', 'translate-middle-x'],
  'top-end': ['top-0', 'end-0'],
  'middle-start': ['top-50', 'start-0', 'translate-middle-y'],
  'middle-center': ['top-50', 'start-50', 'translate-middle'],
  'middle-end': ['top-50', 'end-0', 'translate-middle-y'],
  'bottom-start': ['bottom-0', 'start-0'],
  'bottom-center': ['bottom-0', 'start-50', 'translate-middle-x'],
  'bottom-end': ['bottom-0', 'end-0'],
};

const createExpectedClasses = (containerPosition = 'absolute') =>
  Object.fromEntries(
    Object.entries(expectedClassesWithoutPosition).map(([key, value]) => [
      key,
      containerPosition ? [`position-${containerPosition}`, ...value] : value,
    ]),
  );

describe('ToastContainer', () => {
  it('should render a basic toast container', () => {
    const { container } = render(<ToastContainer />);
    container.firstElementChild!.classList.contains('toast-container').should.be
      .true;
  });

  describe('without containerPosition', () => {
    const expectedClasses = createExpectedClasses();

    Object.keys(expectedClasses).forEach((position: ToastPosition) => {
      it(`should render classes for position=${position} with position-absolute`, () => {
        const { container } = render(<ToastContainer position={position} />);
        expectedClasses[position].map(
          (className) =>
            container.firstElementChild!.classList.contains(className).should.be
              .true,
        );
      });
    });
  });

  describe('with containerPosition = "" (empty string)', () => {
    const expectedClasses = createExpectedClasses('');

    Object.keys(expectedClasses).forEach((position: ToastPosition) => {
      it(`should render classes for position=${position} without position-*`, () => {
        const { container } = render(<ToastContainer position={position} />);
        expectedClasses[position].map(
          (className) =>
            container.firstElementChild!.classList.contains(className).should.be
              .true,
        );
      });
    });
  });

  ['absolute', 'fixed', 'relative', 'sticky', 'custom'].forEach(
    (containerPosition) => {
      describe(`with containerPosition=${containerPosition}`, () => {
        const expectedClasses = createExpectedClasses(containerPosition);

        Object.keys(expectedClasses).forEach((position: ToastPosition) => {
          it(`should render classes for position=${position} with position-${containerPosition}`, () => {
            const { container } = render(
              <ToastContainer
                position={position}
                containerPosition={containerPosition}
              />,
            );
            expectedClasses[position].map(
              (className) =>
                container.firstElementChild!.classList.contains(className)
                  .should.be.true,
            );
          });
        });
      });
    },
  );
});
