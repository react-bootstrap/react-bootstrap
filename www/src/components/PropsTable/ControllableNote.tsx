import * as React from 'react';

const upperFirst = (str: string) => str[0].toUpperCase() + str.slice(1);

export interface ControllableNoteProps {
  propName: string;
  prop: {
    type?: { name: string } | undefined;
    doclets: Record<string, string>;
  };
}

const ControllableNote: React.FC<ControllableNoteProps> = ({
  propName,
  prop,
}) => {
  const controllable = prop.doclets.controllable;
  const isHandler = prop.type?.name === 'func';

  return (
    <div className="mb-2">
      <small>
        <em className="text-info-emphasis">
          {isHandler ? (
            <span>
              controls <code>{controllable}</code>
            </span>
          ) : (
            <span>
              controlled by: <code>{controllable}</code>, initial prop:{' '}
              <code>{`default${upperFirst(propName)}`}</code>
            </span>
          )}
        </em>
      </small>
    </div>
  );
};

export default ControllableNote;
