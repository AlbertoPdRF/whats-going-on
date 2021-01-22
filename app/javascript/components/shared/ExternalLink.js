import React from 'react';
import { Link } from '@primer/components';

const ExternalLink = (props) => {
  const { href, text, ...rest } = props;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      fontWeight="bold"
      color="gray.8"
      mr={1}
      muted
      {...rest}
    >
      {text}
    </Link>
  );
};

export default ExternalLink;
