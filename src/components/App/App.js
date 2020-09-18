import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { BaseStyles, Flex, Box, Heading } from '@primer/components';

import { ReactComponent as SearchImage } from '../../svg/search.svg';
import SearchForm from '../SearchForm/SearchForm';

const App = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleOwnerChange = (owner) => setOwner(owner);

  const handleRepoChange = (repo) => setRepo(repo);

  const handleSearchClick = () => {
    setLoading(true);
    setData(null);
    setError(null);

    octokit.activity
      .listRepoEvents({
        owner,
        repo,
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const octokit = new Octokit();

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

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
      </Flex>
    </BaseStyles>
  );
};

export default App;
