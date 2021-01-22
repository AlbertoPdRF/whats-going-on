import React from 'react';
import {
  BaseStyles,
  Header,
  Dropdown,
  Avatar,
  Link,
  BorderBox,
  StyledOcticon,
  Flash,
} from '@primer/components';
import { MarkGithubIcon, InfoIcon } from '@primer/octicons-react';

const NavigationBar = (props) => {
  const { user } = props;

  const signInUrl = '/users/auth/github';

  return (
    <BaseStyles>
      <Header>
        <Header.Item full>
          <Header.Link href="/" fontSize={4}>
            <span>Whagon</span>
          </Header.Link>
        </Header.Item>
        <Header.Item mr={0}>
          {user ? (
            <Dropdown>
              <Dropdown.Button>
                <Avatar
                  src={user.avatar}
                  size={24}
                  alt={`${user.username}'s avatar`}
                />
              </Dropdown.Button>
              <Dropdown.Menu direction="sw">
                <Dropdown.Item>
                  <Link href="sign-out">Sign out</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Header.Link
              as={BorderBox}
              href={signInUrl}
              fontSize={3}
              px={2}
              py={1}
            >
              <span>Sign in with</span>
              <StyledOcticon icon={MarkGithubIcon} size={24} ml={2} />
            </Header.Link>
          )}
        </Header.Item>
      </Header>
      {!user && (
        <Flash variant="warning" m={2}>
          <StyledOcticon icon={InfoIcon} />
          <Link href={signInUrl} fontWeight="bold" color="gray.8" mr={1} muted>
            Signing in
          </Link>
          will allow you to make more searches
        </Flash>
      )}
    </BaseStyles>
  );
};

export default NavigationBar;
