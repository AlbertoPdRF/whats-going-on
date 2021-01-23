import { useState, useCallback, useEffect } from 'react';

import fetchJsonOrError from './fetch';

const useData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sync = useCallback(() => {
    if (url) {
      setLoading(true);
      setError(null);
      fetchJsonOrError(url, options)
        .then((data) => setData(data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [url, setData, setError]);

  useEffect(sync, [sync]);

  return {
    loading,
    error,
    data,
  };
};

export default useData;
