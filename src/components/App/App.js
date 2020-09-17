import React from 'react';
import { BaseStyles, Box, Heading } from '@primer/components';

const App = () => (
  <BaseStyles>
    <Box m={4}>
      <Heading mb={2}>Hello, world!</Heading>
      <p>This will get Primer text styles.</p>
    </Box>
  </BaseStyles>
);

export default App;
