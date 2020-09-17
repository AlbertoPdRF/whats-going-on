import React, { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import { BaseStyles } from '@primer/components';

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
      <SearchForm
        owner={owner}
        handleOwnerChange={handleOwnerChange}
        repo={repo}
        handleRepoChange={handleRepoChange}
        handleSearchClick={handleSearchClick}
        loading={loading}
      />
    </BaseStyles>
  );
};

export default App;
