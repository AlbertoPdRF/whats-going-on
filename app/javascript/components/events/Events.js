import React, { useState } from 'react';
import {
  BaseStyles,
  Flex,
  Box,
  Heading,
  Flash,
  StyledOcticon,
  Timeline,
} from '@primer/components';
import { XIcon } from '@primer/octicons-react';

import { ReactComponent as SearchImage } from 'images/search.svg';
import SearchForm from './SearchForm';
import Event from './Event';

const Events = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  const handleOwnerChange = (owner) => setOwner(owner);

  const handleRepoChange = (repo) => setRepo(repo);

  const handleSearchClick = () => {
    setLoading(true);
    setEvents(null);
    setError(null);

    fetch(`?owner=${owner}&repo=${repo}`, {
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((events) => setEvents(events))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <BaseStyles>
      <Flex flexDirection="column" alignItems="center" m={2}>
        <Box width={[1, 1, 1 / 2, 1 / 3]} m={2}>
          <Box as={SearchImage} width="100%" height={null} />
        </Box>
        <Heading fontSize={3} textAlign="center" m={2}>
          Get to know what's going on in any GitHub repository!
        </Heading>
        <SearchForm
          owner={owner}
          handleOwnerChange={handleOwnerChange}
          repo={repo}
          handleRepoChange={handleRepoChange}
          handleSearchClick={handleSearchClick}
          loading={loading}
        />
        {error && (
          <Flash variant="danger">
            <StyledOcticon icon={XIcon} />
            {error.message}
          </Flash>
        )}
        {events && (
          <Timeline>
            <Timeline.Break />
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
            <Timeline.Break />
          </Timeline>
        )}
      </Flex>
    </BaseStyles>
  );
};

export default Events;
