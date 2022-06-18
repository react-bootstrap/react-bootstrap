import Heading from './Heading';
import CarbonAds from './CarbonAds';

function PageHeader({ title, subTitle }) {
  return (
    <>
      <Heading h="1">{title}</Heading>
      {subTitle && <p className="lead">{subTitle}</p>}

      <CarbonAds className="my-4" />
    </>
  );
}

export default PageHeader;
