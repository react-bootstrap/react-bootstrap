import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipInCopyExample() {
  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  return (
    <p>
      Tight pants next level keffiyeh{' '}
      <Link title="Default title" id="t-1">
        you probably
      </Link>{' '}
      haven't heard of them. Farm-to-table seitan, mcsweeney's fixie sustainable
      quinoa 8-bit american apparel{' '}
      <Link id="t-2" title="Another one">
        have a
      </Link>{' '}
      terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo
      thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's
      cleanse vegan chambray. A really ironic artisan{' '}
      <Link title="Another one here too" id="t-3">
        whatever keytar
      </Link>
      , scenester farm-to-table banksy Austin{' '}
      <Link title="The last tip!" id="t-4">
        twitter handle
      </Link>{' '}
      freegan cred raw denim single-origin coffee viral.
    </p>
  );
}

export default TooltipInCopyExample;
