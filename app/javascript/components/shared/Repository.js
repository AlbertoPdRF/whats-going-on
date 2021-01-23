import React from 'react';
import {
  Flex,
  BorderBox,
  Box,
  StyledOcticon,
  ButtonDanger,
  Link,
  ButtonOutline,
} from '@primer/components';
import { RepoIcon } from '@primer/octicons-react';

import ExternalLink from '../shared/ExternalLink';

import { root_path } from '../../routes.js.erb';

const Repository = (props) => {
  const { repository, handleSaveClick, loading } = props;
  const { id, user_id, owner, repo, url } = repository;

  return (
    <BorderBox width={[1, 1, 1 / 2, 1 / 3]} px={2} py={1} m={2}>
      <Flex flexDirection="row" alignItems="center">
        <Box>
          <StyledOcticon icon={RepoIcon} mr={2} />
          <ExternalLink href={`https://github.com/${owner}`} text={owner} />
          /
          <ExternalLink href={url} text={repo} ml={1} />
        </Box>
        <Box flexGrow={1} />
        {user_id && (
          <Box>
            {id ? (
              handleSaveClick ? (
                <ButtonDanger
                  onClick={() => handleSaveClick()}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Unsave'}
                </ButtonDanger>
              ) : (
                <Link href={root_path({ owner, repo })} fontWeight="bold">
                  Search
                </Link>
              )
            ) : (
              <ButtonOutline
                onClick={() => handleSaveClick()}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Save'}
              </ButtonOutline>
            )}
          </Box>
        )}
      </Flex>
    </BorderBox>
  );
};

export default Repository;
