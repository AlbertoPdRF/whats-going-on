import React from 'react';
import {
  BaseStyles,
  Flex,
  Flash,
  StyledOcticon,
  Link,
} from '@primer/components';
import { InfoIcon } from '@primer/octicons-react';

import Repository from '../shared/Repository';

import { root_path } from '../../routes.js.erb';

const Repositories = (props) => {
  const { repositories } = props;

  return (
    <BaseStyles>
      <Flex flexDirection="column" alignItems="center" m={2}>
        {repositories.length > 0 ? (
          repositories.map((repository) => (
            <Repository key={repository.id} repository={repository} />
          ))
        ) : (
          <Flash variant="warning">
            <StyledOcticon icon={InfoIcon} />
            You don't have any saved repositories,
            <Link
              href={root_path()}
              fontWeight="bold"
              color="gray.8"
              ml={1}
              mr={1}
              muted
            >
              go back to the main page
            </Link>
            and save some of your searches!
          </Flash>
        )}
      </Flex>
    </BaseStyles>
  );
};

export default Repositories;
