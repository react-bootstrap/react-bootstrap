import { describe, expect, it } from 'vitest';
import createUtilityClasses from '../src/createUtilityClasses';

describe('createUtilityClassName', () => {
  it('should not create a class when value is not defined', () => {
    const classList = createUtilityClasses({
      gap: undefined,
    });

    expect(classList).toHaveLength(0);
  });

  it('should handle falsy values', () => {
    const classList = createUtilityClasses({
      gap: 0,
    });

    expect(classList).toHaveLength(1);
    expect(classList).toEqual(expect.arrayContaining(['gap-0']));
  });

  it('should handle responsive falsy values', () => {
    const classList = createUtilityClasses({
      gap: { xs: 0, md: 0 },
    });

    expect(classList).toHaveLength(2);
    expect(classList).toEqual(expect.arrayContaining(['gap-0', 'gap-md-0']));
  });

  it('should return `utilityName-value` when value is a primitive', () => {
    const classList = createUtilityClasses({
      gap: 2,
    });

    expect(classList).toHaveLength(1);
    expect(classList).toEqual(expect.arrayContaining(['gap-2']));
  });

  it('should return responsive class when value is a responsive type', () => {
    const classList = createUtilityClasses({
      gap: { xs: 2, lg: 3, xxl: 4 },
    });

    expect(classList).toHaveLength(3);
    expect(classList).toEqual(
      expect.arrayContaining(['gap-2', 'gap-lg-3', 'gap-xxl-4']),
    );
  });

  it('should return multiple classes', () => {
    const classList = createUtilityClasses({
      gap: { xs: 2, lg: 3, xxl: 4 },
      text: { xs: 'start', md: 'end', xl: 'start' },
    });

    expect(classList).toHaveLength(6);
    expect(classList).toEqual(
      expect.arrayContaining([
        'gap-2',
        'gap-lg-3',
        'gap-xxl-4',
        'text-start',
        'text-md-end',
        'text-xl-start',
      ]),
    );
  });

  it('should handle custom breakpoints', () => {
    const classList = createUtilityClasses(
      {
        gap: { xs: 2, custom: 3 },
      },
      ['xs', 'custom'],
    );

    expect(classList).toHaveLength(2);
    expect(classList).toEqual(
      expect.arrayContaining(['gap-2', 'gap-custom-3']),
    );
  });
});
