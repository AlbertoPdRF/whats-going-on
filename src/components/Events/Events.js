import React from 'react';
import { Timeline } from '@primer/components';

import Event from './Event';

const Events = (props) => {
  const { events } = props;

  return (
    <Timeline>
      <Timeline.Break />
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
      <Timeline.Break />
    </Timeline>
  );
};

export default Events;
