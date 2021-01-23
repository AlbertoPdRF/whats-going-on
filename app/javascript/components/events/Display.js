import React, { useState, useEffect } from 'react';
import { Flash, StyledOcticon, Timeline } from '@primer/components';
import { XIcon } from '@primer/octicons-react';

import Repository from '../shared/Repository';
import Event from './Event';

import useData from '../../hooks/useData';

const Display = (props) => {
  const { url, handleLoadingChange } = props;

  const [error, setError] = useState(null);

  const { loading, error: fetchingError, data } = useData(url);

  useEffect(() => {
    handleLoadingChange(loading);
  }, [loading]);

  useEffect(() => {
    setError(fetchingError);
  }, [fetchingError]);

  const handleErrorChange = (error) => setError(error);

  return (
    <React.Fragment>
      {error && (
        <Flash variant="danger">
          <StyledOcticon icon={XIcon} />
          {error.message}
        </Flash>
      )}
      {data && (
        <React.Fragment>
          <Repository
            repository={data.repository}
            handleErrorChange={handleErrorChange}
          />
          <Timeline>
            <Timeline.Break />
            {data.events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
            <Timeline.Break />
          </Timeline>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Display;
