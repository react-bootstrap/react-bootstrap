import classNames from 'classnames';

interface TextUtilityProps {
  textAlign?: 'start' | 'end' | 'center' | string;
}

function useTextUtilities(textUtilityProps: TextUtilityProps): string {
  return classNames(
    textUtilityProps.textAlign && `text-${textUtilityProps.textAlign}`,
  );
}

export type UtilityProps = TextUtilityProps;

export function useUtilities(utilityProps: UtilityProps): string {
  return classNames(
    useTextUtilities({
      textAlign: utilityProps.textAlign,
    }),
  );
}
