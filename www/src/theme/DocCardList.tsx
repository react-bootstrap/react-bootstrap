import * as React from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';
import type { Props } from '@theme/DocCardList';

function DocCardListForCurrentSidebarCategory({ className }: Props) {
  const category = useCurrentSidebarCategory();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return <DocCardList items={category.items} className={className} />;
}

export default function DocCardList(props: Props): JSX.Element {
  const { items, className } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className="col col-md-6 margin-bottom--lg">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
