import React from 'react';
import { Flex, TextInput, ButtonPrimary } from '@primer/components';

const SearchForm = (props) => {
  const {
    owner,
    handleOwnerChange,
    repo,
    handleRepoChange,
    handleSearchClick,
    loading,
  } = props;

  return (
    <Flex justifyContent="center" flexWrap="wrap" m={1}>
      <TextInput
        m={1}
        aria-label="Owner"
        name="owner"
        placeholder="Owner"
        value={owner}
        onChange={(event) => handleOwnerChange(event.target.value)}
      />
      <TextInput
        m={1}
        aria-label="Repo"
        name="repo"
        placeholder="Repo"
        value={repo}
        onChange={(event) => handleRepoChange(event.target.value)}
      />
      <Flex justifyContent="center" m={1} width={1}>
        <ButtonPrimary
          onClick={handleSearchClick}
          disabled={!owner || !repo || loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
};

export default SearchForm;
