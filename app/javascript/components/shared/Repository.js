import React, { useState, useEffect } from 'react';
import {
  Flex,
  BorderBox,
  Box,
  StyledOcticon,
  ButtonDanger,
  ButtonOutline,
  Link,
} from '@primer/components';
import { RepoIcon } from '@primer/octicons-react';

import ExternalLink from '../shared/ExternalLink';

import useData from '../../hooks/useData';

import {
  root_path,
  repository_path,
  repositories_path,
} from '../../routes.js.erb';

const Repository = (props) => {
  const { handleErrorChange } = props;

  const eventsView = !!handleErrorChange;

  const [repository, setRepository] = useState(props.repository);
  const [readyForUpdates, setReadyForUpdates] = useState(false);
  const [fO, setFO] = useState({});

  const { loading, error, data } = useData(fO.url, fO.options);

  useEffect(() => {
    if (readyForUpdates) {
      if (error) {
        handleErrorChange(error);
        return;
      }
      if (data) {
        if (repository.id) {
          delete data.id;
        }
        setRepository(data);
      }
    }
  }, [readyForUpdates, error, data]);

  const handleSaveClick = () => {
    const { id } = repository;
    setFO({
      url: id ? repository_path(id) : repositories_path(),
      options: {
        method: id ? 'DELETE' : 'POST',
        body: JSON.stringify({ repository }),
      },
    });
    setReadyForUpdates(true);
  };

  return (
    repository && (
      <BorderBox width={[1, 1, 1 / 2, 1 / 3]} px={2} py={1} m={2}>
        <Flex flexDirection="row" alignItems="center">
          <Box>
            <StyledOcticon icon={RepoIcon} mr={2} />
            <ExternalLink
              href={`https://github.com/${repository.owner}`}
              text={repository.owner}
            />
            /
            <ExternalLink href={repository.url} text={repository.repo} ml={1} />
          </Box>
          <Box flexGrow={1} />
          {repository.user_id && (
            <Box>
              {eventsView ? (
                repository.id ? (
                  <ButtonDanger
                    onClick={() => handleSaveClick()}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Unsave'}
                  </ButtonDanger>
                ) : (
                  <ButtonOutline
                    onClick={() => handleSaveClick()}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </ButtonOutline>
                )
              ) : (
                <Link
                  href={root_path({
                    owner: repository.owner,
                    repo: repository.repo,
                  })}
                  fontWeight="bold"
                >
                  Search
                </Link>
              )}
            </Box>
          )}
        </Flex>
      </BorderBox>
    )
  );
};

export default Repository;
