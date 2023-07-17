import * as React from 'react';

export interface ExampleCarouselImageProps {
  title?: string | undefined;
  text: string;
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({
  title = 'Placeholder',
  text,
}) => (
  <svg
    className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
    width="800"
    height="400"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={`${title}: ${text}`}
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <title>{title}</title>
    <rect width="100%" height="100%" fill="#555" />
    <text x="50%" y="50%" fill="#333" dy=".3em">
      {text}
    </text>
  </svg>
);

ExampleCarouselImage.displayName = 'ExampleCarouselImage';

export default ExampleCarouselImage;
