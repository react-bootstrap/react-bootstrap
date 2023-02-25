import * as React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rebuilt with React',
    description: (
      <>
        <p>
          React-Bootstrap replaces the Bootstrap JavaScript. Each component has
          been built from scratch as a true React component, without unneeded
          dependencies like jQuery.
        </p>
        <p>
          As one of the oldest React libraries, React-Bootstrap has evolved and
          grown alongside React, making it an excellent choice as your UI
          foundation.
        </p>
      </>
    ),
  },
  {
    title: 'Bootstrap at its core',
    description: (
      <>
        <p>
          Built with compatibility in mind, we embrace our bootstrap core and
          strive to be compatible with the world&apos;s largest UI ecosystem.
        </p>
        <p>
          By relying entirely on the Bootstrap stylesheet, React-Bootstrap just
          works with the thousands of Bootstrap themes you already love.
        </p>
      </>
    ),
  },
  {
    title: 'Accessible by default',
    description: (
      <>
        <p>
          The React component model gives us more control over form and function
          of each component.
        </p>
        <p>
          Each component is implemented with accessibility in mind. The result
          is a set of accessible-by-default components, over what is possible
          from plain Bootstrap.
        </p>
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md">
        <h3>{title}</h3>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
