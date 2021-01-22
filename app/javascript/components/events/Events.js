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
import Repository from '../shared/Repository';
import Event from './Event';

const Events = (props) => {
  const [owner, setOwner] = useState(props.repository?.owner || '');
  const [repo, setRepo] = useState(props.repository?.repo || '');
  const [repository, setRepository] = useState(props.repository || null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(props.events || null);
  const [error, setError] = useState(null);

  const handleOwnerChange = (owner) => setOwner(owner);

  const handleRepoChange = (repo) => setRepo(repo);

  const handleSearchClick = () => {
    setLoading(true);
    setRepository(null);
    setEvents(null);
    setError(null);

    const url = `?${new URLSearchParams({ owner, repo }).toString()}`;
    history.pushState(null, null, url);

    fetch(url, {
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRepository(data.repository);
        setEvents(data.events);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const handleSaveClick = () => {
    setLoading(true);
    setError(null);

    const id = repository.id;
    const url = '/repositories' + (id ? `/${id}` : '');
    const method = id ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
      }),
      body: JSON.stringify({ repository }),
    })
      .then((response) => response.json())
      .then((repository) => {
        if (id) delete repository.id;
        setRepository(repository);
      })
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
        {repository && (
          <Repository
            repository={repository}
            handleSaveClick={handleSaveClick}
            loading={loading}
          />
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
