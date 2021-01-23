import React, { useState, useLayoutEffect } from 'react';
import { BaseStyles, Flex, Box, Heading } from '@primer/components';

import { ReactComponent as SearchImage } from 'images/search.svg';
import SearchForm from './SearchForm';
import Display from './Display';

import { root_path } from '../../routes.js.erb';

const Events = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('owner') && params.has('repo')) {
      const owner = params.get('owner');
      setOwner(owner);
      const repo = params.get('repo');
      setRepo(repo);
      setUrl(root_path({ owner, repo }));
    }
  }, []);

  const handleOwnerChange = (owner) => setOwner(owner);

  const handleRepoChange = (repo) => setRepo(repo);

  const handleSearchClick = () => {
    const url = root_path({ owner, repo });
    history.pushState(null, null, url);
    setUrl(url);
  };

  const handleLoadingChange = (loading) => setLoading(loading);

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
        {url && <Display url={url} handleLoadingChange={handleLoadingChange} />}
      </Flex>
    </BaseStyles>
  );
};

export default Events;
